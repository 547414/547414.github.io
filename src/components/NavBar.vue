<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-vue-next'
import type { NavItem } from '@/types/profile'

interface NavBarProps {
  brandName: string
  websiteUrl: string
  websiteDisplay: string
  navItemList: NavItem[]
  isDark: boolean
}

defineProps<NavBarProps>()

const emit = defineEmits<{
  toggleTheme: []
}>()

const isMobileOpen = ref<boolean>(false)

function closeMobileMenu(): void {
  isMobileOpen.value = false
}
</script>

<template>
  <header class="mac-vibrancy fixed inset-x-0 top-0 z-50 border-b border-[var(--mac-border-soft)]">
    <div class="mx-auto flex h-13 max-w-5xl items-center justify-between px-6 sm:px-10">
      <a
        href="#top"
        class="text-[15px] font-semibold tracking-tight text-[var(--mac-text)] transition-opacity hover:opacity-75"
      >
        {{ brandName }}
      </a>

      <nav aria-label="主导航" class="hidden items-center gap-8 md:flex">
        <a
          v-for="item in navItemList"
          :key="item.href"
          :href="item.href"
          class="text-[13px] text-[var(--mac-text-secondary)] transition-colors hover:text-[var(--mac-text)]"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          :aria-label="isDark ? '切换为浅色外观' : '切换为深色外观'"
          @click="emit('toggleTheme')"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>

        <a
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-full bg-[var(--mac-blue)] px-3.5 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
        >
          <span>{{ websiteDisplay }}</span>
          <ArrowUpRight class="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] md:hidden"
          :aria-label="isMobileOpen ? '关闭菜单' : '打开菜单'"
          @click="isMobileOpen = !isMobileOpen"
        >
          <X v-if="isMobileOpen" class="h-4 w-4" />
          <Menu v-else class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div
      v-if="isMobileOpen"
      class="border-t border-[var(--mac-border-soft)] bg-[var(--mac-surface)] px-6 py-4 md:hidden"
    >
      <div class="flex flex-col gap-1">
        <a
          v-for="item in navItemList"
          :key="item.href"
          :href="item.href"
          class="rounded-lg px-3 py-2.5 text-sm text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </header>
</template>
