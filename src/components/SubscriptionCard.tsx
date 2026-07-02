/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, CheckCircle2, AlertCircle, Play, Pause, Edit3, Trash2, ShieldAlert } from 'lucide-react';
import { Subscription } from '../types';
import { 
  getNextBillingDate, 
  getRemainingTime, 
  formatPrice, 
  getCycleProgress,
  formatDate 
} from '../utils';
import { LOCALES, Language } from '../locales';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  lang: Language;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onEdit,
  onDelete,
  onToggleActive,
  lang,
}) => {
  const { name, price, currency, cycle, customCycleDays, firstBillingDate, category, paymentMethod, autoRenew, color, emoji, isActive } = subscription;
  const t = LOCALES[lang];

  const [nextBilling, setNextBilling] = useState<Date>(() => 
    getNextBillingDate(firstBillingDate, cycle, customCycleDays)
  );

  const [countdown, setCountdown] = useState(() => getRemainingTime(nextBilling));
  const [progress, setProgress] = useState(() => 
    getCycleProgress(firstBillingDate, nextBilling, cycle, customCycleDays)
  );

  // Keep countdown, next billing date and progress in sync
  useEffect(() => {
    const updateCalculations = () => {
      const nextDate = getNextBillingDate(firstBillingDate, cycle, customCycleDays);
      setNextBilling(nextDate);
      setCountdown(getRemainingTime(nextDate));
      setProgress(getCycleProgress(firstBillingDate, nextDate, cycle, customCycleDays));
    };

    updateCalculations();

    // Update countdown timer every second
    const interval = setInterval(updateCalculations, 1000);
    return () => clearInterval(interval);
  }, [firstBillingDate, cycle, customCycleDays, isActive]);

  // Determine urgency level
  const urgencyLevel = () => {
    if (!isActive) return 'paused';
    if (countdown.isToday) return 'today';
    if (countdown.days === 0) return 'critical'; // < 24 hours
    if (countdown.days <= 3) return 'warning'; // < 3 days
    return 'normal';
  };

  const urgency = urgencyLevel();

  // Get localized cycle text
  const getCycleText = () => {
    switch (cycle) {
      case 'weekly': return lang === 'zh' ? '每周' : 'Weekly';
      case 'monthly': return lang === 'zh' ? '每月' : 'Monthly';
      case 'yearly': return lang === 'zh' ? '每年' : 'Yearly';
      case 'custom': return lang === 'zh' ? `每 ${customCycleDays} 天` : `Every ${customCycleDays} days`;
      default: return lang === 'zh' ? '每月' : 'Monthly';
    }
  };

  const categoryLabel = (t.categories as any)[category] || category;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -6, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative overflow-hidden bg-white rounded-2xl border ${
        urgency === 'today'
          ? 'border-rose-200/80 shadow-md shadow-rose-50/40'
          : urgency === 'critical'
          ? 'border-orange-200/80 shadow-md shadow-orange-50/40'
          : urgency === 'warning'
          ? 'border-amber-200/80'
          : 'border-slate-100/90'
      } hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/80 transition-all flex flex-col h-full`}
    >
      {/* Main content wrapper */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            {/* Logo and Name */}
            <div className="flex items-center gap-3 min-w-0">
              <div 
                style={{ 
                  backgroundColor: `${color}0c`, 
                  borderColor: `${color}35`
                }}
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl border flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              >
                <span className="drop-shadow-sm">{emoji || '💳'}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-800 text-[14px] leading-tight truncate" title={name}>
                    {name}
                  </h4>
                  {/* Status Indicator Dot */}
                  {urgency !== 'normal' && urgency !== 'paused' && (
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      urgency === 'today' ? 'bg-rose-500 animate-pulse' :
                      urgency === 'critical' ? 'bg-orange-500' :
                      'bg-amber-500'
                    }`} />
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/30">
                    {categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    • {paymentMethod}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Billing Cycle Tag */}
            <div className="text-right flex-shrink-0">
              <div className="text-base font-semibold text-slate-900 font-mono tracking-tight">
                {formatPrice(price, currency)}
              </div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                {getCycleText()} / {autoRenew ? (lang === 'zh' ? '自动' : 'Auto') : (lang === 'zh' ? '单次' : 'Manual')}
              </div>
            </div>
          </div>

          {/* Countdown timer body */}
          <div className="my-4 p-3 rounded-xl bg-slate-50/50 border border-slate-100/60">
            {isActive ? (
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {lang === 'zh' ? '距离下次扣费' : 'Next billing in'}
                </span>
                
                {countdown.isToday ? (
                  <div className="flex items-center gap-1.5 text-rose-500 font-medium text-[11px] py-0.5">
                    <ShieldAlert size={14} className="flex-shrink-0" />
                    <span>{lang === 'zh' ? '今日续费，请注意账户余额' : 'Due today! Please secure your balance'}</span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1 font-mono text-slate-700">
                    {countdown.days > 0 && (
                      <span className="text-xl font-bold text-slate-800">
                        {countdown.days}
                        <span className="text-[11px] font-sans font-medium text-slate-400 ml-0.5 mr-1.5">
                          {lang === 'zh' ? '天' : 'd'}
                        </span>
                      </span>
                    )}
                    <span className="text-lg font-semibold text-slate-800">
                      {String(countdown.hours).padStart(2, '0')}
                      <span className="text-[11px] font-sans font-medium text-slate-400 ml-0.5 mr-1">
                        {lang === 'zh' ? '时' : 'h'}
                      </span>
                    </span>
                    <span className="text-base font-medium text-slate-700">
                      {String(countdown.minutes).padStart(2, '0')}
                      <span className="text-[11px] font-sans font-medium text-slate-400 ml-0.5 mr-1">
                        {lang === 'zh' ? '分' : 'm'}
                      </span>
                    </span>
                    <span className="text-xs font-normal text-slate-400">
                      {String(countdown.seconds).padStart(2, '0')}
                      <span className="text-[9px] font-sans font-normal text-slate-400 ml-0.5">
                        {lang === 'zh' ? '秒' : 's'}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-400 py-1">
                <Pause size={13} className="text-slate-300" />
                <span className="text-[11px] font-medium">{lang === 'zh' ? '已暂停倒计时' : 'Tracking paused'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer & details */}
        <div>
          {/* Notes summary */}
          {subscription.notes && (
            <p className="text-[11px] text-slate-400 italic mb-3 line-clamp-1 border-l-2 border-slate-200/70 pl-2">
              "{subscription.notes}"
            </p>
          )}

          {/* Progress and renewal date */}
          <div className="flex items-center justify-between border-t border-slate-100/80 pt-3.5 mt-1">
            <div className="flex items-center gap-2">
              {/* Custom SVG Progress Ring */}
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="14"
                    cy="14"
                    r="11"
                    className="stroke-slate-100 fill-none"
                    strokeWidth="2"
                  />
                  {isActive && (
                    <circle
                      cx="14"
                      cy="14"
                      r="11"
                      className="fill-none transition-all duration-300"
                      stroke={color || '#6366F1'}
                      strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 11}
                      strokeDashoffset={2 * Math.PI * 11 * (1 - progress / 100)}
                      strokeLinecap="round"
                    />
                  )}
                </svg>
                <span className="absolute text-[8px] font-mono font-medium text-slate-500">
                  {isActive ? `${Math.round(progress)}%` : '—'}
                </span>
              </div>
              <div className="leading-tight">
                <span className="text-[8px] text-slate-400 font-bold block uppercase tracking-wider">
                  {lang === 'zh' ? '下期扣费' : 'Billing date'}
                </span>
                <span className="text-[11px] font-medium text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                  <Calendar size={10} className="text-slate-400" />
                  {formatDate(nextBilling)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {/* Play/Pause Tracking Toggle */}
              <button
                onClick={() => onToggleActive(subscription.id)}
                className={`p-1.5 rounded-lg transition-colors border cursor-pointer ${
                  isActive 
                    ? 'bg-slate-50/50 hover:bg-slate-100/80 hover:text-slate-700 text-slate-400 border-slate-100/60' 
                    : 'bg-emerald-50 hover:bg-emerald-100/80 text-emerald-600 border-emerald-100'
                }`}
                title={isActive ? (lang === 'zh' ? '暂停倒计时' : 'Pause countdown') : (lang === 'zh' ? '启用倒计时' : 'Resume countdown')}
              >
                {isActive ? <Pause size={12} /> : <Play size={12} />}
              </button>

              {/* Edit */}
              <button
                onClick={() => onEdit(subscription)}
                className="p-1.5 rounded-lg bg-slate-50/50 hover:bg-slate-100/80 hover:text-slate-700 text-slate-400 border border-slate-100/60 transition-colors cursor-pointer"
                title={lang === 'zh' ? '编辑' : 'Edit'}
              >
                <Edit3 size={12} />
              </button>

              {/* Delete */}
              <button
                onClick={() => onDelete(subscription.id)}
                className="p-1.5 rounded-lg bg-slate-50/50 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100/80 text-slate-400 border border-slate-100/60 transition-colors cursor-pointer"
                title={lang === 'zh' ? '删除' : 'Delete'}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
