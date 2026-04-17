<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

defineProps<{
  navigation: ContentNavigationItem[]
}>()
</script>

<template>
  <nav class="space-y-6 text-sm">
    <template v-for="group in navigation" :key="group.path">
      <div v-if="group.children?.length">
        <div class="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
          {{ group.title }}
        </div>
        <ul class="space-y-0.5">
          <li v-for="item in group.children" :key="item.path">
            <NuxtLink
              :to="item.path"
              class="block rounded-md px-2 py-1.5 text-muted transition-colors hover:bg-elevated hover:text-default"
              active-class="bg-primary/10 text-primary font-medium"
            >
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>
  </nav>
</template>
