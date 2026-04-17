<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

defineProps<{
  navigation: ContentNavigationItem[]
}>()
</script>

<template>
  <nav class="text-sm">
    <template v-for="group in navigation" :key="group.path">
      <div v-if="group.children?.length">
        <template v-for="item in group.children" :key="item.path">
          <div v-if="item.children?.length" class="docs-sidebar-group">
            <div class="docs-sidebar-group-title">
              {{ item.title }}
            </div>
            <ul class="space-y-0.5">
              <li v-for="child in item.children" :key="child.path">
                <NuxtLink
                  :to="child.path"
                  class="docs-sidebar-link"
                  active-class="docs-sidebar-link-active"
                >
                  {{ child.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <NuxtLink
            v-else
            :to="item.path"
            class="docs-sidebar-link"
            active-class="docs-sidebar-link-active"
          >
            {{ item.title }}
          </NuxtLink>
        </template>
      </div>
    </template>
  </nav>
</template>
