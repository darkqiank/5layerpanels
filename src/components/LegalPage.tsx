/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, FileText, Github, Languages, Mail, ShieldCheck } from 'lucide-react';
import { FiveLayersLogo } from './FiveLayersLogo';
import { Language } from '../locales';

export type LegalPageKind = 'privacy' | 'terms';

interface LegalPageProps {
  kind: LegalPageKind;
  lang: Language;
  onToggleLanguage: () => void;
  supportEmail: string;
}

const legalContent = {
  privacy: {
    zh: {
      eyebrow: 'Legal & Privacy',
      title: '隐私政策',
      subtitle: '5 Layers Panel 采用本地优先的隐私设计。我们用必要的浏览器本地存储提供订阅追踪、语言偏好、Cookie 确认和付费订阅管理能力。',
      effective: '生效日期：2026 年 7 月 7 日',
      sections: [
        {
          title: '我们处理的信息',
          body: '订阅名称、价格、账单日期、备注、语言偏好、导入备份和 Cookie 确认状态会保存在您的浏览器本地存储中，除非您未来明确启用云端或付费同步功能。'
        },
        {
          title: '付费用户隐私',
          body: '如果您购买付费计划，付款通常由应用商店、支付平台或结账服务商处理。我们不会在 5 Layers Panel 中保存完整银行卡号或支付凭证；为开通服务、处理续订、退款、税务和客服请求，我们可能接收或处理订单编号、订阅状态、计划类型、账单邮箱、付款时间、支付渠道和有限的交易元数据。'
        },
        {
          title: '付费同步与客服数据',
          body: '当您明确启用付费云端同步、备份或多设备功能时，相关账号资料、同步状态和您选择同步的订阅数据可能会被用于提供该付费功能。您也可以通过 support@5layers.ai 请求协助导出、关闭同步或删除与付费账户相关的数据。'
        },
        {
          title: 'Cookie 与本地存储',
          body: '我们使用必要的浏览器存储来记住语言选择、订阅追踪数据、备份导入状态和 Cookie 确认状态。我们不使用广告 Cookie 或跨站追踪 Cookie。'
        },
        {
          title: '信息用途',
          body: '这些信息用于在本地展示、计算和管理订阅倒计时，记住偏好设置，支持 JSON 备份导出和导入，并回复发送至支持邮箱的客服请求。'
        },
        {
          title: '第三方服务',
          body: '应用可能加载公开资源或打开 GitHub 链接。第三方服务可能根据其自身政策接收浏览器发送的标准技术信息，例如 IP 地址、用户代理和来源页面。'
        },
        {
          title: '数据安全',
          body: '本地追踪器会将数据保留在输入该数据的设备和浏览器配置中。您需要自行保护设备、浏览器配置、导出的备份文件以及共享设备环境。'
        },
        {
          title: '政策更新',
          body: '我们可能不时更新本隐私政策。更新后的版本会发布在本页面，并标注新的生效日期。'
        }
      ]
    },
    en: {
      eyebrow: 'Legal & Privacy',
      title: 'Privacy Policy',
      subtitle: '5 Layers Panel is built around a local-first privacy model. We use essential browser storage for subscription tracking, language preferences, cookie consent, and paid subscription management.',
      effective: 'Effective date: July 7, 2026',
      sections: [
        {
          title: 'Information We Process',
          body: 'Subscription names, prices, billing dates, notes, language preferences, imported backups, and cookie consent choices are stored in your browser local storage unless you explicitly enable a future cloud or paid sync feature.'
        },
        {
          title: 'Paid User Privacy',
          body: 'If you purchase a paid plan, payment is usually handled by an app store, payment platform, or checkout provider. We do not store full card numbers or payment credentials in 5 Layers Panel. To activate service, manage renewals, refunds, taxes, and support requests, we may receive or process order IDs, subscription status, plan type, billing email, payment date, payment channel, and limited transaction metadata.'
        },
        {
          title: 'Paid Sync and Support Data',
          body: 'When you explicitly enable paid cloud sync, backup, or multi-device features, related account details, sync status, and the subscription data you choose to sync may be used to provide that paid feature. You may contact support@5layers.ai to request help exporting, disabling sync, or deleting data associated with your paid account.'
        },
        {
          title: 'Cookies and Local Storage',
          body: 'We use essential browser storage to remember your language selection, subscription tracker data, backup/import state, and cookie consent choice. We do not use advertising cookies or cross-site tracking cookies.'
        },
        {
          title: 'How We Use Information',
          body: 'We use this information to display, calculate, and manage subscription countdowns locally, remember preferences, support JSON backup import/export, and respond to support requests.'
        },
        {
          title: 'Third-Party Services',
          body: 'The app may load public assets or open links to GitHub. Those third-party services may receive standard browser technical information, such as IP address, user agent, and referrer, under their own policies.'
        },
        {
          title: 'Data Security',
          body: 'The local tracker keeps saved data on the device and browser profile where you entered it. You are responsible for protecting your device, browser profile, exported backup files, and shared devices.'
        },
        {
          title: 'Changes',
          body: 'We may update this Privacy Policy from time to time. Updated versions will be posted on this page with a new effective date.'
        }
      ]
    }
  },
  terms: {
    zh: {
      eyebrow: 'Legal Terms',
      title: '服务条款',
      subtitle: '本服务条款适用于您访问和使用 5 Layers Panel。使用网站或应用即表示您同意本条款。',
      effective: '生效日期：2026 年 7 月 7 日',
      sections: [
        {
          title: '服务说明',
          body: '5 Layers Panel 提供订阅追踪、账单倒计时、成本分类、备份导出及相关效率功能。本地演示控制台会将数据保存在您的浏览器中。'
        },
        {
          title: '资格与责任',
          body: '您必须在遵守适用法律的前提下使用本服务，并对输入的订阅记录准确性、设备和浏览器安全以及导出的备份文件保管负责。'
        },
        {
          title: '计划、付款与续订',
          body: '若提供付费计划，价格、续订条款、税费和取消方式会在结账流程或相应商店/支付渠道中展示。购买付费计划即表示您授权相应费用。'
        },
        {
          title: '退款与取消',
          body: '退款和取消取决于购买所使用的支付渠道。如果交易由商店、市场或支付处理方完成，其退款规则可能适用。'
        },
        {
          title: '可接受使用',
          body: '不得滥用、干扰、反向工程或尝试未经授权访问本服务；不得将本服务用于违法活动或侵犯他人权利。'
        },
        {
          title: '免责声明',
          body: '账单提醒和费用计算仅为效率辅助工具；如果输入数据、汇率、设备时间或浏览器存储不准确，结果也可能不准确。您仍需自行向订阅服务商确认实际扣款。'
        }
      ]
    },
    en: {
      eyebrow: 'Legal Terms',
      title: 'Terms of Service',
      subtitle: 'These Terms of Service govern your access to and use of 5 Layers Panel. By using the website or app, you agree to these Terms.',
      effective: 'Effective date: July 7, 2026',
      sections: [
        {
          title: 'Service Description',
          body: '5 Layers Panel provides subscription tracking, billing countdown, cost categorization, backup export, and related productivity features. The local demo console stores data in your browser.'
        },
        {
          title: 'Eligibility and Responsibility',
          body: 'You must use the service in compliance with applicable laws. You are responsible for the accuracy of subscription records, browser/device security, and exported backup files.'
        },
        {
          title: 'Plans, Payments, and Renewals',
          body: 'If paid plans are made available, pricing, renewal terms, taxes, and cancellation options will be shown during checkout or in the applicable store/payment flow. You authorize applicable charges when you purchase a paid plan.'
        },
        {
          title: 'Refunds and Cancellations',
          body: 'Refund and cancellation handling depends on the payment channel used for purchase. If a store, marketplace, or payment processor handles the transaction, its refund rules may apply.'
        },
        {
          title: 'Acceptable Use',
          body: 'Do not misuse, disrupt, reverse engineer, or attempt unauthorized access to the service. Do not use the service for illegal activity or to infringe rights of others.'
        },
        {
          title: 'Disclaimers',
          body: 'Billing reminders and cost calculations are productivity aids and may be inaccurate if entered data, exchange rates, device time, or browser storage are incorrect. You remain responsible for confirming actual charges with your subscription providers.'
        }
      ]
    }
  }
};

export const LegalPage: React.FC<LegalPageProps> = ({ kind, lang, onToggleLanguage, supportEmail }) => {
  const content = legalContent[kind][lang];
  const otherPageHref = kind === 'privacy' ? '/terms-of-service/index.html' : '/privacy-policy/index.html';
  const otherPageLabel = kind === 'privacy'
    ? (lang === 'zh' ? '服务条款' : 'Terms of Service')
    : (lang === 'zh' ? '隐私政策' : 'Privacy Policy');

  return (
    <main className="flex-grow bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/60 px-4 py-3 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2.5 select-none">
            <FiveLayersLogo size={32} />
            <div>
              <h1 className="text-sm font-black text-slate-800 tracking-tight leading-tight">5 Layers Panel</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">@5layers.ai</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500" aria-label={lang === 'zh' ? '法律页面导航' : 'Legal navigation'}>
            <a href="/privacy-policy/index.html" className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {lang === 'zh' ? '隐私政策' : 'Privacy Policy'}
            </a>
            <a href="/terms-of-service/index.html" className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {lang === 'zh' ? '服务条款' : 'Terms of Service'}
            </a>
            <a href={`mailto:${supportEmail}`} className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
              {supportEmail}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              title={lang === 'zh' ? 'Switch to English' : '切换为中文'}
            >
              <Languages size={14} />
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
            </button>
            <a
              href="https://github.com/darkqiank/5layerpanels"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-500 shadow-sm transition-all flex items-center"
              title={lang === 'zh' ? '访问 GitHub 仓库' : 'Visit GitHub Repository'}
            >
              <Github size={14} />
            </a>
          </div>
        </div>
      </header>

      <section className="px-4 md:px-8 pt-12 pb-10 max-w-5xl mx-auto">
        <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-8">
          <ArrowLeft size={14} />
          {lang === 'zh' ? '返回 5 Layers Panel' : 'Back to 5 Layers Panel'}
        </a>

        <div className="space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100/60 rounded-full text-indigo-700 text-xs font-bold">
            {kind === 'privacy' ? <ShieldCheck size={12} /> : <FileText size={12} />}
            <span>{content.eyebrow}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                {content.title}
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed font-medium">
                {content.subtitle}
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm text-left md:text-right">
              <p className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                {lang === 'zh' ? '联系支持' : 'Support'}
              </p>
              <a href={`mailto:${supportEmail}`} className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5 mt-1">
                <Mail size={13} />
                {supportEmail}
              </a>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400">{content.effective}</p>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.sections.map((section) => (
            <article key={section.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">{section.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium mt-2">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">
              {lang === 'zh' ? '还需要查看其他法律信息？' : 'Need the other legal page?'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
              {lang === 'zh'
                ? '隐私政策和服务条款都保持公开访问，并使用同一套站点设计。'
                : 'Privacy Policy and Terms of Service are both public and use the same site design system.'}
            </p>
          </div>
          <a href={otherPageHref} className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all text-center">
            {otherPageLabel}
          </a>
        </div>
      </section>
    </main>
  );
};
