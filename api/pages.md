# 独立页面 API

## 数据模型

```json
{
  "id": "uuid",
  "title": "关于",
  "slug": "about",
  "content_markdown": "# 关于我\n...",
  "content_html": "<h1>关于我</h1>...",
  "status": "published",
  "sort_order": 0,
  "show_in_nav": true,
  "published_at": "2026-03-16T10:00:00Z",
  "template": "default",
  "config": "{}"
}
```

### 特殊字段说明

| 字段 | 说明 |
|------|------|
| `template` | 模板名，对应 `templates/pages/{template}.html`，默认 `"default"` |
| `config` | JSON 格式的模板参数，由模板清单声明所需字段 |

## 公共接口

### `GET /api/v1/pages`

前台获取**已发布**页面列表。

### `GET /api/v1/pages/slug/:slug`

前台根据 slug 获取已发布页面详情。

## 管理接口

### `GET /api/v1/admin/pages`

获取后台页面列表。支持分页、状态筛选、关键字搜索。

### `GET /api/v1/admin/pages/:id`

根据 UUID 获取页面详情。

### `POST /api/v1/admin/pages`

创建独立页面。

请求体示例：

```json
{
  "title": "我的开源项目",
  "slug": "github",
  "content_markdown": "以下是我的 GitHub 项目展示。",
  "status": "published",
  "sort_order": 10,
  "show_in_nav": true,
  "template": "github",
  "config": "{\"username\": \"amigoer\", \"count\": 6}"
}
```

### `PUT /api/v1/admin/pages/:id`

全量更新页面。

### `PATCH /api/v1/admin/pages/:id`

局部更新页面。

### `DELETE /api/v1/admin/pages/:id`

软删除页面。
