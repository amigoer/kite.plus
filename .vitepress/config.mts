import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点元数据
  title: 'Kite',
  description: '轻量级 AI 原生博客引擎 · Go + React + SQLite · 单二进制部署',
  lang: 'zh-CN',

  // 生成 sitemap
  sitemap: {
    hostname: 'https://www.kite.plus',
  },

  // Head 标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kite' }],
    ['meta', { property: 'og:title', content: 'Kite - 轻量级 AI 原生博客引擎' }],
    ['meta', { property: 'og:description', content: '轻量级 AI 原生博客引擎，Go + React + SQLite，单二进制部署' }],
    ['meta', { property: 'og:url', content: 'https://www.kite.plus' }],
  ],

  // 主题配置
  themeConfig: {
    // Logo
    logo: '/logo.svg',

    // 导航栏
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'API 参考', link: '/api/', activeMatch: '/api/' },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub', link: 'https://github.com/amigoer/kite' },
          { text: '更新日志', link: 'https://github.com/amigoer/kite/releases' },
        ],
      },
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
        {
          text: '主题开发',
          items: [
            { text: '模板开发指南', link: '/guide/theme-dev' },
            { text: '页面模板开发', link: '/guide/page-template' },
            { text: 'SSR 接口', link: '/guide/ssr' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概述', link: '/api/' },
            { text: '文章', link: '/api/posts' },
            { text: '分类', link: '/api/categories' },
            { text: '标签', link: '/api/tags' },
            { text: '友情链接', link: '/api/friend-links' },
            { text: '评论', link: '/api/comments' },
            { text: '独立页面', link: '/api/pages' },
            { text: '系统设置', link: '/api/settings' },
          ],
        },
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/amigoer/kite' },
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '© 2026 Kite',
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/amigoer/kite.plus/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    // 上次更新
    lastUpdated: {
      text: '最后更新于',
    },

    // 文档页脚导航
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 大纲标题
    outline: {
      label: '本页目录',
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 外部链接图标
    externalLinkIcon: true,
  },
})
