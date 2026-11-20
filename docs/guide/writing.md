# 写作与目录约定

这一页说明往站点里加内容时要遵守的几条约定。照着写，构建和发布都不会出岔子。

## 文件放在哪

页面一律放在 `docs/` 下，按用途分目录。目前分为 `guide/`（项目介绍、开发指南与排错）和 `resources/`（联系、鸣谢与版权），需要时再新建目录。文件名用小写英文和连字符，避免空格和中文文件名，这样网址稳定，Windows 和 Linux 上表现也一致。

文件到网址的对应关系：

| 文件路径 | 访问路径 |
| --- | --- |
| `docs/index.md` | `/` |
| `docs/guide/writing.md` | `/guide/writing.html` |
| `docs/api/auth.md` | `/api/auth.html` |

## 站内链接怎么写

配置里的 `link` 和正文里的站内链接都写不带后缀的绝对路径，由 VitePress 自己补全：

```md
查看 [写作与目录约定](/guide/writing) 了解详情。
```

不要写相对路径 `../writing.md`，也不要写死 `.html` 后缀。前者在页面挪动位置后容易断，后者在部署到子路径时会漏掉 `base`。

::: warning
`npm run build` 默认开启死链检查。链接指向不存在的文件会直接让构建失败，这在持续集成里是好事，但本地提交前最好先跑一次构建。
:::

## 页面的开头信息

每页顶部可以写一段 YAML frontmatter，常用的只有这几项：

```md
---
title: 页面标题
description: 这一页讲什么，会出现在搜索结果和页面描述里
outline: [2, 3]
prev: 快速开始
next: false
---
```

不写 `title` 时，VitePress 会用正文里的第一个一级标题，所以普通页面连 frontmatter 都可以省掉。`prev` / `next` 用来覆盖页脚的上一篇下一篇，`false` 表示不显示。

## 代码与提示容器

代码块标注语言就会有语法高亮，构建时使用浅色 `github-light`、深色 `github-dark` 两套配色：

````md
```ts
const message: string = 'hello'
```
````

需要强调的段落用提示容器，别自己套彩色卡片：

```md
::: tip
这是一条补充说明。
:::

::: warning
这是一条需要注意的提醒。
:::

::: danger
这是一条会造成数据损坏的操作提示。
:::
```

## 图片与静态文件

把图片放进 `docs/public/`，然后用根路径引用。例如 `docs/public/images/architecture.png` 对应：

```md
![架构图](/images/architecture.png)
```

写绝对路径时记得带上部署子路径的处理，跨环境更稳的做法是用 VitePress 提供的 `withBase()`，或者在纯 Markdown 里确认图片在自定义域名下也能访问。仓库里已经预置了 `docs/public/logo.png` 和 `docs/public/screenshots/`（四张项目演示截图，见[页面预览](/guide/screenshots)）。导航栏 logo 和正文图片都由框架自动补 `base`，新增图片沿用同一目录即可。

## 导航、侧边栏与搜索

顶部导航 `nav` 只放最常去的几个入口，侧边栏 `sidebar` 才是完整目录。本站按路径分成 `/guide/` 与 `/resources/` 两组，所以用对象形式配置；每个分组用 `text` 命名、`items` 列页面，目录层级靠缩进表达，不靠颜色。新增页面时记得同时补上对应分组的 `items`。

全文搜索用的是 VitePress 内置本地搜索，构建时生成索引，不需要申请任何第三方服务的密钥。新页面加进 `docs/` 后会自动进入索引，不需要额外配置。

## 几个容易踩的坑

- **不要随手开 `cleanUrls`**：本地看不出区别，但 GitHub Pages 按真实的 `.html` 文件提供内容，刷新无后缀的子页面容易 404。模板里保持着关闭状态。
- **部署到子路径要设 `base`**：站点发布在 `https://<用户名>.github.io/<仓库名>/` 下时，所有资源路径都要带仓库名。工作流已经通过 `DOCS_BASE` 自动注入，本地不受影响。
- **「最后更新于」依赖 git 历史**：`lastUpdated` 需要读提交记录，新仓库刚初始化时会告警。等有了提交记录再到 `config.mts` 里打开。
- **中文文案写完整句子**：标题和说明写得让人一眼看懂，比堆关键词更方便搜索，也方便以后维护。
