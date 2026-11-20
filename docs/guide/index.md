# 项目介绍

BirdAdmin 是基于 `Vue 3.5 + Vite 7 + TypeScript 5.8 + Pinia 3 + Element Plus + UnoCSS` 的后台管理系统前端，支持按用户权限动态注册路由、按钮级鉴权、三种菜单布局、暗黑主题、多页签与中英切换，遵循 MIT 协议，无需授权即可免费商用。当前版本 **v1.0.0**（2026-11-20）。

## 这是一个纯前端脚手架

这一点决定了怎么用它，先看清楚再动手：

- 仓库里**没有后端工程**，也没有数据库。`Node.js` / `Next.js` / `Spring Boot` 等后端属于规划能力，尚未实现。
- 所有 `/api/*` 接口由 `vite-plugin-fake-server` 在**开发环境**提供本地 Mock，菜单、角色、用户等 RBAC 数据存在内存里，重启 dev 会恢复种子数据。
- 生产构建不会打包 Mock 代码，也不会注入演示账号；`configMockPlugin(isBuild)` 在 `vite build` 时直接返回 `null`。
- 接入自己的后端时不需要删除 `mock/`，只要按[接入真实后端](/guide/backend)配置接口地址并实现约定的接口即可。

所以这个仓库适合拿来快速验证前端方案、学习 RBAC 与工程化组织方式，或者作为自己项目的前端起点；它不是一个开箱即用的全栈系统。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架与构建 | Vue 3.5、vue-router 4、Pinia 3、Vite 7、TypeScript 5.8、ESLint 10 flat config |
| UI 与样式 | Element Plus 2.10、UnoCSS、Sass、nprogress |
| 数据与工具 | Axios、vue-i18n 11、VueUse、dayjs、vite-plugin-fake-server |
| 工程插件 | unplugin-auto-import、unplugin-vue-components、vite-svg-loader、构建信息统计插件 |

组件与 API 按需自动导入；本地 SVG 通过 `vite-svg-loader` 组件化，也可以用 UnoCSS 的 `i-svg:图标名` 直接引用。完整说明见[技术栈与依赖](/guide/tech-stack)。

## 界面与模块

项目使用 hash 路由，主要入口路径：

| 模块 | 入口路径 | 说明 |
| --- | --- | --- |
| 登录 | `/login` | 账号密码登录、大小写锁定提示、暗色主题与语言切换 |
| 控制台 | `/dashboard` | 登录后的默认首页，`redirect` 指向首个可访问页面 |
| 系统管理 | `/system/menu`、`/system/role`<br>`/system/user`、`/system/dept`<br>`/system/post`、`/system/dict` | 六类资源由同一套 schema 渲染，支持树形表格、分页筛选、CRUD、角色授权与用户分配角色 |
| 异常页面 | `/error/403`、`/error/404`、`/error/500` | 统一 `el-result` 风格，404 兼作路由兜底页面 |
| 权限管理 | `/permission/page`、`/permission/button` | 切换演示账号观察菜单变化，演示指令 / 组件 / 函数三种按钮鉴权 |
| 其他 | `/empty`、`/redirect/:path` | 全屏空白页示例、页签刷新中转路由 |

![BirdAdmin 控制台首页](/screenshots/dashboard.png)

上图是登录后的控制台。当前仓库版本的正文区域只有 `welcome` 占位文本，还没有填充业务卡片。另外三张截图（登录、菜单管理、404）集中放在[页面预览](/guide/screenshots)，本地 `pnpm dev` 后访问 `http://localhost:9094/#/login` 也可以直接体验。

## 在本站里继续看

- [主要特性](/guide/features) —— 六类特性逐条说明
- [页面预览](/guide/screenshots) —— 登录、控制台、菜单管理与 404 截图
- [快速开始](/guide/getting-started) —— 环境要求、命令与环境变量
- [实现状态与路线图](/guide/roadmap) —— 哪些已经能用，哪些还在规划
- [常见问题与已知限制](/guide/faq) —— 上手前值得先读的一页
- [联系与演示](/resources/contact) —— 演示账号、QQ 群与反馈渠道

> 本站内容整理自项目仓库的 README。版本、路线和版权信息以项目仓库为准，本站不做额外承诺。
