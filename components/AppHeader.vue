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
  { label: '在线演示', to: 'https://www.kite.plus', target: '_blank' },
]

const mobileOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

const { data: release } = await useLatestRelease()
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-default bg-default/80 backdrop-blur"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
      <div class="flex items-center gap-3 sm:gap-6 md:gap-8">
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold">
            <img src="/logo.svg" alt="Kite" class="h-7 w-7" />
            <span class="text-lg">Kite</span>
          </NuxtLink>
          <a
            v-if="release?.tag"
            :href="release.url ?? `https://github.com/amigoer/kite/releases/tag/${release.tag}`"
            target="_blank"
            rel="noopener"
            :title="`最新版本 ${release.tag}`"
            class="hidden rounded-md border border-default bg-elevated px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted transition-colors hover:border-primary hover:text-default sm:inline-block"
          >
            {{ release.tag }}
          </a>
        </div>
        <nav class="hidden items-center gap-6 text-sm md:flex">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            :target="l.target"
            class="text-muted transition-colors hover:text-default"
            active-class="text-primary"
          >
            {{ l.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex items-center gap-1">
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
          aria-label="GitHub"
        />
        <UButton
          class="md:hidden"
          color="neutral"
          variant="ghost"
          :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
          :aria-label="mobileOpen ? '关闭菜单' : '打开菜单'"
          @click="mobileOpen = !mobileOpen"
        />
      </div>
    </div>
    <div
      v-if="mobileOpen"
      class="border-t border-default bg-default/95 backdrop-blur md:hidden"
    >
      <nav class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          :target="l.target"
          class="rounded-md px-3 py-2 text-muted transition-colors hover:bg-elevated hover:text-default"
          active-class="bg-primary/10 text-primary"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
