---
outline: deep
---

<!-- 本文件包含 Go 模板语法 {{ }}，需要阻止 Vue 模板解析 -->

<div v-pre>

# 独立页面模板开发指南

本文档面向主题/模板开发者，介绍如何为 Kite 博客创建自定义独立页面模板。

## 架构概览

```
用户后台选择模板 → 填写模板参数 → 保存为 JSON (config)
                                      ↓
前台访问 /{slug} → 后端解析 config → 注入 .PageConfig → 渲染对应模板
```

| 层级 | 文件 | 职责 |
|------|------|------|
| 模板文件 | `templates/pages/{name}.html` | Go html/template 渲染页面 |
| 后端路由 | `internal/api/ssr.go` | 解析 `config` JSON，注入模板上下文 |
| 前端字段 | `ui/admin/src/pages/PageEditorPage.tsx` | 定义模板参数的表单字段 |

## 快速开始：创建新模板

### 第 1 步：创建模板文件

在 `templates/pages/` 目录下新建 `{name}.html`：

```html
{{ define "pages/links.html" }}
<!DOCTYPE html>
<html lang="zh-CN">
{{ template "head" . }}
<body>
  {{ template "header" . }}

  <main>
    <div class="container">
      <h1 class="page-title">{{ .Page.Title }}</h1>

      <!-- 使用 .PageConfig 中的模板参数 -->
      <p>展示数量：{{ index .PageConfig "count" }}</p>

      <!-- 页面正文内容 -->
      <div class="post-content">
        {{ .Page.ContentHTML | safeHTML }}
      </div>
    </div>
  </main>

  {{ template "footer" . }}
</body>
</html>
{{ end }}
```

> **注意**：`{{ define "pages/{name}.html" }}` 中的名称**必须**与文件路径一致。

### 第 2 步：注册模板选项

编辑 `ui/admin/src/pages/PageEditorPage.tsx`，在 `PAGE_TEMPLATES` 数组中添加：

```typescript
const PAGE_TEMPLATES = [
  { value: 'default', label: '默认模板' },
  { value: 'github', label: 'GitHub 风格' },
  { value: 'links', label: '友链展示' },  // ← 新增
]
```

### 第 3 步：定义模板参数字段

在同文件的 `TEMPLATE_FIELDS` 对象中添加字段定义：

```typescript
const TEMPLATE_FIELDS: Record<string, TemplateField[]> = {
  default: [],
  github: [ /* ... */ ],
  links: [  // ← 新增
    {
      key: 'count',
      label: '展示数量',
      description: '首页最多展示多少个友链',
      type: 'number',
      defaultValue: 20,
    },
    {
      key: 'show_desc',
      label: '显示描述',
      description: '是否显示友链的描述文字',
      type: 'switch',
      defaultValue: true,
    },
  ],
}
```

完成以上三步后，用户在后台选择"友链展示"模板时，右侧面板会自动展示对应的表单字段。

## 模板上下文变量

### 通用变量（所有页面可用）

| 变量 | 类型 | 说明 |
|------|------|------|
| `.SiteName` | `string` | 站点名称 |
| `.Description` | `string` | 站点描述 |
| `.Keywords` | `string` | 站点关键词 |
| `.Favicon` | `string` | Favicon 地址 |
| `.Logo` | `string` | Logo 地址 |
| `.ICP` | `string` | ICP 备案号 |
| `.Footer` | `string` | 页脚内容 |
| `.PageTitle` | `string` | 当前页面标题 |
| `.NavPages` | `[]Page` | 导航栏中的页面列表 |

### 独立页面专用变量

| 变量 | 类型 | 说明 |
|------|------|------|
| `.Page` | `Page` | 当前页面对象 |
| `.Page.Title` | `string` | 页面标题 |
| `.Page.Slug` | `string` | URL Slug |
| `.Page.ContentHTML` | `string` | 页面正文 HTML |
| `.Page.ContentMarkdown` | `string` | 页面正文 Markdown |
| `.Page.Status` | `string` | 状态：`draft` / `published` |
| `.Page.Template` | `string` | 使用的模板名称 |
| `.Page.SortOrder` | `int` | 排序优先级 |
| `.Page.ShowInNav` | `bool` | 是否显示在导航栏 |
| `.Page.PublishedAt` | `*time.Time` | 发布时间 |
| `.PageConfig` | `map[string]interface{}` | 模板参数（从 Config JSON 解析） |

### 读取 PageConfig 参数

使用 Go 模板的 `index` 函数：

```html
<!-- 字符串参数 -->
{{ index .PageConfig "username" }}

<!-- 数字参数 -->
{{ index .PageConfig "count" }}

<!-- 布尔参数 -->
{{ if eq (index .PageConfig "show_fork") true }}...{{ end }}
```

## 字段类型定义

`TemplateField` 接口定义了每个模板参数的元信息：

```typescript
interface TemplateField {
  key: string           // 参数键名，对应 config JSON 中的 key
  label: string         // 后台表单显示的标签
  description?: string  // 可选的说明文字
  type: 'text' | 'number' | 'switch'  // 控件类型
  defaultValue: string | number | boolean  // 默认值
  placeholder?: string  // 仅 text 类型可用
}
```

| type | 渲染控件 | 适用场景 |
|------|----------|----------|
| `text` | `Input` 文本框 | 用户名、URL、标题等 |
| `number` | `InputNumber` 数字框 | 数量、限制值等 |
| `switch` | `Switch` 开关 | 布尔选项 |

## 清单文件规范

在 `templates/pages/` 下创建同名 `.json` 文件：

```json
{
  "name": "豆瓣书影展示",
  "description": "展示指定用户的豆瓣观影和阅读记录",
  "fields": [
    {
      "key": "user_id",
      "label": "豆瓣用户 ID",
      "type": "string",
      "required": true,
      "placeholder": "例如：123456789"
    },
    {
      "key": "show_books",
      "label": "显示书籍",
      "type": "boolean",
      "default": true
    }
  ]
}
```

| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| `name` | string | ✅ | 模板显示名称 |
| `description` | string | ✅ | 模板描述 |
| `fields` | array | ✅ | 配置参数列表 |
| `fields[].key` | string | ✅ | 参数键名 |
| `fields[].label` | string | ✅ | 显示标签 |
| `fields[].type` | string | ✅ | 类型：`string` / `number` / `boolean` |
| `fields[].required` | boolean | — | 是否必填 |
| `fields[].default` | any | — | 默认值 |
| `fields[].placeholder` | string | — | 输入提示 |

## 可复用的模板片段

| 片段 | 用途 |
|------|------|
| `{{ template "head" . }}` | HTML head 部分（含 meta、CSS 引用） |
| `{{ template "header" . }}` | 页面顶部导航栏 |
| `{{ template "footer" . }}` | 页面底部页脚 |

## 现有模板参考

### default — 默认模板

无额外参数。仅展示页面标题和正文内容。

### github — GitHub 风格

展示 GitHub 用户的公开仓库列表。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `username` | text | `""` | GitHub 用户名 |
| `count` | number | `6` | 展示仓库数量 |
| `show_fork` | switch | `false` | 是否显示 Fork 仓库 |

## 数据库字段

页面数据存储在 `pages` 表中，模板相关字段：

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `template` | `VARCHAR(64)` | `"default"` | 模板名称，对应 `templates/pages/{template}.html` |
| `config` | `TEXT` | `""` | JSON 格式的模板参数 |

</div>
