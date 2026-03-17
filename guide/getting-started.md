# 快速开始

## 环境要求

- Go 1.22+
- Node.js 18+（仅构建前端需要）
- Git

## 构建与运行

### 使用 Make

```bash
# 克隆项目
git clone https://github.com/amigoer/kite.git
cd kite

# 构建（前端 + 后端）
make build

# 运行
./kite
```

### 手动构建

```bash
# 克隆项目
git clone https://github.com/amigoer/kite.git
cd kite

# 构建管理后台前端
cd ui/admin && npm install && npm run build && cd ../..

# 编译 Go 二进制（前端资源自动嵌入）
go build -ldflags="-s -w" -o kite cmd/kite/main.go

# 运行
./kite
```

## 首次安装

首次运行时，Web 安装向导会自动启动：

```
🪁 Kite first run — visit the installer: http://localhost:8080
```

打开浏览器，2 步完成安装：

1. 输入站点名称
2. 设置管理员用户名和密码

安装完成后重启即可使用。

## 开发模式

### 后端开发

```bash
go run ./cmd/kite
```

### 前端开发

```bash
cd ui/admin
npm install
npm run dev    # Vite 开发服务器，API 自动代理到 :8080
```

开发前端地址：`http://localhost:5173/admin`，Vite 自动将 `/api` 代理到 Go 后端。

### Make 命令

```bash
make build         # 构建前端 + 后端
make build-server  # 仅构建后端
make build-ui      # 仅构建前端
make run           # 运行后端
make test          # 运行测试
make clean         # 清理构建产物
```

## Docker 部署

### Dockerfile

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN apk add --no-cache nodejs npm
RUN cd ui/admin && npm ci && npm run build && cd ../..
RUN go build -ldflags="-s -w" -o kite ./cmd/kite

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/kite .
EXPOSE 8080
VOLUME ["/app/data"]
CMD ["./kite"]
```

### 构建与运行

```bash
docker build -t kite .
docker run -d -p 8080:8080 -v kite-data:/app/data kite
```

## 数据备份

所有数据（内容 + 配置）都存储在一个 `kite.db` 文件中：

```bash
# 备份
cp kite.db kite.db.bak

# 迁移到新服务器
scp kite.db user@new-server:/path/to/kite/

# 恢复
cp kite.db.bak kite.db
```

## AI 配置

在管理后台 **设置 → AI 集成** 中配置：

1. 启用 AI
2. 输入 API 接口地址（支持任何 OpenAI 兼容 API）
3. 输入 API Key 和模型名称
4. 保存 — 立即生效

| 服务商 | API 接口地址 | 推荐模型 |
|--------|-------------|---------|
| DeepSeek | `https://api.deepseek.com` | `deepseek-chat` |
| OpenAI | `https://api.openai.com` | `gpt-4o-mini` |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode` | `qwen-turbo` |
| Ollama（本地） | `http://localhost:11434` | `llama3` |

## 下一步

- 了解 [主题开发](/guide/theme-dev) 来定制你的博客外观
- 查看 [API 参考](/api/) 了解完整的后端接口
