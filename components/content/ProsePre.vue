<script setup lang="ts">
import MermaidRenderer from './MermaidRenderer.vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array,
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

const isMermaid = computed(() => props.language === 'mermaid')

const blockLabel = computed(() => {
  if (props.filename) {
    return props.filename
  }

  if (props.language) {
    return props.language.toUpperCase()
  }

  return 'CODE'
})

async function copyCode() {
  if (!import.meta.client || !props.code) {
    return
  }

  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true

    if (resetTimer) {
      clearTimeout(resetTimer)
    }

    resetTimer = setTimeout(() => {
      copied.value = false
    }, 1800)
  }
  catch {
    copied.value = false
  }
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})
</script>

<template>
  <div class="docs-code-block" :class="{ 'docs-code-block-mermaid': isMermaid }">
    <div class="docs-code-toolbar">
      <div class="docs-code-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span class="docs-code-label">{{ blockLabel }}</span>
      <button type="button" class="docs-copy-button" @click="copyCode">
        <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="h-3.5 w-3.5" />
        <span>{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>

    <MermaidRenderer v-if="isMermaid" :code="code" />
    <pre v-else :class="$props.class"><slot /></pre>
  </div>
</template>

<style>
pre code .line{display:block}
</style>