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

type InstallMethod = 'docker' | 'compose' | 'binary'

const activeInstall = ref<InstallMethod>('docker')

const installMethods: {
  key: InstallMethod
  label: string
  icon: string
  hint: string
  lang: string
  code: string
}[] = [
  {
    key: 'docker',
    label: 'Docker',
    icon: 'i-simple-icons-docker',
    hint: '一行命令启动，适合快速体验。',
    lang: 'bash',
    code: `docker run -d \\
  --name kite \\
  -p 8080:8080 \\
  -v $(pwd)/data:/app/data \\
  amigoer/kite:latest`,
  },
  {
    key: 'compose',
    label: 'Docker Compose',
    icon: 'i-lucide-boxes',
    hint: '推荐用于生产部署，声明式管理配置与持久化。',
    lang: 'yaml',
    code: `services:
  kite:
    image: amigoer/kite:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      KITE_SITE_URL: https://your-domain.com
      KITE_DB_DRIVER: sqlite
      KITE_DSN: /app/data/kite.db
    volumes:
      - ./data:/app/data`,
  },
  {
    key: 'binary',
    label: '二进制',
    icon: 'i-lucide-terminal',
    hint: '从 GitHub Releases 下载对应平台压缩包直接运行。',
    lang: 'bash',
    code: `# Linux amd64 示例
curl -LO https://github.com/kite-plus/kite/releases/latest/download/kite-linux-amd64.tar.gz
tar -xzf kite-linux-amd64.tar.gz
chmod +x kite

./kite`,
  },
]

const currentInstall = computed(
  () => installMethods.find(m => m.key === activeInstall.value) ?? installMethods[0],
)

const heroCommand = 'docker run -p 8080:8080 amigoer/kite:latest'

const copied = ref<string | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function copy(text: string, key: string) {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(text)
    copied.value = key
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = null
    }, 1800)
  }
  catch {
    copied.value = null
  }
}

onBeforeUnmount(() => {
  if (copyTimer) clearTimeout(copyTimer)
})

const storageBackends = [
  { name: '本地磁盘', icon: 'i-lucide-hard-drive', note: '开箱即用' },
  { name: 'Amazon S3', icon: 'i-simple-icons-amazons3', note: '官方 SDK v2' },
  { name: '阿里云 OSS', icon: 'i-simple-icons-alibabacloud', note: 'S3 兼容' },
  { name: '腾讯云 COS', icon: 'i-simple-icons-tencentqq', note: 'S3 兼容' },
  { name: 'Cloudflare R2', icon: 'i-simple-icons-cloudflare', note: '零出口费用' },
  { name: 'MinIO', icon: 'i-simple-icons-minio', note: '自托管对象存储' },
]

const useCases = [
  {
    icon: 'i-lucide-code-2',
    title: '个人开发者',
    description: '为博客、Markdown 笔记、社交平台内容提供稳定的图床；PicGo 一键接入。',
    bullets: ['兼容兰空 v2 协议', 'API Token 细粒度授权', '自动缩略图与 WebP'],
  },
  {
    icon: 'i-lucide-users',
    title: '团队协作',
    description: '多用户、配额、角色管理，让团队以统一入口上传、归档、分享素材。',
    bullets: ['相册分组归档', '用户配额与角色', '游客上传可选'],
  },
  {
    icon: 'i-lucide-server',
    title: '自托管爱好者',
    description: '单二进制 + SQLite 零依赖部署，支持 S3 兼容存储平滑迁移扩容。',
    bullets: ['零外部依赖', '本地 / S3 切换', 'Docker · Compose · 裸机'],
  },
]

const stats = [
  { label: '部署大小', value: '< 30 MB', icon: 'i-lucide-package' },
  { label: '启动时间', value: '< 1 s', icon: 'i-lucide-zap' },
  { label: '外部依赖', value: '0', icon: 'i-lucide-shield' },
  { label: '开源许可', value: 'MIT', icon: 'i-lucide-scale' },
]

const { data: release } = await useLatestRelease()
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-4 pb-20 pt-20 lg:px-6 lg:pb-28 lg:pt-28">
      <div class="mx-auto max-w-5xl text-center">
        <div v-if="release?.tag" class="mb-8 flex justify-center">
          <NuxtLink
            :to="release.url ?? `https://github.com/kite-plus/kite/releases/tag/${release.tag}`"
            target="_blank"
            class="group inline-flex items-center gap-2 rounded-full border border-default bg-elevated/70 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur transition-colors hover:border-primary hover:text-default"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {{ release.tag }} 已发布 · 查看更新日志
            <UIcon name="i-lucide-arrow-right" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </NuxtLink>
        </div>
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
            to="https://github.com/kite-plus/kite"
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
          <button
            type="button"
            class="group flex items-center gap-3 rounded-lg border border-default bg-elevated/80 px-4 py-2.5 font-mono text-sm text-muted backdrop-blur transition-colors hover:border-primary"
            @click="copy(heroCommand, 'hero')"
          >
            <span class="text-primary">$</span>
            <span>{{ heroCommand }}</span>
            <span class="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors group-hover:text-default">
              <UIcon
                :name="copied === 'hero' ? 'i-lucide-check' : 'i-lucide-copy'"
                class="h-4 w-4"
              />
            </span>
          </button>
        </div>

        <!-- Stats -->
        <dl class="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          <div
            v-for="s in stats"
            :key="s.label"
            class="flex flex-col items-center gap-1"
          >
            <UIcon :name="s.icon" class="mb-1 h-5 w-5 text-primary/80" />
            <dt class="text-xs uppercase tracking-wider text-muted">{{ s.label }}</dt>
            <dd class="text-xl font-semibold tracking-tight">{{ s.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Features -->
    <section class="border-t border-default bg-elevated/30 px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-14 text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1 text-xs font-medium text-muted">
            <UIcon name="i-lucide-sparkles" class="h-3.5 w-3.5 text-primary" />
            核心特性
          </div>
          <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            覆盖静态资源托管的每一个环节
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-muted">
            从单机部署到云端存储，从个人图床到团队协作 —— 一份二进制即可满足。
          </p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="f in features"
            :key="f.title"
            class="group rounded-xl border border-default bg-default p-6 transition-all hover:border-primary hover:shadow-md"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              <UIcon :name="f.icon" class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-base font-semibold">{{ f.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ f.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Install -->
    <section class="px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-5xl">
        <div class="mb-12 text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated/60 px-3 py-1 text-xs font-medium text-muted">
            <UIcon name="i-lucide-download" class="h-3.5 w-3.5 text-primary" />
            快速安装
          </div>
          <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            三种方式，一分钟启动
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-muted">
            按你熟悉的方式选择一种启动方式，Kite 会自动完成数据库初始化与管理员账号生成。
          </p>
        </div>

        <div class="overflow-hidden rounded-xl border border-default bg-default">
          <div class="flex flex-wrap gap-1 border-b border-default bg-elevated/40 p-1.5">
            <button
              v-for="m in installMethods"
              :key="m.key"
              type="button"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex-none sm:px-4"
              :class="activeInstall === m.key
                ? 'bg-default text-default shadow-sm ring-1 ring-default/60'
                : 'text-muted hover:text-default'"
              @click="activeInstall = m.key"
            >
              <UIcon :name="m.icon" class="h-4 w-4" />
              {{ m.label }}
            </button>
          </div>

          <div class="p-5 sm:p-6">
            <p class="mb-4 flex items-center gap-2 text-sm text-muted">
              <UIcon name="i-lucide-info" class="h-4 w-4 shrink-0 text-primary" />
              <span>{{ currentInstall.hint }}</span>
            </p>

            <div class="relative overflow-hidden rounded-lg border border-neutral-800 bg-[#0d1117]">
              <div class="flex items-center justify-between border-b border-white/5 px-4 py-2">
                <div class="flex items-center gap-1.5">
                  <span class="h-2.5 w-2.5 rounded-full bg-[rgb(255_95_86_/_0.85)]" />
                  <span class="h-2.5 w-2.5 rounded-full bg-[rgb(255_189_46_/_0.85)]" />
                  <span class="h-2.5 w-2.5 rounded-full bg-[rgb(39_201_63_/_0.85)]" />
                </div>
                <span class="font-mono text-xs text-white/45">
                  {{ currentInstall.lang === 'yaml' ? 'docker-compose.yml' : 'shell' }}
                </span>
                <button
                  type="button"
                  class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  @click="copy(currentInstall.code, `install-${currentInstall.key}`)"
                >
                  <UIcon
                    :name="copied === `install-${currentInstall.key}` ? 'i-lucide-check' : 'i-lucide-copy'"
                    class="h-3.5 w-3.5"
                  />
                  {{ copied === `install-${currentInstall.key}` ? '已复制' : '复制' }}
                </button>
              </div>
              <pre class="overflow-x-auto px-5 py-4 font-mono text-sm leading-relaxed text-[#e6edf3]"><code>{{ currentInstall.code }}</code></pre>
            </div>

            <div class="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <UButton
                to="/docs/guide/quick-start"
                variant="soft"
                size="sm"
                trailing-icon="i-lucide-arrow-right"
              >
                完整部署指南
              </UButton>
              <UButton
                to="/docs/guide/configuration"
                variant="ghost"
                size="sm"
                color="neutral"
              >
                查看配置项
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Storage backends -->
    <section class="border-t border-default bg-elevated/30 px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-default bg-default px-3 py-1 text-xs font-medium text-muted">
            <UIcon name="i-lucide-cloud" class="h-3.5 w-3.5 text-primary" />
            存储后端
          </div>
          <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            本地存储，亦或主流云对象存储
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-muted">
            通过统一的 S3 兼容层接入，后端切换无需改动上层代码。
          </p>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div
            v-for="b in storageBackends"
            :key="b.name"
            class="flex flex-col items-center gap-2 rounded-xl border border-default bg-default p-5 transition-colors hover:border-primary"
          >
            <UIcon :name="b.icon" class="h-8 w-8 text-default" />
            <div class="text-sm font-medium">{{ b.name }}</div>
            <div class="text-xs text-muted">{{ b.note }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use cases -->
    <section class="px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated/60 px-3 py-1 text-xs font-medium text-muted">
            <UIcon name="i-lucide-target" class="h-3.5 w-3.5 text-primary" />
            适用场景
          </div>
          <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            一份二进制，多种用法
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div
            v-for="u in useCases"
            :key="u.title"
            class="flex flex-col rounded-xl border border-default bg-default p-6"
          >
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon :name="u.icon" class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-lg font-semibold">{{ u.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ u.description }}</p>
            <ul class="mt-5 space-y-2 border-t border-default pt-4">
              <li
                v-for="b in u.bullets"
                :key="b"
                class="flex items-start gap-2 text-sm text-muted"
              >
                <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{{ b }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="border-t border-default px-4 py-20 lg:px-6">
      <div class="mx-auto max-w-4xl">
        <div class="relative overflow-hidden rounded-2xl border border-default bg-elevated/60 px-8 py-16 text-center backdrop-blur">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(closest-side,rgb(var(--ui-primary)/0.18),transparent)]"
          />
          <h2 class="relative text-3xl font-bold tracking-tight sm:text-4xl">
            5 分钟启动你的静态资源平台
          </h2>
          <p class="relative mx-auto mt-4 max-w-xl text-muted">
            下载二进制、拉取镜像或 docker compose 一键编排 —— 你熟悉的方式都支持。
          </p>
          <div class="relative mt-8 flex flex-wrap justify-center gap-3">
            <UButton
              to="/docs/guide/quick-start"
              size="lg"
              icon="i-lucide-rocket"
              trailing-icon="i-lucide-arrow-right"
            >
              阅读快速开始
            </UButton>
            <UButton
              to="/docs/api/overview"
              size="lg"
              color="neutral"
              variant="outline"
              icon="i-lucide-code-2"
            >
              浏览 API 文档
            </UButton>
            <UButton
              to="https://www.kite.plus"
              target="_blank"
              size="lg"
              color="neutral"
              variant="ghost"
              icon="i-lucide-external-link"
            >
              在线演示
            </UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
