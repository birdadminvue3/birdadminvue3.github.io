# 生产部署

`pnpm build` 产出的 `dist/` 是纯静态文件，静态服务器、对象存储或 CDN 都可以直接托管。这一页整理项目 README 里的部署示例与发布前检查项。

::: tip
项目使用 **hash 路由**（地址形如 `/#/system/menu`），部署到任意静态服务器都不需要额外配置 history 回退。
:::

## 1. Nginx 示例（推荐）

```nginx
server {
    listen       80;
    server_name  admin.example.com;
    root         /var/www/bird-admin/dist;
    index        index.html;

    # 入口文件不缓存，避免发版后仍加载旧资源
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 带 hash 的静态资源可长期缓存
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 接口反向代理（可选；也可让 VITE_API_BASE_URL 直连后端域名）
    location /api/ {
        proxy_pass       http://127.0.0.1:8080/;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    }

    # 当前使用 hash 路由，这一条并非必需，保留可兼容将来切到 history 模式
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

几个要点：

- `index.html` 禁缓存，否则发版后用户可能仍加载旧的带 hash 资源。
- `location /api/` 是可选方案；也可以在 `.env.production` 把 `VITE_API_BASE_URL` 直接指向后端域名，见[接入真实后端](/guide/backend)。
- `try_files` 当前非必需，只是为将来切到 history 模式预留；保留不会影响 hash 路由。

## 2. 部署到子路径

站点不在域名根目录时（如 `https://example.com/admin/`），构建前把 `VITE_BASE_PATH` 改成 `/admin/`：

```bash
# macOS / Linux
VITE_BASE_PATH=/admin/ pnpm build

# Windows PowerShell
$env:VITE_BASE_PATH="/admin/"; pnpm build
```

## 3. Docker（可选）

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

多阶段构建把 Node 工具链留在 `build` 阶段，最终镜像只包含 Nginx 与静态文件。`pnpm install --frozen-lockfile` 保证镜像内的依赖版本可复现。

## 4. 发布前检查清单

- [ ] `.env.production` 的 `VITE_API_BASE_URL` 已指向真实后端
- [ ] 后端已实现 [Mock 接口清单](/guide/mock-api) 中的接口，响应结构一致
- [ ] `pnpm typecheck` 与 `pnpm lint` 均通过
- [ ] 浏览器验证登录、刷新页面（动态路由重建）、退出登录三条主链路
- [ ] 确认 `dist/` 内不含演示账号与 Mock 数据
- [ ] 首屏偏慢时检查网络面板：`build/vite/build.ts` 已按 `node_modules` 顶层包拆 vendor，警告阈值放宽到 2000 kB

::: warning
生产构建会移除 `console` / `debugger`（`VITE_DROP_CONSOLE=true`）且不生成 sourcemap。如需排查线上问题，临时把该变量改为 `false` 重新构建，排查完记得改回来。
:::

## 相关页面

- [接入真实后端](/guide/backend) —— 接口地址与响应约定
- [快速开始](/guide/getting-started) —— 环境变量与构建命令
- [常见问题与已知限制](/guide/faq) —— 子路由 404、主题色等排查
