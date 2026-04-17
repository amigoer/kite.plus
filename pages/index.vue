<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Kite · 轻量级静态资源托管平台',
  description:
    'Kite 是一个轻量、快速、现代化的静态资源托管平台，支持图片、音视频和任意静态文件，单二进制部署。',
})

const features = [
  {
    icon: 'i-lucide-package',
    title: '单二进制部署',
    description: '前后端编译为一个可执行文件，内嵌 SQLite，直接丢到服务器即可运行。',
  },
  {
    icon: 'i-lucide-images',
    title: '全格式支持',
    description: '图片、音频、视频和任意静态文件一站托管，自动识别 MIME 类型与缩略图。',
  },
  {
    icon: 'i-lucide-cloud',
    title: '多存储后端',
    description: '本地磁盘 · S3 兼容（阿里云 OSS / 腾讯云 COS / Cloudflare R2 / MinIO）自由切换。',
  },
  {
    icon: 'i-lucide-shield-check',
    title: '安全可靠',
    description: 'JWT 鉴权 · API Token 细粒度授权 · 速率限制 · 文件去重与配额管理。',
  },
  {
    icon: 'i-lucide-terminal',
    title: 'PicGo 兼容',
    description: '原生兼容兰空 v2 上传协议，PicGo 等主流图床客户端开箱即用。',
  },
  {
    icon: 'i-lucide-layers',
    title: '现代技术栈',
    description: 'Go (Gin) + React 19 + Tailwind v4，支持 SQLite / MySQL / PostgreSQL。',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-16 pt-24 lg:px-6 lg:pb-24 lg:pt-32">
      <div class="mx-auto max-w-5xl text-center">
        <div class="mb-6 flex justify-center">
          <img src="/logo.svg" alt="Kite" class="h-16 w-16" />
        </div>
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          轻量级静态资源托管平台
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted lg:text-xl">
          像风筝一样轻盈 · 图片、音视频、静态文件一站托管
          <br class="hidden sm:block" />
          单二进制部署 · 本地 / S3 多存储后端 · 开箱即用
        </p>
        <div class="mt-10 flex flex-wrap items-center justify-center gap-3">
          <UButton
            to="/docs/guide/quick-start"
            size="xl"
            icon="i-lucide-rocket"
            trailing-icon="i-lucide-arrow-right"
          >
            快速开始
          </UButton>
          <UButton
            to="https://github.com/amigoer/kite"
            target="_blank"
            size="xl"
            color="neutral"
            variant="outline"
            icon="i-simple-icons-github"
          >
            在 GitHub 查看
          </UButton>
        </div>
        <div class="mt-12 flex justify-center">
          <div
            class="rounded-lg border border-default bg-elevated px-4 py-2 font-mono text-sm text-muted"
          >
            <span class="text-primary">$</span> docker run -p 8080:8080 amigoer/kite:latest
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="border-t border-default bg-elevated/30 px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">核心特性</h2>
          <p class="mt-4 text-muted">覆盖静态资源托管的每一个环节</p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="f in features"
            :key="f.title"
            class="rounded-lg border border-default bg-default p-6 transition-colors hover:border-primary"
          >
            <UIcon :name="f.icon" class="h-8 w-8 text-primary" />
            <h3 class="mt-4 text-lg font-semibold">{{ f.title }}</h3>
            <p class="mt-2 text-sm text-muted">{{ f.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">5 分钟启动你的图床</h2>
        <p class="mt-4 text-muted">
          使用 Docker 一键部署，或下载单个二进制文件直接运行。
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton to="/docs/guide/quick-start" size="lg">
            阅读快速开始
          </UButton>
          <UButton to="/docs/api/overview" size="lg" color="neutral" variant="outline">
            浏览 API 文档
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
