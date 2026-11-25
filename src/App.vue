<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { Check, Compass, Search, Terminal } from 'lucide-vue-next'
import AboutMacView from '@/components/apps/AboutMacView.vue'
import MainAppView from '@/components/apps/MainAppView.vue'
import TerminalAppView from '@/components/apps/TerminalAppView.vue'
import DockBar from '@/components/os/DockBar.vue'
import MacWindow from '@/components/os/MacWindow.vue'
import MenuBar from '@/components/os/MenuBar.vue'
import SpotlightModal from '@/components/os/SpotlightModal.vue'
import { PROFILE_DATA } from '@/data/profile'
import type { DesktopWindowState, MainViewId, WindowId } from '@/types/os'

const THEME_STORAGE_KEY = 'crysu-os-theme'

const isDark = ref<boolean>(false)
const isDesktop = ref<boolean>(true)
const spotlightOpen = ref<boolean>(false)
const emailCopied = ref<boolean>(false)
const toastMessage = ref<string>('')
const activeMainView = ref<MainViewId>('overview')
const selectedEnterpriseId = ref<string>(PROFILE_DATA.enterpriseTrackList[0]?.id ?? 'enterprise-drive')
const focusedWindowId = ref<WindowId>('main')
const zCounter = ref<number>(12)

let copyTimer: number | undefined

const windowMap = reactive<Record<WindowId, DesktopWindowState>>({
  main: {
    id: 'main',
    title: 'Crysu · 个人主页',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 120,
    y: 56,
    width: 1020,
    height: 660,
    minWidth: 720,
    minHeight: 480
  },
  about: {
    id: 'about',
    title: '关于本机',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    x: 420,
    y: 110,
    width: 360,
    height: 440,
    minWidth: 340,
    minHeight: 420
  },
  terminal: {
    id: 'terminal',
    title: 'crysu — zsh — Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    x: 280,
    y: 128,
    width: 660,
    height: 430,
    minWidth: 480,
    minHeight: 320
  }
})

const hasVisibleDesktopWindow = computed<boolean>(() => {
  return Object.values(windowMap).some((win) => win.isOpen && !win.isMinimized)
})

const activeAppLabel = computed<string>(() => {
  if (!isDesktop.value) {
    return 'Crysu'
  }
  if (!hasVisibleDesktopWindow.value) {
    return 'CrysuOS'
  }
  if (focusedWindowId.value === 'terminal') {
    return '终端'
  }
  if (focusedWindowId.value === 'about') {
    return '关于本机'
  }
  return 'Crysu'
})

function layoutWindowsForViewport(): void {
  const vw = window.innerWidth
  const vh = window.innerHeight
  isDesktop.value = vw >= 768

  // 居中放置主窗口，四周保留充足呼吸留白
  const mainWidth = Math.min(1020, Math.max(700, Math.round(vw * 0.82)))
  const mainHeight = Math.min(680, Math.max(480, Math.round(vh - 148)))
  windowMap.main.width = mainWidth
  windowMap.main.height = mainHeight
  windowMap.main.x = Math.max(24, Math.round((vw - mainWidth) / 2))
  windowMap.main.y = Math.max(44, Math.round((vh - 76 - mainHeight) / 2 + 12))

  // 关于本机居中偏上
  windowMap.about.x = Math.max(24, Math.round((vw - windowMap.about.width) / 2))
  windowMap.about.y = Math.max(56, Math.round((vh - windowMap.about.height) / 2 - 20))

  // 终端居中微偏移
  const termWidth = Math.min(680, Math.max(460, Math.round(vw * 0.56)))
  const termHeight = Math.min(440, Math.max(320, Math.round(vh * 0.54)))
  windowMap.terminal.width = termWidth
  windowMap.terminal.height = termHeight
  windowMap.terminal.x = Math.max(32, Math.round((vw - termWidth) / 2 + 24))
  windowMap.terminal.y = Math.max(64, Math.round((vh - termHeight) / 2 + 10))
}

function focusWindow(id: WindowId): void {
  zCounter.value += 1
  windowMap[id].zIndex = zCounter.value
  focusedWindowId.value = id
}

function openWindow(id: WindowId): void {
  const target = windowMap[id]
  target.isOpen = true
  target.isMinimized = false
  focusWindow(id)
}

function closeWindow(id: WindowId): void {
  windowMap[id].isOpen = false
  windowMap[id].isMinimized = false
  windowMap[id].isMaximized = false
}

function minimizeWindow(id: WindowId): void {
  windowMap[id].isMinimized = true
}

function toggleMaximizeWindow(id: WindowId): void {
  if (id === 'about') {
    return
  }
  windowMap[id].isMaximized = !windowMap[id].isMaximized
  focusWindow(id)
}

function moveWindow(payload: { id: WindowId; x: number; y: number }): void {
  windowMap[payload.id].x = payload.x
  windowMap[payload.id].y = payload.y
}

function navigateMainView(view: MainViewId): void {
  activeMainView.value = view
  if (isDesktop.value) {
    openWindow('main')
  }
}

function selectEnterpriseTrack(id: string): void {
  selectedEnterpriseId.value = id
  navigateMainView('enterprise')
}

function applyTheme(dark: boolean): void {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeMeta) {
    themeMeta.content = dark ? '#05080f' : '#eef2f7'
  }
}

function handleToggleTheme(): void {
  const next = !isDark.value
  applyTheme(next)
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
  } catch {
    // 忽略存储限制
  }
}

function showToast(message: string): void {
  toastMessage.value = message
  if (copyTimer !== undefined) {
    window.clearTimeout(copyTimer)
  }
  copyTimer = window.setTimeout(() => {
    emailCopied.value = false
    toastMessage.value = ''
  }, 2400)
}

function handleCopyEmail(): void {
  const done = (): void => {
    emailCopied.value = true
    showToast(`已复制邮箱 ${PROFILE_DATA.email}`)
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PROFILE_DATA.email).then(done, () => {
      fallbackCopy(PROFILE_DATA.email)
      done()
    })
    return
  }
  fallbackCopy(PROFILE_DATA.email)
  done()
}

function fallbackCopy(text: string): void {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

function handleGlobalKeydown(event: KeyboardEvent): void {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    spotlightOpen.value = !spotlightOpen.value
  }
}

onMounted(() => {
  layoutWindowsForViewport()
  window.addEventListener('resize', layoutWindowsForViewport)
  window.addEventListener('keydown', handleGlobalKeydown)

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'dark') {
      applyTheme(true)
      return
    }
  } catch {
    // 默认浅色丝绸壁纸
  }
  applyTheme(false)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', layoutWindowsForViewport)
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <!-- 电影级流动丝绸艺术壁纸 -->
    <div class="mac-wallpaper" aria-hidden="true">
      <div class="wallpaper-orb wallpaper-orb-a" />
      <div class="wallpaper-orb wallpaper-orb-b" />
      <div class="wallpaper-orb wallpaper-orb-c" />
    </div>

    <!-- 顶部 28px 真实 macOS 菜单栏 -->
    <MenuBar
      :active-app-label="activeAppLabel"
      :website-url="PROFILE_DATA.websiteUrl"
      :website-display="PROFILE_DATA.websiteDisplay"
      :is-dark="isDark"
      @open-window="openWindow"
      @navigate-view="navigateMainView"
      @open-spotlight="spotlightOpen = true"
      @toggle-theme="handleToggleTheme"
    />

    <!-- 桌面端：真实多窗口 CrysuOS 工作台 -->
    <main v-if="isDesktop" class="relative z-10 h-full w-full">
      <!-- 当所有窗口最小化/关闭时，纯净壁纸中央浮现极简水印 -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="!hasVisibleDesktopWindow"
          class="flex h-full flex-col items-center justify-center px-6 pb-16 text-center select-none"
        >
          <p class="font-mono-mac text-[12px] tracking-[0.28em] text-[var(--mac-text-tertiary)]">
            CRYSU · @{{ PROFILE_DATA.handle }}
          </p>
          <h1 class="mt-3 text-4xl font-bold tracking-tight text-[var(--mac-text)] sm:text-5xl">
            {{ PROFILE_DATA.motto }}
          </h1>
          <p class="mt-4 text-[14px] text-[var(--mac-text-secondary)]">
            点击下方 Dock 打开窗口，或按
            <kbd class="mx-1 rounded-md border border-[var(--mac-border)] bg-[var(--mac-surface)] px-1.5 py-0.5 font-mono-mac text-[12px]">⌘K</kbd>
            聚焦搜索
          </p>
        </div>
      </Transition>

      <!-- 窗口 1：Crysu 主窗口（默认居中开启，四周大留白） -->
      <MacWindow
        :win="windowMap.main"
        :is-focused="focusedWindowId === 'main'"
        @focus="focusWindow"
        @close="closeWindow"
        @minimize="minimizeWindow"
        @toggle-maximize="toggleMaximizeWindow"
        @move="moveWindow"
      >
        <template #toolbar>
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-[11px] text-[var(--mac-text-tertiary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
            @click.stop="spotlightOpen = true"
          >
            <Search class="h-3 w-3" />
            <span class="font-mono-mac">⌘K</span>
          </button>
        </template>

        <MainAppView
          v-model:active-view="activeMainView"
          v-model:selected-enterprise-id="selectedEnterpriseId"
          :profile="PROFILE_DATA"
          :email-copied="emailCopied"
          @open-window="openWindow"
          @copy-email="handleCopyEmail"
        />
      </MacWindow>

      <!-- 窗口 2：关于本机（About Crysu） -->
      <MacWindow
        :win="windowMap.about"
        :is-focused="focusedWindowId === 'about'"
        @focus="focusWindow"
        @close="closeWindow"
        @minimize="minimizeWindow"
        @toggle-maximize="toggleMaximizeWindow"
        @move="moveWindow"
      >
        <AboutMacView
          :profile="PROFILE_DATA"
          :email-copied="emailCopied"
          @open-window="openWindow"
          @copy-email="handleCopyEmail"
        />
      </MacWindow>

      <!-- 窗口 3：交互式 macOS 终端 -->
      <MacWindow
        :win="windowMap.terminal"
        :is-focused="focusedWindowId === 'terminal'"
        :dark-chrome="true"
        @focus="focusWindow"
        @close="closeWindow"
        @minimize="minimizeWindow"
        @toggle-maximize="toggleMaximizeWindow"
        @move="moveWindow"
      >
        <TerminalAppView
          :profile="PROFILE_DATA"
          @navigate-view="navigateMainView"
          @toggle-theme="handleToggleTheme"
          @copy-email="handleCopyEmail"
        />
      </MacWindow>

      <!-- 底部磁吸放大 macOS Dock -->
      <DockBar
        :window-map="windowMap"
        :active-main-view="activeMainView"
        :website-url="PROFILE_DATA.websiteUrl"
        :github-url="PROFILE_DATA.githubUrl"
        @open-window="openWindow"
        @navigate-view="navigateMainView"
        @open-spotlight="spotlightOpen = true"
        @copy-email="handleCopyEmail"
      />
    </main>

    <!-- 移动端：贴合小屏的 macOS / iPadOS 原生毛玻璃窗口体验 -->
    <main v-else class="relative z-10 flex h-full flex-col px-3 pb-18 pt-10">
      <div class="mac-window-glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl shadow-xl">
        <div
          v-if="windowMap.terminal.isOpen"
          class="flex h-full flex-col bg-[#12141a]/95 text-white"
        >
          <div class="flex h-10 shrink-0 items-center justify-between border-b border-white/10 px-4">
            <span class="font-mono-mac text-[12px] text-white/75">crysu — zsh</span>
            <button
              type="button"
              class="cursor-pointer rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/80"
              @click="closeWindow('terminal')"
            >
              返回主页
            </button>
          </div>
          <div class="min-h-0 flex-1">
            <TerminalAppView
              :profile="PROFILE_DATA"
              @navigate-view="
                (view) => {
                  closeWindow('terminal')
                  navigateMainView(view)
                }
              "
              @toggle-theme="handleToggleTheme"
              @copy-email="handleCopyEmail"
            />
          </div>
        </div>

        <MainAppView
          v-else
          v-model:active-view="activeMainView"
          v-model:selected-enterprise-id="selectedEnterpriseId"
          :profile="PROFILE_DATA"
          :email-copied="emailCopied"
          @open-window="openWindow"
          @copy-email="handleCopyEmail"
        />
      </div>

      <!-- 移动端底部精简悬浮 Dock -->
      <div class="fixed inset-x-0 bottom-3 z-40 flex justify-center px-4">
        <div class="mac-dock-glass flex items-center gap-2 rounded-2xl px-3 py-2 text-[12px]">
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 font-medium text-[var(--mac-text)] hover:bg-[var(--mac-hover)]"
            @click="
              () => {
                if (windowMap.terminal.isOpen) {
                  closeWindow('terminal')
                } else {
                  openWindow('terminal')
                }
              }
            "
          >
            <Terminal class="h-4 w-4 text-[var(--mac-blue)]" />
            <span>{{ windowMap.terminal.isOpen ? '主页' : '终端' }}</span>
          </button>

          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 font-medium text-[var(--mac-text)] hover:bg-[var(--mac-hover)]"
            @click="spotlightOpen = true"
          >
            <Search class="h-4 w-4 text-[var(--mac-blue)]" />
            <span>搜索</span>
          </button>

          <a
            :href="PROFILE_DATA.websiteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-xl bg-[var(--mac-blue)] px-3.5 py-1.5 font-medium text-white"
          >
            <Compass class="h-4 w-4" />
            <span>crysu.com</span>
          </a>
        </div>
      </div>
    </main>

    <!-- 全局 macOS Spotlight 聚焦搜索 (⌘K) -->
    <SpotlightModal
      :open="spotlightOpen"
      :profile="PROFILE_DATA"
      @close="spotlightOpen = false"
      @navigate-view="navigateMainView"
      @select-enterprise="selectEnterpriseTrack"
      @open-window="openWindow"
      @copy-email="handleCopyEmail"
    />

    <!-- macOS 风格轻提示 Toast -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="toastMessage"
        role="status"
        class="mac-window-glass fixed right-5 top-11 z-[110] inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-medium text-[var(--mac-text)] shadow-lg"
      >
        <Check class="h-3.5 w-3.5 text-[var(--mac-blue)]" />
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>
