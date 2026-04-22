<script setup lang="ts">
const route = useRoute()

const { data: page } = await useDocsPage(() => route.path)

const links = computed(() => page.value?.body?.toc?.links ?? [])

// Active heading tracking via IntersectionObserver
const activeId = ref<string>('')

onMounted(() => {
  if (!import.meta.client) return

  const headings = document.querySelectorAll('.docs-prose h2, .docs-prose h3')
  if (!headings.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
  )

  headings.forEach(h => observer.observe(h))
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div v-if="links.length" class="docs-toc">
    <div class="docs-toc-title">本页目录</div>
    <nav class="docs-toc-list">
      <template v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="docs-toc-link"
          :class="{ 'docs-toc-link-active': activeId === link.id }"
        >
          {{ link.text }}
        </a>
        <a
          v-for="child in (link.children ?? [])"
          :key="child.id"
          :href="`#${child.id}`"
          class="docs-toc-link docs-toc-link-child"
          :class="{ 'docs-toc-link-active': activeId === child.id }"
        >
          {{ child.text }}
        </a>
      </template>
    </nav>
  </div>
</template>
