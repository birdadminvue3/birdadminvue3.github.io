import { defineConfig } from 'vitepress'

/**
 * 把部署路径统一成 `/xxx/` 的形式。
 * - 本地开发：不设置 DOCS_BASE，站点跑在 http://localhost:5173/
 * - GitHub Pages：工作流按仓库名注入 DOCS_BASE，站点部署在 /<仓库名>/ 下
 * 想绑自定义域名时，把工作流里的 DOCS_BASE 去掉即可回到根路径。
 */
function normalizeBase(value?: string): string {
  if (!value || value === '/') return '/'
  return `/${value.replace(/^\/+|\/+$/g, '')}/`
}

const base = normalizeBase(process.env.DOCS_BASE)

// 与目标站 https://birdadminvue3.github.io/ 一致的两个社交图标
const giteeIcon =
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
// VitePress 强制 .VPSocialLink > svg { fill: currentColor }，会覆盖 SVG 上的
// fill="none" 表现属性。描边式图标（stroke）会被填成实心色块而看不出形状，
// 因此这里和内置图标一样使用「填充式单 path」。
const mailIcon =
  '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'BirdAdmin',
  description:
    'BirdAdmin 文档 —— 基于 Vue 3.5、Vite 7、TypeScript 5.8、Pinia 3 与 Element Plus 的纯前端后台管理脚手架，内置本地 Mock 可跑通完整 RBAC 流程。',

  // GitHub Pages 按真实的 .html 文件提供静态资源，保持默认链接形式最稳。
  cleanUrls: false,

  // 「最后更新于」依赖 git 历史。新仓库还没有提交记录时会告警，确认有历史后再打开。
  lastUpdated: false,

  head: [
    // head 里的路径不会被自动补 base，这里手动拼上
    ['link', { rel: 'icon', type: 'image/png', href: `${base}logo.png` }],
    ['meta', { name: 'theme-color', content: '#439efd' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'BirdAdmin, Vue3, Vite, TypeScript, Element Plus, Pinia, UnoCSS, RBAC, Mock, 后台管理系统, 文档'
      }
    ]
  ],

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    lineNumbers: false
  },

  themeConfig: {
    // 导航栏与首页的 logo 由框架自动补 base
    logo: '/logo.png',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '生态与资源', link: '/resources/contact' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '项目介绍', link: '/guide/' },
            { text: '主要特性', link: '/guide/features' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '页面预览', link: '/guide/screenshots' },
            { text: '技术栈与依赖', link: '/guide/tech-stack' }
          ]
        },
        {
          text: '开发指南',
          items: [
            { text: '目录结构', link: '/guide/project-structure' },
            { text: '请求层', link: '/guide/request' },
            { text: '权限体系', link: '/guide/permission' },
            { text: '路由与多页签', link: '/guide/routing' },
            { text: '外观设置与国际化', link: '/guide/configuration' },
            { text: 'Mock 接口清单', link: '/guide/mock-api' }
          ]
        },
        {
          text: '进阶与排错',
          items: [
            { text: '接入真实后端', link: '/guide/backend' },
            { text: '生产部署', link: '/guide/deployment' },
            { text: '多仓库同步', link: '/guide/sync-repos' },
            { text: '实现状态与路线图', link: '/guide/roadmap' },
            { text: '常见问题与已知限制', link: '/guide/faq' }
          ]
        },
        {
          text: '维护本站',
          items: [{ text: '写作与目录约定', link: '/guide/writing' }]
        }
      ],
      '/resources/': [
        {
          text: '生态与资源',
          items: [
            { text: '联系与演示', link: '/resources/contact' },
            { text: '贡献与更新日志', link: '/resources/contributing' },
            { text: '特别鸣谢与版权', link: '/resources/acknowledgements' }
          ]
        }
      ]
    },

    socialLinks: [
      // VitePress 内置 github 图标，与自定义 SVG 的 Gitee 图标并列
      {
        icon: { svg: giteeIcon },
        link: 'https://gitee.com/web_akai/bird-admin',
        ariaLabel: 'Gitee 仓库'
      },
      {
        icon: 'github',
        link: 'https://github.com/birdadminvue3/bird-admin',
        ariaLabel: 'GitHub 仓库'
      },
      {
        icon: { svg: mailIcon },
        link: 'mailto:web_bird@qq.com',
        ariaLabel: '官方邮箱'
      }
    ],

    // 本地全文搜索，不需要任何第三方服务。
    search: { provider: 'local' },

    outline: { level: [2, 3] },

    footer: {
      message: '遵循 MIT 开源协议发布，无需授权即可免费商用',
      copyright: 'Copyright © 2026 前端很开门 · Powered by VitePress'
    }
  }
})
