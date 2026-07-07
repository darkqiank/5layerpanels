/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Download, 
  Upload, 
  RotateCcw, 
  Search, 
  Grid, 
  Calendar, 
  Bell, 
  SlidersHorizontal,
  FolderMinus,
  Sparkles,
  HelpCircle,
  FileCheck,
  ArrowRight,
  Languages,
  LogOut,
  Github
} from 'lucide-react';
import { Subscription, Category, PaymentMethod } from './types';
import { StatsOverview } from './components/StatsOverview';
import { SubscriptionCard } from './components/SubscriptionCard';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CalendarView } from './components/CalendarView';
import { NotificationCenter } from './components/NotificationCenter';
import { getNextBillingDate } from './utils';
import { LandingPage } from './components/LandingPage';
import { CookieConsent } from './components/CookieConsent';
import { LegalPage, LegalPageKind } from './components/LegalPage';
import { Language, LOCALES } from './locales';
import { FiveLayersLogo } from './components/FiveLayersLogo';

const SUPPORT_EMAIL = 'support@5layers.ai';

const getLegalPageKind = (): LegalPageKind | null => {
  const normalizedPath = window.location.pathname.replace(/\/$/, '');
  if (normalizedPath === '/privacy-policy' || normalizedPath === '/privacy-policy/index.html') {
    return 'privacy';
  }
  if (normalizedPath === '/terms-of-service' || normalizedPath === '/terms-of-service/index.html') {
    return 'terms';
  }
  return null;
};

// Programmatically generate initial dates relative to July 1, 2026 for demonstration
const SAMPLE_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sample-netflix',
    name: 'Netflix Premium',
    price: 15.49,
    currency: 'USD',
    cycle: 'monthly',
    firstBillingDate: '2026-06-04', // Next: 2026-07-04 (in 3 days)
    category: 'Entertainment',
    paymentMethod: 'Credit Card',
    autoRenew: true,
    reminderDaysBefore: 3,
    color: '#E50914',
    emoji: '🍿',
    notes: '与室友4人拼车，分摊每月 ¥28',
    isActive: true,
  },
  {
    id: 'sample-spotify',
    name: 'Spotify Premium',
    price: 11.99,
    currency: 'USD',
    cycle: 'monthly',
    firstBillingDate: '2026-06-13', // Next: 2026-07-13 (in 12 days)
    category: 'Entertainment',
    paymentMethod: 'PayPal',
    autoRenew: true,
    reminderDaysBefore: 3,
    color: '#1DB954',
    emoji: '🎵',
    notes: '家庭组成员续费',
    isActive: true,
  },
  {
    id: 'sample-chatgpt',
    name: 'ChatGPT Plus',
    price: 20.00,
    currency: 'USD',
    cycle: 'monthly',
    firstBillingDate: '2026-06-02', // Next: 2026-07-02 (Tomorrow!)
    category: 'Productivity',
    paymentMethod: 'Credit Card',
    autoRenew: true,
    reminderDaysBefore: 1,
    color: '#10A37F',
    emoji: '🤖',
    notes: '生产力核心工具',
    isActive: true,
  },
  {
    id: 'sample-icloud',
    name: 'iCloud+ 2TB',
    price: 68.00,
    currency: 'CNY',
    cycle: 'monthly',
    firstBillingDate: '2026-06-01', // Next: 2026-07-01 (Today!)
    category: 'Cloud',
    paymentMethod: 'Apple Pay',
    autoRenew: true,
    reminderDaysBefore: 1,
    color: '#007AFF',
    emoji: '☁️',
    notes: '多台 Apple 设备数据备份',
    isActive: true,
  },
  {
    id: 'sample-bilibili',
    name: 'Bilibili 大会员',
    price: 25.00,
    currency: 'CNY',
    cycle: 'monthly',
    firstBillingDate: '2026-06-21', // Next: 2026-07-21 (in 20 days)
    category: 'Entertainment',
    paymentMethod: 'WeChat Pay',
    autoRenew: true,
    reminderDaysBefore: 5,
    color: '#FB7299',
    emoji: '⚡',
    notes: '番剧及高码率画质',
    isActive: true,
  },
  {
    id: 'sample-copilot',
    name: 'GitHub Copilot',
    price: 100.00,
    currency: 'USD',
    cycle: 'yearly',
    firstBillingDate: '2025-07-25', // Next: 2026-07-25 (in 24 days)
    category: 'Productivity',
    paymentMethod: 'Credit Card',
    autoRenew: true,
    reminderDaysBefore: 7,
    color: '#24292F',
    emoji: '💻',
    notes: '年付优惠计划',
    isActive: true,
  }
];

export default function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const local = localStorage.getItem('sub_countdown_data');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error('Error loading subscriptions', e);
      }
    }
    return SAMPLE_SUBSCRIPTIONS;
  });

  // Modals & Panels UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Filters and Control States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [sortBy, setSortBy] = useState<'countdown' | 'priceAsc' | 'priceDesc' | 'name'>('countdown');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [activeTab, setActiveTab] = useState<'landing' | 'app'>('landing');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('sub_countdown_lang');
    return (saved === 'en' || saved === 'zh') ? saved : 'zh';
  });

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('sub_countdown_lang', next);
      return next;
    });
  };

  const t = LOCALES[lang];
  const legalPageKind = getLegalPageKind();

  useEffect(() => {
    if (!legalPageKind) {
      document.title = '5 Layers Panel — 5层 AI 蛋糕理论订阅追踪控制台';
      return;
    }
    document.title = legalPageKind === 'privacy'
      ? (lang === 'zh' ? '隐私政策 | 5 Layers Panel' : 'Privacy Policy | 5 Layers Panel')
      : (lang === 'zh' ? '服务条款 | 5 Layers Panel' : 'Terms of Service | 5 Layers Panel');
  }, [legalPageKind, lang]);

  // Backup and Upload refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem('sub_countdown_data', JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Handle Add / Edit saves
  const handleSaveSubscription = (data: Omit<Subscription, 'id' | 'isActive'> & { id?: string }) => {
    if (data.id) {
      // Edit mode
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === data.id 
            ? { ...sub, ...data } as Subscription 
            : sub
        )
      );
    } else {
      // Add mode
      const newSub: Subscription = {
        ...data,
        id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        isActive: true,
      };
      setSubscriptions(prev => [newSub, ...prev]);
    }
    setEditingSubscription(null);
  };

  // Toggle Tracking Active/Paused state
  const handleToggleActive = (id: string) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id 
          ? { ...sub, isActive: !sub.isActive } 
          : sub
      )
    );
  };

  // Quick edit trigger
  const handleEditTrigger = (sub: Subscription) => {
    setEditingSubscription(sub);
    setIsModalOpen(true);
  };

  // Delete subscription
  const handleDeleteSubscription = (id: string) => {
    const confirmMsg = lang === 'zh' 
      ? '确认删除该订阅服务追踪吗？删除后数据不可恢复。' 
      : 'Are you sure you want to delete this subscription tracking? The data cannot be recovered after deletion.';
    if (confirm(confirmMsg)) {
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    }
  };

  // Reset to sample data
  const handleResetData = () => {
    const confirmMsg = lang === 'zh'
      ? '确认要重置所有订阅数据，并加载默认演示包吗？现有的自定义数据将被覆盖。'
      : 'Are you sure you want to reset all subscription data and load the default demonstration pack? Existing custom data will be overwritten.';
    if (confirm(confirmMsg)) {
      setSubscriptions(SAMPLE_SUBSCRIPTIONS);
    }
  };

  // Export DB as JSON file
  const handleExportData = () => {
    const dataStr = JSON.stringify(subscriptions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscriptions_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import DB from JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          // Rudimentary validation
          const isValid = parsed.every(item => item.name && item.price && item.firstBillingDate);
          if (isValid) {
            setSubscriptions(parsed);
            setImportStatus('success');
            setTimeout(() => setImportStatus('idle'), 3000);
          } else {
            throw new Error('JSON format is invalid');
          }
        } else {
          throw new Error('Not an array');
        }
      } catch (err) {
        setImportStatus('error');
        const alertMsg = lang === 'zh'
          ? '导入失败！请确认上传的是正确的订阅备份 JSON 文件。'
          : 'Import failed! Please make sure you uploaded the correct subscription backup JSON file.';
        alert(alertMsg);
        setTimeout(() => setImportStatus('idle'), 4000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Focus trigger on selecting specific sub (scrolls to it & highlights if needed)
  const handleFocusSubscription = (id: string) => {
    setViewMode('grid');
    setStatusFilter('all');
    setCategoryFilter('All');
    setPaymentFilter('All');
    setSearchQuery('');
    
    // Delayed scroll to allow rendering to complete
    setTimeout(() => {
      const el = document.getElementById(`sub-card-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-indigo-500/30');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-indigo-500/30');
        }, 2000);
      }
    }, 150);
  };

  // Count near alerts for top-right bell dot
  const alertCount = useMemo(() => {
    const now = new Date();
    return subscriptions.filter(sub => {
      if (!sub.isActive) return false;
      const nextBill = getNextBillingDate(sub.firstBillingDate, sub.cycle, sub.customCycleDays);
      const diffMs = nextBill.getTime() - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return diffMs <= 0 || diffDays === 0 || (diffDays <= sub.reminderDaysBefore && sub.reminderDaysBefore > 0);
    }).length;
  }, [subscriptions]);

  // Filter and sort computation
  const processedSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(sub => 
        sub.name.toLowerCase().includes(query) || 
        (sub.notes && sub.notes.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter(sub => sub.category === categoryFilter);
    }

    // Payment Filter
    if (paymentFilter !== 'All') {
      result = result.filter(sub => sub.paymentMethod === paymentFilter);
    }

    // Status Filter
    if (statusFilter === 'active') {
      result = result.filter(sub => sub.isActive);
    } else if (statusFilter === 'paused') {
      result = result.filter(sub => !sub.isActive);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'zh-CN');
      }

      if (sortBy === 'priceAsc' || sortBy === 'priceDesc') {
        // We compare standard monthly equivalence in CNY for fair sorting across currencies
        const rateA = a.currency === 'USD' ? 7.25 : a.currency === 'EUR' ? 7.8 : 1;
        const rateB = b.currency === 'USD' ? 7.25 : b.currency === 'EUR' ? 7.8 : 1;
        const valA = a.price * rateA;
        const valB = b.price * rateB;
        return sortBy === 'priceAsc' ? valA - valB : valB - valA;
      }

      if (sortBy === 'countdown') {
        // Paused items always go to the end
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        if (!a.isActive && !b.isActive) return 0;

        const nextA = getNextBillingDate(a.firstBillingDate, a.cycle, a.customCycleDays).getTime();
        const nextB = getNextBillingDate(b.firstBillingDate, b.cycle, b.customCycleDays).getTime();
        return nextA - nextB;
      }

      return 0;
    });

    return result;
  }, [subscriptions, searchQuery, categoryFilter, paymentFilter, statusFilter, sortBy]);

  const renderFooter = () => (
    <footer className="bg-slate-50/40 border-t border-slate-100/60 mt-16 py-6 px-6 rounded-t-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-medium gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span>{t.sandboxActive}</span>
        </div>
        <nav className="text-slate-400/80 flex items-center gap-2 flex-wrap justify-center" aria-label={lang === 'zh' ? '页脚导航' : 'Footer navigation'}>
          <span>{t.versionInfo}</span>
          <span>•</span>
          <a
            href="/privacy-policy/index.html"
            className="hover:text-indigo-500 text-slate-500 font-semibold transition-colors"
          >
            {lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
          </a>
          <span>•</span>
          <a
            href="/terms-of-service/index.html"
            className="hover:text-indigo-500 text-slate-500 font-semibold transition-colors"
          >
            {lang === 'zh' ? '服务条款' : 'Terms of Service'}
          </a>
          <span>•</span>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="hover:text-indigo-500 text-slate-500 font-semibold transition-colors"
          >
            {SUPPORT_EMAIL}
          </a>
          <span>•</span>
          <a
            href="https://github.com/darkqiank/5layerpanels"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 text-slate-500 font-semibold inline-flex items-center gap-1 transition-colors"
          >
            <Github size={11} />
            <span>darkqiank/5layerpanels</span>
          </a>
          <span>•</span>
          <span className="font-semibold text-slate-500">@5layers.ai</span>
        </nav>
      </div>
    </footer>
  );

  if (legalPageKind) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] text-slate-700 antialiased font-sans flex flex-col justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        <LegalPage
          kind={legalPageKind}
          lang={lang}
          onToggleLanguage={toggleLanguage}
          supportEmail={SUPPORT_EMAIL}
        />
        {renderFooter()}
        <CookieConsent lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-700 antialiased font-sans flex flex-col justify-between">
      {/* Dynamic Grid Background Decorative Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Primary Top Bar */}
      {activeTab === 'app' && (
        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100/80 px-4 py-3 md:px-8 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo Branding */}
            <div 
              className="flex items-center gap-3 select-none group cursor-pointer" 
              title={t.appName}
              onClick={() => setActiveTab('landing')}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-indigo-100/80 transition-all">
                <FiveLayersLogo size={32} />
              </div>
              <div>
                <h1 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                  {t.appName}
                  <span className="text-[10px] bg-indigo-50 text-indigo-600 font-extrabold px-2 py-0.5 rounded-full border border-indigo-100/60">
                    {t.badge}
                  </span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium">
                  {t.desc}
                </p>
              </div>
            </div>

            {/* Adaptive Actions Area */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Language Selector */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 mr-1"
                title={lang === 'zh' ? 'Switch to English' : '切换为中文'}
              >
                <Languages size={14} className="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                <span>{lang === 'zh' ? 'EN' : '中'}</span>
              </button>

              {/* GitHub Link */}
              <a
                href="https://github.com/darkqiank/5layerpanels"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-500 shadow-sm transition-all flex items-center mr-1"
                title={lang === 'zh' ? '访问 GitHub 仓库' : 'Visit GitHub Repository'}
              >
                <Github size={14} />
              </a>

              {/* Export */}
              <button
                onClick={handleExportData}
                className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 flex items-center gap-1.5 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                title={lang === 'zh' ? '导出备份 JSON' : 'Export JSON Backup'}
              >
                <Download size={14} />
                <span className="hidden md:inline">{t.exportBackup}</span>
              </button>

              {/* Import Hidden Trigger */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportFile}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-700 flex items-center gap-1.5 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                title={lang === 'zh' ? '导入备份 JSON' : 'Import JSON Backup'}
              >
                {importStatus === 'success' ? (
                  <FileCheck size={14} className="text-emerald-500" />
                ) : (
                  <Upload size={14} />
                )}
                <span className="hidden md:inline">
                  {importStatus === 'success' ? t.importSuccess : t.importBackup}
                </span>
              </button>

              {/* Reset */}
              <button
                onClick={handleResetData}
                className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 shadow-sm transition-all cursor-pointer"
                title={lang === 'zh' ? '重置到默认演示数据' : 'Reset to Defaults'}
              >
                <RotateCcw size={14} />
              </button>

              <div className="w-[1px] h-6 bg-slate-200 mx-1" />

              <a
                href="/privacy-policy/index.html"
                className="hidden lg:inline-flex px-3 py-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 text-xs font-semibold shadow-sm transition-all"
              >
                {lang === 'zh' ? '隐私政策' : 'Privacy'}
              </a>

              <a
                href="/terms-of-service/index.html"
                className="hidden lg:inline-flex px-3 py-2 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 text-xs font-semibold shadow-sm transition-all"
              >
                {lang === 'zh' ? '服务条款' : 'Terms'}
              </a>

              {/* Alert bell icon with counter badge */}
              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 relative shadow-sm transition-all cursor-pointer"
                title={lang === 'zh' ? '查看临近到期提醒' : 'View Expiry Alerts'}
              >
                <Bell size={15} />
                {alertCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                    {alertCount}
                  </span>
                )}
              </button>

              {/* Add New Button */}
              <button
                onClick={() => {
                  setEditingSubscription(null);
                  setIsModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-100 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <Plus size={15} />
                <span>{t.addNewSub}</span>
              </button>

              {/* Exit Button - Minimalist, Icon only, extreme right */}
              <button
                onClick={() => setActiveTab('landing')}
                className="p-2.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:text-rose-600 hover:border-rose-200 text-slate-500 shadow-sm transition-all cursor-pointer"
                title={t.exitConsole}
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Container Stage */}
      <AnimatePresence mode="wait">
        {activeTab === 'landing' ? (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-grow"
          >
            <LandingPage 
              onEnterApp={() => setActiveTab('app')} 
              lang={lang} 
              onToggleLanguage={toggleLanguage} 
            />
          </motion.div>
        ) : (
          <motion.main
            key="dashboard-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-grow px-4 py-6 md:px-8 max-w-7xl w-full mx-auto space-y-6"
          >
            {/* Statistics Widgets */}
            <StatsOverview 
              subscriptions={subscriptions} 
              onSelectSubscription={handleFocusSubscription} 
              lang={lang}
            />

            {/* View mode toggle & Filter bar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-4">
              {/* Header Row: Search + View Toggles */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Left: Interactive search bar */}
                <div className="relative w-full md:w-80">
                  <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                    >
                      {t.clearBtn}
                    </button>
                  )}
                </div>

                {/* Right: sorting dropdown and grid/calendar toggle */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  {/* Sorting option select */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-semibold whitespace-nowrap">{t.sortBy}</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-slate-600 text-xs cursor-pointer"
                    >
                      <option value="countdown">{t.sortCountdown}</option>
                      <option value="priceDesc">{t.sortPriceDesc}</option>
                      <option value="priceAsc">{t.sortPriceAsc}</option>
                      <option value="name">{t.sortName}</option>
                    </select>
                  </div>

                  {/* View Mode Split Toggle */}
                  <div className="flex items-center border border-slate-100 bg-slate-50/50 rounded-xl p-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={t.gridMode}
                    >
                      <Grid size={14} />
                      <span>{t.gridMode}</span>
                    </button>
                    <button
                      onClick={() => setViewMode('calendar')}
                      className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                        viewMode === 'calendar'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={t.calendarMode}
                    >
                      <Calendar size={14} />
                      <span>{t.calendarMode}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible filters row */}
              <div className="border-t border-slate-50 pt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1 text-slate-400">
                  <SlidersHorizontal size={13} /> {t.quickFilters}
                </span>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <button
                    onClick={() => setCategoryFilter('All')}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                      categoryFilter === 'All'
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-extrabold'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    {t.allCategories}
                  </button>
                  {(['Entertainment', 'Productivity', 'Utilities', 'Cloud', 'Finance'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${
                        categoryFilter === cat
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-extrabold'
                          : 'bg-white border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      {t.categories[cat] || cat}
                    </button>
                  ))}
                </div>

                {/* Status Filter Toggle */}
                <div className="flex items-center gap-1.5 border-l border-slate-100 pl-4">
                  <span className="text-slate-400 text-[11px]">{t.trackingStatus}</span>
                  <div className="flex bg-slate-100 p-0.5 rounded-lg">
                    {(['all', 'active', 'paused'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-2.5 py-1 rounded text-[10px] transition-all cursor-pointer ${
                          statusFilter === status
                            ? 'bg-white text-slate-700 shadow-sm font-extrabold'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {status === 'all' ? t.allStatus : status === 'active' ? t.activeStatus : t.pausedStatus}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Display Area */}
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {processedSubscriptions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {processedSubscriptions.map((sub) => (
                        <div key={sub.id} id={`sub-card-${sub.id}`}>
                          <SubscriptionCard
                            subscription={sub}
                            onEdit={handleEditTrigger}
                            onDelete={handleDeleteSubscription}
                            onToggleActive={handleToggleActive}
                            lang={lang}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Empty placeholder state */
                    <div className="bg-white border border-slate-100 rounded-3xl py-20 px-6 text-center max-w-lg mx-auto shadow-sm">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                        <FolderMinus size={30} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">{t.noMatchingSubs}</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                        {t.emptyHint}
                      </p>
                      <div className="mt-6 flex justify-center gap-3">
                        {searchQuery || categoryFilter !== 'All' || paymentFilter !== 'All' || statusFilter !== 'all' ? (
                          <button
                            onClick={() => {
                              setSearchQuery('');
                              setCategoryFilter('All');
                              setPaymentFilter('All');
                              setStatusFilter('all');
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600 rounded-xl transition-all cursor-pointer"
                          >
                            {t.resetFilters}
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer"
                          >
                            {t.createFirstSub}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="calendar-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CalendarView 
                    subscriptions={subscriptions} 
                    onSelectSubscription={handleFocusSubscription} 
                    lang={lang}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Slide-over Drawers & Dialog Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <SubscriptionModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingSubscription(null);
            }}
            onSave={handleSaveSubscription}
            editingSubscription={editingSubscription}
            lang={lang}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationCenter
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            subscriptions={subscriptions}
            onSelectSubscription={handleFocusSubscription}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* Global Bottom Credit / Local Time / Integrity Status */}
      {renderFooter()}

      <CookieConsent lang={lang} />
    </div>
  );
}
