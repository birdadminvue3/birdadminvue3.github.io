# 多仓库同步

项目同时维护 Gitee 与 GitHub 两个仓库，内容完全一致。`scripts/sync-repos.mjs` 负责一次推送到两边：逐个推送、失败不中断，最后输出逐项结果。

| 仓库 | 地址 | 脚本识别的远端名 |
| --- | --- | --- |
| Gitee | `https://gitee.com/web_akai/bird-admin.git` | `origin` |
| GitHub | `https://github.com/birdadminvue3/bird-admin.git` | `github` |

## 常用命令

```bash
pnpm sync                       # 推送当前分支到两个仓库
pnpm sync --all-branches        # 推送全部本地分支（如 develop + master）
pnpm sync -b develop -b master  # 只推送指定分支
pnpm sync --commit -m "feat: x" # 自动提交工作区改动后推送
pnpm sync:dry                   # 只打印将要执行的命令，不实际推送
```

::: tip
改过脚本或第一次试跑时，先用 `pnpm sync:dry` 看清将要执行哪些 git 命令，再真正推送。
:::

## 脚本行为

- **自动补齐远端**：首次运行会检查缺失的远端；已有远端按 URL 匹配复用（例如 Gitee 的 `origin`），不会重复添加。
- **默认要求工作区干净**：有未提交改动时会中止并列出文件，避免把半成品推上去；确需推送已提交内容可用 `--allow-dirty`。
- **失败不中断**：任一仓库失败不影响另一个继续推送；结束时会给出失败原因提示（认证失败 / 远端有新提交 / 分支保护等）。
- **可接入 CI**：失败时退出码为 `1`，流水线可以直接据此判断结果。

## 认证与安全

- 本地默认走系统 Git 凭据管理器（Windows Credential Manager / macOS Keychain）。
- CI 环境可设置 `GITEE_TOKEN`、`GITHUB_TOKEN`（或 `GH_TOKEN`）。脚本只在本次 push 命令中使用这些值，不写入 `.git/config`，日志里也会自动脱敏。

::: warning
`.env*` 与 `.workbuddy/memory/` 已被 Git 跟踪（当前内容不含密钥）。新增配置前请确认没有把账号、令牌提交进仓库；贡献代码时不要提交 `.env.local`、个人 Token 或本地工作数据，见[贡献与更新日志](/resources/contributing)。
:::

## 相关页面

- [快速开始](/guide/getting-started) —— 两个仓库的克隆地址与可用脚本
- [生产部署](/guide/deployment) —— 构建产物如何发布
- [贡献与更新日志](/resources/contributing) —— 分支与提交规范
