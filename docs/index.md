---
layout: home

hero:
  name: "BirdAdmin"
  text: "后台管理系统"
  tagline: 使用流行技术栈快速创建商业级后台管理系统
  image:
    src: /logo.png
    alt: BirdAdmin Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 项目介绍
      link: /guide/
    - theme: alt
      text: Gitee 仓库
      link: https://gitee.com/web_akai/bird-admin

features:
  - icon: ⚡
    title: 流行且稳定的技术栈
    details: Vue 3.5、Vite 7、TypeScript 5.8、Pinia 3 与 Element Plus，组件与 API 按需自动导入。
  - icon: 🔀
    title: 前后端分离
    details: 纯前端脚手架，统一 axios 请求层，开发期由本地 Mock 跑通完整 RBAC 流程，无需后端工程。
  - icon: ✨
    title: 高颜值
    details: 左侧 / 顶部 / 混合三种布局，明亮 / 暗黑 / 跟随系统三种主题，自定义主题色与设置持久化。
  - icon: 🔐
    title: 权限验证
    details: 用户 → 角色 → 菜单 / 按钮的 RBAC 模型，动态注册路由，三种按钮鉴权写法，菜单支持任意层级。
  - icon: 📝
    title: 多页签与国际化
    details: 三种页签风格、拖拽排序与右键菜单；中英双语采用「中文原文作为 i18n key」的方案。
  - icon: 💖
    title: 免费商用
    details: 遵循 MIT 开源协议发布，无需授权即可免费使用。
---

## 一句话了解

BirdAdmin 是基于 **Vue 3.5 + Vite 7 + TypeScript 5.8 + Pinia 3 + Element Plus + UnoCSS** 的后台管理系统前端，支持按用户权限动态注册路由、按钮级鉴权、三种菜单布局、暗黑主题、多页签与中英切换，遵循 MIT 协议免费商用。当前版本 **v1.0.0**（2026-11-20）。

> 本仓库目前是**纯前端脚手架**，没有附带后端工程。所有 `/api/*` 接口由 `vite-plugin-fake-server` 在**开发环境**提供本地 Mock，生产构建不会注入任何假数据或演示账号。本文内容以项目仓库的 README 为准。

## 三分钟跑起来

```bash
# 克隆项目
git clone https://gitee.com/web_akai/bird-admin.git
cd bird-admin

# 安装 pnpm（已安装可跳过）
npm i -g pnpm

# 安装依赖
pnpm install

# 启动开发服务器，默认 http://localhost:9094
pnpm run dev

# 类型检查 / 代码检查
pnpm run typecheck
pnpm run lint

# 打包发布，产物在 dist/
pnpm run build
pnpm run preview
```

环境要求 Node.js `^20.19.0 || >=22.12.0`、pnpm 10.x。启动后访问 `http://localhost:9094/#/login`，用[演示账号](/resources/contact)登录即可体验完整的权限流程。

## 核心依赖一览

| 分类 | 技术 | 版本 |
| --- | --- | --- |
| 框架 | Vue / vue-router / Pinia | 3.5.x / 4.x / 3.x |
| 构建 | Vite / TypeScript / ESLint | 7.x / 5.8.x / 10 |
| UI 与样式 | Element Plus / UnoCSS / Sass | 2.10.x / — / — |
| 数据与工具 | Axios / vue-i18n / VueUse / dayjs | — / 11.x / — / — |
| 开发期 Mock | vite-plugin-fake-server | — |

完整清单与实际使用的技术见[技术栈与依赖](/guide/tech-stack)，各依赖的官方链接见[特别鸣谢](/resources/acknowledgements)。

## 接下来

- [项目介绍](/guide/) —— 定位、纯前端脚手架的现状与适用人群
- [主要特性](/guide/features) —— 六类特性的完整说明
- [快速开始](/guide/getting-started) —— 环境准备、命令与环境变量
- [目录结构](/guide/project-structure) —— 快速找到代码应该放在哪里
- [权限体系](/guide/permission) —— RBAC 模型与新增受控页面的四个步骤
- [接入真实后端](/guide/backend) —— 从本地 Mock 切到真实接口
- [生产部署](/guide/deployment) —— Nginx、子路径、Docker 与发布前检查
- [多仓库同步](/guide/sync-repos) —— 一次推送到 Gitee 与 GitHub
- [贡献与更新日志](/resources/contributing) —— 参与贡献与版本记录
- [联系与演示](/resources/contact) —— 演示账号、QQ 群与反馈渠道
