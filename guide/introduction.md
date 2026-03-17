# 介绍

## 什么是 Kite？

**Kite** 是一个轻量级 AI 原生博客引擎，使用 Go + React + SQLite 构建，编译为单个可执行文件，拖到服务器即可运行。

Kite 的设计理念：

- **极简部署**：单二进制 + 单数据库文件，没有额外依赖
- **AI 原生**：内置 AI 摘要和标签推荐，对接 OpenAI/DeepSeek/Ollama
- **双模式渲染**：Classic（SSR）和 Headless（纯 API）两种模式自由切换
- **主题驱动**：基于 Go Template 的主题系统，一个 `templates/` 目录即为一套主题

## 核心特性

| 特性 | 说明 |
|------|------|
| 🚀 单二进制部署 | 前后端编译为一个可执行文件 |
| 📦 零配置启动 | 内嵌 SQLite，所有设置存储在数据库中 |
| 🌐 Web 安装向导 | 首次运行浏览器引导安装，无需配置文件 |
| 🎨 双渲染模式 | Classic (Go Template SSR) / Headless (JSON API) |
| 🤖 AI 原生 | 一键对接 OpenAI / DeepSeek / Ollama |
| ✍️ Tiptap 编辑器 | Markdown / 所见即所得双模式 |
| 🖼️ 图片管理 | 封面上传、编辑器内拖拽粘贴自动上传 |
| 📡 RSS & Sitemap | 自动生成，SEO 友好 |
| 🎭 主题系统 | 自定义 Go Template 主题 |

## 架构

```mermaid
graph TB
    subgraph Binary["🪁 Kite (单二进制)"]
        subgraph Frontend["Admin SPA"]
            React["React 19 + TypeScript"]
            Semi["Semi Design"]
            Tiptap["Tiptap Editor"]
            TanStack["TanStack Query"]
        end

        subgraph Backend["Go 后端"]
            Gin["Gin HTTP Router"]
            Service["Service Layer"]
            GORM["GORM ORM"]
            Template["Template Engine"]
        end

        subgraph Theme["Classic 主题 (SSR)"]
            GoTmpl["Go html/template"]
        end
    end

    SQLite[("SQLite · kite.db")]

    React --> Gin
    Gin --> Service
    Service --> GORM
    GORM --> SQLite
    GoTmpl --> Service
    Template --> GoTmpl
```

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | Go 1.22+, Gin |
| ORM | GORM |
| 数据库 | SQLite (glebarez/sqlite, 纯 Go) |
| 前端 | React 19, TypeScript, Vite |
| UI 组件库 | Semi Design (@douyinfe/semi-ui) |
| 富文本编辑器 | Tiptap (ProseMirror) |
| 数据获取 | TanStack Query |
| 模板引擎 | Go html/template |
| 认证 | Cookie Session + bcrypt |

## 项目链接

- **GitHub**: [https://github.com/amigoer/kite](https://github.com/amigoer/kite)
- **官网**: [https://www.kite.plus](https://www.kite.plus)
