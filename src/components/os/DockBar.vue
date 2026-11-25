<script setup lang="ts">
import { ref } from 'vue'
import {
  Briefcase,
  Compass,
  Cpu,
  Github,
  Layers,
  Mail,
  Search,
  Server,
  Terminal
} from 'lucide-vue-next'
import type { DesktopWindowState, DockAppItem, MainViewId, WindowId } from '@/types/os'

interface DockBarProps {
  windowMap: Record<WindowId, DesktopWindowState>
  activeMainView: MainViewId
  websiteUrl: string
  githubUrl: string
}

const props = defineProps<DockBarProps>()

const emit = defineEmits<{
  openWindow: [id: WindowId]
  navigateView: [view: MainViewId]
  openSpotlight: []
  copyEmail: []
}>()

const hoveredIndex = ref<number | null>(null)

const primaryAppList: DockAppItem[] = [
  {
    id: 'finder',
    label: 'Crysu 主页',
    kind: 'view',
    windowId: 'main',
    viewId: 'overview',
    gradient: 'linear-gradient(155deg, #56b4ff 0%, #0071e3 100%)',
    iconName: 'finder'
  },
  {
    id: 'works',
    label: '代表作品',
    kind: 'view',
    windowId: 'main',
    viewId: 'works',
    gradient: 'linear-gradient(155deg, #ff9f43 0%, #f76b1c 100%)',
    iconName: 'works'
  },
  {
    id: 'enterprise',
    label: '生产工程档案',
    kind: 'view',
    windowId: 'main',
    viewId: 'enterprise',
    gradient: 'linear-gradient(155deg, #6366f1 0%, #4338ca 100%)',
    iconName: 'enterprise'
  },
  {
    id: 'about',
    label: '关于本机',
    kind: 'window',
    windowId: 'about',
    gradient: 'linear-gradient(155deg, #8e98a8 0%, #4b5563 100%)',
    iconName: 'about'
  },
  {
    id: 'terminal',
    label: '终端 · 互动彩蛋',
    kind: 'window',
    windowId: 'terminal',
    gradient: 'linear-gradient(155deg, #2b303b 0%, #111318 100%)',
    iconName: 'terminal'
  },
  {
    id: 'spotlight',
    label: '聚焦搜索 (⌘K)',
    kind: 'spotlight',
    gradient: 'linear-gradient(155deg, #38bdf8 0%, #2563eb 100%)',
    iconName: 'spotlight'
  }
]

const linkAppList: DockAppItem[] = [
  {
    id: 'safari-crysu',
    label: '个人主站 crysu.com',
    kind: 'external',
    url: props.websiteUrl,
    gradient: 'linear-gradient(155deg, #34d399 0%, #0284c7 100%)',
    iconName: 'safari'
  },
  {
    id: 'github',
    label: 'GitHub (@547414)',
    kind: 'external',
    url: props.githubUrl,
    gradient: 'linear-gradient(155deg, #3f4451 0%, #181a20 100%)',
    iconName: 'github'
  },
  {
    id: 'mail',
    label: '复制邮箱 268zhb@gmail.com',
    kind: 'copy-email',
    gradient: 'linear-gradient(155deg, #60a5fa 0%, #1d4ed8 100%)',
    iconName: 'mail'
  }
]

function scaleForIndex(index: number): number {
  if (hoveredIndex.value === null) {
    return 1
  }
  const distance = Math.abs(hoveredIndex.value - index)
  if (distance === 0) return 1.34
  if (distance === 1) return 1.15
  if (distance === 2) return 1.05
  return 1
}

function liftForIndex(index: number): number {
  if (hoveredIndex.value === null) {
    return 0
  }
  const distance = Math.abs(hoveredIndex.value - index)
  if (distance === 0) return -10
  if (distance === 1) return -4
  if (distance === 2) return -1
  return 0
}

function isRunning(item: DockAppItem): boolean {
  if (item.kind === 'window' && item.windowId) {
    return props.windowMap[item.windowId].isOpen
  }
  if (item.kind === 'view' && item.viewId) {
    return props.windowMap.main.isOpen && props.activeMainView === item.viewId
  }
  return false
}

function handleItemClick(item: DockAppItem): void {
  if (item.kind === 'window' && item.windowId) {
    emit('openWindow', item.windowId)
    return
  }
  if (item.kind === 'view' && item.viewId) {
    emit('navigateView', item.viewId)
    return
  }
  if (item.kind === 'spotlight') {
    emit('openSpotlight')
    return
  }
  if (item.kind === 'copy-email') {
    emit('copyEmail')
    return
  }
  if (item.kind === 'external' && item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-4">
    <nav
      aria-label="macOS Dock"
      class="mac-dock-glass pointer-events-auto flex items-end gap-2 rounded-2xl px-3 py-2"
      @mouseleave="hoveredIndex = null"
    >
      <!-- 主应用区 -->
      <button
        v-for="(item, idx) in primaryAppList"
        :key="item.id"
        type="button"
        class="group relative flex cursor-pointer flex-col items-center focus:outline-none"
        @mouseenter="hoveredIndex = idx"
        @click="handleItemClick(item)"
      >
        <!-- 悬浮气泡 -->
        <span
          class="pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg border border-[var(--mac-border)] bg-[var(--mac-surface-solid)] px-2.5 py-1 text-[11px] font-medium text-[var(--mac-text)] opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
        >
          {{ item.label }}
        </span>

        <span
          class="mac-squircle flex h-11 w-11 items-center justify-center text-white transition-transform duration-150 ease-out"
          :style="{
            background: item.gradient,
            transform: `translateY(${liftForIndex(idx)}px) scale(${scaleForIndex(idx)})`
          }"
        >
          <Layers v-if="item.iconName === 'finder'" class="h-5 w-5" />
          <Briefcase v-else-if="item.iconName === 'works'" class="h-5 w-5" />
          <Server v-else-if="item.iconName === 'enterprise'" class="h-5 w-5" />
          <Cpu v-else-if="item.iconName === 'about'" class="h-5 w-5" />
          <Terminal v-else-if="item.iconName === 'terminal'" class="h-5 w-5 text-[#38bdf8]" />
          <Search v-else-if="item.iconName === 'spotlight'" class="h-5 w-5" />
        </span>

        <span
          class="mt-1 h-1 w-1 rounded-full transition-opacity duration-200"
          :class="
            isRunning(item)
              ? 'bg-[var(--mac-text)] opacity-75'
              : 'bg-transparent opacity-0'
          "
        />
      </button>

      <!-- Dock 分割线 -->
      <div class="mx-1 mb-2.5 h-8 w-px bg-[var(--mac-border)]" aria-hidden="true" />

      <!-- 传送门区：crysu.com / GitHub / Mail -->
      <button
        v-for="(item, idx) in linkAppList"
        :key="item.id"
        type="button"
        class="group relative flex cursor-pointer flex-col items-center focus:outline-none"
        @mouseenter="hoveredIndex = primaryAppList.length + idx"
        @click="handleItemClick(item)"
      >
        <span
          class="pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg border border-[var(--mac-border)] bg-[var(--mac-surface-solid)] px-2.5 py-1 text-[11px] font-medium text-[var(--mac-text)] opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100"
        >
          {{ item.label }}
        </span>

        <span
          class="mac-squircle flex h-11 w-11 items-center justify-center text-white transition-transform duration-150 ease-out"
          :style="{
            background: item.gradient,
            transform: `translateY(${liftForIndex(primaryAppList.length + idx)}px) scale(${scaleForIndex(primaryAppList.length + idx)})`
          }"
        >
          <Compass v-if="item.iconName === 'safari'" class="h-5 w-5" />
          <Github v-else-if="item.iconName === 'github'" class="h-5 w-5" />
          <Mail v-else-if="item.iconName === 'mail'" class="h-5 w-5" />
        </span>

        <span class="mt-1 h-1 w-1 rounded-full bg-transparent opacity-0" />
      </button>
    </nav>
  </div>
</template>
