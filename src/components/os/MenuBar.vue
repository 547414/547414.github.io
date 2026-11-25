<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight, Command, Moon, Search, Sun } from 'lucide-vue-next'
import type { MainViewId, WindowId } from '@/types/os'

interface MenuBarProps {
  activeAppLabel: string
  websiteUrl: string
  websiteDisplay: string
  isDark: boolean
}

defineProps<MenuBarProps>()

const emit = defineEmits<{
  openWindow: [id: WindowId]
  navigateView: [view: MainViewId]
  openSpotlight: []
  toggleTheme: []
}>()

const clockText = ref<string>('')
let clockTimer: number | undefined

function updateClock(): void {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekdayList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekday = weekdayList[now.getDay()] ?? ''
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  clockText.value = `${month}月${day}日 ${weekday} ${hours}:${minutes}`
}

onMounted(() => {
  updateClock()
  clockTimer = window.setInterval(updateClock, 15000)
})

onBeforeUnmount(() => {
  if (clockTimer !== undefined) {
    window.clearInterval(clockTimer)
  }
})
</script>

<template>
  <header
    class="mac-menubar fixed inset-x-0 top-0 z-50 flex h-7 select-none items-center justify-between px-3.5 text-[12px] text-[var(--mac-text)]"
  >
    <!-- 左侧菜单 -->
    <div class="flex items-center gap-1 sm:gap-1.5">
      <button
        type="button"
        class="inline-flex h-5 cursor-pointer items-center justify-center rounded px-2 transition-colors hover:bg-[var(--mac-hover)]"
        title="关于 Crysu"
        @click="emit('openWindow', 'about')"
      >
        <Command class="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        class="cursor-pointer rounded px-2 py-0.5 font-semibold tracking-tight transition-colors hover:bg-[var(--mac-hover)]"
        @click="emit('navigateView', 'overview')"
      >
        {{ activeAppLabel }}
      </button>

      <nav aria-label="菜单栏快捷项" class="hidden items-center gap-0.5 md:flex">
        <button
          type="button"
          class="cursor-pointer rounded px-2 py-0.5 text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          @click="emit('navigateView', 'works')"
        >
          作品
        </button>
        <button
          type="button"
          class="cursor-pointer rounded px-2 py-0.5 text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          @click="emit('navigateView', 'enterprise')"
        >
          工程档案
        </button>
        <button
          type="button"
          class="cursor-pointer rounded px-2 py-0.5 text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          @click="emit('navigateView', 'stack')"
        >
          技术栈
        </button>
        <button
          type="button"
          class="cursor-pointer rounded px-2 py-0.5 text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          @click="emit('openWindow', 'terminal')"
        >
          终端
        </button>
        <a
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-0.5 rounded px-2 py-0.5 font-medium text-[var(--mac-blue)] transition-colors hover:bg-[var(--mac-hover)]"
        >
          <span>{{ websiteDisplay }}</span>
          <ArrowUpRight class="h-3 w-3" />
        </a>
      </nav>
    </div>

    <!-- 右侧状态栏 -->
    <div class="flex items-center gap-1.5">
      <button
        type="button"
        class="inline-flex h-5 cursor-pointer items-center gap-1.5 rounded px-2 text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
        title="聚焦搜索 (⌘K)"
        @click="emit('openSpotlight')"
      >
        <Search class="h-3.5 w-3.5" />
        <span class="hidden font-mono-mac text-[10px] opacity-75 sm:inline">⌘K</span>
      </button>

      <button
        type="button"
        class="inline-flex h-5 cursor-pointer items-center justify-center rounded px-1.5 text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
        :title="isDark ? '切换为浅色外观' : '切换为深色外观'"
        @click="emit('toggleTheme')"
      >
        <Sun v-if="isDark" class="h-3.5 w-3.5" />
        <Moon v-else class="h-3.5 w-3.5" />
      </button>

      <span class="hidden px-1.5 font-medium tabular-nums text-[var(--mac-text)] sm:inline">
        {{ clockText }}
      </span>
    </div>
  </header>
</template>
