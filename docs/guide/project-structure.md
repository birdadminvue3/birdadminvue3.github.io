# 目录结构

项目根目录是前端工程，配置按职责拆在 `build/vite/` 下；`mock/` 只在开发环境生效，`src/` 里按功能分层。

```text
bird-admin/
├── build/vite/              # Vite 配置拆分：resolve / plugin / server / build
│   └── vite/plugin/         # 自动导入、UnoCSS、Mock、构建信息插件
├── mock/rbac/               # 仅 dev 生效的 RBAC 接口与内存种子数据
│   ├── data.ts              # 菜单 / 角色 / 用户 / 部门 / 岗位 / 字典种子
│   ├── helper.ts            # globalThis 内存 DB、鉴权、树构造、分页、种子签名
│   └── auth|menu|role|user|dept|post|dict.ts
├── src/
│   ├── api/                 # 类型化接口客户端（auth.ts + rbac/*）
│   ├── assets/              # 图标、SVG、登录背景、样式（reset/layout/theme-transition）
│   ├── components/          # Auth、CommonWrapper、DarkModeSwitch、LangSelect
│   ├── config/              # 默认外观设置
│   ├── directive/           # v-permission 指令
│   ├── enums/               # 布局 / 主题 / 页签风格 / 语言枚举
│   ├── layout/              # 三种布局组装 + 侧栏 / 顶栏 / 页签 / 设置抽屉
│   ├── locales/             # vue-i18n 语言包与菜单标题翻译 composable
│   ├── plugins/             # i18n、Element Plus 图标、权限指令注册
│   ├── router/              # 守卫、静态路由、菜单树工具函数
│   ├── store/modules/       # app / settings / user / permission / tags-view
│   ├── utils/
│   │   ├── request/         # axios 封装：拦截器、token、取消、loading、离线队列
│   │   ├── permission.ts    # 按钮权限判断
│   │   ├── theme.ts         # 主题应用与 View Transition 切换
│   │   └── pageTitle.ts     # 动态页面标题
│   └── views/               # login / dashboard / system / permission / error
├── .env*                    # 环境变量
├── uno.config.ts            # UnoCSS 预设、快捷类与本地 SVG 图标集合
└── vite.config.ts           # Vite 入口配置
```

## 路径别名

| 别名 | 指向 | 定义位置 |
| --- | --- | --- |
| `@` | `src/` | `build/vite/resolve.ts` |
| `@styles` | `src/assets/styles/` | `build/vite/resolve.ts` |

## 几个容易找错地方的点

- 代理与端口配置在 `build/vite/server.ts`，不在 `vite.config.ts` 里。`VITE_API_PROXY_TARGET` 非空时会把 `/api` 前缀 `rewrite` 掉。
- Mock 是否注入由 `build/vite/plugin/` 里的 `configMockPlugin(isBuild)` 决定，生产构建返回 `null`，不需要手动删 `mock/`。
- 图标放进 `src/assets/svg/` 后可用 `i-svg:文件名` 引用（`uno.config.ts` 自动生成 safelist）；带原色的图标放 `preserve-color/` 子目录。
- 主题配置默认值在 `src/config/`，运行时状态在 `src/store/modules/settings.ts`。
- 新增页面要登记 `componentMap`，位置是 `src/store/modules/permission.ts`，见[权限体系](/guide/permission)。

## 相关页面

- [请求层](/guide/request) —— `src/utils/request/` 的用法
- [外观设置与国际化](/guide/configuration) —— `settings.ts` 与 `locales/` 的细节
- [Mock 接口清单](/guide/mock-api) —— `mock/rbac/` 提供哪些接口
