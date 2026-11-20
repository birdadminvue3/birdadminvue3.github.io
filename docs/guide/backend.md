# 接入真实后端

项目是纯前端脚手架，切到真实后端只需要改环境变量并实现约定的接口，不需要删除 `mock/` 目录。

## 五个步骤

1. **配置接口地址。** 在 `.env.production` 设置 `VITE_API_BASE_URL`（如 `https://api.example.com/api`）。如果只需本地代理，设置 `VITE_API_PROXY_TARGET`；注意 `build/vite/server.ts` 会把 `/api` 前缀 `rewrite` 掉，后端路由不要重复带 `/api`。
2. **统一响应结构。** 实现[Mock 接口清单](/guide/mock-api)里的接口，统一返回 `{ code, data, message }`，成功码为 `200` 或 `0`；错误时 HTTP 保持 200，并在 `message` 中给出原因。
3. **实现三个认证接口。** 登录接口返回 `{ accessToken, refreshToken, expiresIn, ...用户资料 }`，`expiresIn` 单位是秒；`GET /auth/getUserInfo` 返回 `UserProfile`（含 `roles`、`permissions`）；`GET /auth/routes` 返回 `MenuRoute[]`，其中 `component` 必须是 `componentMap` 里已登记的标识。
4. **处理 401。** 请求层在 401 时会用 `POST /auth/refresh-token` 刷新并重放原请求；刷新失败会清空 token 并跳转 `/#/login`。后端需要保证刷新接口能按约定返回新 token。
5. **保持 Mock 目录不动。** `configMockPlugin(isBuild)` 仅在 `vite build` 时返回 `null`，生产包不含 Mock 代码与演示账号，不需要手工删除。

## 需要注意的边界

- 可视化权限配置目前只在 dev 的内存里做 CRUD，尚未落库。真实后端要有自己的菜单表、角色表与授权逻辑，并按用户下发菜单树。
- `component` 字段必须与 `src/store/modules/permission.ts` 的 `componentMap` 对应，否则动态路由注册后找不到组件。见[权限体系](/guide/permission)。
- 后端菜单标题用中文原文下发即可，前端会通过 `menus.<中文原文>` 做翻译，未登记词条回退中文。见[外观设置与国际化](/guide/configuration)。
- token 目前存 `localStorage`，生产环境建议改为 `httpOnly` Cookie 并配合 CSRF 防护，见[常见问题与已知限制](/guide/faq)。

## 相关页面

- [Mock 接口清单](/guide/mock-api) —— 需要实现的完整路径清单与业务码
- [请求层](/guide/request) —— 响应约定与 `requestOptions`
- [环境变量](/guide/getting-started) —— 各个 `VITE_*` 变量的作用
