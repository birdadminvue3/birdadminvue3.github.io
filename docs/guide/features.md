# 主要特性

这一页把 README 里列出的特性按用途展开。所有描述都对应仓库当前已经实现的能力，规划中的功能放在[实现状态与路线图](/guide/roadmap)。

## 流行且稳定的技术栈

`Vue 3.5` 使用 `<script setup>` 组合式 API，配合 `Vite 7`、`TypeScript 5.8`、`Pinia 3`、`vue-router 4`、`Element Plus 2.10`、`UnoCSS`、`vue-i18n 11`、`VueUse` 与 `Sass`。

组件和 API 通过 `unplugin-vue-components` / `unplugin-auto-import` 按需自动导入，不需要在每个文件里手写一大串 import。本地 SVG 由 `vite-svg-loader` 组件化，也可以通过 UnoCSS 的 `i-svg:图标名` 直接使用。详见[技术栈与依赖](/guide/tech-stack)。

## 前后端分离

仓库只含前端代码，通过统一的 `axios` 请求层与后端通信：

- 接口前缀由 `VITE_API_BASE_URL` 统一配置，默认是 `/api`。
- 响应统一为 `{ code, data, message }`，成功码为 `200` 或 `0`。
- 认证走 `Authorization: Bearer <token>`。
- 开发期可以直接用本地 Mock 联调，也可以配置 `VITE_API_PROXY_TARGET` 代理到真实后端。

前端开发者不需要掌握任何后端代码，就能跑通登录、动态路由和权限校验的完整流程。请求层的用法见[请求层](/guide/request)，接口清单见[Mock 接口清单](/guide/mock-api)。

## 高颜值

- 提供 `左侧 / 顶部 / 混合` 三种菜单布局，以及经典蓝、极简白两种侧栏配色。
- 明亮 / 暗黑 / 跟随系统三种主题，支持自定义主题色，并用 `View Transition` 做圆形扩散切换动画。
- 水印、组件尺寸、固定头部、Logo 与面包屑开关都可配置。
- 设置全部可持久化，支持一键复制当前配置与恢复默认。

设置状态与 i18n 的实现见[外观设置与国际化](/guide/configuration)。

## 权限验证

采用「用户 → 角色 → 菜单 / 按钮」的 RBAC 模型。登录后由 `/auth/routes` 下发当前用户可访问的菜单树，前端转换为 `RouteRecordRaw` 并用 `router.addRoute` 动态注册。

按钮级权限同时提供三种等价用法：`v-permission` 指令、`<Auth>` 组件与 `hasPermission()` 函数。超级管理员的权限码是 `*:*:*`，菜单树支持任意层级父子结构。

::: warning
可视化权限配置目前由 Mock 的内存 CRUD 承载，**尚未落库**。接入真实后端后需要由后端菜单表下发，见[接入真实后端](/guide/backend)。
:::

完整的权限模型与新增受控页面的步骤见[权限体系](/guide/permission)。

## 多页签与国际化

页签支持灵动 / 卡片 / Chrome 三种风格、滚轮横向滚动与溢出箭头、拖拽排序、中键关闭、右键菜单，以及右侧下拉操作（重新加载、关闭当前、关闭左 / 右 / 其他 / 全部）和可选持久化。

中英双语采用「中文原文作为 i18n key」的方案，后端下发的菜单标题与 `document.title` 会自动翻译；未登记的词条自动回退中文原文，不会显示成空白或 key 名。

## 其他杂项

内置 403 / 404 / 500 异常页、动态页面标题、NProgress 进度条、仅 dev 生效的控制台欢迎横幅、ESLint 10 flat config，以及构建信息统计插件。

## 相关页面

- [目录结构](/guide/project-structure) —— 每个特性对应的源码位置
- [路由与多页签](/guide/routing) —— 守卫、动态路由与页签刷新
- [常见问题与已知限制](/guide/faq) —— 上手前值得先读
