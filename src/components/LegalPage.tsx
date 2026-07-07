/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, FileText, Github, Info, Languages, Mail, ShieldCheck } from 'lucide-react';
import { FiveLayersLogo } from './FiveLayersLogo';
import { Language } from '../locales';

export type LegalPageKind = 'privacy' | 'terms' | 'about';

interface LegalPageProps {
  kind: LegalPageKind;
  lang: Language;
  onToggleLanguage: () => void;
  supportEmail: string;
}

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalLanguageBlock = {
  heading: string;
  sections: LegalSection[];
};

type LegalDocument = {
  eyebrow: string;
  effective: Record<Language, string>;
  icon: 'privacy' | 'terms';
  en: LegalLanguageBlock;
  zh: LegalLanguageBlock;
};

type AboutContent = {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
};

const legalContent: Record<'privacy' | 'terms', LegalDocument> = {
  privacy: {
    eyebrow: 'Legal & Privacy',
    effective: {
      en: 'Effective date: July 7, 2026',
      zh: '生效日期：2026 年 7 月 7 日'
    },
    icon: 'privacy',
    en: {
      heading: 'Privacy Policy',
      sections: [
        {
          title: '1. Overview',
          paragraphs: [
            '5 Layers Panel is designed as a local-first subscription and digital cost tracking tool. The core product lets you create subscription records, view billing countdowns, categorize costs, export backups, and manage reminders directly in your browser.',
            'Our default design is simple: your subscription records stay on the device and browser profile where you entered them unless you deliberately use a feature that sends data elsewhere, such as a future paid sync, cloud backup, payment, or support workflow.'
          ]
        },
        {
          title: '2. Who We Are and How to Contact Us',
          paragraphs: [
            '5 Layers Panel is an independent product published under the 5layers.ai brand. For privacy questions, support requests, deletion requests, or questions about paid features, contact us at support@5layers.ai.'
          ]
        },
        {
          title: '3. Information Stored Locally',
          paragraphs: [
            'The app may store subscription names, prices, currencies, billing cycles, first billing dates, reminder settings, categories, payment method labels, colors, icons, notes, active or paused status, imported backup content, language preference, and cookie consent status in browser localStorage.',
            'Local storage is controlled by your browser. It may be cleared if you delete site data, switch browser profiles, use private browsing, reset the device, or run browser cleanup tools.'
          ]
        },
        {
          title: '4. Information We Do Not Collect by Default',
          paragraphs: [
            'The local tracker does not require account registration and does not ask you to upload subscription credentials, bank passwords, card numbers, app store passwords, or API keys.',
            'We do not use the local tracker to read your bank account, email inbox, browser history, contacts, files, or other apps on your device.'
          ]
        },
        {
          title: '5. Optional Paid, Sync, or Account Features',
          paragraphs: [
            'If we offer paid plans, cloud sync, multi-device backup, automated reconciliation, or account-based features, those features may require additional information such as account identifiers, billing email, plan type, subscription status, device/session metadata, synced subscription records, backup state, and timestamps.',
            'We will use that information only to provide the requested feature, maintain the subscription, process support requests, prevent abuse, keep records required for accounting or compliance, and improve reliability.'
          ]
        },
        {
          title: '6. Payments and Billing Information',
          paragraphs: [
            'Payments may be handled by app stores, marketplace platforms, checkout providers, or payment processors. We do not store full card numbers, bank account passwords, or complete payment credentials inside 5 Layers Panel.',
            'For paid access, we may receive limited transaction information such as order ID, purchase date, renewal date, cancellation status, refund status, tax region, product ID, billing email, payment channel, and payment processor metadata.'
          ]
        },
        {
          title: '7. Support Communications',
          paragraphs: [
            'If you email us or otherwise contact support, we may process your email address, message content, attachments you choose to send, diagnostic details you provide, and the history of the support conversation.',
            'Please avoid sending sensitive financial credentials, passwords, full card numbers, government identifiers, or private keys in support messages.'
          ]
        },
        {
          title: '8. Cookies and Browser Storage',
          paragraphs: [
            'We use essential browser storage to remember language preference, cookie consent, local tracker data, backup/import state, and other settings necessary for the app experience.',
            'We do not use advertising cookies or cross-site behavioral tracking cookies in the local tracker. If future analytics are added, they should be limited to product reliability and aggregate usage insights, and any material change will be reflected in this policy.'
          ]
        },
        {
          title: '9. How We Use Information',
          paragraphs: [
            'We use information to display and calculate subscription countdowns, estimate monthly and daily costs, categorize subscriptions, remember preferences, support import/export, provide paid features, respond to support requests, process billing, detect abuse, maintain security, and comply with legal obligations.'
          ]
        },
        {
          title: '10. Sharing and Third Parties',
          paragraphs: [
            'We do not sell your local subscription records. We may share limited information with service providers that help us operate payments, hosting, email, support, analytics, security, or account infrastructure, but only as needed for those services.',
            'The app may link to GitHub or other third-party websites. Those sites are governed by their own privacy policies and may receive standard browser information such as IP address, user agent, language, and referrer.'
          ]
        },
        {
          title: '11. Data Retention, Export, and Deletion',
          paragraphs: [
            'Local tracker data remains in your browser until you edit it, delete it, reset the app data, clear browser storage, or remove the browser profile. Exported backup files are controlled by you and should be stored carefully.',
            'For account, paid, support, or synced data, we retain information only for as long as needed to provide the service, resolve disputes, satisfy accounting and compliance duties, prevent abuse, and maintain business records. You may contact support@5layers.ai to request deletion or export assistance where applicable.'
          ]
        },
        {
          title: '12. Security',
          paragraphs: [
            'We use a local-first architecture to reduce unnecessary data transfer. Still, no browser storage, network service, payment processor, or device is perfectly secure.',
            'You are responsible for protecting your device, browser profile, operating system account, exported backups, shared devices, and any passwords or payment accounts used outside 5 Layers Panel.'
          ]
        },
        {
          title: '13. Your Choices and Rights',
          paragraphs: [
            'You can edit or delete local records in the app, export backups, clear localStorage through your browser, decline non-essential browser storage if such options are introduced, and contact us about account or paid-plan data.',
            'Depending on your location, you may have rights to access, correct, delete, restrict, object to processing, or receive a copy of personal information. We will respond to valid requests according to applicable law.'
          ]
        },
        {
          title: '14. Children',
          paragraphs: [
            '5 Layers Panel is intended for users who manage personal or work subscription expenses. It is not directed to children under the age required by applicable local law, and we do not knowingly collect children’s personal information.'
          ]
        },
        {
          title: '15. International Processing',
          paragraphs: [
            'If account, payment, support, or cloud features are used, information may be processed in countries or regions different from where you live. We will use appropriate safeguards where required by law.'
          ]
        },
        {
          title: '16. Changes to This Policy',
          paragraphs: [
            'We may update this Privacy Policy when the product, legal requirements, paid features, or operational practices change. The updated policy will be posted on this page with a new effective date.'
          ]
        }
      ]
    },
    zh: {
      heading: '隐私政策',
      sections: [
        {
          title: '1. 概述',
          paragraphs: [
            '5 Layers Panel 是一个本地优先的订阅与数字成本追踪工具。核心产品支持您在浏览器中创建订阅记录、查看账单倒计时、分类成本、导出备份并管理提醒。',
            '我们的默认设计很清晰：除非您主动使用未来可能提供的付费同步、云端备份、支付或客服等功能，否则您的订阅记录会保留在输入这些数据的设备和浏览器配置中。'
          ]
        },
        {
          title: '2. 我们是谁以及如何联系我们',
          paragraphs: [
            '5 Layers Panel 是以 5layers.ai 品牌发布的独立产品。如有隐私问题、支持请求、删除请求或付费功能相关问题，请通过 support@5layers.ai 联系我们。'
          ]
        },
        {
          title: '3. 本地保存的信息',
          paragraphs: [
            '应用可能在浏览器 localStorage 中保存订阅名称、价格、币种、账单周期、首次扣费日期、提醒设置、分类、支付方式标签、颜色、图标、备注、启用或暂停状态、导入备份内容、语言偏好和 Cookie 确认状态。',
            '本地存储由您的浏览器控制。如果您清除网站数据、切换浏览器配置、使用隐私浏览、重置设备或运行浏览器清理工具，这些数据可能被删除。'
          ]
        },
        {
          title: '4. 默认情况下我们不收集的信息',
          paragraphs: [
            '本地追踪器不要求注册账号，也不会要求您上传订阅服务凭证、银行密码、银行卡号、应用商店密码或 API 密钥。',
            '我们不会通过本地追踪器读取您的银行账户、邮箱收件箱、浏览器历史、通讯录、本地文件或设备上的其他应用。'
          ]
        },
        {
          title: '5. 可选付费、同步或账号功能',
          paragraphs: [
            '如果我们提供付费计划、云端同步、多设备备份、自动对账或账号功能，这些功能可能需要额外信息，例如账号标识、账单邮箱、计划类型、订阅状态、设备或会话元数据、同步的订阅记录、备份状态和时间戳。',
            '我们仅会将这些信息用于提供相应功能、维护订阅状态、处理客服请求、防止滥用、保存会计或合规所需记录以及提升可靠性。'
          ]
        },
        {
          title: '6. 付款与账单信息',
          paragraphs: [
            '付款可能由应用商店、市场平台、结账服务商或支付处理方完成。我们不会在 5 Layers Panel 内保存完整银行卡号、银行账户密码或完整支付凭证。',
            '为了提供付费访问，我们可能接收有限交易信息，例如订单编号、购买日期、续订日期、取消状态、退款状态、税务地区、商品 ID、账单邮箱、支付渠道和支付处理方元数据。'
          ]
        },
        {
          title: '7. 客服沟通',
          paragraphs: [
            '如果您通过邮件或其他方式联系支持，我们可能处理您的邮箱地址、消息内容、您主动发送的附件、您提供的诊断信息以及客服沟通历史。',
            '请不要在客服消息中发送敏感金融凭证、密码、完整银行卡号、政府身份证件号码或私钥。'
          ]
        },
        {
          title: '8. Cookie 与浏览器存储',
          paragraphs: [
            '我们使用必要的浏览器存储来记住语言偏好、Cookie 确认、本地追踪器数据、备份或导入状态，以及应用体验所需的其他设置。',
            '本地追踪器不使用广告 Cookie 或跨站行为追踪 Cookie。如果未来加入分析能力，也应限于产品可靠性和汇总使用洞察；任何重大变化都会体现在本政策中。'
          ]
        },
        {
          title: '9. 信息用途',
          paragraphs: [
            '我们使用信息来展示和计算订阅倒计时、估算月度和每日成本、分类订阅、记住偏好、支持导入导出、提供付费功能、回复客服请求、处理账单、防止滥用、维护安全以及遵守法律义务。'
          ]
        },
        {
          title: '10. 共享与第三方',
          paragraphs: [
            '我们不会出售您的本地订阅记录。我们可能与帮助我们运营支付、托管、邮件、客服、分析、安全或账号基础设施的服务提供商共享有限信息，但仅限于提供这些服务所需范围。',
            '应用可能链接到 GitHub 或其他第三方网站。这些网站适用其自身隐私政策，并可能接收标准浏览器信息，例如 IP 地址、用户代理、语言和来源页面。'
          ]
        },
        {
          title: '11. 数据保留、导出与删除',
          paragraphs: [
            '本地追踪器数据会保留在浏览器中，直到您编辑、删除、重置应用数据、清除浏览器存储或移除浏览器配置。导出的备份文件由您控制，应妥善保存。',
            '对于账号、付费、客服或同步数据，我们仅在提供服务、解决争议、满足会计和合规义务、防止滥用以及维护业务记录所需期限内保留。适用时，您可以通过 support@5layers.ai 请求删除或导出协助。'
          ]
        },
        {
          title: '12. 安全',
          paragraphs: [
            '我们采用本地优先架构，以减少不必要的数据传输。但任何浏览器存储、网络服务、支付处理方或设备都无法保证绝对安全。',
            '您需要自行保护设备、浏览器配置、操作系统账户、导出的备份文件、共享设备环境，以及在 5 Layers Panel 之外使用的密码或支付账户。'
          ]
        },
        {
          title: '13. 您的选择与权利',
          paragraphs: [
            '您可以在应用中编辑或删除本地记录、导出备份、通过浏览器清除 localStorage、在未来提供相关选项时拒绝非必要浏览器存储，并就账号或付费计划数据联系我们。',
            '根据您所在地区，您可能享有访问、更正、删除、限制处理、反对处理或获取个人信息副本等权利。我们会按照适用法律回应有效请求。'
          ]
        },
        {
          title: '14. 儿童',
          paragraphs: [
            '5 Layers Panel 面向管理个人或工作订阅支出的用户，并非面向适用当地法律规定年龄以下的儿童。我们不会明知而收集儿童个人信息。'
          ]
        },
        {
          title: '15. 跨境处理',
          paragraphs: [
            '如果您使用账号、付款、客服或云端功能，信息可能在不同于您居住地的国家或地区处理。法律要求时，我们会采用适当保护措施。'
          ]
        },
        {
          title: '16. 政策更新',
          paragraphs: [
            '当产品、法律要求、付费功能或运营实践发生变化时，我们可能更新本隐私政策。更新后的政策会发布在本页面，并标注新的生效日期。'
          ]
        }
      ]
    }
  },
  terms: {
    eyebrow: 'Legal Terms',
    effective: {
      en: 'Effective date: July 7, 2026',
      zh: '生效日期：2026 年 7 月 7 日'
    },
    icon: 'terms',
    en: {
      heading: 'Terms of Service',
      sections: [
        {
          title: '1. Acceptance of Terms',
          paragraphs: [
            'These Terms of Service govern your access to and use of 5 Layers Panel, including the website, local demo console, documentation, paid features, and related services. By using the service, you agree to these Terms.'
          ]
        },
        {
          title: '2. Service Description',
          paragraphs: [
            '5 Layers Panel provides subscription tracking, billing countdowns, cost categorization, local backup export/import, reminders, and related productivity features. The default local console stores data in your browser.'
          ]
        },
        {
          title: '3. Local Data and User Responsibility',
          paragraphs: [
            'You are responsible for the accuracy of the subscription records you enter, the security of your device and browser profile, and the safekeeping of exported backup files.',
            'If you clear browser storage, switch profiles, use private browsing, or lose access to a device, locally stored data may be unavailable or permanently deleted.'
          ]
        },
        {
          title: '4. Paid Plans and Billing',
          paragraphs: [
            'If paid plans are offered, prices, plan limits, renewal terms, taxes, payment methods, and cancellation options will be shown during checkout or inside the applicable app store, marketplace, or payment flow.',
            'By purchasing a paid plan, you authorize the applicable charges. Paid features may require account, billing, or sync-related information to activate and maintain access.'
          ]
        },
        {
          title: '5. Cancellations and Refunds',
          paragraphs: [
            'Cancellation and refund rules depend on the channel used for purchase. If a payment is handled by an app store, marketplace, or payment processor, its refund process and eligibility rules may apply.',
            'Unless otherwise required by law or stated during checkout, access to a paid plan may continue until the end of the current billing period after cancellation.'
          ]
        },
        {
          title: '6. Acceptable Use',
          paragraphs: [
            'You may not misuse the service, interfere with its operation, attempt unauthorized access, bypass technical limits, abuse support channels, upload malicious content, or use the service in violation of applicable law or the rights of others.'
          ]
        },
        {
          title: '7. Backups, Imports, and User Content',
          paragraphs: [
            'You retain responsibility for the content you enter into the app and the backup files you create. You should review imported files before use and avoid importing files from untrusted sources.',
            'You grant us the limited rights necessary to process information you provide when you use optional account, support, sync, backup, or paid features.'
          ]
        },
        {
          title: '8. Calculations and Reminders',
          paragraphs: [
            'Billing reminders, renewal countdowns, currency conversions, and cost summaries are productivity aids. They may be inaccurate if your input data, device time, browser storage, plan terms, taxes, discounts, or exchange rates are incorrect.',
            'You remain responsible for checking actual charges, renewal terms, cancellation deadlines, and account status with each subscription provider.'
          ]
        },
        {
          title: '9. Third-Party Services',
          paragraphs: [
            'The service may link to GitHub, payment providers, app stores, or other third-party services. We are not responsible for third-party content, policies, availability, charges, or data practices.'
          ]
        },
        {
          title: '10. Changes, Availability, and Beta Features',
          paragraphs: [
            'We may modify, suspend, or discontinue features, pricing, documentation, or availability. Some features may be experimental, beta, or released gradually and may change without becoming part of a permanent product plan.'
          ]
        },
        {
          title: '11. Intellectual Property',
          paragraphs: [
            'The service, brand, interface, code, documentation, and related materials are protected by intellectual property laws. You may not copy, resell, or redistribute the service except as permitted by applicable open-source licenses or our written permission.'
          ]
        },
        {
          title: '12. Disclaimer and Limitation of Liability',
          paragraphs: [
            'The service is provided on an “as is” and “as available” basis. To the maximum extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, uninterrupted availability, and error-free operation.',
            'To the maximum extent permitted by law, we are not liable for indirect, incidental, consequential, special, punitive, or lost-profit damages, or for losses caused by inaccurate user input, missed reminders, deleted local data, third-party services, or device/browser issues.'
          ]
        },
        {
          title: '13. Termination',
          paragraphs: [
            'You may stop using the service at any time. We may suspend or terminate access to hosted, paid, or account-based features if you violate these Terms, create security risk, misuse the service, or fail to pay applicable fees.'
          ]
        },
        {
          title: '14. Contact',
          paragraphs: [
            'For questions about these Terms, paid plans, support, or privacy, contact support@5layers.ai.'
          ]
        }
      ]
    },
    zh: {
      heading: '服务条款',
      sections: [
        {
          title: '1. 接受条款',
          paragraphs: [
            '本服务条款适用于您访问和使用 5 Layers Panel，包括网站、本地演示控制台、文档、付费功能和相关服务。使用本服务即表示您同意本条款。'
          ]
        },
        {
          title: '2. 服务说明',
          paragraphs: [
            '5 Layers Panel 提供订阅追踪、账单倒计时、成本分类、本地备份导入导出、提醒及相关效率功能。默认本地控制台会将数据保存在您的浏览器中。'
          ]
        },
        {
          title: '3. 本地数据与用户责任',
          paragraphs: [
            '您需要对输入的订阅记录准确性、设备和浏览器配置安全，以及导出备份文件的保管负责。',
            '如果您清除浏览器存储、切换配置、使用隐私浏览或无法访问设备，本地保存的数据可能无法使用或被永久删除。'
          ]
        },
        {
          title: '4. 付费计划与账单',
          paragraphs: [
            '若提供付费计划，价格、计划限制、续订条款、税费、支付方式和取消选项会在结账流程或相应应用商店、市场平台、支付流程中展示。',
            '购买付费计划即表示您授权相应费用。付费功能可能需要账号、账单或同步相关信息来开通和维持访问权限。'
          ]
        },
        {
          title: '5. 取消与退款',
          paragraphs: [
            '取消和退款规则取决于购买所使用的渠道。如果付款由应用商店、市场平台或支付处理方处理，其退款流程和资格规则可能适用。',
            '除非法律另有要求或结账时另有说明，取消后付费计划访问权限可能持续到当前账单周期结束。'
          ]
        },
        {
          title: '6. 可接受使用',
          paragraphs: [
            '您不得滥用本服务、干扰其运行、尝试未经授权访问、绕过技术限制、滥用客服渠道、上传恶意内容，或以违反适用法律或侵犯他人权利的方式使用本服务。'
          ]
        },
        {
          title: '7. 备份、导入与用户内容',
          paragraphs: [
            '您对输入应用的内容和创建的备份文件负责。使用前应检查导入文件，并避免导入来自不可信来源的文件。',
            '当您使用可选账号、客服、同步、备份或付费功能时，您授予我们处理您所提供信息所需的有限权利。'
          ]
        },
        {
          title: '8. 计算与提醒',
          paragraphs: [
            '账单提醒、续订倒计时、汇率转换和成本汇总仅为效率辅助。如果输入数据、设备时间、浏览器存储、计划条款、税费、折扣或汇率不准确，结果可能不准确。',
            '您仍需自行向各订阅服务商确认实际扣费、续订条款、取消期限和账号状态。'
          ]
        },
        {
          title: '9. 第三方服务',
          paragraphs: [
            '本服务可能链接至 GitHub、支付服务商、应用商店或其他第三方服务。我们不对第三方内容、政策、可用性、收费或数据实践负责。'
          ]
        },
        {
          title: '10. 变更、可用性与测试功能',
          paragraphs: [
            '我们可能修改、暂停或停止功能、价格、文档或可用性。部分功能可能为实验、测试或灰度发布状态，可能变化，且不一定成为永久产品计划的一部分。'
          ]
        },
        {
          title: '11. 知识产权',
          paragraphs: [
            '本服务、品牌、界面、代码、文档和相关材料受知识产权法律保护。除非适用开源许可证或我们书面许可允许，您不得复制、转售或再分发本服务。'
          ]
        },
        {
          title: '12. 免责声明与责任限制',
          paragraphs: [
            '本服务按“现状”和“可用”提供。在法律允许的最大范围内，我们不对适销性、特定用途适用性、持续可用性或无错误运行作出保证。',
            '在法律允许的最大范围内，我们不对间接、附带、后果性、特殊、惩罚性或利润损失承担责任，也不对因用户输入不准确、提醒遗漏、本地数据删除、第三方服务或设备/浏览器问题造成的损失承担责任。'
          ]
        },
        {
          title: '13. 终止',
          paragraphs: [
            '您可以随时停止使用本服务。如果您违反本条款、造成安全风险、滥用服务或未支付适用费用，我们可能暂停或终止托管、付费或账号功能的访问。'
          ]
        },
        {
          title: '14. 联系方式',
          paragraphs: [
            '如对本条款、付费计划、支持或隐私有疑问，请联系 support@5layers.ai。'
          ]
        }
      ]
    }
  }
};

const aboutContent: Record<Language, AboutContent> = {
  zh: {
    eyebrow: 'About Us',
    title: '关于我们',
    updated: '最后更新：2026 年 7 月 7 日',
    sections: [
      {
        title: '自我介绍',
        paragraphs: [
          '你好，我是 5 Layers Panel 的独立开发者。这个项目从一个很实际的问题开始：我们每天都在为云服务、大模型、开发工具、SaaS、流媒体和数字生活服务续费，但很少能从整体上看清这些成本分别落在哪一层技术栈里。',
          '因此，我把订阅管理做成一个“5 Layers”视角的本地看板：从基础设施、模型/API、开发效率工具、垂直 SaaS 到终端娱乐生活，把每一笔支出放回它所属的位置，让预算、续费和提醒都更清楚。'
        ]
      },
      {
        title: '产品理念',
        paragraphs: [
          '5 Layers Panel 的默认体验坚持本地优先：无需注册，不要求上传凭证，订阅数据默认保存在浏览器 localStorage 中。你可以把它当作一个轻量、可导出、可重置的个人成本控制台。',
          '我希望它不是一个复杂的企业财务系统，而是一个每天打开都能快速判断“哪些服务快扣费、哪些支出占比过高、哪些订阅应该暂停”的实用工具。'
        ]
      },
      {
        title: '联系方式',
        paragraphs: [
          '如果你发现 bug、希望补充功能、对隐私或付费计划有疑问，欢迎通过 support@5layers.ai 联系。也可以在 GitHub 仓库中查看项目代码和提交反馈。'
        ]
      }
    ]
  },
  en: {
    eyebrow: 'About Us',
    title: 'About Us',
    updated: 'Last updated: July 7, 2026',
    sections: [
      {
        title: 'Introduction',
        paragraphs: [
          'Hi, I am the independent developer behind 5 Layers Panel. The project started from a practical problem: we pay for cloud services, large language models, developer tools, SaaS products, streaming platforms, and digital lifestyle services every month, but rarely see how those costs map across the technology stack.',
          '5 Layers Panel turns subscription tracking into a “5 Layers” local dashboard. From infrastructure, models/APIs, developer productivity tools, vertical SaaS, and consumer digital life, each recurring cost gets a clearer place in your personal budget.'
        ]
      },
      {
        title: 'Product Philosophy',
        paragraphs: [
          'The default experience is local-first: no required account registration, no credential upload, and subscription records stored in browser localStorage by default. You can treat it as a lightweight, exportable, resettable control panel for personal costs.',
          'The goal is not to build a heavy enterprise finance suite. The goal is to make it easy to answer everyday questions: which services are about to renew, which categories are becoming expensive, and which subscriptions should be paused or reviewed.'
        ]
      },
      {
        title: 'Contact',
        paragraphs: [
          'For bugs, feature requests, privacy questions, or paid-plan questions, contact support@5layers.ai. You can also visit the GitHub repository to review the code or submit feedback.'
        ]
      }
    ]
  }
};

const navLinks = [
  { href: '/privacy-policy/index.html', zh: '🔒 隐私政策', en: '🔒 Privacy Policy' },
  { href: '/terms-of-service/index.html', zh: '📄 服务条款', en: '📄 Terms of Service' },
  { href: '/about-us/index.html', zh: '👤 关于我们', en: '👤 About Us' }
];

const renderSections = (sections: LegalSection[]) => (
  <div className="space-y-7">
    {sections.map((section) => (
      <section key={section.title} className="space-y-2">
        <h3 className="text-base font-extrabold text-slate-800 tracking-tight">{section.title}</h3>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-slate-600 leading-7 font-medium">
            {paragraph}
          </p>
        ))}
      </section>
    ))}
  </div>
);

export const LegalPage: React.FC<LegalPageProps> = ({ kind, lang, onToggleLanguage, supportEmail }) => {
  const isAbout = kind === 'about';
  const legalDocument = !isAbout ? legalContent[kind] : null;
  const aboutDocument = isAbout ? aboutContent[lang] : null;
  const title = legalDocument ? legalDocument[lang].heading : aboutDocument?.title ?? '';
  const eyebrow = legalDocument?.eyebrow ?? aboutDocument?.eyebrow ?? '';
  const updated = legalDocument ? legalDocument.effective[lang] : aboutDocument?.updated ?? '';
  const pageIcon = isAbout
    ? <Info size={12} />
    : legalDocument?.icon === 'privacy'
      ? <ShieldCheck size={12} />
      : <FileText size={12} />;

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

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-500" aria-label={lang === 'zh' ? '页面导航' : 'Page navigation'}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all">
                {lang === 'zh' ? link.zh : link.en}
              </a>
            ))}
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
            {pageIcon}
            <span>{eyebrow}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                {title}
              </h2>
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
          <p className="text-xs font-bold text-slate-400">{updated}</p>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-16 max-w-5xl mx-auto">
        {legalDocument ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-12">
            <div className="space-y-5">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{legalDocument.en.heading}</h2>
              {renderSections(legalDocument.en.sections)}
            </div>

            <div className="border-t border-slate-100 pt-10 space-y-5">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{legalDocument.zh.heading}</h2>
              {renderSections(legalDocument.zh.sections)}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
            {aboutDocument && renderSections(aboutDocument.sections)}
          </div>
        )}
      </section>
    </main>
  );
};
