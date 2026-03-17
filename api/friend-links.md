# 友情链接 API

## 数据模型

```json
{
  "id": "0195f401-2f0a-7a1d-9d8f-2d62d8f1bc2a",
  "name": "Example Blog",
  "url": "https://example.com",
  "description": "A friendly site about writing and engineering.",
  "logo": "https://example.com/logo.png",
  "sort": 10,
  "status": "active",
  "created_at": "2026-03-15T10:00:00Z",
  "updated_at": "2026-03-15T10:00:00Z"
}
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `url` | 全局唯一 |
| `sort` | 数值越小越靠前 |
| `status` | `active` / `pending` / `down` |

## 公共接口

### `GET /api/v1/friend-links`

获取前台公开友情链接列表。仅返回 `is_active=true` 的友链。

**查询参数：** `page`、`page_size`、`keyword`

### `GET /api/v1/friend-links/:id`

根据 UUID 获取前台公开友情链接详情。未启用友链返回 `404`。

## 管理接口

### `GET /api/v1/admin/friend-links`

获取后台友情链接列表。

**查询参数：** `page`、`page_size`、`keyword`、`is_active`

### `GET /api/v1/admin/friend-links/:id`

根据 UUID 获取后台友情链接详情。

### `POST /api/v1/admin/friend-links`

创建友情链接。

```json
{
  "name": "Example Blog",
  "url": "https://example.com",
  "description": "A friendly site about writing and engineering.",
  "logo": "https://example.com/logo.png",
  "sort": 10,
  "is_active": true
}
```

### `PUT /api/v1/admin/friend-links/:id`

全量更新友情链接。

### `PATCH /api/v1/admin/friend-links/:id`

局部更新友情链接。

### `DELETE /api/v1/admin/friend-links/:id`

软删除友情链接。
