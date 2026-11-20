# 技术栈与依赖

这一页列出项目**实际使用**的技术与工具，版本以仓库 README 的徽标和 `package.json` 的 `engines` 为准。没在仓库里用到的库不列入。

## 运行环境

| 项目 | 要求 |
| --- | --- |
| Node.js | `^20.19.0 \|\| >=22.12.0` |
| pnpm | 10.x |

Vite 7 已经不再支持 Node 16 / 18，看到旧资料里写「Node 16+」时请以这里的 `engines` 为准。

## 精确版本对照

上面各表用徽标里的大版本描述能力边界；README 的「技术栈」表给出了 `package.json` 实际锁定的精确版本，需要核对依赖升级时以这张表为准。

| 分类 | 依赖 | 版本 | 用途 |
| --- | --- | --- | --- |
| 框架 | vue | 3.5.18 | `<script setup>` 组合式 API |
| 路由 | vue-router | 4.5.1 | Hash 模式，登录后 `addRoute` 注入动态路由 |
| 状态 | pinia | 3.0.3 | app / settings / user / permission / tags-view |
| 构建 | vite | 7.1.2 | 配置拆分为 resolve / plugin / server / build |
| 语言 | typescript | 5.8.3 | `vue-tsc --noEmit` 严格类型检查 |
| UI | element-plus | 2.10.7 | 按需自动导入，暗色走 CSS 变量 |
| 样式 | unocss / sass-embedded | 66.5.0 / 1.90.0 | 原子类 + 局部 SCSS |
| 国际化 | vue-i18n | 11.1.11 | `legacy: false` 组合式 API |
| 请求 | axios | 1.11.0 | 拦截器、重试、取消、离线队列 |
| 工具 | @vueuse/core / dayjs | 13.7.0 / 1.11.13 | 响应式工具与时间格式化 |
| Mock | vite-plugin-fake-server | 2.2.0 | 仅开发环境生效，构建时移除 |
| 规范 | eslint | 10.15.0 | flat config + vue / typescript 插件 |

## 框架与构建

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Vue | 3.5.x | `<script setup>` 组合式 API |
| vue-router | 4.x | hash 路由、守卫与动态注册 |
| Pinia | 3.x | app / settings / user / permission / tags-view 状态 |
| Vite | 7.x | 开发服务器与生产构建 |
| TypeScript | 5.8.x | 类型检查，`vue-tsc --noEmit` 先行于打包 |
| ESLint | 10 | flat config 代码检查 |

## UI 与样式

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Element Plus | 2.10.x | 组件库，按需自动导入 |
| UnoCSS | — | 原子化样式、快捷类与本地 SVG 图标集合 |
| Sass | — | 样式预处理 |
| nprogress | — | 路由切换进度条 |

## 数据与工具

| 技术 | 版本 | 用途 |
| --- | --- | --- |
| Axios | — | 统一请求层 |
| vue-i18n | 11.x | 中英双语 |
| VueUse | — | `useStorage` 等组合式工具 |
| dayjs | — | 日期处理 |
| vite-plugin-fake-server | — | **仅 dev** 生效的本地 Mock |

## 工程插件

| 插件 | 用途 |
| --- | --- |
| unplugin-auto-import | API 按需自动导入 |
| unplugin-vue-components | 组件按需自动导入 |
| vite-svg-loader | 本地 SVG 组件化 |
| 构建信息统计插件 | dev 端输出文件数与体积 |

生产构建按 `static/js|css|imgs` 分目录输出，不生成 sourcemap，并通过 `esbuild.drop` 移除 `console` 与 `debugger`。

## 参考项目与工具

布局与页签设计参考 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)，国际化与主题切换特效参考 [cool-admin-vue](https://gitee.com/cool-team/cool-admin-vue)。开发工具使用 VSCode，AI 支持由 WorkBuddy 提供。完整的致谢与版权信息见[特别鸣谢与版权](/resources/acknowledgements)。

## 相关页面

- [主要特性](/guide/features) —— 这些技术组合起来提供了什么
- [目录结构](/guide/project-structure) —— 各类代码放在哪里
- [请求层](/guide/request) —— Axios 封装的用法
