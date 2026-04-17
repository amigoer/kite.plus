export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: [
            'bash',
            'json',
            'yaml',
            'go',
            'ts',
            'js',
            'vue',
            'html',
            'nginx',
            'docker',
            'ini',
            'sql',
          ],
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },

  app: {
    head: {
      title: 'Kite · 轻量级静态资源托管平台',
      titleTemplate: '%s · Kite',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Kite 是一个轻量、快速、现代化的静态资源托管平台，支持图片、音视频和任意静态文件，单二进制部署。',
        },
        { property: 'og:site_name', content: 'Kite' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Kite · 轻量级静态资源托管平台' },
        {
          property: 'og:description',
          content: '单二进制部署 · 本地 / S3 多存储后端 · 图片视频音频全类型支持',
        },
      ],
    },
  },

  ui: {
    fonts: false,
  },

  future: {
    compatibilityVersion: 4,
  },
})
