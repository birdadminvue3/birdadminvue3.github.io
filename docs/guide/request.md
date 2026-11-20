# 请求层

所有接口统一从 `@/utils/request` 导入 `request` 单例。`baseURL` 取自 `VITE_API_BASE_URL`（默认 `/api`），超时 15 秒，请求自动附加 `Authorization: Bearer <token>`。

## 写一个接口

```ts
import { request } from "@/utils/request";
import type { BaseResponse } from "@/utils/request/types";

// url 不要写 /api 前缀
export function getUserListApi(params: PageQuery) {
  return request.get<BaseResponse<PageResult<SysUser>>>("/user/list", params, {
    requestOptions: { showLoading: false, retryCount: 2 },
  });
}
```

::: warning
`VITE_API_BASE_URL` 已经包含 `/api`，`src/api/**` 里的 url 不要再带这个前缀，否则会请求到 `/api/api/...` 并返回 404。
:::

## 响应约定

- 统一返回 `{ code, data, message }`，成功码为 `200` 或 `0`。
- 其他业务码会弹出服务端文案，并 `reject` 一个携带 `code` / `data` 的 `Error`。
- `blob` / `arraybuffer` 响应返回完整的 `AxiosResponse`，方便下载逻辑读取响应头。

分页参数是 `pageNum` / `pageSize`，返回 `{ list, total, pageNum, pageSize }`。业务码说明见[Mock 接口清单](/guide/mock-api)。

## requestOptions

| 选项 | 默认值 | 作用 |
| --- | --- | --- |
| `showLoading` / `loadingText` | `true` / `加载中...` | 全屏 loading，内部引用计数避免并发闪烁 |
| `cancelRepeatRequest` | `true` | 按 method + url + params + data 取消重复请求（`FormData` 不参与去重） |
| `autoRefreshToken` | `true` | 401 自动刷新 token 并重放；临期（5 分钟内）后台静默续期 |
| `handleErrorStatus` / `showErrorMessage` | `true` / `true` | HTTP 状态码与业务码统一处理 / 错误提示 |
| `queueWhenOffline` | `true` | 离线时入队，网络恢复后用原 axios 实例重放 |
| `retryCount` / `retryDelay` | `0` / `1000` | 网络错误或 5xx 自动重试 |
| `cacheBust` / `skipBusinessCheck` | `false` | GET 追加时间戳 / 跳过业务码判定 |
| `fileName` / `timeout` / `errorHandler` | — | 下载文件名 / 单次超时 / 自定义错误处理 |

除 `request` 外，还导出了 `upload()`、`uploadMultiple()`、`download()`（支持 `Content-Disposition` 的 `filename*=UTF-8''...`）、`exportExcel()`、`cancelAllRequests()` 和 `clearOfflineQueue()`。

## token 与安全

token 目前存于 `localStorage`，键名是 `AUTH_TOKEN` / `REFRESH_TOKEN` / `TOKEN_EXPIRES_AT`，存在 XSS 风险。生产环境建议改为 `httpOnly` Cookie 并配合 CSRF 防护，详见[常见问题与已知限制](/guide/faq)。

401 时请求层会用 `POST /auth/refresh-token` 刷新并重放原请求；刷新失败会清空 token 并跳转 `/#/login`。

## 相关页面

- [接入真实后端](/guide/backend) —— 后端要实现哪些接口、返回什么结构
- [Mock 接口清单](/guide/mock-api) —— 开发期可用的完整接口列表
- [常见问题与已知限制](/guide/faq) —— 404、栈溢出等排查
