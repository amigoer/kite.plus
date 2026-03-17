# API 参考

## 概述

Kite 后端采用严格分层结构：`api -> service -> repo -> model`。

当前 API 设计目标：
- 统一支持 `classic` 与 `headless` 两种渲染模式
- 所有资源主键均使用 `uuid.UUID`
- 所有错误都以统一 JSON 结构返回，禁止 `panic`
- 同时兼容 SQLite 与 PostgreSQL
- 优先为后台管理端与未来 AI 能力预留稳定接口

### 基础约定

| 项目 | 约定 |
|------|------|
| Base Path | `/api/v1` |
| Content-Type | `application/json` |
| 时间格式 | RFC3339 |
| ID 类型 | UUID v7 |

## 渲染模式

### Classic 模式

当 `config.render_mode=classic` 时：
- 页面型路由返回 HTML 页面
- 数据型路由仍返回 JSON
- `gin.HTMLRender` 用于渲染 `templates/` 下模板

### Headless 模式

当 `config.render_mode=headless` 时：
- 不输出 SSR 页面
- 仅保留 JSON API
- 所有前台能力通过 API 提供给外部前端

## 统一响应结构

所有 API 响应统一使用以下格式：

```json
{
  "code": 200,
  "data": {},
  "msg": "ok"
}
```

| 字段 | 说明 |
|------|------|
| `code` | 业务状态码，通常与 HTTP 状态协同表达结果 |
| `data` | 具体业务数据；无数据时可返回 `null`、`{}` 或 `[]` |
| `msg` | 人类可读消息 |

### HTTP 状态码约定

| HTTP Status | code | 含义 |
|-------------|------|------|
| 200 | 200 | 请求成功 |
| 201 | 201 | 创建成功 |
| 400 | 400 | 请求参数错误 |
| 401 | 401 | 未认证 |
| 403 | 403 | 无权限 |
| 404 | 404 | 资源不存在 |
| 409 | 409 | 资源冲突 |
| 422 | 422 | 业务校验失败 |
| 500 | 500 | 服务内部错误 |

## 通用请求约定

### 分页

列表接口统一支持：
- `page`: 页码，从 `1` 开始
- `page_size`: 每页数量，默认 `10`，最大建议 `100`

分页响应结构：

```json
{
  "code": 200,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "page_size": 10,
      "total": 0
    }
  },
  "msg": "ok"
}
```

### 排序

当前已实现的列表接口采用服务端固定排序：
- 前台文章：`COALESCE(published_at, created_at) DESC, created_at DESC`
- 后台文章：`created_at DESC`
- 友情链接：`sort ASC, created_at DESC`

### 过滤

| 资源 | 可用过滤参数 |
|------|-------------|
| 前台文章 | `keyword`、`tag_id`、`category_id` + 公开约束 |
| 后台文章 | `status`、`keyword`、`tag_id`、`category_id` |
| 前台友链 | `keyword` + `is_active=true` |
| 后台友链 | `keyword`、`is_active` |
| 标签/分类 | `keyword` |

## Health Check

### `GET /api/v1/health`

用途：健康检查，供部署平台探活。

响应示例：

```json
{
  "code": 200,
  "data": {
    "status": "ok",
    "render_mode": "classic"
  },
  "msg": "ok"
}
```

## 认证

### `POST /api/v1/admin/auth/login`

管理员登录，登录成功后由服务端写入 `HttpOnly Cookie`。

请求体：

```json
{
  "username": "admin",
  "password": "your-password"
}
```

### `GET /api/v1/admin/auth/me`

获取当前管理员登录态与资料。

### `POST /api/v1/admin/auth/logout`

退出当前管理员会话。

## 管理员配置

Kite 当前采用单管理员设计，管理员身份通过配置文件提供：

```yaml
admin:
  enabled: true
  username: admin
  password_hash: "$2a$10$replace.with.bcrypt.hash"
  session_secret: "replace-with-a-long-random-secret"
  session_ttl_hours: 168
  profile:
    display_name: "Amigoer"
    email: "hello@example.com"
    bio: "独立开发者，喜欢写作、设计和 Go。"
    avatar: "https://example.com/avatar.png"
    website: "https://example.com"
    location: "Shanghai"
```

## 接口边界

| 分类 | 路径前缀 | 用途 |
|------|----------|------|
| 公共接口 | `/api/v1/...` | 前台展示与外部 headless 消费 |
| 管理接口 | `/api/v1/admin/...` | 后台管理端，需鉴权 |

## 错误处理约定

- 控制层负责解析请求与返回响应
- 业务校验放在 `service`
- 数据库错误在 `repo` 中包装后上抛
- 禁止直接把底层数据库错误原文暴露给客户端

常见错误消息：`invalid request payload`、`resource not found`、`duplicate slug`、`internal server error`

## V1 已实现能力

- 全部 CRUD：文章、分类、标签、评论、独立页面、友情链接、系统设置
- 鉴权：Cookie-based Session Auth（login/logout/middleware）
- SSR 模板渲染 + Headless API 双模式
- Admin SPA 嵌入 Go 二进制，生产环境单进程部署
- Markdown → HTML 自动转换
