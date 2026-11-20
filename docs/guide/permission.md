# 权限体系

BirdAdmin 采用「用户 → 角色 → 菜单 / 按钮」的 RBAC 模型。菜单类型分为 `M` 目录、`C` 页面、`F` 按钮，权限标识形如 `system:user:add`，超级管理员使用 `*:*:*`。

## 动态路由怎么生成

登录返回的 `permissions` 存入 `userStore`。路由守卫在刷新页面后先 `GET /auth/getUserInfo` 恢复用户资料，再 `GET /auth/routes` 拿到当前用户的菜单树，前端把菜单树转换成 `RouteRecordRaw`，用 `router.addRoute` 动态注册。菜单树支持任意层级父子结构。

::: warning
可视化权限配置目前由 Mock 的内存 CRUD 承载，**尚未落库**。接入真实后端后，菜单节点改由后端菜单表下发，见[接入真实后端](/guide/backend)。
:::

## 按钮级权限的三种写法

三种写法语义一致，传数组表示满足其中任意一个即可：

```vue
<template>
  <el-button v-permission="'system:user:add'">新增</el-button>
  <Auth :value="['system:user:edit', 'system:user:add']">受保护内容</Auth>
</template>
<script setup lang="ts">
import { hasPermission } from "@/utils/permission";
const canDelete = computed(() => hasPermission("system:user:delete"));
</script>
```

- `v-permission` 指令适合直接控制单个元素。
- `<Auth>` 组件适合包住一段内容。
- `hasPermission()` 适合在逻辑里做判断。

## 新增一个受权限控制的页面

四个步骤，缺一步都会导致菜单点不开或权限不生效：

1. 在 `src/views/` 新建 `.vue` 页面。
2. 在 `src/store/modules/permission.ts` 的 `componentMap` 登记「组件标识 → 动态 import」。
3. 在 `mock/rbac/data.ts` 的 `menuSeed` 增加菜单节点，`component` 填第 2 步登记的标识，并给相应角色授权。接入真实后端后，这一步改由后端菜单表下发。
4. 在 `src/locales/modules/{zh-cn,en}.ts` 的 `menus` 下补译文。可以不补，未命中的词条会回退显示中文原文。

::: tip
Mock 的 DB 带种子签名：修改任一 seed 会自动重建内存库，dev server 不重启也能看到新菜单。但重启进程会恢复种子数据，原因见[常见问题与已知限制](/guide/faq)。
:::

## 演示账号能看到什么

| 账号 | 角色 | 可见范围 |
| --- | --- | --- |
| `admin` | 超级管理员 | 全部菜单与按钮，权限码 `*:*:*` |
| `system` | 系统管理员 | 菜单 / 角色 / 用户 / 部门，无岗位与字典；演示按钮拥有 `add`、`edit` |
| `auditor` | 审计员 | 控制台 + 用户列表（只读）；演示按钮仅 `add` |
| `guest` | 访客 | 控制台 + 异常页面 + 权限管理页，无演示按钮权限 |

密码统一 `123456`，**仅开发环境有效**。生产构建不会打包演示账号，详见[联系与演示](/resources/contact)。

![BirdAdmin 菜单管理页](/screenshots/menu.png)

截图是 `admin` 账号看到的菜单管理页：左侧导航展开系统管理，主体是按层级展示的树形表格，目录、菜单与按钮混排，行末是编辑和删除操作。换成其他演示账号登录，左侧可见菜单会随角色变化。

## 相关页面

- [请求层](/guide/request) —— 401 刷新与重放逻辑
- [路由与多页签](/guide/routing) —— 守卫与 hash 路由兜底
- [Mock 接口清单](/guide/mock-api) —— `/auth/*` 与六类资源的接口
