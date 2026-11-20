# Mock 接口清单

开发环境的 `/api/*` 接口由 `vite-plugin-fake-server` 提供，代码在 `mock/rbac/`。以下路径均相对 `VITE_API_BASE_URL`（默认 `/api`）。除 `/login` 与 `/auth/refresh-token` 外，都需要携带 `Authorization: Bearer <token>`。

::: warning
Mock 只在 dev 进程里存在，生产构建不会打包这些接口，也不会注入演示账号。真实后端需要按[接入真实后端](/guide/backend)实现同样的路径与响应结构。
:::

## 认证

| 分组 | 接口 |
| --- | --- |
| 认证 | `POST /login`、`POST /auth/refresh-token`、`GET /auth/getUserInfo`、`GET /auth/routes`、`POST /auth/logout` |

## 六类资源

| 分组 | 接口 |
| --- | --- |
| 菜单 | `GET /menu/tree`、`GET /menu/list`（树形，关键字过滤保留祖先链）、`GET /menu/:id`、`POST /menu`、`PUT /menu/:id`、`DELETE /menu/:id` |
| 角色 | `GET /role/list`、`GET /role/options`、`GET /role/:id`、`POST /role`、`PUT /role/:id`、`DELETE /role/:id`、`PUT /role/:id/permissions`、`PUT /role/:id/status` |
| 用户 | `GET /user/list`、`GET /user/:id`、`POST /user`、`PUT /user/:id`、`DELETE /user/:id`、`PUT /user/:id/roles`、`PUT /user/:id/password`、`PUT /user/:id/status` |
| 部门 | `GET /dept/tree`、`GET /dept/list`、`GET /dept/:id`、`POST /dept`、`PUT /dept/:id`、`DELETE /dept/:id` |
| 岗位 | `GET /post/list`、`GET /post/options`、`GET /post/:id`、`POST /post`、`PUT /post/:id`、`DELETE /post/:id` |
| 字典类型 | `GET /dict/type/list`、`GET /dict/type/:id`、`POST /dict/type`、`PUT /dict/type/:id`、`DELETE /dict/type/:id` |
| 字典数据 | `GET /dict/data/list`、`GET /dict/data/options`、`GET /dict/data/:id`、`POST /dict/data`、`PUT /dict/data/:id`、`DELETE /dict/data/:id` |

## 分页与业务码

分页参数是 `pageNum` / `pageSize`，返回 `{ list, total, pageNum, pageSize }`。

| 业务码 | 含义 |
| --- | --- |
| `200` / `0` | 成功 |
| `401` | 未登录或 token 失效 |
| `403` | 无权限 |
| `404` | 资源不存在 |
| `10002` | 密码错误 |
| `10003` | 账号停用 |
| `10005` | 参数错误 |
| `10006` | 数据冲突 |

## 数据为什么重启就还原

Mock 的数据挂在 `globalThis.__BIRD_ADMIN_RBAC_DB_V1__` 内存单例上，只在 dev 进程内共享；种子变化会按签名自动重建。

因为 `vite-plugin-fake-server` 对每个 mock 文件单独 bundle，跨文件共享状态**必须**挂 `globalThis`，普通模块级变量会被复制成多份。这是设计取舍，不是缺陷；需要持久化时请[接入真实后端](/guide/backend)。

## 相关页面

- [请求层](/guide/request) —— 统一响应与 `requestOptions`
- [权限体系](/guide/permission) —— 菜单树种子与角色授权
- [常见问题与已知限制](/guide/faq) —— 404、栈溢出等排查
