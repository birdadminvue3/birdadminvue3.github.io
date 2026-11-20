# 外观设置与国际化

这一页讲设置存在哪里、主题怎么生效，以及中英双语的词条规则。入口是顶栏的「项目设置」抽屉。

## 可配置的项

- `左侧 / 顶部 / 混合` 三种菜单布局，经典蓝与极简白两种侧栏配色。
- 明亮 / 暗黑 / 跟随系统三种主题，以及自定义主题色。
- 水印、组件尺寸、固定头部、Logo 与面包屑开关。
- 设置支持一键复制当前配置与恢复默认。

## 状态存哪里

设置状态在 `src/store/modules/settings.ts`，通过 `useStorage` 持久化到 `localStorage`，键名前缀是 `bird-setting-*`。页签数据用 `bird-tags-views` / `bird-tags-cache`。

主题由 `App.vue` 的 `watch` 同步到三个位置：`html.dark`、`body[data-layout]`、`html[data-sidebar-color]`。主题色由 `src/utils/theme.ts` 派生 Element Plus 的 `light-{3,5,7,8,9}` 与 `dark-2` CSS 变量。

自定义主题色使用 `View Transition` 做圆形扩散切换动画，依赖 `document.startViewTransition`。不支持的浏览器或开启「减少动态效果」时，会自动降级为直接切换，不会报错。

## 国际化

语言包位于 `src/locales/modules/`，命名空间包括 `route`、`menus`、`error`、`permission`、`login`、`navbar`、`tagsView`、`sizeSelect`、`langSelect`、`settings`。

中英双语采用「中文原文作为 i18n key」的方案：后端下发的菜单标题走 `useMenuTitle()` 的 `menus.<中文原文>` key，页面标题由 `router.afterEach` 调用 `setPageTitle()` 生成「页面标题 - 系统名」。未登记的词条自动回退中文原文。

::: tip
语言切换后菜单没翻译，先检查 `src/locales/modules/*.ts` 的 `menus` 下有没有对应的中文原文词条；没登记时会回退显示中文，这是预期行为，不是 bug。
:::

## 图标

本地 SVG 放进 `src/assets/svg/` 后，可以用 `i-svg:文件名` 引用，`uno.config.ts` 会自动生成 safelist。带原色的图标放到 `preserve-color/` 子目录，避免被 UnoCSS 改色。

## 相关页面

- [主要特性](/guide/features) —— 三种布局与页签风格的完整说明
- [路由与多页签](/guide/routing) —— 页签操作与动态页面标题
- [目录结构](/guide/project-structure) —— 这些文件分别在哪个目录
