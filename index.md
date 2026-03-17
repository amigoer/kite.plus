---
layout: home

hero:
  name: Kite
  text: 轻量级 AI 原生博客引擎
  tagline: Go + React + SQLite · 单二进制部署 · 零配置启动
  image:
    src: /logo.svg
    alt: Kite Logo
  actions:
    - theme: brand
      text: 快速开始 →
      link: /guide/getting-started
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/amigoer/kite

features:
  - icon: 🚀
    title: 单二进制部署
    details: 前后端编译为一个可执行文件，直接丢到服务器即可运行。内嵌 SQLite，备份只需复制一个 kite.db 文件。
  - icon: 🤖
    title: AI 原生
    details: 一键对接 OpenAI / DeepSeek / Ollama 等大模型，自动生成文章摘要和标签推荐，让写作更高效。
  - icon: 🎨
    title: 双渲染模式
    details: Classic 模式使用 Go Template SSR 直出 HTML；Headless 模式提供纯 JSON API，自由对接任何前端框架。
  - icon: ✍️
    title: Tiptap 富文本编辑器
    details: Markdown / 所见即所得双模式切换，支持代码高亮、表格、Callout、拖拽上传图片等。
  - icon: 🎭
    title: 主题系统
    details: 基于 Go html/template 的主题引擎，支持自定义页面模板和参数化配置，主题即目录。
  - icon: 🌐
    title: Web 安装向导
    details: 首次运行自动启动浏览器安装向导，设置站点名和管理员密码，两步完成，无需编辑配置文件。
  - icon: 📡
    title: RSS & Sitemap
    details: 自动生成 RSS 2.0 订阅和 Sitemap，对搜索引擎友好。
  - icon: 📦
    title: 零配置
    details: 内嵌 SQLite 数据库，所有设置存储在数据库中，启动即用。
---
