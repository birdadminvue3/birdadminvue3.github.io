# 快速开始

这一页讲怎么把 BirdAdmin 前端跑起来。项目本身是纯前端脚手架，开发环境的接口由本地 Mock 提供，不需要准备数据库或后端服务。

## 环境要求

| 项目 | 要求 |
| --- | --- |
| Node.js | `^20.19.0 \|\| >=22.12.0`（见 `package.json` 的 `engines`；Vite 7 不再支持 Node 16 / 18） |
| 包管理器 | pnpm 10.x |
| 浏览器 | 支持 `document.startViewTransition` 的浏览器可获得主题切换动画，不支持时自动降级为直接切换 |

## 安装与运行

```bash
# 克隆项目
git clone https://gitee.com/web_akai/bird-admin.git

# 进入项目
cd bird-admin

# 安装 pnpm（已安装可跳过）
npm i -g pnpm

# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:9094）
pnpm run dev

# 类型检查 / 代码检查
pnpm run typecheck
pnpm run lint

# 打包发布（先 vue-tsc --noEmit，再 vite build，产物在 dist/）
pnpm run build

# 本地预览生产包
pnpm run preview
```

启动后访问 `http://localhost:9094/#/login`，用[演示账号](/resources/contact)登录。dev server 端口被占用时会自动顺延（`strictPort: false`）。

![BirdAdmin 登录页](/screenshots/login.png)

登录页只有账号和密码两项，演示环境预填 `admin`。密码框右侧的眼睛图标用于显示 / 隐藏密码，右上角两个小图标分别切换主题和语言。点击蓝色的「登录」按钮后进入控制台，完整截图见[页面预览](/guide/screenshots)。

::: tip
想临时换端口，用 `pnpm exec vite --port 9095`。`pnpm dev -- --port X` 经 pnpm 转发不会生效。
:::

## 环境变量

`.env` 放通用值，`.env.development` 与 `.env.production` 按模式覆盖：

| 变量 | 开发环境 | 生产环境 | 说明 |
| --- | --- | --- | --- |
| `VITE_BASE_PATH` | `/` | `/` | 打包基础路径 |
| `VITE_PORT` | `9094` | 不适用（通用值仍为 `9094`） | dev server 端口，被占用时顺延 |
| `VITE_API_BASE_URL` | `/api` | `/api` | 请求 `baseURL`。**接口 url 相对该地址，不要再自带 `/api` 前缀**；生产改为真实后端地址 |
| `VITE_API_PROXY_TARGET` | 空 | 空 | 非空时启用 `/api` 开发代理，并 `rewrite` 去掉 `/api` 前缀；留空则走本地 Mock |
| `VITE_DROP_CONSOLE` | `false` | `true` | 生产构建移除 `console` / `debugger`，配置在 `vite.config.ts` 顶层的 `esbuild.drop` |

## 第一次登录之后

系统管理下有菜单、角色、用户、部门、岗位、字典六类资源，都由同一套 schema 渲染。换用不同演示账号登录，可以看到菜单树和按钮权限随角色变化；`/permission/page` 与 `/permission/button` 两个页面专门用来观察这个差异。

Mock 数据挂在 `globalThis` 的内存单例上，修改种子后 dev server 不重启也能看到新菜单，但重启进程会恢复种子数据。原因和绕过办法见[常见问题与已知限制](/guide/faq)。

## 下一步

- [目录结构](/guide/project-structure) —— 找到代码应该放在哪里
- [请求层](/guide/request) —— 增删一个接口时怎么写
- [权限体系](/guide/permission) —— 新增一个受权限控制的页面
- [接入真实后端](/guide/backend) —— 从本地 Mock 切到真实接口

## 维护这份文档站点

本站是独立的 VitePress 仓库，与前端项目分开维护：

```bash
npm install     # 安装文档站依赖
npm run dev     # http://localhost:5173/
npm run build   # 产物在 docs/.vitepress/dist/
npm run preview
```

新增页面、链接写法与侧边栏配置见[写作与目录约定](/guide/writing)，发布流程见项目根目录的 `README.md`。
