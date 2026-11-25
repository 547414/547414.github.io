<script setup lang="ts">
import { ArrowUpRight, Check, Copy, Terminal } from 'lucide-vue-next'
import type { ProfileData } from '@/types/profile'
import type { WindowId } from '@/types/os'

interface AboutMacViewProps {
  profile: ProfileData
  emailCopied: boolean
}

defineProps<AboutMacViewProps>()

const emit = defineEmits<{
  openWindow: [id: WindowId]
  copyEmail: []
}>()

interface AboutSpecRow {
  label: string
  value: string
}

const specList: AboutSpecRow[] = [
  { label: '架构定位', value: '全栈系统架构师 · 独立开发者' },
  { label: '核心引擎', value: 'FastAPI · Vue 3 · TypeScript' },
  { label: '跨端扩展', value: 'Go · Kotlin · 原生桌面 · 小游戏' },
  { label: '项目历练', value: '50+ 全链路实战 · 3,400 人现场' },
  { label: '系统版本', value: 'CrysuOS · 全速前进' }
]
</script>

<template>
  <div class="flex h-full flex-col items-center justify-between px-7 py-7 text-center">
    <!-- 定制 Apple Silicon 风格 Crysu 徽章 -->
    <div class="flex flex-col items-center">
      <div
        class="mac-squircle flex h-20 w-20 flex-col items-center justify-center border border-white/25 text-white"
        style="background: linear-gradient(155deg, #272b36 0%, #11131a 60%, #090b10 100%)"
      >
        <span class="text-[20px] font-bold tracking-[0.14em]">CRYSU</span>
        <span class="mt-0.5 font-mono-mac text-[8px] tracking-[0.22em] text-sky-400">
          547414
        </span>
      </div>

      <h2 class="mt-5 text-[22px] font-bold tracking-tight text-[var(--mac-text)]">
        {{ profile.name }}
      </h2>
      <p class="mt-1 text-[12px] text-[var(--mac-text-tertiary)]">
        {{ profile.motto }}
      </p>
    </div>

    <!-- 经典「关于本机」两列规格对齐表 -->
    <div class="mt-6 w-full space-y-2.5 text-[12px]">
      <div v-for="row in specList" :key="row.label" class="grid grid-cols-12 gap-3">
        <span class="col-span-4 text-right font-medium text-[var(--mac-text-tertiary)]">
          {{ row.label }}
        </span>
        <span class="col-span-8 text-left text-[var(--mac-text)]">
          {{ row.value }}
        </span>
      </div>

      <div class="grid grid-cols-12 gap-3">
        <span class="col-span-4 text-right font-medium text-[var(--mac-text-tertiary)]">
          联系邮箱
        </span>
        <button
          type="button"
          class="col-span-8 inline-flex cursor-pointer items-center gap-1.5 text-left font-mono-mac text-[var(--mac-blue)] hover:underline"
          @click="emit('copyEmail')"
        >
          <span>{{ profile.email }}</span>
          <Check v-if="emailCopied" class="h-3 w-3" />
          <Copy v-else class="h-3 w-3 opacity-70" />
        </button>
      </div>
    </div>

    <!-- 底部经典按钮 -->
    <div class="mt-6 flex items-center gap-2.5">
      <a
        :href="profile.websiteUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 rounded-lg bg-[var(--mac-blue)] px-4 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
      >
        <span>访问 {{ profile.websiteDisplay }}</span>
        <ArrowUpRight class="h-3.5 w-3.5" />
      </a>
      <button
        type="button"
        class="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--mac-border)] bg-[var(--mac-surface-solid)] px-3.5 py-1.5 text-[12px] font-medium text-[var(--mac-text)] transition-colors hover:bg-[var(--mac-hover)]"
        @click="emit('openWindow', 'terminal')"
      >
        <Terminal class="h-3.5 w-3.5" />
        <span>打开终端</span>
      </button>
    </div>
  </div>
</template>
