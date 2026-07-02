/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, AlertTriangle, Calendar, CreditCard, PieChart, Layers, Info } from 'lucide-react';
import { Subscription } from '../types';
import { convertToCNY, getMonthlyEquivalent, formatPrice, getNextBillingDate } from '../utils';
import { LOCALES, Language } from '../locales';

interface StatsOverviewProps {
  subscriptions: Subscription[];
  onSelectSubscription: (id: string) => void;
  lang: Language;
}

export interface CakeLayerInfo {
  layerId: number;
  name: string;
  nameEn: string;
  color: string;
  icon: string;
  desc: string;
  descEn: string;
}

const CAKE_LAYERS_CONFIG: Record<number, CakeLayerInfo> = {
  5: { layerId: 5, name: 'L5 终端娱乐与数字生活', nameEn: 'Consumer Life & Entertainment', color: '#EF4444', icon: '🍿', desc: '流媒体、游戏、音乐、健身等大众级终端消费', descEn: 'Streaming, gaming, music, fitness, and other everyday consumer services' },
  4: { layerId: 4, name: 'L4 行业垂直 SaaS', nameEn: 'Vertical SaaS & Solutions', color: '#F59E0B', icon: '💼', desc: '满足特定细分工作/商业场景的 SaaS 软件', descEn: 'Software services tailored for specific work or business scenarios' },
  3: { layerId: 3, name: 'L3 效率开发与提效框架', nameEn: 'Developer Tools & Frameworks', color: '#10B981', icon: '💻', desc: 'Copilot、代码框架、云端协作与提效工具', descEn: 'Copilot, code frameworks, cloud collaboration, and workflow tools' },
  2: { layerId: 2, name: 'L2 算子与底座大模型', nameEn: 'Foundation Models & APIs', color: '#3B82F6', icon: '🤖', desc: 'ChatGPT、Claude、API 等底层智能燃料', descEn: 'ChatGPT, Claude, and cognitive foundation model APIs' },
  1: { layerId: 1, name: 'L1 基建网络与物理算力', nameEn: 'Infrastructure & Compute', color: '#6366F1', icon: '⚡', desc: '云存储、域名、带宽、VPS 主机等硬件算力底座', descEn: 'Cloud storage, domains, bandwidth, VPS, and computing resources' },
};

function getSubCakeLayer(sub: Subscription): number {
  const nameLower = sub.name.toLowerCase();
  const cat = sub.category;
  
  // L2: Core LLMs & AI APIs
  if (
    nameLower.includes('chatgpt') || 
    nameLower.includes('gpt') || 
    nameLower.includes('claude') || 
    nameLower.includes('midjourney') || 
    nameLower.includes('perplexity') || 
    nameLower.includes('gemini') || 
    nameLower.includes('openai') || 
    nameLower.includes('deepseek') ||
    sub.emoji === '🤖' ||
    (cat === 'Productivity' && nameLower.includes('api'))
  ) {
    return 2;
  }
  
  // L3: Developer tool & Productivity tools
  if (
    nameLower.includes('copilot') || 
    nameLower.includes('github') || 
    nameLower.includes('jetbrains') || 
    nameLower.includes('cursor') || 
    nameLower.includes('figma') || 
    nameLower.includes('notion') || 
    nameLower.includes('obsidian') ||
    nameLower.includes('vscode') ||
    nameLower.includes('webstorm') ||
    cat === 'Productivity'
  ) {
    return 3;
  }
  
  // L1: Infrastructure & Cloud Storage / Networks
  if (
    cat === 'Cloud' || 
    cat === 'Utilities' ||
    nameLower.includes('icloud') || 
    nameLower.includes('aws') || 
    nameLower.includes('vps') || 
    nameLower.includes('aliyun') || 
    nameLower.includes('tencent') ||
    nameLower.includes('google one') ||
    nameLower.includes('domain') ||
    nameLower.includes('host') ||
    nameLower.includes('namesilo') ||
    nameLower.includes('cloudflare') ||
    nameLower.includes('宽带') ||
    nameLower.includes('电信')
  ) {
    return 1;
  }
  
  // L4: SaaS / Finance / Health / Others
  if (
    cat === 'Finance' || 
    cat === 'Health' || 
    nameLower.includes('zoom') || 
    nameLower.includes('slack') ||
    nameLower.includes('stripe') ||
    nameLower.includes('shopify')
  ) {
    return 4;
  }
  
  // L5: Entertainment
  if (cat === 'Entertainment') {
    return 5;
  }
  
  // Fallback
  return 4;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ subscriptions, onSelectSubscription, lang }) => {
  const activeSubs = useMemo(() => subscriptions.filter(s => s.isActive), [subscriptions]);
  const [analysisTab, setAnalysisTab] = useState<'cake' | 'category'>('cake');
  const t = LOCALES[lang];

  // Calculations
  const stats = useMemo(() => {
    let monthlyCNY = 0;
    let yearlyCNY = 0;
    let upcoming7Days = 0;
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    activeSubs.forEach(sub => {
      const monthlyEquiv = getMonthlyEquivalent(sub.price, sub.cycle, sub.customCycleDays);
      monthlyCNY += convertToCNY(monthlyEquiv, sub.currency);
      yearlyCNY += convertToCNY(monthlyEquiv * 12, sub.currency);

      const nextBill = getNextBillingDate(sub.firstBillingDate, sub.cycle, sub.customCycleDays);
      if (nextBill >= now && nextBill <= sevenDaysFromNow) {
        upcoming7Days++;
      }
    });

    return {
      monthlyCNY,
      yearlyCNY,
      upcoming7Days,
      activeCount: activeSubs.length,
      totalCount: subscriptions.length,
    };
  }, [activeSubs, subscriptions]);

  // Find the next closest renewal subscription
  const closestRenewal = useMemo(() => {
    if (activeSubs.length === 0) return null;
    
    const subsWithDates = activeSubs.map(sub => {
      const nextDate = getNextBillingDate(sub.firstBillingDate, sub.cycle, sub.customCycleDays);
      return { sub, nextDate };
    });

    subsWithDates.sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime());
    return subsWithDates[0];
  }, [activeSubs]);

  // Category Breakdown
  const categoryData = useMemo(() => {
    const breakdown: Record<string, { total: number; count: number; color: string }> = {
      Entertainment: { total: 0, count: 0, color: '#FB7299' },
      Productivity: { total: 0, count: 0, color: '#10A37F' },
      Utilities: { total: 0, count: 0, color: '#3B82F6' },
      Health: { total: 0, count: 0, color: '#10B981' },
      Cloud: { total: 0, count: 0, color: '#06B6D4' },
      Finance: { total: 0, count: 0, color: '#F59E0B' },
      Other: { total: 0, count: 0, color: '#6B7280' },
    };

    activeSubs.forEach(sub => {
      const monthlyEquiv = getMonthlyEquivalent(sub.price, sub.cycle, sub.customCycleDays);
      const cnyVal = convertToCNY(monthlyEquiv, sub.currency);
      if (breakdown[sub.category]) {
        breakdown[sub.category].total += cnyVal;
        breakdown[sub.category].count += 1;
      }
    });

    return Object.entries(breakdown)
      .map(([name, data]) => ({ name, ...data }))
      .filter(item => item.total > 0)
      .sort((a, b) => b.total - a.total);
  }, [activeSubs]);

  const totalBreakdownSpent = useMemo(() => {
    return categoryData.reduce((acc, curr) => acc + curr.total, 0);
  }, [categoryData]);

  // 5 Layers Cake data breakdown
  const cakeLayersData = useMemo(() => {
    const layers: Record<number, { total: number; count: number; subs: Subscription[] }> = {
      1: { total: 0, count: 0, subs: [] },
      2: { total: 0, count: 0, subs: [] },
      3: { total: 0, count: 0, subs: [] },
      4: { total: 0, count: 0, subs: [] },
      5: { total: 0, count: 0, subs: [] },
    };

    activeSubs.forEach(sub => {
      const layerId = getSubCakeLayer(sub);
      const monthlyEquiv = getMonthlyEquivalent(sub.price, sub.cycle, sub.customCycleDays);
      const cnyVal = convertToCNY(monthlyEquiv, sub.currency);
      if (layers[layerId]) {
        layers[layerId].total += cnyVal;
        layers[layerId].count += 1;
        layers[layerId].subs.push(sub);
      }
    });

    return Object.entries(layers).map(([idStr, data]) => {
      const id = parseInt(idStr, 10);
      return {
        id,
        ...data,
        config: CAKE_LAYERS_CONFIG[id],
      };
    }).sort((a, b) => b.id - a.id); // Top (L5) to Bottom (L1)
  }, [activeSubs]);

  const totalCakeSpent = useMemo(() => {
    return cakeLayersData.reduce((acc, curr) => acc + curr.total, 0);
  }, [cakeLayersData]);

  // Dynamic Insights
  const insights = useMemo(() => {
    const list: string[] = [];
    if (lang === 'zh') {
      if (stats.monthlyCNY > 500) {
        list.push('💡 月度订阅总额已超过 ¥500，建议审查是否有低频使用的服务。');
      }
      const nonAutoRenewCount = activeSubs.filter(s => !s.autoRenew).length;
      if (nonAutoRenewCount > 0) {
        list.push(`⚠️ 有 ${nonAutoRenewCount} 个服务未开启自动续费，请注意倒计时以免中断。`);
      }
      if (stats.upcoming7Days > 0) {
        list.push(`⏰ 未来 7 天内有 ${stats.upcoming7Days} 个订阅即将续期，请确保账户余额充足。`);
      }
      if (activeSubs.length > 8) {
        list.push('🧩 订阅服务数量较多，可尝试通过家庭组或长期包年计划降低单价。');
      }
      if (list.length === 0) {
        list.push('✨ 目前订阅状况良好，暂无优化建议！');
      }
    } else {
      if (stats.monthlyCNY > 500) {
        list.push('💡 Monthly budget exceeds ¥500. Consider auditing low-usage services.');
      }
      const nonAutoRenewCount = activeSubs.filter(s => !s.autoRenew).length;
      if (nonAutoRenewCount > 0) {
        list.push(`⚠️ ${nonAutoRenewCount} active services are set to manual renewal. Watch the ticker.`);
      }
      if (stats.upcoming7Days > 0) {
        list.push(`⏰ ${stats.upcoming7Days} payments due within 7 days. Ensure your balance is sufficient.`);
      }
      if (activeSubs.length > 8) {
        list.push('🧩 Quite a few active subscriptions! Group accounts or annual plans might save costs.');
      }
      if (list.length === 0) {
        list.push('✨ Everything looks clean and healthy! No optimizing tips for now.');
      }
    }
    return list;
  }, [stats, activeSubs, lang]);

  return (
    <div id="stats-overview" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* KPI Cards Grid */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly Cost */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {t.totalMonthlySpent}
              </span>
              <h3 className="text-3xl font-bold font-mono text-slate-800 mt-1">
                ¥{stats.monthlyCNY.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-xs text-slate-500 border-t border-slate-50 pt-3 flex justify-between items-center">
            <span>
              {lang === 'zh' ? '年折算支出' : 'Annual Equiv'}: ¥{stats.yearlyCNY.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US', { maximumFractionDigits: 0 })}
            </span>
            <span className="font-semibold text-indigo-600">
              {t.monthlyAverage} ¥{(stats.monthlyCNY / 30).toFixed(1)}
            </span>
          </div>
        </motion.div>

        {/* Active Subscriptions Count */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {lang === 'zh' ? '订阅状态概要' : 'Subscription Summary'}
              </span>
              <h3 className="text-3xl font-bold text-slate-800 mt-1 font-mono">
                {stats.activeCount} <span className="text-sm font-normal text-slate-400">/ {stats.totalCount}</span>
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CreditCard size={20} />
            </div>
          </div>
          <div className="text-xs text-slate-500 border-t border-slate-50 pt-3 flex justify-between items-center">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {stats.activeCount} {lang === 'zh' ? '个已启用' : 'Active'}
            </span>
            <span>
              {lang === 'zh' ? '已暂停' : 'Paused'}: {stats.totalCount - stats.activeCount}
            </span>
          </div>
        </motion.div>

        {/* Next Renewal */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {lang === 'zh' ? '最近扣款提醒' : 'Next Payment Due'}
              </span>
              {closestRenewal ? (
                <div className="mt-1">
                  <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-2xl">{closestRenewal.sub.emoji}</span>
                    <span className="truncate max-w-[150px] block">{closestRenewal.sub.name}</span>
                  </h4>
                  <p className="text-sm font-mono text-indigo-600 mt-0.5">
                    {formatPrice(closestRenewal.sub.price, closestRenewal.sub.currency)}
                    <span className="text-xs text-slate-400 ml-1">
                      ({closestRenewal.sub.cycle === 'monthly' ? (lang === 'zh' ? '月付' : 'Monthly') : closestRenewal.sub.cycle === 'yearly' ? (lang === 'zh' ? '年付' : 'Yearly') : closestRenewal.sub.cycle === 'weekly' ? (lang === 'zh' ? '周付' : 'Weekly') : (lang === 'zh' ? '自定义' : 'Custom')})
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-400 mt-1">
                  {lang === 'zh' ? '暂无即将扣款的活跃订阅' : 'No upcoming payments'}
                </p>
              )}
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Calendar size={20} />
            </div>
          </div>
          <div className="text-xs text-slate-500 border-t border-slate-50 pt-3">
            {closestRenewal ? (
              <button 
                onClick={() => onSelectSubscription(closestRenewal.sub.id)}
                className="w-full text-left font-semibold text-indigo-600 hover:text-indigo-800 flex justify-between items-center transition-colors cursor-pointer"
              >
                <span>
                  {lang === 'zh' ? '下期续期' : 'Due date'}: {closestRenewal.nextDate.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span className="underline">{lang === 'zh' ? '查看详情' : 'Details'} &rarr;</span>
              </button>
            ) : (
              <span>{lang === 'zh' ? '保持关注续期时间' : 'Keep track of billing cycles'}</span>
            )}
          </div>
        </motion.div>

        {/* Dynamic Alerts / Smart Insights */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {lang === 'zh' ? '智能分析与提醒' : 'Smart Insights'}
              </span>
              <div className="mt-2 space-y-1.5 max-h-24 overflow-y-auto pr-1">
                {insights.map((insight, idx) => (
                  <p key={idx} className="text-xs text-slate-600 leading-relaxed font-medium">
                    {insight}
                  </p>
                ))}
              </div>
            </div>
            <div className="p-3 bg-rose-50 text-rose-500 rounded-xl flex-shrink-0">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="text-xs text-slate-400 border-t border-slate-50 pt-2">
            {lang === 'zh' ? '基于当前汇率及账单周期智能推算' : 'Estimated from live conversion rates'}
          </div>
        </motion.div>
      </div>

      {/* 5 layers Cost Analysis Tabbed Card (Right Card) */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[360px]"
      >
        <div>
          {/* Header & Switcher */}
          <div className="flex flex-col gap-2.5 mb-3.5">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
              <Layers size={13} className="text-indigo-500" /> {t.costBreakdown}
            </span>
            
            {/* Minimalist Switch Tabs */}
            <div className="flex bg-slate-100/80 p-0.5 rounded-xl border border-slate-100/50">
              <button
                onClick={() => setAnalysisTab('cake')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                  analysisTab === 'cake'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                🎂 {t.cakeInsightTitle}
              </button>
              <button
                onClick={() => setAnalysisTab('category')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                  analysisTab === 'category'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                📊 {t.standardCategoryTitle}
              </button>
            </div>
          </div>

          {analysisTab === 'cake' ? (
            /* AI Cake 5-Layers Model */
            <div className="space-y-2">
              {activeSubs.length > 0 ? (
                <div className="space-y-1.5">
                  {cakeLayersData.map((layer) => {
                    const pct = totalCakeSpent > 0 ? (layer.total / totalCakeSpent) * 100 : 0;
                    const layerName = lang === 'zh' ? layer.config.name.split(' ')[1] || layer.config.name : layer.config.nameEn;
                    const layerDesc = lang === 'zh' ? layer.config.desc : layer.config.descEn;
                    return (
                      <div 
                        key={layer.id}
                        className="group relative flex items-center justify-between px-3 py-2 rounded-xl border border-slate-50 hover:border-slate-100 bg-slate-50/20 hover:bg-white transition-all overflow-hidden"
                      >
                        {/* Shaded relative proportion background */}
                        <div 
                          className="absolute left-0 top-0 bottom-0 pointer-events-none transition-all duration-500"
                          style={{ 
                            width: `${pct}%`, 
                            backgroundColor: layer.config.color,
                            opacity: 0.05
                          }}
                        />
                        
                        <div className="flex items-center gap-2 z-10 min-w-0">
                          <span 
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                            style={{ backgroundColor: layer.config.color }}
                            title={layerDesc}
                          >
                            L{layer.id}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-extrabold text-slate-700 truncate block max-w-[130px]">
                                {layerName}
                              </span>
                              {layer.count > 0 && (
                                <span className="text-[9px] text-slate-400 font-bold">
                                  x{layer.count}
                                </span>
                              )}
                            </div>
                            <span className="text-[9px] text-slate-400 block truncate max-w-[150px] font-medium leading-tight">
                              {layer.subs.map(s => `${s.emoji}${s.name}`).join('、') || (lang === 'zh' ? '无活跃服务' : 'No active items')}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right z-10 font-mono flex-shrink-0">
                          <div className="text-[11px] font-extrabold text-slate-800">
                            ¥{layer.total.toFixed(0)}
                          </div>
                          <div className="text-[8px] text-slate-400 font-bold">
                            {pct.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                    <Layers size={18} />
                  </div>
                  <p className="text-xs text-slate-400">{t.noActiveBilling}</p>
                </div>
              )}
            </div>
          ) : (
            /* Traditional Standard Categories Chart */
            <div>
              {categoryData.length > 0 ? (
                <div className="space-y-4">
                  {/* Stacked Percentage Bar */}
                  <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    {categoryData.map((cat, idx) => {
                      const pct = totalBreakdownSpent > 0 ? (cat.total / totalBreakdownSpent) * 100 : 0;
                      return (
                        <div
                          key={idx}
                          style={{
                            width: `${pct}%`,
                            backgroundColor: cat.color,
                          }}
                          className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
                          title={`${cat.name}: ${pct.toFixed(1)}%`}
                        />
                      );
                    })}
                  </div>

                  {/* Categorical details list */}
                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {categoryData.map((cat, idx) => {
                      const pct = totalBreakdownSpent > 0 ? (cat.total / totalBreakdownSpent) * 100 : 0;
                      const catLabel = (t.categories as any)[cat.name] || cat.name;
                      return (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="text-slate-600 font-medium">
                              {catLabel} ({cat.count})
                            </span>
                          </div>
                          <div className="font-mono text-slate-700 flex items-center gap-2">
                            <span>¥{cat.total.toFixed(0)}</span>
                            <span className="text-slate-400 text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full font-sans">
                              {pct.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                    <PieChart size={18} />
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === 'zh' ? '添加订阅后查看支出分类' : 'Add subscriptions to see breakdown'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footnotes */}
        <div className="text-[10px] text-slate-400 mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Info size={10} className="text-indigo-400" />
            <span>{t.geekFootnote}</span>
          </div>
          <span className="font-mono text-[9px] text-slate-300 hidden sm:inline">
            {lang === 'zh' ? '汇率参考: 1 USD ≈ ¥7.25' : 'Rate: 1 USD ≈ ¥7.25'}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
