# 系统设置 API

## 管理接口

### `GET /api/v1/admin/settings`

获取全部系统设置。

响应示例：

```json
{
  "code": 200,
  "data": {
    "site": {
      "site_name": "Kite",
      "site_url": "https://example.com",
      "description": "一个 AI 原生博客引擎",
      "keywords": "blog, kite",
      "favicon": "/favicon.ico",
      "logo": "",
      "icp": "京ICP备xxxxxxxx号",
      "footer": "© 2026 Kite"
    },
    "post": {
      "posts_per_page": 10,
      "enable_comment": true,
      "enable_toc": true,
      "summary_length": 200,
      "default_cover_url": ""
    },
    "render": {
      "render_mode": "classic",
      "api_prefix": "/api/v1",
      "enable_cors": true
    },
    "ai": {
      "enabled": false,
      "provider": "",
      "api_key": "****",
      "model": "",
      "auto_summary": false,
      "auto_tag": false
    }
  },
  "msg": "ok"
}
```

### 设置分组说明

#### `site` — 站点设置

| 字段 | 说明 |
|------|------|
| `site_name` | 站点名称 |
| `site_url` | 站点 URL |
| `description` | 站点描述 |
| `keywords` | SEO 关键词 |
| `favicon` | Favicon 路径 |
| `logo` | Logo 路径 |
| `icp` | ICP 备案号 |
| `footer` | 页脚文本 |

#### `post` — 文章设置

| 字段 | 说明 |
|------|------|
| `posts_per_page` | 每页文章数 |
| `enable_comment` | 是否启用评论 |
| `enable_toc` | 是否启用目录 |
| `summary_length` | 摘要长度 |
| `default_cover_url` | 默认封面 URL |

#### `render` — 渲染设置

| 字段 | 说明 |
|------|------|
| `render_mode` | 渲染模式：`classic` / `headless` |
| `api_prefix` | API 前缀 |
| `enable_cors` | 是否启用 CORS |

#### `ai` — AI 设置

| 字段 | 说明 |
|------|------|
| `enabled` | 是否启用 AI |
| `provider` | AI 提供商 |
| `api_key` | API Key（返回掩码值） |
| `model` | 模型名称 |
| `auto_summary` | 自动生成摘要 |
| `auto_tag` | 自动生成标签 |

::: warning 注意
`ai.api_key` 返回掩码值（如 `sk-4****abcd`），不会暴露完整密钥。
:::

### `PUT /api/v1/admin/settings`

更新全部系统设置（运行时覆盖，不持久化到配置文件）。

请求体与 GET 返回的 `data` 结构一致。
