/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  X, 
  Clock, 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Coins, 
  ArrowRight,
  Zap,
  Users,
  Layers,
  Cpu,
  BrainCircuit,
  Terminal,
  Layers3,
  Tv,
  Languages,
  Github
} from 'lucide-react';
import { LOCALES, Language } from '../locales';
import { FiveLayersLogo } from './FiveLayersLogo';

interface LandingPageProps {
  onEnterApp: () => void;
  lang: Language;
  onToggleLanguage: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, lang, onToggleLanguage }) => {
  const t = LOCALES[lang];

  // 5 Layers Concept Showcase
  const cakeLayers = [
    {
      level: 'L5',
      name: t.layer5Title,
      icon: <Tv className="text-rose-500" size={20} />,
      badge: lang === 'zh' ? '终端娱乐与数字生活' : 'Consumer & Life',
      desc: t.layer5Desc,
      color: 'bg-rose-50 border-rose-100 text-rose-700'
    },
    {
      level: 'L4',
      name: t.layer4Title,
      icon: <Layers className="text-amber-500" size={20} />,
      badge: lang === 'zh' ? '垂直 SaaS' : 'Vertical SaaS',
      desc: t.layer4Desc,
      color: 'bg-amber-50 border-amber-100 text-amber-700'
    },
    {
      level: 'L3',
      name: t.layer3Title,
      icon: <Terminal className="text-emerald-500" size={20} />,
      badge: lang === 'zh' ? '开发效率工具' : 'Developer Tools',
      desc: t.layer3Desc,
      color: 'bg-emerald-50 border-emerald-100 text-emerald-700'
    },
    {
      level: 'L2',
      name: t.layer2Title,
      icon: <BrainCircuit className="text-blue-500" size={20} />,
      badge: lang === 'zh' ? '底座大模型' : 'Foundation Models',
      desc: t.layer2Desc,
      color: 'bg-blue-50 border-blue-100 text-blue-700'
    },
    {
      level: 'L1',
      name: t.layer1Title,
      icon: <Cpu className="text-indigo-500" size={20} />,
      badge: lang === 'zh' ? '物理基建' : 'Infra & GPU Chips',
      desc: t.layer1Desc,
      color: 'bg-indigo-50 border-indigo-100 text-indigo-700'
    }
  ];

  // Key Features Showcase
  const features = [
    {
      icon: <Layers3 size={20} className="text-indigo-600" />,
      title: lang === 'zh' ? '「五层 AI 蛋糕」账单折算' : '"5 Layers AI Cake" Billing',
      description: lang === 'zh' ? '独创性将您的网络支出解构为从 L1 芯片物理基建至 L5 终端消费的五维架构，层层拆解数字成本。' : 'Innovatively deconstructs your digital spend into a 5-layer tech stack, from L1 hardware infrastructure to L5 consumer lifestyles.',
    },
    {
      icon: <Clock size={20} className="text-indigo-600" />,
      title: lang === 'zh' ? '高精度秒级倒计时' : 'High-Precision Countdown',
      description: lang === 'zh' ? '动态计算距离下个账单日的剩余天、时、分、秒，卡片与图表每秒同步刷新。' : 'Dynamically computes days, hours, minutes, and seconds remaining until the next billing date.',
    },
    {
      icon: <Bell size={20} className="text-emerald-600" />,
      title: lang === 'zh' ? '多通道智能到期预警' : 'Intelligent Expiry Alerts',
      description: lang === 'zh' ? '自定义提前 1/3/5/7 天提醒，结合高亮视觉警报防止任何不经意的自动续费扣款。' : 'Set custom reminders 1, 3, 5, or 7 days in advance. High-contrast alerts prevent accidental auto-renewals.',
    },
    {
      icon: <Calendar size={20} className="text-amber-600" />,
      title: lang === 'zh' ? '未来扣款日历看板' : 'Billing Forecast Calendar',
      description: lang === 'zh' ? '独创自动循环日程，在月度日历中精准映射未来数月的扣费流向，告别糊涂账。' : 'An elegant cyclic scheduling calendar that projects your future billings in a beautiful interactive layout.',
    },
    {
      icon: <Coins size={20} className="text-cyan-600" />,
      title: lang === 'zh' ? '跨币种离线实时转换' : 'Cross-Currency Converter',
      description: lang === 'zh' ? '支持人民币、美元、欧元、港币、日元、英镑等多币种，内置静态汇率平滑换算。' : 'Supports USD, CNY, EUR, HKD, JPY, GBP, and others. Uses precise embedded offline exchange rates.',
    },
    {
      icon: <ShieldCheck size={20} className="text-violet-600" />,
      title: lang === 'zh' ? '完全离线本地隐私保护' : '100% Offline Local Security',
      description: lang === 'zh' ? '数据完全保留在浏览器 localStorage 隐私沙箱内，不经过服务器，捍卫账户资产隐私。' : 'All your data stays safe in your local browser sandbox (localStorage) and never touches a server.',
    },
  ];

  // Pricing Plan Tiers Compare
  const tiers = [
    {
      name: t.standardName,
      price: '$0',
      period: lang === 'zh' ? '永久免费' : 'Lifetime Free',
      description: lang === 'zh' ? '适合个人订阅服务的管理与周期提醒' : 'Perfect for keeping track of your everyday subscription cycles.',
      features: [
        { text: lang === 'zh' ? '无限量订阅服务追踪' : 'Unlimited Subscription Tracking', included: true },
        { text: lang === 'zh' ? '离线秒级周期倒计时' : 'Offline Real-time Countdown', included: true },
        { text: lang === 'zh' ? '5 层 AI 蛋糕成本分类分析' : '5-layer AI Cake Cost Breakdown', included: true },
        { text: lang === 'zh' ? 'CNY/USD 双币核算' : 'CNY/USD Dual Currency Auditing', included: true },
        { text: lang === 'zh' ? '本地浏览器沙箱存储' : 'Secure Browser Local Storage', included: true },
        { text: lang === 'zh' ? '多币种实时汇率换算' : 'Multi-currency Exchange Rate Conversion', included: false },
        { text: lang === 'zh' ? '未来周期账单日历看板' : 'Upcoming Billing Calendar Timeline', included: false },
        { text: lang === 'zh' ? '微信/邮件/短信多通道提醒通知' : 'Multi-channel Push Alerts (WeChat/Email/SMS)', included: false },
        { text: lang === 'zh' ? 'API/网关自动入账与对账' : 'API Gateway Automated Reconciliation', included: false },
      ],
      cta: t.standardCta,
      action: onEnterApp,
      isPopular: false,
    },
    {
      name: t.premiumName,
      price: '$10',
      period: lang === 'zh' ? '月' : 'Mo',
      description: lang === 'zh' ? '专为数字游民、极客、家庭组及初创企业打造的终极管理面板' : 'The ultimate panel for digital nomads, tech geeks, power users, and family groups.',
      features: [
        { text: lang === 'zh' ? '无限量订阅服务追踪' : 'Unlimited Subscription Tracking', included: true },
        { text: lang === 'zh' ? '离线秒级周期倒计时' : 'Offline Real-time Countdown', included: true },
        { text: lang === 'zh' ? '5 层 AI 蛋糕深度成本剖析' : '5-layer AI Cake Deep Analytics', included: true },
        { text: lang === 'zh' ? '全球主流货币 (USD, EUR, JPY 等) 混记' : 'Multi-currency Ledger (USD, EUR, JPY, etc.)', included: true },
        { text: lang === 'zh' ? '本地沙箱 + 云端多端加密同步备份' : 'Multi-device Cloud Encrypted Backup', included: true },
        { text: lang === 'zh' ? '多币种实时汇率换算' : 'Real-time Multi-currency Converter', included: true },
        { text: lang === 'zh' ? '未来周期账单日历看板' : 'Upcoming Billing Calendar Timeline', included: true },
        { text: lang === 'zh' ? '微信、邮件、TG 机器人、短信多渠道通知' : 'Multi-channel Push Alerts (WeChat/Email/SMS)', included: true },
        { text: lang === 'zh' ? '银行/PayPal账单自动同步 API 接口' : 'Automated Bank/PayPal Statement Sync', included: true },
      ],
      cta: t.premiumCta,
      action: () => alert(t.premiumAlert),
      isPopular: true,
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Brand Header with Quick Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/60 px-4 py-3 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 select-none">
            <FiveLayersLogo size={32} />
            <div>
              <h1 className="text-sm font-black text-slate-800 tracking-tight leading-tight">5 Layers Panel</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">@5layers.ai</p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500">
            <a href="#cake-concept" className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {lang === 'zh' ? '🍰 五层蛋糕架构' : '🍰 AI Cake'}
            </a>
            <a href="#features" className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {lang === 'zh' ? '✨ 核心特色' : '✨ Features'}
            </a>
            <a href="#pricing" className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {lang === 'zh' ? '💰 版本定价' : '💰 Pricing'}
            </a>
            <a href="#privacy" className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {lang === 'zh' ? '🔒 本地隐私' : '🔒 Privacy'}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 mr-1"
              title={lang === 'zh' ? 'Switch to English' : '切换为中文'}
            >
              <Languages size={14} className="text-slate-500 hover:text-indigo-500 transition-colors" />
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

            <button
              onClick={onEnterApp}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.enterConsole}</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 px-4 md:px-8 text-center max-w-5xl mx-auto space-y-6">
        {/* Brand Logo Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-2"
        >
          <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-md flex items-center justify-center">
            <FiveLayersLogo size={72} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100/60 rounded-full text-indigo-700 text-xs font-bold"
        >
          <Sparkles size={12} />
          <span>{t.tagline}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight"
        >
          {lang === 'zh' ? (
            <>
              用<span className="text-indigo-600 bg-indigo-50/60 px-2 rounded-lg">五层 AI 蛋糕</span>理论<br />
              重新定义您的订阅管理与数字资产
            </>
          ) : (
            <>
              Redefine Subscriptions with the<br />
              <span className="text-indigo-600 bg-indigo-50/60 px-2 rounded-lg">5 Layers AI Cake</span> Model
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          {t.longDesc}
        </motion.p>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{t.enterConsole}</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-600 hover:text-slate-800 font-bold text-sm shadow-sm transition-all text-center"
          >
            {t.viewPricing}
          </a>
        </motion.div>

        {/* Quick Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          <a
            href="#cake-concept"
            className="p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100/80 hover:bg-indigo-50/10 shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🍰</span>
            <span className="text-xs font-bold text-slate-700">{lang === 'zh' ? '五层蛋糕理论' : 'Cake Architecture'}</span>
            <span className="text-[10px] text-slate-400 font-medium">{lang === 'zh' ? 'L1 ~ L5 费用架构' : 'L1-L5 cost split'}</span>
          </a>
          <a
            href="#features"
            className="p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100/80 hover:bg-indigo-50/10 shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
            <span className="text-xs font-bold text-slate-700">{lang === 'zh' ? '六大核心功能' : 'Core Features'}</span>
            <span className="text-[10px] text-slate-400 font-medium">{lang === 'zh' ? '高精度倒数与日历' : 'Countdowns & calendar'}</span>
          </a>
          <a
            href="#pricing"
            className="p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100/80 hover:bg-indigo-50/10 shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💰</span>
            <span className="text-xs font-bold text-slate-700">{lang === 'zh' ? '版本定价比较' : 'Pricing Plans'}</span>
            <span className="text-[10px] text-slate-400 font-medium">{lang === 'zh' ? '终身免费与极客版' : 'Lifetime vs Premium'}</span>
          </a>
          <a
            href="#privacy"
            className="p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-100/80 hover:bg-indigo-50/10 shadow-sm hover:shadow-md transition-all group flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🔒</span>
            <span className="text-xs font-bold text-slate-700">{lang === 'zh' ? '本地隐私沙箱' : 'Local Sandbox'}</span>
            <span className="text-[10px] text-slate-400 font-medium">{lang === 'zh' ? '零上云100%安全' : '100% Client security'}</span>
          </a>
        </motion.div>
      </section>

      {/* The 5 Layers Cake Concept Explain */}
      <section id="cake-concept" className="py-12 px-4 md:px-8 max-w-4xl mx-auto bg-slate-50/50 rounded-3xl border border-slate-100/80 mb-16 scroll-mt-20">
        <div className="text-center space-y-2 mb-10">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <span>🎂</span> {t.cakeSectionTitle}
          </h3>
          <p className="text-xs text-slate-400 font-semibold max-w-lg mx-auto leading-relaxed">
            {t.cakeSectionDesc}
          </p>
        </div>

        {/* Layer Stack Interactive Visualization */}
        <div className="flex flex-col gap-4">
          {cakeLayers.map((layer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border ${layer.color}`}>
                  {layer.level}
                </span>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  {layer.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-slate-800 text-sm">{layer.name}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {layer.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className="py-12 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            {lang === 'zh' ? '为什么选择 5 layers 订阅看板？' : 'Why Choose 5 layers?'}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {lang === 'zh' ? '独具创意的五层解析法，只为追求效率与资产透明度的你' : 'Vertical tech stack accounting designed for hackers & tech-savvy creators'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3.5"
            >
              <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                {feat.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-sm leading-tight">{feat.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Comparision and Pricing */}
      <section id="pricing" className="py-16 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{t.pricingTitle}</h3>
          <p className="text-xs text-slate-400 font-medium">{t.pricingDesc}</p>
          <p className="text-[10px] text-indigo-500 font-bold bg-indigo-50/50 px-2.5 py-1 rounded-full inline-block mt-2">
            ✨ {t.pricingNote}
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl border p-6 md:p-8 flex flex-col justify-between relative shadow-sm ${
                tier.isPopular 
                  ? 'border-indigo-500 ring-2 ring-indigo-500/10' 
                  : 'border-slate-100'
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3 right-8 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Zap size={10} /> {lang === 'zh' ? '推荐' : 'Popular'}
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-extrabold text-slate-800">{tier.name}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-4xl font-black text-slate-800">{tier.price}</span>
                  <span className="text-xs font-bold text-slate-400">/ {tier.period}</span>
                </div>

                <button
                  onClick={tier.action}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-sm transition-all active:scale-[0.98] cursor-pointer ${
                    tier.isPopular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:shadow-lg'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tier.cta}
                </button>

                {/* Features List */}
                <div className="space-y-3.5 pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {lang === 'zh' ? '包含的特性' : 'Features Included'}
                  </span>
                  <ul className="space-y-3 text-xs font-semibold text-slate-600">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        {feat.included ? (
                          <span className="p-0.5 bg-emerald-50 text-emerald-600 rounded-md flex-shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="p-0.5 bg-slate-50 text-slate-300 rounded-md flex-shrink-0 mt-0.5">
                            <X size={12} strokeWidth={3} />
                          </span>
                        )}
                        <span className={feat.included ? 'text-slate-600' : 'text-slate-300 line-through'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Local sandbox assurance */}
      <section id="privacy" className="py-12 px-4 text-center max-w-3xl mx-auto space-y-6 scroll-mt-20">
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center gap-4 text-left">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl flex-shrink-0">
            <Users size={24} />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-800">{t.aboutDemoTitle}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-semibold mt-1">
              {t.aboutDemoDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
