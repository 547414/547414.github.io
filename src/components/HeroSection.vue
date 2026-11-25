<script setup lang="ts">
import { ArrowUpRight, Check, Copy } from 'lucide-vue-next'
import type { ProfileData } from '@/types/profile'

interface HeroSectionProps {
  profile: ProfileData
  emailCopied: boolean
}

defineProps<HeroSectionProps>()

const emit = defineEmits<{
  copyEmail: []
}>()

interface SpecRowItem {
  label: string
  value: string
}

const specRowList: SpecRowItem[] = [
  { label: '定位', value: 'AI-Native 全栈架构师 · 独立开发者' },
  { label: '主力引擎', value: 'Python / FastAPI · Vue 3 / TypeScript · PostgreSQL' },
  { label: '跨端拓展', value: 'Go · Kotlin · macOS AppKit / WPF · 微信小程序与小游戏' },
  { label: '工程习惯', value: '单向分层 · 强类型零 any · 24+ 项目共享规范子模块' },
  { label: '个人主站', value: 'https://crysu.com' }
]
</script>

<template>
  <section id="top" class="pb-24 pt-36 sm:pb-32 sm:pt-44">
    <div class="mx-auto max-w-5xl px-6 sm:px-10">
      <!-- Apple 式极简居中主视觉 -->
      <div class="mx-auto max-w-3xl text-center">
        <p class="font-mono-mac text-[13px] font-medium text-[var(--mac-text-tertiary)]">
          {{ profile.name }} · @{{ profile.handle }}
        </p>

        <h1
          class="mt-5 text-4xl font-bold tracking-tight text-[var(--mac-text)] sm:text-6xl sm:leading-[1.1]"
        >
          全栈系统架构师，
          <br />
          也是 AI 工作流造物主。
        </h1>

        <p
          class="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.75] text-[var(--mac-text-secondary)] sm:text-[19px]"
        >
          {{ profile.heroLead }}
        </p>

        <!-- 主行动区：极简克制，不堆叠按钮 -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            :href="profile.websiteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-full bg-[var(--mac-blue)] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
          >
            <span>访问个人主站 {{ profile.websiteDisplay }}</span>
            <ArrowUpRight class="h-4 w-4" />
          </a>

          <a
            href="#works"
            class="inline-flex items-center gap-1 rounded-full px-5 py-3 text-[15px] font-medium text-[var(--mac-blue)] transition-colors hover:bg-[var(--mac-blue-soft)]"
          >
            <span>浏览代表作品</span>
            <span aria-hidden="true">›</span>
          </a>
        </div>

        <div
          class="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--mac-text-tertiary)]"
        >
          <a
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-[var(--mac-text)]"
          >
            GitHub · @{{ profile.handle }}
          </a>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-1.5 font-mono-mac transition-colors hover:text-[var(--mac-text)]"
            @click="emit('copyEmail')"
          >
            <span>{{ profile.email }}</span>
            <Check v-if="emailCopied" class="h-3.5 w-3.5 text-[var(--mac-blue)]" />
            <Copy v-else class="h-3.5 w-3.5 opacity-70" />
          </button>
        </div>
      </div>

      <!-- 仿 macOS「关于本机」信息窗口 -->
      <div class="mac-window mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl sm:mt-20">
        <!-- macOS 窗口标题栏 -->
        <div
          class="relative flex h-11 items-center border-b border-[var(--mac-border-soft)] bg-[var(--mac-surface-secondary)] px-4"
        >
          <div class="flex items-center gap-2">
            <span class="mac-traffic-dot bg-[#ff5f57]" />
            <span class="mac-traffic-dot bg-[#febc2e]" />
            <span class="mac-traffic-dot bg-[#28c840]" />
          </div>
          <span
            class="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[12px] font-medium text-[var(--mac-text-tertiary)]"
          >
            关于 Crysu
          </span>
        </div>

        <!-- 窗口正文：清爽对齐的规格表 -->
        <div class="p-7 sm:p-10">
          <div class="divide-y divide-[var(--mac-border-soft)]">
            <div
              v-for="row in specRowList"
              :key="row.label"
              class="grid gap-1.5 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <span class="text-[13px] font-medium text-[var(--mac-text-tertiary)] sm:col-span-3 sm:text-right">
                {{ row.label }}
              </span>
              <div class="text-[14px] text-[var(--mac-text)] sm:col-span-9">
                <a
                  v-if="row.value.startsWith('https://')"
                  :href="row.value"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 font-medium text-[var(--mac-blue)] hover:underline"
                >
                  <span>{{ row.value }}</span>
                  <ArrowUpRight class="h-3.5 w-3.5" />
                </a>
                <span v-else>{{ row.value }}</span>
              </div>
            </div>
          </div>

          <!-- 底部 4 项轻量核心指标 -->
          <div
            class="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--mac-border-soft)] pt-7 sm:grid-cols-4"
          >
            <div v-for="metric in profile.statMetricList" :key="metric.label">
              <div class="text-2xl font-semibold tracking-tight text-[var(--mac-text)]">
                {{ metric.value }}
              </div>
              <div class="mt-1 text-[12px] text-[var(--mac-text-tertiary)]">
                {{ metric.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
