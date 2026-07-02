/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'zh' | 'en';

export const LOCALES = {
  zh: {
    appName: '5 Layers Panel',
    badge: 'AI 蛋糕模型',
    tagline: '5 layers 订阅账单蛋糕模型',
    desc: '基于五层 AI 蛋糕理论的订阅与成本分析系统。',
    longDesc: '我们每天都在为各种云服务、大模型、开发者工具、垂直 SaaS 和流媒体支付续费。5 layers 独创性地借鉴了关于 AI 生态系统的五层蛋糕模型，让您能够以纵向堆栈的视角洞察每一分技术成本的流向，配合极致优雅的秒级计时和账单预警，全方位守护您的钱包。',
    backToIntro: '返回介绍',
    exportBackup: '导出备份',
    importBackup: '导入备份',
    importSuccess: '导入成功',
    resetToDemo: '重置数据',
    addNewSub: '新添订阅',
    enterConsole: '进入管理控制台',
    exitConsole: '退出控制台',
    viewPricing: '查看版本定价',
    gridMode: '卡片',
    calendarMode: '日历',
    searchPlaceholder: '搜索订阅服务名称、备注...',
    clearBtn: '清除',
    sortBy: '排序方式',
    sortCountdown: '⏰ 倒计时递增',
    sortPriceDesc: '💰 费用：高到低',
    sortPriceAsc: '💰 费用：低到高',
    sortName: '🔤 字母：A-Z',
    quickFilters: '快捷筛选',
    allCategories: '全部大类',
    trackingStatus: '跟踪状态',
    allStatus: '全部',
    activeStatus: '监控中',
    pausedStatus: '已暂停',
    noMatchingSubs: '没有符合筛选条件的订阅',
    emptyHint: '您可以尝试清空搜索关键字、更换筛选的大类，或者点击右上方“新添订阅”添加您的第一个账单倒计时。',
    resetFilters: '重置所有筛选',
    createFirstSub: '创建首个订阅',
    currentTime: '系统时间: 2026-07-01 (标准基准)',
    sandboxActive: '本地安全隔离沙箱 (Edge-Encrypted)',
    versionInfo: 'v1.1.0',
    aboutDemoTitle: '零信任本地隐私安全架构',
    aboutDemoDesc: '5 Layers Panel 采用高规格的 Privacy-First 离线安全设计。我们坚信您的订阅账单、技术支出及数字资产数据属于您个人。系统所有数据流均在本地浏览器隔离沙箱 (localStorage) 内进行加密处理，不向任何第三方服务器传输。无需注册、无需上传凭证，即刻启用完全自主掌控的专业级订阅对账与智能预警体验。',
    
    // Cake Layers
    cakeSectionTitle: '🎂 5 layers 订阅解构模型',
    cakeSectionDesc: '我们将所有的数字账单和服务纵向解构为 5 层价值蛋糕。从最底层的物理算力，到最顶层的终端生活，每一层都对应着科技价值链的真实流向。',
    
    layer5Title: 'L5 终端娱乐与数字生活',
    layer5Desc: '数字娱乐、拼车影音、健康管理、大众消费（如 Netflix、Spotify、Bilibili 大会员、Gym 等）。',
    
    layer4Title: 'L4 行业与垂直 SaaS',
    layer4Desc: '解决特定工作场景的生产力工具与金融服务（如 Zoom、Slack、Notion、各种商业软件）。',
    
    layer3Title: 'L3 效率开发与提效框架',
    layer3Desc: '将 AI 与底层算力组装为流水线的框架层（如 GitHub Copilot、JetBrains IDE 家族、Figma、Vercel）。',
    
    layer2Title: 'L2 认知大模型与底座 API',
    layer2Desc: '驱动现代数字化工作的认知模型层（如 ChatGPT Plus、Claude Pro、Midjourney、OpenAI/Gemini API）。',
    
    layer1Title: 'L1 硬件网络与算力基建',
    layer1Desc: '数字化世界的物理基础（如 iCloud 存储、VPS 虚拟主机、云服务器、域名托管、电信运营商带宽）。',

    // Pricing
    pricingTitle: '订阅计划与版本对比',
    pricingDesc: '选择符合您当前订阅规模的方案（专业版仅需 $50/月）',
    pricingNote: '标准版和专业版现在皆支持无限量订阅服务追踪！',
    
    standardName: '标准版',
    standardPrice: '免费',
    standardCta: '免费启用标准版',
    
    premiumName: '专业版',
    premiumPrice: '¥50 / 月',
    premiumCta: '立即升级专业版',
    premiumAlert: '感谢您对专业版的支持！该功能正在灰度发布中。您可以先在顶栏点击进入 [控制台] 体验完整的面板功能！',

    // StatsOverview
    costBreakdown: '5 layers 成本结构体系',
    catPieTitle: '传统标准分类',
    cnyEquivalent: '元',
    cnyMonthlyEquiv: '月折算 (元)',
    activeCount: '个活跃服务',
    totalMonthlySpent: '月预算总览',
    upcomingPayments: '30天内到期账单',
    upcomingCount: '笔待扣费',
    alertWarning: '欠费隐患',
    alertWarningDesc: '个订阅已关闭自动续费或扣款失败',
    allGood: '万无一失',
    allGoodDesc: '所有账单自动扣费配置正常',
    monthlyAverage: '每日折算约',
    dailySpent: '每天约',
    cakeSpentTotal: '层级总计',
    categorySpentTotal: '传统分类总计',
    cakeInsightTitle: 'AI 蛋糕五层模型',
    standardCategoryTitle: '传统标准分类',
    noActiveBilling: '暂无活跃账单，快在下方点【新添订阅】吧！',
    currencyFootnote: '汇率参考: 1 USD ≈ 7.25 CNY | 汇率转换由本地离线计算',
    geekFootnote: '五层 AI 蛋糕理论灵感，极客资产专属视角',
    categories: {
      Entertainment: '娱乐🍿',
      Productivity: '生产力🤖',
      Utilities: '公用🔧',
      Cloud: '云端☁️',
      Health: '健康🍀',
      Finance: '金融💰',
      Others: '其他⚙️'
    },
    billingCycle: {
      weekly: '每周',
      monthly: '每月',
      yearly: '每年',
      custom: '自定义'
    }
  },
  en: {
    appName: '5 Layers Panel',
    badge: 'AI Cake Model',
    tagline: '5 layers Subscription Cake Model',
    desc: 'Subscription & cost analysis system based on the 5-layer AI cake theory.',
    longDesc: 'Every day, we pay subscriptions for cloud storage, LLMs, developer workflows, vertical SaaS, and streaming. 5 layers borrows the concepts of the five-layer AI cake theory, letting you look at every penny of your tech costs from a vertical stack perspective, complete with precise real-time countdown clocks and billing reminders to safeguard your wallet.',
    backToIntro: 'Back to Intro',
    exportBackup: 'Export Backup',
    importBackup: 'Import Backup',
    importSuccess: 'Import Successful',
    resetToDemo: 'Reset Data',
    addNewSub: 'Add Subscription',
    enterConsole: 'Enter Dashboard Console',
    exitConsole: 'Exit Console',
    viewPricing: 'View Pricing & Plans',
    gridMode: 'Grid View',
    calendarMode: 'Calendar',
    searchPlaceholder: 'Search subscriptions, notes...',
    clearBtn: 'Clear',
    sortBy: 'Sort By',
    sortCountdown: '⏰ Countdown',
    sortPriceDesc: '💰 Price: High to Low',
    sortPriceAsc: '💰 Price: Low to High',
    sortName: '🔤 Alphabet: A-Z',
    quickFilters: 'Quick Filters',
    allCategories: 'All Categories',
    trackingStatus: 'Status',
    allStatus: 'All',
    activeStatus: 'Monitoring',
    pausedStatus: 'Paused',
    noMatchingSubs: 'No matching subscriptions',
    emptyHint: 'Try clearing your search query, changing filters, or clicking "Add Subscription" to create your first countdown tracker.',
    resetFilters: 'Reset Filters',
    createFirstSub: 'Create First Subscription',
    currentTime: 'System Time: 2026-07-01 (Standard Base)',
    sandboxActive: 'Edge-Encrypted Local Sandbox',
    versionInfo: 'v1.1.0',
    aboutDemoTitle: 'Zero-Trust Local Privacy & Security Architecture',
    aboutDemoDesc: '5 Layers Panel adopts a state-of-the-art Privacy-First offline design. We firmly believe that your subscription records, tech stacks, and digital assets belong to you alone. All data flows are processed and encrypted locally within your browser\'s sandbox (localStorage) and never transit to external servers. Experience professional-grade subscription auditing and intelligent countdown alerts with absolute peace of mind.',
    
    // Cake Layers
    cakeSectionTitle: '🎂 5 layers Subscription Deconstruction',
    cakeSectionDesc: 'We deconstruct all digital bills and services vertically into a 5-layer value cake. From physical compute at the bottom to consumer life at the top, each layer reflects the actual flow of technology value.',
    
    layer5Title: 'L5 Consumer & Digital Life',
    layer5Desc: 'Digital entertainment, shared streaming accounts, health & lifestyle services (e.g., Netflix, Spotify, Bilibili Premium, Gym memberships).',
    
    layer4Title: 'L4 Vertical SaaS & Industry Solutions',
    layer4Desc: 'Targeted workplace and workflow productivity tools or niche SaaS (e.g., Zoom, Slack, Notion, commercial business SaaS).',
    
    layer3Title: 'L3 Developer & Workflow Frameworks',
    layer3Desc: 'Development lifecycles, coding setups, and frameworks connecting intelligence into pipelines (e.g., GitHub Copilot, JetBrains IDEs, Figma, Vercel).',
    
    layer2Title: 'L2 Foundation Models & Cognitive APIs',
    layer2Desc: 'The cognitive core driving modern intelligence workloads (e.g., ChatGPT Plus, Claude Pro, Midjourney, OpenAI/Gemini API developers).',
    
    layer1Title: 'L1 Infrastructure & Compute Power',
    layer1Desc: 'Physical and network bedrock of digital setups (e.g., iCloud, AWS servers, cloud storage, domain registers, local broadband).',

    // Pricing
    pricingTitle: 'Plans & Pricing',
    pricingDesc: 'Choose a plan that fits your subscription volume (Premium plan is just $50/month)',
    pricingNote: 'Both Standard and Premium plans now support UNLIMITED subscription tracking!',
    
    standardName: 'Standard',
    standardPrice: 'Free',
    standardCta: 'Get Started Free',
    
    premiumName: 'Premium',
    premiumPrice: '¥50 / Mo',
    premiumCta: 'Upgrade to Premium',
    premiumAlert: 'Thank you for your support! This feature is being rolled out. In the meantime, click [Enter Console] in the top navigation bar to try all professional billing features!',

    // StatsOverview
    costBreakdown: '5 layers Cost Breakdown',
    catPieTitle: 'Standard Categories',
    cnyEquivalent: 'CNY',
    cnyMonthlyEquiv: 'Monthly Equiv. (CNY)',
    activeCount: 'Active Trackers',
    totalMonthlySpent: 'Monthly Budget',
    upcomingPayments: 'Due in 30 Days',
    upcomingCount: 'Pending Payments',
    alertWarning: 'Renewal Risks',
    alertWarningDesc: 'subscriptions with disabled auto-renew or payment failures',
    allGood: 'Safe & Clear',
    allGoodDesc: 'All upcoming subscriptions have auto-renew properly configured',
    monthlyAverage: 'Daily equiv. about',
    dailySpent: 'Daily approx.',
    cakeSpentTotal: 'Layer Subtotal',
    categorySpentTotal: 'Category Subtotal',
    cakeInsightTitle: 'AI Cake 5-Layers Model',
    standardCategoryTitle: 'Traditional Categories',
    noActiveBilling: 'No active billing items. Click [Add Subscription] to start!',
    currencyFootnote: 'Exchange rates: 1 USD ≈ 7.25 CNY | Local offline conversion',
    geekFootnote: '5-Layer AI Cake Theory design, premium asset perspective',
    categories: {
      Entertainment: 'Entertainment 🍿',
      Productivity: 'Productivity 🤖',
      Utilities: 'Utilities 🔧',
      Cloud: 'Cloud ☁️',
      Health: 'Health 🍀',
      Finance: 'Finance 💰',
      Others: 'Others ⚙️'
    },
    billingCycle: {
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly',
      custom: 'Custom'
    }
  }
};
