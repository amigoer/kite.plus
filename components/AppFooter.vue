<script setup lang="ts">
const year = new Date().getFullYear()

const columns: {
  title: string
  links: { label: string; to: string; target?: string }[]
}[] = [
  {
    title: '文档',
    links: [
      { label: '快速开始', to: '/docs/guide/quick-start' },
      { label: '配置说明', to: '/docs/guide/configuration' },
      { label: '生产部署', to: '/docs/guide/deployment' },
      { label: '升级指南', to: '/docs/guide/upgrade' },
    ],
  },
  {
    title: 'API',
    links: [
      { label: '概述', to: '/docs/api/overview' },
      { label: '认证', to: '/docs/api/authentication' },
      { label: '上传', to: '/docs/api/upload' },
      { label: '文件与相册', to: '/docs/api/files' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: 'GitHub 仓库', to: 'https://github.com/amigoer/kite', target: '_blank' },
      { label: '发布版本', to: 'https://github.com/amigoer/kite/releases', target: '_blank' },
      { label: '在线演示', to: 'https://www.kite.plus', target: '_blank' },
      { label: '问题反馈', to: 'https://github.com/amigoer/kite/issues', target: '_blank' },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-default bg-elevated/20">
    <div class="mx-auto max-w-7xl px-4 py-14 lg:px-6">
      <div class="grid grid-cols-2 gap-10 sm:grid-cols-4">
        <div class="col-span-2 sm:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
            <img src="/logo.svg" alt="Kite" class="h-7 w-7" />
            <span class="text-lg">Kite</span>
          </NuxtLink>
          <p class="mt-3 text-sm leading-relaxed text-muted">
            轻量级静态资源托管平台，单二进制部署，本地 / S3 多存储后端。
          </p>
          <div class="mt-4 flex items-center gap-2">
            <UButton
              to="https://github.com/amigoer/kite"
              target="_blank"
              aria-label="GitHub"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-simple-icons-github"
            />
            <UButton
              to="https://www.kite.plus"
              target="_blank"
              aria-label="在线演示"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-external-link"
            />
          </div>
        </div>

        <div
          v-for="col in columns"
          :key="col.title"
          class="min-w-0"
        >
          <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-dimmed">
            {{ col.title }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="l in col.links" :key="l.to">
              <NuxtLink
                :to="l.to"
                :target="l.target"
                class="text-muted transition-colors hover:text-default"
              >
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-default pt-6 text-xs text-muted sm:flex-row"
      >
        <p>基于 MIT 许可发布 · © {{ year }} Kite</p>
        <p class="flex items-center gap-1.5">
          <UIcon name="i-lucide-heart" class="h-3.5 w-3.5 text-primary" />
          Made with care for self-hosters
        </p>
      </div>
    </div>
  </footer>
</template>
