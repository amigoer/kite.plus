<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default py-8 text-sm text-muted">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row lg:px-6">
      <p>基于 MIT 许可发布 · © {{ year }} Kite</p>
      <div class="flex items-center gap-4">
        <NuxtLink
          to="https://github.com/amigoer/kite"
          target="_blank"
          class="hover:text-default transition-colors"
        >
          GitHub
        </NuxtLink>
        <NuxtLink
          to="https://demo.kite.plus"
          target="_blank"
          class="hover:text-default transition-colors"
        >
          在线演示
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
