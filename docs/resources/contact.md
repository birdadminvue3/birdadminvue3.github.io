# 联系与演示

下面是 BirdAdmin 项目公开的渠道与演示信息，均来自项目仓库的 README。

## 在线演示

**暂无在线演示站。** 请按[快速开始](/guide/getting-started)在本地 `pnpm dev` 运行，然后访问 `http://localhost:9094/#/login` 体验。

## 演示账号

密码统一 `123456`，**仅开发环境有效**；生产构建不会注入演示账号。

| 账号 | 角色 | 可见范围 |
| --- | --- | --- |
| `admin` | 超级管理员 | 全部菜单与按钮，权限码 `*:*:*` |
| `system` | 系统管理员 | 菜单 / 角色 / 用户 / 部门，无岗位与字典；演示按钮拥有 `add`、`edit` |
| `auditor` | 审计员 | 控制台 + 用户列表（只读）；演示按钮仅 `add` |
| `guest` | 访客 | 控制台 + 异常页面 + 权限管理页，无演示按钮权限 |

切换不同账号登录，可以直观看到菜单树和按钮权限随角色变化。`/permission/page` 与 `/permission/button` 两个页面专门用来观察这个差异，原理见[权限体系](/guide/permission)。

## 项目渠道

- [Gitee 仓库：web_akai/bird-admin](https://gitee.com/web_akai/bird-admin)
- [GitHub 仓库：birdadminvue3/bird-admin](https://github.com/birdadminvue3/bird-admin)
- [官方邮箱：web_bird@qq.com](mailto:web_bird@qq.com)（导航栏右上角的信封图标可直接唤起邮件客户端）
- 学习交流 QQ 群：**829514092**（[入群链接](https://qm.qq.com/cgi-bin/qm/qr?k=mtO25dYqAb6TvQabT3a32GpM-ymBgzyQ&jump_from=webapi&authKey=IdNeGCdGWY3agi7eUniBkHG7ME98B3hD2dBUFoLcBLtYrKEl1RfComEn+0sdrM+I)）

功能建议、问题反馈和商用咨询都可以发到官方邮箱。如果项目对你有帮助，去 Gitee 点一个 Star 就是很好的支持，项目明确说明无需捐赠。

## 关于本站

>本站是基于 VitePress 1.6.4 构建的文档站点，内容以项目仓库的 README 为准。

>仓库里带 GitHub Pages 自动发布工作流，维护方式见[写作与目录约定](/guide/writing)。

> 本站不托管演示环境、不收集账号信息，也不代替项目仓库做承诺。版权与免责声明见[特别鸣谢与版权](/resources/acknowledgements)。
