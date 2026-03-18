# 文章 API

## 数据模型

```json
{
  "id": "0195f3ff-4f17-7f0b-9e5f-15db2f2fb6a1",
  "title": "Hello Kite",
  "slug": "hello-kite",
  "summary": "A lightweight AI-native blog engine.",
  "content_markdown": "# Hello Kite",
  "content_html": "<h1 id=\"hello-kite\">Hello Kite</h1>\n",
  "status": "draft",
  "cover_image": "",
  "published_at": null,
  "show_comments": true,
  "category_id": "0195f400-0d80-730a-bf8a-4d9776db8f4d",
  "category": {
    "id": "0195f400-0d80-730a-bf8a-4d9776db8f4d",
    "name": "Backend",
    "slug": "backend"
  },
  "tags": [
    {
      "id": "0195f400-13ad-7cbb-9b9f-04d15b759cb8",
      "name": "golang",
      "slug": "golang"
    }
  ],
  "created_at": "2026-03-15T10:00:00Z",
  "updated_at": "2026-03-15T10:00:00Z"
}
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `status` | `draft` / `published` / `archived` |
| `slug` | 全局唯一，用于前台路由 |
| `summary` | 可人工填写，也可由 AI 自动生成 |
| `content_markdown` | 文章 Markdown 原文，作为唯一编辑源 |
| `content_html` | 服务端渲染并缓存的 HTML |
| `published_at` | 发布时间；仅 `status=published` 且 `published_at<=当前时间` 的文章公开 |
| `show_comments` | 是否展示文章底部评论区 |
| `category_id` | 可为空，表示文章所属分类 |
| `tags` | 多对多标签集合 |

## 公共接口

### `GET /api/v1/posts`

获取前台公开文章列表。

**查询参数：** `page`、`page_size`、`keyword`、`tag_id`、`category_id`

仅返回 `status=published` 且 `published_at<=当前时间` 的文章。

### `GET /api/v1/posts/:id`

根据 UUID 获取前台公开文章详情。草稿、归档和未来发布时间的文章返回 `404`。

### `GET /api/v1/posts/slug/:slug`

根据 slug 获取前台公开文章详情。供 Classic SSR 前台、Headless 前端及 Static Build 共用。

## 管理接口

### `GET /api/v1/admin/posts`

获取后台文章列表。不附加前台公开约束。

**查询参数：** `page`、`page_size`、`status`、`keyword`、`tag_id`、`category_id`

### `GET /api/v1/admin/posts/:id`

根据 UUID 获取后台文章详情。

### `GET /api/v1/admin/posts/slug/:slug`

根据 slug 获取后台文章详情。

### `POST /api/v1/admin/posts`

创建文章。

请求体示例：

```json
{
  "title": "Hello Kite",
  "slug": "hello-kite",
  "summary": "A lightweight AI-native blog engine.",
  "content_markdown": "# Hello Kite",
  "status": "draft",
  "cover_image": "",
  "published_at": null,
  "show_comments": true,
  "category_id": "0195f400-0d80-730a-bf8a-4d9776db8f4d",
  "tag_ids": ["0195f400-13ad-7cbb-9b9f-04d15b759cb8"]
}
```

::: tip 说明
- `content_markdown` 为后台唯一编辑源，`content_html` 由服务端自动渲染
- `status=published` 且未传入 `published_at` 时，服务端自动补为当前时间
- `show_comments=false` 时，前台可据此隐藏评论区
:::

### `PUT /api/v1/admin/posts/:id`

全量更新文章。

### `PATCH /api/v1/admin/posts/:id`

局部更新文章。

### `DELETE /api/v1/admin/posts/:id`

软删除文章。
