# 标签 API

## 数据模型

```json
{
  "id": "0195f400-13ad-7cbb-9b9f-04d15b759cb8",
  "name": "golang",
  "slug": "golang",
  "created_at": "2026-03-15T10:00:00Z",
  "updated_at": "2026-03-15T10:00:00Z"
}
```

## 公共接口

### `GET /api/v1/tags`

获取公开标签列表。

**查询参数：** `page`、`page_size`、`keyword`

### `GET /api/v1/tags/:id`

根据 UUID 获取公开标签详情。

## 管理接口

### `GET /api/v1/admin/tags`

获取后台标签列表。支持分页与关键字搜索。

### `GET /api/v1/admin/tags/:id`

根据 UUID 获取后台标签详情。

### `POST /api/v1/admin/tags`

创建标签。

```json
{
  "name": "golang",
  "slug": "golang"
}
```

### `PUT /api/v1/admin/tags/:id`

全量更新标签。

### `PATCH /api/v1/admin/tags/:id`

局部更新标签。

### `DELETE /api/v1/admin/tags/:id`

软删除标签。
