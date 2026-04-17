<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

useSeoMeta({
  title: '文档',
  description: 'Kite 静态资源托管平台的完整文档，包含部署指南与 API 参考。',
})
</script>

<template>
  <div class="prose prose-slate dark:prose-invert max-w-none">
    <h1>Kite 文档</h1>
    <p class="lead">
      欢迎来到 Kite 文档站。选择你感兴趣的章节开始阅读。
    </p>

    <div class="not-prose mt-8 grid gap-4 md:grid-cols-2">
      <NuxtLink
        to="/docs/guide/introduction"
        class="group rounded-lg border border-default p-6 transition-colors hover:border-primary"
      >
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-book-open" class="h-6 w-6 text-primary" />
          <h2 class="m-0 text-xl font-semibold group-hover:text-primary">指南</h2>
        </div>
        <p class="mt-3 text-sm text-muted">
          从零开始了解 Kite：安装部署、配置调优、存储后端、第三方客户端对接。
        </p>
      </NuxtLink>

      <NuxtLink
        to="/docs/api/overview"
        class="group rounded-lg border border-default p-6 transition-colors hover:border-primary"
      >
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-terminal" class="h-6 w-6 text-primary" />
          <h2 class="m-0 text-xl font-semibold group-hover:text-primary">API 参考</h2>
        </div>
        <p class="mt-3 text-sm text-muted">
          Kite HTTP API 的完整文档：认证、上传、文件管理、相册、Token 与管理员接口。
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
