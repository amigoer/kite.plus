<script setup lang="ts">
const colorMode = useColorMode()
const isMounted = ref(false)

const isDark = computed(() => colorMode.value === 'dark')

const themeIcon = computed(() => {
  if (!isMounted.value) {
    return 'i-lucide-monitor'
  }

  return isDark.value ? 'i-lucide-sun' : 'i-lucide-moon'
})

const themeLabel = computed(() => (isDark.value ? '切换到浅色模式' : '切换到深色模式'))

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  isMounted.value = true
})

const links = [
  { label: '指南', to: '/docs/guide/introduction' },
  { label: 'API 参考', to: '/docs/api/overview' },
  { label: '在线演示', to: 'https://demo.kite.plus', target: '_blank' },
]
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-default bg-default/80 backdrop-blur"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="Kite" class="h-7 w-7" />
          <span class="text-lg">Kite</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            :target="l.target"
            class="text-muted hover:text-default transition-colors"
            active-class="text-primary"
          >
            {{ l.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          variant="ghost"
          :icon="themeIcon"
          :aria-label="themeLabel"
          :title="themeLabel"
          @click="toggleTheme"
        />
        <UButton
          to="https://github.com/amigoer/kite"
          target="_blank"
          color="neutral"
          variant="ghost"
          icon="i-simple-icons-github"
        />
      </div>
    </div>
  </header>
</template>
