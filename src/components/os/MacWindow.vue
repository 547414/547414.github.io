<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { DesktopWindowState, WindowId } from '@/types/os'

interface MacWindowProps {
  win: DesktopWindowState
  isFocused: boolean
  darkChrome?: boolean
  hideTitleText?: boolean
}

const props = defineProps<MacWindowProps>()

const emit = defineEmits<{
  focus: [id: WindowId]
  close: [id: WindowId]
  minimize: [id: WindowId]
  toggleMaximize: [id: WindowId]
  move: [payload: { id: WindowId; x: number; y: number }]
}>()

const isDragging = ref<boolean>(false)
let dragStartPointerX = 0
let dragStartPointerY = 0
let dragOriginX = 0
let dragOriginY = 0

const windowStyle = computed<Record<string, string>>(() => {
  if (props.win.isMaximized) {
    return {
      left: '24px',
      top: '40px',
      width: 'calc(100vw - 48px)',
      height: 'calc(100vh - 128px)',
      zIndex: String(props.win.zIndex)
    }
  }
  return {
    left: `${props.win.x}px`,
    top: `${props.win.y}px`,
    width: `${props.win.width}px`,
    height: `${props.win.height}px`,
    zIndex: String(props.win.zIndex)
  }
})

function handlePointerMove(event: PointerEvent): void {
  if (!isDragging.value) {
    return
  }
  const dx = event.clientX - dragStartPointerX
  const dy = event.clientY - dragStartPointerY
  const maxX = Math.max(24, window.innerWidth - 160)
  const minX = -props.win.width + 160
  const maxY = Math.max(40, window.innerHeight - 130)
  const nextX = Math.min(maxX, Math.max(minX, dragOriginX + dx))
  const nextY = Math.min(maxY, Math.max(32, dragOriginY + dy))
  emit('move', { id: props.win.id, x: nextX, y: nextY })
}

function handlePointerUp(): void {
  if (!isDragging.value) {
    return
  }
  isDragging.value = false
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
}

function startDrag(event: PointerEvent): void {
  if (props.win.isMaximized || event.button !== 0) {
    return
  }
  const target = event.target as HTMLElement | null
  if (target?.closest('button, a, input')) {
    return
  }
  emit('focus', props.win.id)
  isDragging.value = true
  dragStartPointerX = event.clientX
  dragStartPointerY = event.clientY
  dragOriginX = props.win.x
  dragOriginY = props.win.y
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="scale-[0.96] opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="scale-[0.95] opacity-0"
  >
    <section
      v-if="win.isOpen && !win.isMinimized"
      :style="windowStyle"
      class="fixed flex flex-col overflow-hidden rounded-2xl"
      :class="[
        darkChrome
          ? 'border border-white/15 bg-[#12141a]/92 text-[#f2f4f8] backdrop-blur-2xl'
          : 'mac-window-glass',
        isDragging ? 'select-none' : 'transition-[left,top,width,height] duration-200 ease-out'
      ]"
      :data-focused="isFocused ? 'true' : 'false'"
      @pointerdown="emit('focus', win.id)"
    >
      <!-- 窗口标题栏（可拖拽 + 双击缩放） -->
      <div
        class="relative flex h-11 shrink-0 cursor-grab items-center px-4 active:cursor-grabbing"
        :class="
          darkChrome
            ? 'border-b border-white/10 bg-[#1a1d26]/90'
            : 'border-b border-[var(--mac-border-soft)] bg-[var(--mac-surface-subtle)]'
        "
        @pointerdown="startDrag"
        @dblclick="emit('toggleMaximize', win.id)"
      >
        <div class="mac-traffic-group z-10 flex items-center gap-2">
          <button
            type="button"
            class="mac-traffic-btn cursor-pointer"
            :class="isFocused ? 'bg-[#ff5f57]' : 'bg-[#d0d0d4] dark:bg-[#4a4a4e]'"
            aria-label="关闭窗口"
            @click.stop="emit('close', win.id)"
          >
            <svg viewBox="0 0 8 8" class="h-2 w-2 stroke-[#4d0000]" stroke-width="1.3">
              <path d="M1.5 1.5 L6.5 6.5 M6.5 1.5 L1.5 6.5" stroke-linecap="round" />
            </svg>
          </button>

          <button
            type="button"
            class="mac-traffic-btn cursor-pointer"
            :class="isFocused ? 'bg-[#febc2e]' : 'bg-[#d0d0d4] dark:bg-[#4a4a4e]'"
            aria-label="最小化窗口"
            @click.stop="emit('minimize', win.id)"
          >
            <svg viewBox="0 0 8 8" class="h-2 w-2 stroke-[#6b4400]" stroke-width="1.3">
              <path d="M1.5 4 L6.5 4" stroke-linecap="round" />
            </svg>
          </button>

          <button
            type="button"
            class="mac-traffic-btn cursor-pointer"
            :class="isFocused ? 'bg-[#28c840]' : 'bg-[#d0d0d4] dark:bg-[#4a4a4e]'"
            aria-label="切换全尺寸"
            @click.stop="emit('toggleMaximize', win.id)"
          >
            <svg viewBox="0 0 8 8" class="h-2 w-2 stroke-[#004d0d]" stroke-width="1.2">
              <path d="M2 5.5 L2 2 L5.5 2 M6 2.5 L6 6 L2.5 6" fill="none" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div
          v-if="!hideTitleText"
          class="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] font-medium"
          :class="darkChrome ? 'text-white/70' : 'text-[var(--mac-text-tertiary)]'"
        >
          {{ win.title }}
        </div>

        <div class="ml-auto z-10 flex items-center gap-2">
          <slot name="toolbar" />
        </div>
      </div>

      <!-- 窗口主体内容 -->
      <div class="min-h-0 flex-1 overflow-hidden">
        <slot />
      </div>
    </section>
  </Transition>
</template>

<style scoped>
section[data-focused='true'] {
  box-shadow: var(--mac-shadow-window);
}

section[data-focused='false'] {
  box-shadow: var(--mac-shadow-window-inactive);
}
</style>
