/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, BellOff, AlertTriangle, ShieldCheck, Clock, X, Info } from 'lucide-react';
import { Subscription } from '../types';
import { getNextBillingDate, getRemainingTime, formatPrice } from '../utils';
import { Language } from '../locales';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptions: Subscription[];
  onSelectSubscription: (id: string) => void;
  lang: Language;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  subscriptions,
  onSelectSubscription,
  lang,
}) => {
  const activeSubs = useMemo(() => subscriptions.filter(s => s.isActive), [subscriptions]);

  // Compute urgent alerts based on reminder configurations
  const alerts = useMemo(() => {
    const list: Array<{
      sub: Subscription;
      type: 'today' | 'urgent' | 'warning';
      daysLeft: number;
      message: string;
    }> = [];

    const now = new Date();

    activeSubs.forEach(sub => {
      const nextBill = getNextBillingDate(sub.firstBillingDate, sub.cycle, sub.customCycleDays);
      const remaining = getRemainingTime(nextBill);

      if (remaining.isToday) {
        list.push({
          sub,
          type: 'today',
          daysLeft: 0,
          message: lang === 'zh' 
            ? `今天扣款：${sub.name} 账单今日扣费 ${formatPrice(sub.price, sub.currency)}，请确保账户充足。`
            : `Due Today: ${sub.name} will charge ${formatPrice(sub.price, sub.currency)} today. Please secure your balance.`,
        });
      } else if (remaining.days === 0) {
        list.push({
          sub,
          type: 'urgent',
          daysLeft: 1,
          message: lang === 'zh'
            ? `明天扣款：${sub.name} 将于 24 小时内续期 ${formatPrice(sub.price, sub.currency)}。`
            : `Due Tomorrow: ${sub.name} will renew in 24 hours for ${formatPrice(sub.price, sub.currency)}.`,
        });
      } else if (remaining.days <= sub.reminderDaysBefore && sub.reminderDaysBefore > 0) {
        list.push({
          sub,
          type: 'warning',
          daysLeft: remaining.days,
          message: lang === 'zh'
            ? `即将续期：${sub.name} 将在 ${remaining.days} 天后扣费 ${formatPrice(sub.price, sub.currency)}。`
            : `Upcoming Renewal: ${sub.name} will charge ${formatPrice(sub.price, sub.currency)} in ${remaining.days} days.`,
        });
      }
    });

    // Sort by urgency: today first, then lowest days left
    return list.sort((a, b) => {
      if (a.type === 'today' && b.type !== 'today') return -1;
      if (b.type === 'today' && a.type !== 'today') return 1;
      return a.daysLeft - b.daysLeft;
    });
  }, [activeSubs, lang]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-md h-full bg-white shadow-2xl border-l border-slate-100 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Bell size={18} />
              </div>
              {alerts.length > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {lang === 'zh' ? '订阅提醒消息中心' : 'Alert & Message Center'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {lang === 'zh' ? '追踪与您的扣款节点相关的即时预警' : 'Monitor upcoming renewals and payment deadlines'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/80 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Alerts Content */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/30 text-[11px] leading-relaxed text-indigo-700 font-semibold flex items-start gap-1.5">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              {lang === 'zh' 
                ? '提醒中心会根据您在卡片中设置的“到期提前提醒”时限，在账单临近时发出高亮警报。'
                : 'Alerts are generated based on the "Advance Alert" thresholds defined in each subscription card.'}
            </span>
          </div>

          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    onSelectSubscription(alert.sub.id);
                    onClose();
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm active:scale-[0.99] flex items-start gap-3 ${
                    alert.type === 'today'
                      ? 'bg-rose-50/30 border-rose-100 hover:border-rose-200'
                      : alert.type === 'urgent'
                      ? 'bg-orange-50/30 border-orange-100 hover:border-orange-200'
                      : 'bg-amber-50/30 border-amber-100 hover:border-amber-200'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {alert.type === 'today' ? (
                      <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                        <AlertTriangle size={15} className="animate-bounce" />
                      </div>
                    ) : alert.type === 'urgent' ? (
                      <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                        <Clock size={15} />
                      </div>
                    ) : (
                      <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                        <Bell size={15} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-grow">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <span className="text-base">{alert.sub.emoji}</span>
                        {alert.sub.name}
                      </span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        alert.type === 'today'
                          ? 'bg-rose-100 text-rose-700'
                          : alert.type === 'urgent'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {alert.type === 'today' 
                          ? (lang === 'zh' ? '今天' : 'Today') 
                          : alert.type === 'urgent' 
                          ? (lang === 'zh' ? '明天' : 'Tomorrow') 
                          : (lang === 'zh' ? `${alert.daysLeft}天后` : `In ${alert.daysLeft}d`)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-medium">
                      {alert.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-3">
                <BellOff size={24} />
              </div>
              <h4 className="text-xs font-bold text-slate-700">
                {lang === 'zh' ? '暂无到期扣款提醒' : 'No Expiry Alerts'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                {lang === 'zh' 
                  ? '当前没有临近扣款日程或提醒配置，所有的订阅运作稳定'
                  : 'No upcoming payments match your notification triggers. All operations stable.'}
              </p>
            </div>
          )}

          {/* Historical Billing Status Simulated logs */}
          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>{lang === 'zh' ? '近期账单自动监控日志' : 'Real-time Security & Audit Logs'}</span>
            </h4>
            <div className="space-y-3 font-mono text-[10px] text-slate-400 leading-relaxed">
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span>
                  {lang === 'zh' ? '[INFO] 系统加载本地订阅库完成' : '[INFO] Local storage database loaded successfully'}
                </span>
                <span className="text-slate-300">{lang === 'zh' ? '刚刚' : 'just now'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span>
                  {lang === 'zh' ? '[INFO] 正在计算订阅周期的下一个还款日...' : '[INFO] Estimating billing days for active cycles...'}
                </span>
                <span className="text-slate-300">{lang === 'zh' ? '1分钟前' : '1m ago'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span>
                  {lang === 'zh' ? '[INFO] 汇率换算引擎状态: 离线正常 (100% 缓存)' : '[INFO] Currency sandbox: operational (100% offline cache)'}
                </span>
                <span className="text-slate-300">{lang === 'zh' ? '1分钟前' : '1m ago'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5">
                <span>
                  {lang === 'zh' ? '[INFO] 到期高亮警报引擎初始化完成' : '[INFO] Real-time alerts scheduler initialized'}
                </span>
                <span className="text-slate-300">{lang === 'zh' ? '5分钟前' : '5m ago'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-xs font-bold text-slate-600 transition-colors cursor-pointer"
          >
            {lang === 'zh' ? '知道了' : 'Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
