# BirdAdmin 文档

一个基于 [VitePress](https://vitepress.dev/) 的中文文档站点。页面视觉对齐 [birdadminvue3.github.io](https://birdadminvue3.github.io/)，文档内容以 [bird-admin 项目 README](https://gitee.com/web_akai/bird-admin) 为事实来源整理成完整的项目文档。仓库里带一份推送到 `main` 就自动发布的 GitHub Pages 工作流。

## 本地开发

需要 Node.js 20 或更高版本，包管理器用 pnpm（版本由 `package.json` 的 `packageManager` 字段锁定，可用 Corepack 启用）。

```bash
pnpm install            # 依赖版本以 pnpm-lock.yaml 为准
pnpm run dev            # http://localhost:5173/
pnpm run build          # 产物在 docs/.vitepress/dist/
pnpm run preview        # 本地预览构建结果
```

改 Markdown 和 `docs/.vitepress/config.mts` 都会热更新。`pnpm run build` 会检查死链，提交前跑一次能提前发现路径写错的问题。`pnpm-lock.yaml` 必须提交：CI 用 `--frozen-lockfile` 安装，锁文件缺失或与 `package.json` 不一致会直接失败。

## 目录结构

```
.
├── .github/workflows/deploy.yml   # GitHub Pages 自动发布
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts            # 标题、导航、侧边栏、页脚、部署路径
│   │   └── theme/
│   │       ├── index.ts          # 主题入口，沿用默认主题
│   │       ├── custom.css        # 对齐目标站的样式覆盖
│   │       └── tokens.css        # 设计数值基线
│   ├── public/
│   │   ├── .nojekyll             # 让 Pages 跳过 Jekyll 处理
│   │   ├── logo.png              # 站点 logo / 首页配图
│   │   └── screenshots/          # 四张项目演示截图
│   ├── index.md                  # 首页（hero + 六张特性卡 + 正文）
│   ├── guide/
│   │   ├── index.md              # 项目介绍
│   │   ├── features.md           # 主要特性
│   │   ├── getting-started.md    # 快速开始
│   │   ├── screenshots.md        # 页面预览（登录 / 控制台 / 菜单 / 404）
│   │   ├── tech-stack.md         # 技术栈与依赖
│   │   ├── project-structure.md  # 目录结构
│   │   ├── request.md            # 请求层
│   │   ├── permission.md         # 权限体系
│   │   ├── routing.md            # 路由与多页签
│   │   ├── configuration.md      # 外观设置与国际化
│   │   ├── mock-api.md           # Mock 接口清单
│   │   ├── backend.md            # 接入真实后端
│   │   ├── roadmap.md            # 实现状态与路线图
│   │   ├── faq.md                # 常见问题与已知限制
│   │   └── writing.md            # 维护本站的写作约定
│   └── resources/
│       ├── contact.md            # 联系与演示
│       └── acknowledgements.md   # 特别鸣谢与版权
├── DESIGN.md                     # 视觉规范与对齐说明
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

侧边栏分成「开始使用 / 开发指南 / 进阶与排错 / 维护本站」四组，加上「生态与资源」一组，全部在 `config.mts` 的 `themeConfig.sidebar` 里配置。

演示截图来自项目仓库 `src/assets/readme/`，共登录、控制台、菜单管理、404 四张，集中展示在站内「页面预览」页，并在项目介绍、快速开始、权限体系、路由章节里就近引用。

## 内容来源与事实校正

目标站的页面样式被完整保留，但它的部分文案已经过期。补全文档时以项目仓库 README 为准，纠正了以下信息：

| 项目 | 目标站旧文案 | 以 README 为准 |
| --- | --- | --- |
| 开源协议 | Apache-2.0 | **MIT**（README 徽标与版权信息均为 MIT；页脚已同步） |
| 后端 | `ThinkPHP8` 等全栈描述 | **纯前端脚手架，没有附带后端工程**，`Node.js` / `Next.js` / `Spring Boot` 属于规划能力 |
| 接口来源 | 未说明 | 开发环境由 `vite-plugin-fake-server` 提供本地 Mock，生产构建不含 Mock 与演示账号 |
| 技术栈 | 精确到小版本号 | 采用 README 徽标的大版本（Vue 3.5.x / Vite 7.x / TS 5.8.x / Pinia 3.x / Element Plus 2.10.x） |
| 特性说明 | 概述性文案 | 按 README 展开为 RBAC、请求层、多页签、国际化、设置持久化等可核对的细节 |

同时按 README 补齐了演示账号表、环境变量表、`requestOptions` 表、完整 Mock 接口清单与业务码、目录树与路径别名、实现状态与路线图、常见问题、QQ 群与官方邮箱、鸣谢与版权信息。

> 版本、路线与版权以项目仓库为准。README 声明 MIT 协议，同时注明根目录 `LICENSE` 文件尚未补齐，商用前请留意这一点。

## 换成自己的内容

| 想改什么 | 改哪里 |
| --- | --- |
| 站点标题、描述、关键词 | `docs/.vitepress/config.mts` 的 `title` / `description` / `head` |
| 顶部导航、左侧目录 | 同文件的 `themeConfig.nav` / `themeConfig.sidebar` |
| 首页文案、按钮、特性卡 | `docs/index.md` 的 frontmatter 与正文 |
| 社交图标、页脚 | `config.mts` 的 `themeConfig.socialLinks` / `footer` |
| 配色、渐变、卡片效果 | `docs/.vitepress/theme/custom.css`，数值依据见 `DESIGN.md` |
| 正文内容 | `docs/guide/` 与 `docs/resources/` 下的 Markdown，新页面记得加进侧边栏 |
| logo 与首页配图 | 替换 `docs/public/logo.png` |
| 演示截图 | 替换 `docs/public/screenshots/` 下的四张 PNG，页面预览与各章节的引用会自动同步 |

新增页面、站内链接写法和侧边栏约定写在 `docs/guide/writing.md`（站内的「写作与目录约定」页）里。

## 样式来源

目标站也是 VitePress 1.6.4，本仓库从它公开的构建产物里取回了以下几组数值并写进 `custom.css`：

- 品牌色 `--vp-c-brand-1/2/3`：`#2b7de0` / `#439efd` / `#6fb6ff`，深色模式下第一档换为 `#8cc2ff`。
- 首页主标题蓝橙渐变、logo 背后的渐变光晕（`blur(48px)`）、logo 圆角 `28px` 与投影。
- 六张特性卡的 hover 上移 `3px` 与蓝色投影，首页正文容器 `960px`，`h2` 顶部分隔线，侧边栏分组加粗，选中文字底色，行内代码用品牌色。
- 按钮三态颜色、提示容器配色，以及 `github-light` / `github-dark` 代码高亮。

因为要和目标站一致，渐变、投影、emoji 图标和六张卡片是明确要求的例外，已记录在 `DESIGN.md`。除特性卡 hover 外没有入场动画或滚动揭示，并补了 `prefers-reduced-motion` 分支。

## 发布到 GitHub Pages

工作流放在 `.github/workflows/deploy.yml`：push 到 `main` 会自动跑 `build`（安装依赖 → 构建 → 上传产物）和 `deploy`（官方 `actions/deploy-pages@v4` 发布）两个任务。仓库只存 VitePress 源码，构建产物不入库。

首次上线按顺序做一次设置：

1. **先在仓库网页上**：打开 **Settings → Pages**，把 **Build and deployment → Source** 选成 **GitHub Actions**（不要选「Deploy from a branch」）。`configure-pages` 的 `enablement` 默认是 `false`，工作流不会替你改这个设置；不切换的话 `build` 会绿、`deploy` 会红，站点也不会更新。
2. 确认 `package.json`、`pnpm-lock.yaml`、`pnpm-workspace.yaml` 都已提交，再推送到 `main`；也可以在 **Actions** 页面手动运行「部署文档到 GitHub Pages」。
3. 等 `build` 和 `deploy` 两个任务都变绿，访问站点。工作流按仓库名自动注入 `DOCS_BASE`，不用手改 `config.mts`；如果仓库名是 `<用户名>.github.io`，会自动改用根路径 `/`。

> 本仓库是主页仓库，站点地址为 `https://birdadminvue3.github.io/`。原先根目录的 `index.html`、`assets/` 等构建产物已移除，改由 Actions 部署；**推送前务必完成第 1 步**，否则旧页面被删后新部署又没生效，会出现 404。

之后每次 push 到 `main` 都会自动重新构建发布；`concurrency: pages` 保证并发推送排队执行，不会互相覆盖。

### 绑定自定义域名（可选）

1. 在仓库 **Settings → Pages → Custom domain** 填写域名，并按 GitHub 提示配置 DNS。
2. 确认 `config.mts` 用的是根路径 `/`。普通子路径仓库需要把 `deploy.yml` 里的 `DOCS_BASE` 环境变量整行删掉；`<用户名>.github.io` 主页仓库本来就注入 `/`，无需改动。
3. 在 `docs/public/` 下放一个只写域名的 `CNAME` 文件，避免每次发布后域名设置被覆盖。

## 常见问题

- **本地正常，线上样式或链接 404**：多半是部署子路径没生效，检查 Actions 日志里 `DOCS_BASE` 是否正确，以及 Pages 的 Source 是否选了 GitHub Actions。`head` 里的 favicon 路径在 `config.mts` 里手动拼了 `base`，`themeConfig.logo` 和首页图片则由框架自动补。
- **`deploy` 任务报 Pages 未启用 / 权限不足**：Source 没切到 GitHub Actions，或工作流 `permissions` 缺少 `pages: write`、`id-token: write`。
- **CI 报锁文件过期（`ERR_PNPM_OUTDATED_LOCKFILE`）**：用与 `packageManager` 一致的 pnpm 版本在本地跑 `pnpm install`，把更新后的 `pnpm-lock.yaml` 一起提交。
- **CI 构建报 esbuild / 平台二进制相关错误**：新版 pnpm 默认拦截依赖的构建脚本，确认 `pnpm-workspace.yaml` 里 `allowBuilds.esbuild: true` 已提交。
- **构建报死链**：按报错给出的文件路径修正链接，站内链接写 `/guide/xxx` 这种不带后缀的绝对路径。
- **「最后更新于」不显示**：`config.mts` 里的 `lastUpdated` 默认关闭，等仓库有了提交记录再打开。
- **想开 `cleanUrls`**：先确认托管平台支持无后缀路径刷新，GitHub Pages 下容易 404，模板保持关闭。
- **文档和项目对不上**：优先以 bird-admin 仓库的 README 与 `package.json` 为准，再回来改 `docs/`，不要以目标站的旧文案为准。
