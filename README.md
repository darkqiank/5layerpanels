# 5 Layers Panel — 5层 AI 蛋糕理论订阅追踪控制台

[![GitHub Repo](https://img.shields.io/badge/GitHub-darkqiank%2F5layerpanels-blue?style=flat&logo=github)](https://github.com/darkqiank/5layerpanels)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Built with React + Vite](https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-indigo)](https://vitejs.dev)

**5 Layers Panel** 是一款基于黄仁勋五层 AI 蛋糕理论（Jensen Huang's 5-Layer AI Cake Theory）专门设计的订阅追踪与成本控制面板。专为开发者、AI 创作者及科技极客量身定制，通过精细化分层解析，协助您全面掌控从算力底座到数字娱乐的数字资产流向，实现精细化开支审计与精准到期提醒。

---

## 🎨 核心设计主题：黄仁勋五层 AI 蛋糕理论

本面板突破传统记账软件简陋的分类限制，完美契合当下 AI 与数字化浪潮的五个层级：

1. **算力基建层 (Compute Infrastructure)**：GPU 算力平台、云服务器、CDN 与存储服务等基础设施（例如 RunPod, Lambda Labs, AWS, Google Cloud, Vercel）。
2. **大模型底座层 (Core Models / AI Engines)**：API 模型接口与顶尖生成式 AI 服务（例如 OpenAI, Anthropic, Midjourney, Gemini API）。
3. **开发者工具层 (Developer Tools / Frameworks)**：大幅提升工程效能的智能 IDE 及数据库等开发套件（例如 Cursor, GitHub Copilot, Supabase, Neon）。
4. **业务应用层 (Business Applications / SaaS)**：赋能日常协作、笔记整理与效率加速的各类 SaaS 软件（例如 Notion, Slack, Zoom, Microsoft 365）。
5. **数字娱乐层 (Consumer Entertainment)**：个人数字生活与媒体影音订阅（例如 Netflix, Spotify, YouTube Premium, Apple One, iCloud）。

---

## 🔐 零信任本地安全沙箱 (Zero-Trust Local Sandbox)

*   **100% 隐私安全**：我们坚信您的订阅账单、API 密钥与资产开销属于您个人。5 Layers Panel 采用高规格的 **Privacy-First (隐私至上)** 离线设计，数据流完全隔离在浏览器的本地加密沙箱 (`localStorage`) 中。
*   **不传输至远端**：应用无任何外发遥测、上云传输或第三方同步行为。无需注册，开箱即用。
*   **高可靠备份**：提供高精度的 JSON 导入与导出功能，本地资产账单，完全由您自主掌控与物理备份。

---

## ✨ 核心特色功能

*   **⏳ 周期到期提醒**：采用卡片及直观日历双重视图，精准追踪各项订阅下一次续费的精确天数。内置“账单预警中心”自动识别即将扣款的订阅并高亮提醒。
*   **📊 成本可视化看板**：按“五层理论”直观拆解并动态统计您的周度、月度、年度总技术开支比例，让您清楚获知自己的“AI 投资比”。
*   **💱 动态多货币支持**：自动适配多币种核算，无论您的订阅使用 USD, CNY, EUR 还是 JPY，系统皆能精准汇算。
*   **⚡ 响应式极致体验**：基于 React 18 与 Tailwind CSS 设计，完美适配手机、平板、台式机屏幕，支持一键中英文切换。

---

## 🛠️ 本地开发与构建

### 1. 克隆并安装依赖
```bash
git clone https://github.com/darkqiank/5layerpanels.git
cd 5layerpanels
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
本地开发服务器将运行在：`http://localhost:3000`

### 3. 构建生产环境产物
```bash
npm run build
```
构建产物将输出在 `/dist` 目录。

---

## 📄 开源许可

本项目采用 [Apache-2.0 License](./LICENSE) 协议开源。品牌归属于 **@5layers.ai**。

---

# English Introduction

**5 Layers Panel** is a beautifully designed subscription tracker and cost console conceptualized around **Jensen Huang's 5-Layer AI Cake Theory**. Designed for modern developers, AI builders, and technology power users to balance digital budgets and technical stacks securely.

### 🍰 The 5-Layer Architecture:
1.  **Compute Infrastructure**: GPU cloud hosts, cloud infrastructure, and databases (e.g., RunPod, AWS, Vercel).
2.  **Core Models**: Foundation model APIs and content generators (e.g., OpenAI API, Anthropic Claude, Midjourney).
3.  **Developer Tools**: Intelligent tools and infrastructure suites boosting engineering leverage (e.g., Cursor, GitHub Copilot, Supabase).
4.  **Business Applications**: Software-as-a-Service powering workflow, writing, and team collaboration (e.g., Notion, Slack, Zoom).
5.  **Consumer Entertainment**: Media streaming, storage, and private utilities (e.g., Netflix, Spotify, Apple One).

### 🛡️ Privacy Safeguards:
*   **100% Client-Side Sandbox**: All subscriptions, pricing models, and tech expenses are stored and computed locally inside your browser via standard `localStorage` with edge encapsulation.
*   **Zero External Overhead**: Zero server transits, trackers, or account mandates. Includes clean JSON backup export and import controls for full data autonomy.

---

Designed with care by **@5layers.ai**. Contributions are welcome!
