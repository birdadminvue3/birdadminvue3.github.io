# 贡献与更新日志

欢迎提 Issue 与 PR，流程尽量保持简单。这一页整理项目 README 里的贡献约定与版本记录。

## 贡献流程

1. Fork 仓库，从 `develop` 切出分支：`git checkout -b feat/your-feature`。
2. 提交前本地跑通 `pnpm typecheck` 与 `pnpm lint`（仓库暂未接入 CI）。
3. 提交信息使用 `feat: ` / `fix: ` / `docs: ` / `chore: ` 前缀，一个提交只做一件事。
4. 向 `develop` 分支发起 PR，说明改动点与验证方式；涉及界面的请附亮色 / 暗色两张截图。
5. 合并后如需同步主干：`git checkout master && git merge --ff-only develop`，再执行 `pnpm sync --all-branches`，见[多仓库同步](/guide/sync-repos)。

新增页面、菜单与权限码的做法见[权限体系](/guide/permission)。

::: warning
请不要提交 `.env.local`、个人 Token 或 `.workbuddy/` 下的本地数据。
:::

## 更新日志

| 版本 | 日期 | 主要内容 |
| --- | --- | --- |
| v1.0.0 | 2026-11-20 | 首个正式版本：三种菜单布局、动态路由 RBAC、按钮级鉴权、六类资源 CRUD、三种页签风格与完整页签操作、暗黑主题与 View Transition 切换动画、中英双语、403 / 404 / 500、设置抽屉、Gitee / GitHub 双仓库同步脚本 |

后续计划见[实现状态与路线图](/guide/roadmap)。

::: tip
当前版本 **v1.0.0**，遵循 MIT 协议。站点内容与版本信息以项目仓库的 README 为准。
:::

## 相关页面

- [联系与演示](/resources/contact) —— 仓库、邮箱与 QQ 群
- [特别鸣谢与版权](/resources/acknowledgements) —— 协议、致谢与免责声明
- [多仓库同步](/guide/sync-repos) —— 双仓库推送脚本
