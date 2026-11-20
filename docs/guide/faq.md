# 常见问题与已知限制

上手时最常遇到的问题，以及当前实现里需要提前知道的边界。排查表与项目 README 的「常见问题与已知限制」保持一致。

## 常见排查

| 问题 | 说明 |
| --- | --- |
| Mock 数据为什么重启后还原？ | 数据挂在 `globalThis.__BIRD_ADMIN_RBAC_DB_V1__` 内存单例，仅在 dev 进程内共享；种子变化会按签名自动重建，重启 dev 恢复种子数据。由于 `vite-plugin-fake-server` 对每个 mock 文件单独 bundle，跨文件共享状态**必须**挂 `globalThis`，普通模块级变量会被复制成多份。 |
| 接口 404 / 出现 `/api/api/...`？ | `VITE_API_BASE_URL` 已包含 `/api`，`src/api/**` 里的 url 不要再带前缀。 |
| 登录后报 `Maximum call stack size exceeded`？ | 使用 hash 路由时，静态兜底路由必须渲染 404 组件；若 `redirect` 到动态注入的 `/dashboard`，会在进入守卫前自递归。另不要在 `next()` 里回传整个 `to` 对象，只传 `path` / `query` / `hash`。 |
| 想换 dev 端口？ | 用 `pnpm exec vite --port 9095`；`pnpm dev -- --port X` 经 pnpm 转发不会生效。端口被占用时 Vite 会自动顺延。 |
| 主题切换没有动画？ | 圆形扩散依赖 `document.startViewTransition`，不支持的浏览器或开启「减少动态效果」时自动降级为直接切换。 |
| 语言切换后菜单没翻译？ | 检查 `src/locales/modules/*.ts` 的 `menus` 下是否有对应中文原文词条；未登记时会回退显示中文。 |
| 改了角色权限，页面没变化？ | 动态路由只在登录与刷新时通过 `/auth/routes` 拉取，改完权限需退出重登或刷新页面才会生效。 |
| 页签 / 布局错乱，想恢复默认？ | 清除 `localStorage` 中的 `bird-setting-*`、`bird-tags-views`、`bird-tags-cache` 后刷新；或在设置抽屉点「恢复默认」。 |
| 部署后直接访问子路由 404？ | 当前为 hash 路由，地址形如 `/#/system/menu`，服务器 root 指向 `dist/` 即可；若改成 history 模式，需要额外配置 `try_files` 回退到 `index.html`。见[生产部署](/guide/deployment)。 |
| 换了主题色，部分地方还是蓝色？ | 这些位置大概率写死了色值，改成 `var(--el-color-primary)` 或 `var(--el-color-primary-light-N)` 即可跟随主题。 |
| Node 版本不兼容？ | Vite 7 要求 `^20.19.0 \|\| >=22.12.0`，旧资料里的 Node 16 / 18 已不适用，见[快速开始](/guide/getting-started)。 |

## 已知限制

**token 安全**

目前 token 存于 `localStorage`（`AUTH_TOKEN` / `REFRESH_TOKEN` / `TOKEN_EXPIRES_AT`），存在 XSS 风险；生产环境建议改为 `httpOnly` Cookie 并配合 CSRF 防护。

**权限数据未落库**

可视化权限配置由 Mock 的内存 CRUD 承载，重启即还原。需要持久化时按[接入真实后端](/guide/backend)由后端下发菜单树。

**没有在线演示站与后端工程**

项目暂无在线演示站，也没有附带后端；演示账号仅 dev 有效，生产构建不含 Mock 凭据。见[联系与演示](/resources/contact)与[实现状态与路线图](/guide/roadmap)。

**MIT 协议与许可文件**

项目仓库根目录已提供 MIT `LICENSE` 文件，README 与版本徽标均声明 MIT 协议，无需授权即可免费商用。第三方源码与二进制文件的版权信息另行标注，见[特别鸣谢与版权](/resources/acknowledgements)。

## 相关页面

- [Mock 接口清单](/guide/mock-api) —— 接口路径、分页参数与业务码
- [请求层](/guide/request) —— 401 刷新、重放与错误处理
- [路由与多页签](/guide/routing) —— 守卫与 hash 路由兜底
- [生产部署](/guide/deployment) —— Nginx、子路径与发布前检查
