<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useDocsPage(() => route.path)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`surround-${route.path}`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['title', 'description'],
  })
})

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <article v-if="page" class="min-w-0">
    <header class="mb-8 border-b border-default pb-6">
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        {{ page.title }}
      </h1>
      <p v-if="page.description" class="mt-3 text-lg text-muted">
        {{ page.description }}
      </p>
    </header>

    <div class="docs-prose max-w-none">
      <ContentRenderer :value="page" />
    </div>

    <nav
      v-if="surround && (surround[0] || surround[1])"
      class="mt-12 flex items-stretch gap-4 border-t border-default pt-6"
    >
      <NuxtLink
        v-if="surround[0]"
        :to="surround[0].path"
        class="group flex-1 rounded-lg border border-default p-4 transition-colors hover:border-primary"
      >
        <div class="text-xs text-muted">上一篇</div>
        <div class="mt-1 font-medium group-hover:text-primary">
          ← {{ surround[0].title }}
        </div>
      </NuxtLink>
      <div v-else class="flex-1" />
      <NuxtLink
        v-if="surround[1]"
        :to="surround[1].path"
        class="group flex-1 rounded-lg border border-default p-4 text-right transition-colors hover:border-primary"
      >
        <div class="text-xs text-muted">下一篇</div>
        <div class="mt-1 font-medium group-hover:text-primary">
          {{ surround[1].title }} →
        </div>
      </NuxtLink>
      <div v-else class="flex-1" />
    </nav>
  </article>
</template>
