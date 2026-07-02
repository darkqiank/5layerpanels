/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Subscription, Category, PaymentMethod, CURRENCIES } from '../types';
import { SUBSCRIPTION_PRESETS } from '../presets';
import { Language, LOCALES } from '../locales';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscription: Omit<Subscription, 'id' | 'isActive'> & { id?: string }) => void;
  editingSubscription?: Subscription | null;
  lang: Language;
}

const CATEGORIES: Category[] = [
  'Entertainment',
  'Productivity',
  'Utilities',
  'Health',
  'Cloud',
  'Finance',
  'Other',
];

const PAYMENT_METHODS: PaymentMethod[] = [
  'Alipay',
  'WeChat Pay',
  'Credit Card',
  'Apple Pay',
  'PayPal',
  'Google Pay',
  'Other',
];

const PRESET_COLORS = [
  '#E50914', '#1DB954', '#10A37F', '#FF0000', '#007AFF', 
  '#000000', '#FB7299', '#FF7F00', '#5B4CF5', '#107C10', 
  '#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B', '#64748B'
];

const PRESET_EMOJIS = [
  '🍿', '🎵', '🤖', '📺', '🍎', '☁️', '💻', '🎬', '⚡', '🎧', 
  '📝', '🎨', '🎮', '🖌️', '🕹️', '🖥️', '📚', '🍔', '🛒', '📦', 
  '💬', '💳', '🚲', '🏠', '🔑', '✈️', '🏋️', '🧠', '🩺', '❤️'
];

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingSubscription,
  lang,
}) => {
  const t = LOCALES[lang];
  // Preset Search State
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form Fields State
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [currency, setCurrency] = useState('CNY');
  const [cycle, setCycle] = useState<'weekly' | 'monthly' | 'yearly' | 'custom'>('monthly');
  const [customCycleDays, setCustomCycleDays] = useState<number>(30);
  const [firstBillingDate, setFirstBillingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [category, setCategory] = useState<Category>('Entertainment');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Alipay');
  const [autoRenew, setAutoRenew] = useState(true);
  const [reminderDaysBefore, setReminderDaysBefore] = useState(3);
  const [notes, setNotes] = useState('');
  const [color, setColor] = useState('#64748B');
  const [emoji, setEmoji] = useState('🍿');
  const [error, setError] = useState('');

  // Synchronize when editing
  useEffect(() => {
    if (editingSubscription) {
      setName(editingSubscription.name);
      setPrice(editingSubscription.price);
      setCurrency(editingSubscription.currency);
      setCycle(editingSubscription.cycle);
      setCustomCycleDays(editingSubscription.customCycleDays || 30);
      setFirstBillingDate(editingSubscription.firstBillingDate);
      setCategory(editingSubscription.category);
      setPaymentMethod(editingSubscription.paymentMethod);
      setAutoRenew(editingSubscription.autoRenew);
      setReminderDaysBefore(editingSubscription.reminderDaysBefore);
      setNotes(editingSubscription.notes || '');
      setColor(editingSubscription.color);
      setEmoji(editingSubscription.emoji);
      setError('');
    } else {
      // Clear values for fresh create
      setName('');
      setPrice('');
      setCurrency('CNY');
      setCycle('monthly');
      setCustomCycleDays(30);
      setFirstBillingDate(new Date().toISOString().split('T')[0]);
      setCategory('Entertainment');
      setPaymentMethod('Alipay');
      setAutoRenew(true);
      setReminderDaysBefore(3);
      setNotes('');
      setColor('#3B82F6');
      setEmoji('🍿');
      setError('');
    }
    setSearchQuery('');
  }, [editingSubscription, isOpen]);

  // Filter Presets
  const filteredPresets = useMemo(() => {
    if (!searchQuery.trim()) return SUBSCRIPTION_PRESETS.slice(0, 6);
    return SUBSCRIPTION_PRESETS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Apply Preset template values
  const handleApplyPreset = (preset: typeof SUBSCRIPTION_PRESETS[0]) => {
    setName(preset.name);
    setPrice(preset.defaultPrice);
    setCurrency(preset.currency);
    setCycle(preset.cycle);
    setCategory(preset.category);
    setPaymentMethod(preset.paymentMethod);
    setColor(preset.color);
    setEmoji(preset.emoji);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(lang === 'zh' ? '请输入订阅服务名称' : 'Please enter service name');
      return;
    }
    if (price === '' || isNaN(Number(price)) || Number(price) <= 0) {
      setError(lang === 'zh' ? '请输入有效的费用单价' : 'Please enter a valid price');
      return;
    }
    if (cycle === 'custom' && (!customCycleDays || customCycleDays <= 0)) {
      setError(lang === 'zh' ? '请输入自定义天数' : 'Please enter custom days');
      return;
    }
    if (!firstBillingDate) {
      setError(lang === 'zh' ? '请选择首次账单日期' : 'Please select first billing date');
      return;
    }

    onSave({
      id: editingSubscription?.id,
      name: name.trim(),
      price: Number(price),
      currency,
      cycle,
      customCycleDays: cycle === 'custom' ? Number(customCycleDays) : undefined,
      firstBillingDate,
      category,
      paymentMethod,
      autoRenew,
      reminderDaysBefore,
      notes: notes.trim(),
      color,
      emoji,
    });
    onClose();
  };

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

      {/* Sheet Content Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-xl h-full bg-white shadow-2xl border-l border-slate-100 flex flex-col justify-between overflow-hidden"
      >
        {/* Header bar */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {editingSubscription 
                ? (lang === 'zh' ? '编辑订阅追踪' : 'Edit Subscription') 
                : (lang === 'zh' ? '添加新的订阅' : 'Add New Subscription')}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'zh' ? '填写扣费周期及倒计时提醒配置' : 'Configure billing cycle and countdown details'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/80 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Panel */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {/* Preset Templates Quick Picker */}
          {!editingSubscription && (
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/40">
              <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold text-indigo-700">
                <Sparkles size={14} />
                <span>{lang === 'zh' ? '热门订阅模板快速填充' : 'Quick Fill from Popular Presets'}</span>
              </div>
              
              {/* Preset Search Bar */}
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-2.5 text-indigo-400" />
                <input
                  type="text"
                  placeholder={lang === 'zh' ? '搜索模板 (如: Netflix, iCloud...)' : 'Search templates (e.g. Netflix, iCloud...)'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-lg border border-indigo-100 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                />
              </div>

              {/* Template grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="flex items-center gap-2 p-2 bg-white hover:bg-indigo-50/50 border border-slate-100 hover:border-indigo-200 rounded-lg text-left text-xs font-medium text-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm truncate cursor-pointer"
                  >
                    <span className="text-base">{preset.emoji}</span>
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Core Form Fields */}
          <form id="sub-form" onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-slate-600">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center gap-2 font-medium">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '服务名称 *' : 'Service Name *'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    maxLength={32}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    placeholder={lang === 'zh' ? '输入订阅服务名称, e.g. Spotify' : 'e.g. Spotify'}
                    className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800"
                  />
                  
                  {/* Emoji Visual Display */}
                  <div 
                    style={{ backgroundColor: `${color}15`, borderColor: color }}
                    className="w-11 h-11 border rounded-xl flex items-center justify-center text-xl cursor-default flex-shrink-0 bg-white"
                  >
                    {emoji}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-1.5">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '单期费用 *' : 'Billing Price *'}
                </label>
                <input
                  type="number"
                  required
                  step="any"
                  min="0.01"
                  value={price}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPrice(val === '' ? '' : Number(val));
                    setError('');
                  }}
                  placeholder="e.g. 15.00"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 font-mono"
                />
              </div>

              {/* Currency */}
              <div className="space-y-1.5">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '结算货币' : 'Currency'}
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white"
                >
                  {Object.values(CURRENCIES).map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.name} ({curr.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Cycle */}
              <div className="space-y-1.5">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '扣费周期' : 'Billing Cycle'}
                </label>
                <select
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white"
                >
                  <option value="weekly">{lang === 'zh' ? '每周' : 'Weekly'}</option>
                  <option value="monthly">{lang === 'zh' ? '每月' : 'Monthly'}</option>
                  <option value="yearly">{lang === 'zh' ? '每年' : 'Yearly'}</option>
                  <option value="custom">{lang === 'zh' ? '自定义 (按天数)' : 'Custom (In Days)'}</option>
                </select>
              </div>

              {/* Custom Cycle Days input */}
              {cycle === 'custom' ? (
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-semibold block">
                    {lang === 'zh' ? '循环周期天数 *' : 'Cycle Days *'}
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="1000"
                    value={customCycleDays}
                    onChange={(e) => setCustomCycleDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 font-mono"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-semibold block">
                    {lang === 'zh' ? '支出大类分类' : 'Expense Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {(t.categories as any)[cat] || cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* If cycle custom is enabled, category gets its own column */}
              {cycle === 'custom' && (
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-semibold block">
                    {lang === 'zh' ? '支出大类分类' : 'Expense Category'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {(t.categories as any)[cat] || cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* First billing date */}
              <div className="space-y-1.5">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '首次/历史起算扣费日 *' : 'First Billing Date *'}
                </label>
                <input
                  type="date"
                  required
                  value={firstBillingDate}
                  onChange={(e) => setFirstBillingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 font-mono bg-white"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '支付途径渠道' : 'Payment Method'}
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white"
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Reminder Threshold Days */}
              <div className="space-y-1.5">
                <label className="text-slate-500 font-semibold block">
                  {lang === 'zh' ? '到期提前提醒' : 'Advance Alert'}
                </label>
                <select
                  value={reminderDaysBefore}
                  onChange={(e) => setReminderDaysBefore(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800 bg-white"
                >
                  <option value={0}>{lang === 'zh' ? '不提醒' : 'No reminder'}</option>
                  <option value={1}>{lang === 'zh' ? '提前 1 天' : '1 day before'}</option>
                  <option value={3}>{lang === 'zh' ? '提前 3 天' : '3 days before'}</option>
                  <option value={5}>{lang === 'zh' ? '提前 5 天' : '5 days before'}</option>
                  <option value={7}>{lang === 'zh' ? '提前 7 天' : '7 days before'}</option>
                </select>
              </div>

              {/* Auto renew switch */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2 mt-1">
                <div>
                  <span className="font-bold text-slate-800 block">
                    {lang === 'zh' ? '自动续期' : 'Auto Renew'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {lang === 'zh' ? '关闭后到期自动转为已失效/单次提醒' : 'When off, tracking pauses after the due date'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoRenew(!autoRenew)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    autoRenew ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      autoRenew ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Custom Palette Picker */}
            <div className="space-y-2">
              <label className="text-slate-500 font-semibold block">
                {lang === 'zh' ? '精选卡片主题色' : 'Card Theme Color'}
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => setColor(hex)}
                    style={{ backgroundColor: hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      color === hex 
                        ? 'border-indigo-600 scale-110 shadow-md shadow-indigo-100' 
                        : 'border-white hover:scale-105'
                    }`}
                  />
                ))}
                {/* Custom HEX code input */}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-7 h-7 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0"
                  title={lang === 'zh' ? '自定义取色' : 'Custom hex'}
                />
              </div>
            </div>

            {/* Custom Emoji Picker */}
            <div className="space-y-2">
              <label className="text-slate-500 font-semibold block">
                {lang === 'zh' ? '挑选个性化标志 (Emoji)' : 'Pick Custom Icon (Emoji)'}
              </label>
              <div className="grid grid-cols-10 gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100">
                {PRESET_EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`text-lg p-1.5 rounded-lg transition-all hover:bg-white active:scale-95 flex items-center justify-center cursor-pointer ${
                      emoji === e 
                        ? 'bg-white border border-indigo-200 shadow-sm scale-110' 
                        : 'border border-transparent'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes field */}
            <div className="space-y-1.5">
              <label className="text-slate-500 font-semibold block">
                {lang === 'zh' ? '补充备注信息' : 'Notes & Metadata'}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={lang === 'zh' ? '服务账号、家庭组分摊、绑定的信用卡尾号等...' : 'Account info, family group cost, credit card digits...'}
                rows={2}
                maxLength={100}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800"
              />
            </div>
          </form>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-100 flex gap-3 justify-end bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer font-bold"
          >
            {lang === 'zh' ? '取消' : 'Cancel'}
          </button>
          <button
            type="submit"
            form="sub-form"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-100 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            {lang === 'zh' ? '保存订阅' : 'Save'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
