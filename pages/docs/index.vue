<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

useSeoMeta({
  title: '文档',
  description: 'Kite 静态资源托管平台的完整文档，包含部署指南与 API 参考。',
})

const guideSections = [
  {
    icon: 'i-lucide-book-open',
    title: '介绍',
    description: '了解 Kite 的定位、核心能力与架构。',
    to: '/docs/guide/introduction',
  },
  {
    icon: 'i-lucide-rocket',
    title: '快速开始',
    description: '5 分钟启动第一个 Kite 实例。',
    to: '/docs/guide/quick-start',
  },
  {
    icon: 'i-lucide-settings-2',
    title: '配置说明',
    description: '环境变量与数据库运行时配置。',
    to: '/docs/guide/configuration',
  },
  {
    icon: 'i-lucide-cloud',
    title: '存储配置',
    description: '本地磁盘与 S3 兼容对象存储接入。',
    to: '/docs/guide/storage',
  },
  {
    icon: 'i-lucide-server',
    title: '生产部署',
    description: '源码 · Docker · Compose · 二进制全方案。',
    to: '/docs/guide/deployment',
  },
  {
    icon: 'i-lucide-arrow-up-circle',
    title: '升级指南',
    description: '备份 · 升级 · 校验 · 回滚全流程。',
    to: '/docs/guide/upgrade',
  },
  {
    icon: 'i-lucide-puzzle',
    title: '第三方客户端',
    description: 'PicGo · ShareX 等主流图床客户端接入。',
    to: '/docs/guide/clients',
  },
]

const apiSections = [
  {
    icon: 'i-lucide-compass',
    title: 'API 概述',
    description: '路径约定、鉴权方式、响应结构与错误码。',
    to: '/docs/api/overview',
  },
  {
    icon: 'i-lucide-key',
    title: '认证',
    description: '登录、注册、Token 刷新与个人资料。',
    to: '/docs/api/authentication',
  },
  {
    icon: 'i-lucide-upload-cloud',
    title: '文件上传',
    description: '兼容兰空 v2 协议的上传接口。',
    to: '/docs/api/upload',
  },
  {
    icon: 'i-lucide-folder',
    title: '文件管理',
    description: '列表、详情、删除与批量操作。',
    to: '/docs/api/files',
  },
  {
    icon: 'i-lucide-images',
    title: '相册',
    description: '相册的创建、更新、列表与删除。',
    to: '/docs/api/albums',
  },
  {
    icon: 'i-lucide-key-round',
    title: 'API Token',
    description: '为第三方工具创建长期 API 令牌。',
    to: '/docs/api/tokens',
  },
  {
    icon: 'i-lucide-shield',
    title: '管理员 API',
    description: '用户、存储、系统设置、安装向导。',
    to: '/docs/api/admin',
  },
]
</script>

<template>
  <div class="min-w-0">
    <header class="mb-10 border-b border-default pb-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated/70 px-3 py-1 text-xs font-medium text-muted">
        <UIcon name="i-lucide-book-marked" class="h-3.5 w-3.5 text-primary" />
        文档
      </div>
      <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Kite 文档
      </h1>
      <p class="mt-3 max-w-2xl text-lg text-muted">
        从零开始部署 Kite，到对接第三方客户端与 HTTP API 的完整参考手册。
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <UButton
          to="/docs/guide/quick-start"
          size="md"
          icon="i-lucide-rocket"
          trailing-icon="i-lucide-arrow-right"
        >
          快速开始
        </UButton>
        <UButton
          to="/docs/api/overview"
          size="md"
          color="neutral"
          variant="outline"
          icon="i-lucide-code-2"
        >
          API 概述
        </UButton>
      </div>
    </header>

    <section class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">指南</h2>
          <p class="mt-1 text-sm text-muted">
            安装部署、配置调优、存储后端与客户端接入。
          </p>
        </div>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <NuxtLink
          v-for="s in guideSections"
          :key="s.to"
          :to="s.to"
          class="group flex items-start gap-3 rounded-lg border border-default bg-default p-4 transition-colors hover:border-primary"
        >
          <div class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UIcon :name="s.icon" class="h-4.5 w-4.5" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 text-sm font-semibold group-hover:text-primary">
              {{ s.title }}
              <UIcon
                name="i-lucide-arrow-up-right"
                class="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </div>
            <p class="mt-1 text-sm leading-relaxed text-muted">{{ s.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section>
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">API 参考</h2>
          <p class="mt-1 text-sm text-muted">
            Kite HTTP API 的完整文档，覆盖认证、上传、管理全流程。
          </p>
        </div>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <NuxtLink
          v-for="s in apiSections"
          :key="s.to"
          :to="s.to"
          class="group flex items-start gap-3 rounded-lg border border-default bg-default p-4 transition-colors hover:border-primary"
        >
          <div class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UIcon :name="s.icon" class="h-4.5 w-4.5" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 text-sm font-semibold group-hover:text-primary">
              {{ s.title }}
              <UIcon
                name="i-lucide-arrow-up-right"
                class="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </div>
            <p class="mt-1 text-sm leading-relaxed text-muted">{{ s.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
