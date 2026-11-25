<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-vue-next'
import type { NavItem } from '@/types/profile'

interface NavBarProps {
  brandName: string
  handle: string
  websiteUrl: string
  websiteDisplay: string
  navItemList: NavItem[]
  isDark: boolean
}

defineProps<NavBarProps>()

const emit = defineEmits<{
  toggleTheme: []
}>()

const isScrolled = ref<boolean>(false)
const isMobileOpen = ref<boolean>(false)

function handleScroll(): void {
  isScrolled.value = window.scrollY > 24
}

function closeMobileMenu(): void {
  isMobileOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      isScrolled
        ? 'border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/85 backdrop-blur-xl'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        href="#top"
        class="group flex items-center gap-2.5 text-sm font-bold tracking-[0.26em] text-[var(--text-primary)]"
      >
        <span
          class="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--accent-cyan-soft)] font-mono-tech text-xs font-bold tracking-normal text-[var(--accent-cyan)] transition-transform duration-300 group-hover:scale-105"
        >
          C
        </span>
        <span>
          CRYS<span class="text-[var(--accent-cyan)]">U</span>
        </span>
        <span
          class="hidden rounded-md border border-[var(--border-subtle)] px-1.5 py-0.5 font-mono-tech text-[11px] font-normal tracking-normal text-[var(--text-muted)] sm:inline-block"
        >
          @{{ handle }}
        </span>
      </a>

      <nav aria-label="主导航" class="hidden items-center gap-7 md:flex">
        <a
          v-for="item in navItemList"
          :key="item.href"
          :href="item.href"
          class="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2.5">
        <button
          type="button"
          class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          :aria-label="isDark ? '切换为浅色主题' : '切换为深色主题'"
          @click="emit('toggleTheme')"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>

        <a
          :href="websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--accent-cyan-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--accent-cyan)] transition-all hover:bg-[var(--accent-cyan)] hover:text-[#041217] sm:text-sm"
        >
          <span class="font-mono-tech">{{ websiteDisplay }}</span>
          <ArrowUpRight class="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] md:hidden"
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
      class="border-b border-[var(--border-subtle)] bg-[var(--bg-page)]/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden"
    >
      <div class="flex flex-col gap-1">
        <a
          v-for="item in navItemList"
          :key="item.href"
          :href="item.href"
          class="rounded-xl px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>
        <div class="mt-2 border-t border-[var(--border-subtle)] pt-2 text-xs text-[var(--text-muted)]">
          {{ brandName }} · @{{ handle }}
        </div>
      </div>
    </div>
  </header>
</template>
