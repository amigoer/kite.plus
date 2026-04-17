<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('docs')
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-1 mx-auto w-full max-w-7xl px-4 lg:px-6">
      <div class="flex flex-col lg:flex-row gap-8 py-8">
        <aside class="lg:w-64 lg:shrink-0">
          <div class="lg:sticky lg:top-20">
            <AppSidebar :navigation="navigation ?? []" />
          </div>
        </aside>
        <div class="flex-1 min-w-0">
          <slot />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
