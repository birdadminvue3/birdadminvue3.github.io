# 路由与多页签

项目使用 hash 路由，路由相关的代码集中在 `src/router/`，页签状态在 `src/store/modules/tags-view.ts`。

## 路由守卫与动态注册

- 登录后由 `/auth/routes` 下发菜单树，转换成 `RouteRecordRaw` 后用 `router.addRoute` 注册。
- 刷新页面时守卫先 `GET /auth/getUserInfo` 恢复用户资料，再取菜单树生成动态路由。
- 静态兜底路由渲染 404 组件，404 同时兼作路由兜底页面。
- 控制台 `/dashboard` 是登录后的默认首页，`redirect` 指向首个可访问页面。

::: danger
使用 hash 路由时，静态兜底路由必须渲染 404 组件。如果把它 `redirect` 到动态注入的 `/dashboard`，会在进入守卫前自递归，报 `Maximum call stack size exceeded`。另外不要在 `next()` 里回传整个 `to` 对象，只传 `path` / `query` / `hash`。
:::

![BirdAdmin 404 页面](/screenshots/404.png)

404 页面用居中的橙色感叹号和大号数字呈现，文案是「页面不存在，或当前账号无权访问」，下方有「返回首页」和「返回上一页」两个按钮。它同时用于路由兜底和无权限访问两种场景，完整截图见[页面预览](/guide/screenshots)。

## 认证相关的处理

请求层与路由守卫配合完成了 token 持久化与过期判断、并发刷新订阅、401 重放、离线队列、重复请求取消和 hash 路由兜底 404。细化说明见[请求层](/guide/request)。

token 放在 `localStorage`（`AUTH_TOKEN` / `REFRESH_TOKEN` / `TOKEN_EXPIRES_AT`），生产环境的安全建议见[常见问题与已知限制](/guide/faq)。

## 多页签

页签支持：

- 灵动 / 卡片 / Chrome 三种风格。
- 滚轮横向滚动与溢出箭头、拖拽排序、中键关闭、右键菜单。
- 右侧下拉操作：重新加载、关闭当前、关闭左 / 右 / 其他 / 全部。
- 可选持久化，键名 `bird-tags-views` / `bird-tags-cache`。

`/redirect/:path` 是页签刷新的中转路由，`/empty` 是全屏空白页示例。

## 页面标题与语言

`router.afterEach` 调用 `setPageTitle()` 生成「页面标题 - 系统名」。语言切换后，后端下发的菜单标题由 `useMenuTitle()` 走 `menus.<中文原文>` 的 key 翻译，未登记词条回退中文原文。详见[外观设置与国际化](/guide/configuration)。

## 相关页面

- [权限体系](/guide/permission) —— 菜单树、权限码与新增受控页面
- [常见问题与已知限制](/guide/faq) —— 栈溢出、端口、主题动画降级
- [项目介绍](/guide/) —— 主要入口路径一览
