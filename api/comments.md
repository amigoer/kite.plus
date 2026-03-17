# 评论 API

## 公共接口

### `GET /api/v1/posts/:id/comments`

获取指定文章的**已审核**评论列表。

**查询参数：**
- `page`: 页码，默认 `1`
- `page_size`: 每页数量，默认 `20`

### `POST /api/v1/posts/:id/comments`

前台访客提交评论（默认进入 `pending` 待审核状态）。

请求体示例：

```json
{
  "author": "访客",
  "email": "visitor@example.com",
  "content": "写得真好！"
}
```

::: info 说明
- 服务端自动记录 IP 和 User-Agent
- 新评论状态为 `pending`，需管理员审核后才会前台展示
:::

## 管理接口

### `GET /api/v1/admin/comments`

获取后台评论列表。

**查询参数：**
- `page`、`page_size`: 分页
- `status`: 可选值 `approved` / `pending` / `spam`
- `keyword`: 搜索评论内容或作者
- `post_id`: 按文章 UUID 筛选

### `GET /api/v1/admin/comments/stats`

获取评论统计。

响应示例：

```json
{
  "code": 200,
  "data": {
    "total": 42,
    "approved": 30,
    "pending": 10,
    "spam": 2
  },
  "msg": "ok"
}
```

### `PATCH /api/v1/admin/comments/:id`

审核评论（修改状态）。

```json
{
  "status": "approved"
}
```

可选值：`approved` / `pending` / `spam`

### `DELETE /api/v1/admin/comments/:id`

删除评论。
