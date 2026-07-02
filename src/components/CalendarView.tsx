/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Info, Clock } from 'lucide-react';
import { Subscription } from '../types';
import { formatPrice } from '../utils';
import { Language } from '../locales';

interface CalendarViewProps {
  subscriptions: Subscription[];
  onSelectSubscription: (id: string) => void;
  lang: Language;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ subscriptions, onSelectSubscription, lang }) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Months labels
  const monthNames = lang === 'zh' 
    ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const weekDays = lang === 'zh' 
    ? ['日', '一', '二', '三', '四', '五', '六']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate billings in current month for all active subscriptions
  const monthlyBillingsMap = useMemo(() => {
    const map: Record<string, Array<{ sub: Subscription; date: Date }>> = {};
    const activeSubs = subscriptions.filter(s => s.isActive);

    activeSubs.forEach(sub => {
      const start = new Date(sub.firstBillingDate + 'T00:00:00');
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);
      
      if (start > monthEnd) return;

      let current = new Date(start);
      let iterations = 0;

      while (current <= monthEnd && iterations < 500) {
        iterations++;
        if (current >= monthStart) {
          const dateKey = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
          if (!map[dateKey]) {
            map[dateKey] = [];
          }
          map[dateKey].push({ sub, date: new Date(current) });
        }

        // Advance cycle
        if (sub.cycle === 'weekly') {
          current.setDate(current.getDate() + 7);
        } else if (sub.cycle === 'monthly') {
          current.setMonth(current.getMonth() + 1);
        } else if (sub.cycle === 'yearly') {
          current.setFullYear(current.getFullYear() + 1);
        } else if (sub.cycle === 'custom' && sub.customCycleDays) {
          current.setDate(current.getDate() + sub.customCycleDays);
        } else {
          break;
        }
      }
    });

    return map;
  }, [subscriptions, year, month]);

  // Calendar cells generation
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const cells: Array<{
      date: Date;
      isCurrentMonth: boolean;
      dayNum: number;
      dateKey: string;
    }> = [];

    // Prepend previous month's trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthTotalDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const date = new Date(prevYear, prevMonth, d);
      const dateKey = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ date, isCurrentMonth: false, dayNum: d, dateKey });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ date, isCurrentMonth: true, dayNum: d, dateKey });
    }

    // Append next month's leading days to make a complete 42-day grid (6 weeks)
    const remainingCells = 42 - cells.length;
    for (let d = 1; d <= remainingCells; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const date = new Date(nextYear, nextMonth, d);
      const dateKey = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ date, isCurrentMonth: false, dayNum: d, dateKey });
    }

    return cells;
  }, [year, month]);

  // Selected Day Details Modal/Popup
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  const selectedDayBillings = useMemo(() => {
    if (!selectedDayKey) return [];
    return monthlyBillingsMap[selectedDayKey] || [];
  }, [selectedDayKey, monthlyBillingsMap]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayKey(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayKey(null);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDayKey(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  };

  const totalMonthBudget = useMemo(() => {
    let total = 0;
    (Object.values(monthlyBillingsMap) as Array<Array<{ sub: Subscription; date: Date }>>).forEach(billings => {
      billings.forEach(b => {
        const config = b.sub.price;
        if (b.sub.currency === 'CNY') {
          total += config;
        } else {
          // Convert using rates
          const rate = b.sub.currency === 'USD' ? 7.25 : b.sub.currency === 'EUR' ? 7.8 : 1;
          total += config * rate;
        }
      });
    });
    return total;
  }, [monthlyBillingsMap]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
      {/* Calendar Header Control */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-slate-50 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Calendar size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {lang === 'zh' ? `${year}年 ${monthNames[month]}` : `${monthNames[month]} ${year}`}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-semibold">
              {lang === 'zh' 
                ? `本月预计将进行 ${Object.values(monthlyBillingsMap).flat().length} 次续费划款`
                : `Estimated ${Object.values(monthlyBillingsMap).flat().length} renewals this month`}
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="px-3.5 py-1.5 border border-slate-100 hover:border-slate-200 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {lang === 'zh' ? '今天' : 'Today'}
          </button>
          <div className="flex items-center border border-slate-100 rounded-lg bg-slate-50/50">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-l-lg transition-colors cursor-pointer"
              title={lang === 'zh' ? '上个月' : 'Previous Month'}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="w-[1px] h-4 bg-slate-200" />
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-r-lg transition-colors cursor-pointer"
              title={lang === 'zh' ? '下个月' : 'Next Month'}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Calendar Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* The 7x6 Calendar Grid */}
        <div className="md:col-span-2">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center">
            {weekDays.map((day, idx) => (
              <span 
                key={idx} 
                className={`text-[11px] font-bold py-1 ${
                  idx === 0 || idx === 6 ? 'text-indigo-400' : 'text-slate-400'
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Month cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarCells.map((cell, idx) => {
              const dayBillings = monthlyBillingsMap[cell.dateKey] || [];
              const isToday = (() => {
                const today = new Date();
                return (
                  today.getDate() === cell.date.getDate() &&
                  today.getMonth() === cell.date.getMonth() &&
                  today.getFullYear() === cell.date.getFullYear()
                );
              })();

              const isSelected = selectedDayKey === cell.dateKey;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDayKey(cell.dateKey)}
                  className={`min-h-[56px] p-1.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer relative ${
                    cell.isCurrentMonth
                      ? 'bg-white border-slate-100 hover:border-slate-300'
                      : 'bg-slate-50/40 border-slate-50/20 text-slate-300 hover:bg-slate-50/80'
                  } ${
                    isToday ? 'ring-2 ring-indigo-500/20 border-indigo-400' : ''
                  } ${
                    isSelected ? 'bg-indigo-50/30 border-indigo-200' : ''
                  }`}
                >
                  {/* Day Number and Indicators */}
                  <div className="flex justify-between items-center">
                    <span 
                      className={`text-xs font-mono font-bold ${
                        isToday 
                          ? 'bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center scale-95' 
                          : cell.isCurrentMonth 
                          ? 'text-slate-700' 
                          : 'text-slate-400'
                      }`}
                    >
                      {cell.dayNum}
                    </span>

                    {/* Cost aggregate count badge */}
                    {dayBillings.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    )}
                  </div>

                  {/* Billing event emojis in cell */}
                  <div className="flex flex-wrap gap-0.5 max-h-6 overflow-hidden mt-1">
                    {dayBillings.slice(0, 3).map((b, bIdx) => (
                      <span
                        key={bIdx}
                        style={{ backgroundColor: `${b.sub.color}15` }}
                        className="text-[10px] w-4.5 h-4.5 rounded-md border border-slate-50 flex items-center justify-center flex-shrink-0"
                        title={b.sub.name}
                      >
                        {b.sub.emoji}
                      </span>
                    ))}
                    {dayBillings.length > 3 && (
                      <span className="text-[8px] text-slate-400 font-bold bg-slate-100 px-1 rounded flex items-center">
                        +{dayBillings.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Panel */}
        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Clock size={15} className="text-indigo-500" />
                <span>{lang === 'zh' ? '续期清单明细' : 'Renewal details'}</span>
              </h4>
              {selectedDayKey ? (
                <p className="text-[11px] font-mono font-bold text-slate-400 mt-1">
                  {lang === 'zh' ? `${selectedDayKey} 续期事件` : `Events on ${selectedDayKey}`}
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 mt-1 font-semibold">
                  {lang === 'zh' ? '点击左侧日历格子查看详情' : 'Click calendar date to view details'}
                </p>
              )}
            </div>

            {selectedDayBillings.length > 0 ? (
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {selectedDayBillings.map(({ sub }, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectSubscription(sub.id)}
                    className="p-3 bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl flex items-center justify-between cursor-pointer transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl">{sub.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-700 truncate">{sub.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          {sub.paymentMethod} • {sub.autoRenew ? (lang === 'zh' ? '自动续费' : 'Auto') : (lang === 'zh' ? '手动' : 'Manual')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-bold font-mono text-slate-800">
                        {formatPrice(sub.price, sub.currency)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <span className="text-2xl mb-1.5">🍃</span>
                <p className="text-xs text-slate-400 font-medium">
                  {lang === 'zh' ? '当天没有计划中的扣费日程' : 'No scheduled renewals on this day'}
                </p>
              </div>
            )}
          </div>

          {/* Month summary info */}
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between items-center text-slate-500 mb-2 font-medium">
              <span>{lang === 'zh' ? '本月实际支出预估' : 'Est. spend this month'}</span>
              <span className="font-mono text-slate-800 font-bold">
                ¥{totalMonthBudget.toFixed(2)}
              </span>
            </div>
            <div className="p-2 bg-indigo-50/50 rounded-lg text-[10px] text-indigo-700 leading-relaxed font-semibold flex items-start gap-1.5">
              <Info size={12} className="mt-0.5 flex-shrink-0" />
              <span>
                {lang === 'zh' 
                  ? '本月支出预估包含本自然月内落入的所有实际划款日程（含周付/自定义周期的多次扣款）。'
                  : 'Includes all active subscription billing events landing within this calendar month.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
