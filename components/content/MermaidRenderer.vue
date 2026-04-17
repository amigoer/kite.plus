<script setup lang="ts">
import mermaid from 'mermaid'

const props = defineProps<{
  code: string
}>()

const colorMode = useColorMode()
const svg = ref('')
const error = ref('')
const uid = useId()
const isZoomed = ref(false)
const zoomLevel = ref(1)
let renderSequence = 0

async function renderDiagram() {
  if (!import.meta.client) {
    return
  }

  const isDark = colorMode.value === 'dark'

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    themeVariables: {
      background: 'transparent',
      primaryColor: isDark ? '#18181b' : '#fafaf9',
      primaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      primaryBorderColor: isDark ? '#52525b' : '#a8a29e',
      lineColor: isDark ? '#a1a1aa' : '#57534e',
      tertiaryColor: isDark ? '#27272a' : '#f5f5f4',
      clusterBkg: isDark ? '#18181b' : '#fafaf9',
      clusterBorder: isDark ? '#52525b' : '#a8a29e',
      mainBkg: isDark ? '#18181b' : '#fafaf9',
      nodeBorder: isDark ? '#52525b' : '#a8a29e',
      edgeLabelBackground: isDark ? '#18181b' : '#ffffff',
      fontSize: '15px',
    },
  })

  try {
    error.value = ''
    renderSequence += 1
    const { svg: rendered } = await mermaid.render(`${uid}-${renderSequence}`, props.code)
    svg.value = rendered
  }
  catch (err) {
    svg.value = ''
    error.value = err instanceof Error ? err.message : 'Mermaid 渲染失败'
  }
}

function openZoom() {
  if (!svg.value) return
  zoomLevel.value = 1
  isZoomed.value = true
}

function closeZoom() {
  isZoomed.value = false
}

function zoomIn() {
  zoomLevel.value = Math.min(zoomLevel.value + 0.25, 4)
}

function zoomOut() {
  zoomLevel.value = Math.max(zoomLevel.value - 0.25, 0.5)
}

function zoomReset() {
  zoomLevel.value = 1
}

function handleKeydown(e: KeyboardEvent) {
  if (!isZoomed.value) return

  if (e.key === 'Escape') {
    closeZoom()
  }
  else if (e.key === '+' || e.key === '=') {
    e.preventDefault()
    zoomIn()
  }
  else if (e.key === '-' || e.key === '_') {
    e.preventDefault()
    zoomOut()
  }
  else if (e.key === '0') {
    e.preventDefault()
    zoomReset()
  }
}

function handleWheel(e: WheelEvent) {
  if (!isZoomed.value) return
  if (!(e.ctrlKey || e.metaKey)) return
  e.preventDefault()

  if (e.deltaY < 0) {
    zoomIn()
  }
  else {
    zoomOut()
  }
}

watch(
  () => [props.code, colorMode.value],
  async () => {
    await nextTick()
    await renderDiagram()
  },
  { immediate: true },
)

watch(isZoomed, (v) => {
  if (!import.meta.client) return

  if (v) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
  }
  else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  if (!import.meta.client) return

  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="svg"
      class="docs-mermaid"
      role="button"
      tabindex="0"
      title="点击放大"
      @click="openZoom"
      @keydown.enter="openZoom"
      @keydown.space.prevent="openZoom"
    >
      <div v-html="svg" />
      <span class="docs-mermaid-zoom-hint">
        <UIcon name="i-lucide-maximize-2" class="h-3 w-3" />
        <span>点击放大</span>
      </span>
    </div>
    <div v-else-if="error" class="docs-mermaid-error">
      {{ error }}
    </div>
    <template #fallback>
      <div class="docs-mermaid-loading">Mermaid 图表加载中...</div>
    </template>

    <Teleport v-if="isZoomed && svg" to="body">
      <div
        class="docs-mermaid-modal"
        role="dialog"
        aria-modal="true"
        aria-label="放大查看图表"
        @wheel="handleWheel"
      >
        <div class="docs-mermaid-modal-toolbar">
          <button
            type="button"
            class="docs-mermaid-modal-btn"
            aria-label="缩小"
            title="缩小 (−)"
            @click="zoomOut"
          >
            <UIcon name="i-lucide-minus" class="h-4 w-4" />
          </button>
          <span class="docs-mermaid-modal-zoom">{{ Math.round(zoomLevel * 100) }}%</span>
          <button
            type="button"
            class="docs-mermaid-modal-btn"
            aria-label="放大"
            title="放大 (+)"
            @click="zoomIn"
          >
            <UIcon name="i-lucide-plus" class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="docs-mermaid-modal-btn"
            aria-label="重置缩放"
            title="重置 (0)"
            @click="zoomReset"
          >
            <UIcon name="i-lucide-refresh-cw" class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="docs-mermaid-modal-btn"
            aria-label="关闭"
            title="关闭 (Esc)"
            @click="closeZoom"
          >
            <UIcon name="i-lucide-x" class="h-4 w-4" />
          </button>
        </div>
        <div class="docs-mermaid-modal-content" @click.self="closeZoom">
          <div
            class="docs-mermaid-modal-svg"
            :style="{ transform: `scale(${zoomLevel})` }"
            v-html="svg"
          />
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
