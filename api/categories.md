# 分类 API

## 数据模型

```json
{
  "id": "0195f400-0d80-730a-bf8a-4d9776db8f4d",
  "name": "Backend",
  "slug": "backend",
  "created_at": "2026-03-15T10:00:00Z",
  "updated_at": "2026-03-15T10:00:00Z"
}
```

## 公共接口

### `GET /api/v1/categories`

获取公开分类列表。

**查询参数：** `page`、`page_size`、`keyword`

### `GET /api/v1/categories/:id`

根据 UUID 获取公开分类详情。

## 管理接口

### `GET /api/v1/admin/categories`

获取后台分类列表。支持分页与关键字搜索。

### `GET /api/v1/admin/categories/:id`

根据 UUID 获取后台分类详情。

### `POST /api/v1/admin/categories`

创建分类。

```json
{
  "name": "Backend",
  "slug": "backend"
}
```

### `PUT /api/v1/admin/categories/:id`

全量更新分类。

### `PATCH /api/v1/admin/categories/:id`

局部更新分类。

### `DELETE /api/v1/admin/categories/:id`

软删除分类。
