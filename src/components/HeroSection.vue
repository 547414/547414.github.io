<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowDown, ArrowUpRight, Check, Copy, Github, Mail, Terminal } from 'lucide-vue-next'
import type { ProfileData, TerminalCodeLine } from '@/types/profile'

interface HeroSectionProps {
  profile: ProfileData
  emailCopied: boolean
}

const props = defineProps<HeroSectionProps>()

const emit = defineEmits<{
  copyEmail: []
}>()

const activeTabId = ref<string>(props.profile.terminalTabList[0]?.id ?? 'profile')

const currentTab = computed(() => {
  return (
    props.profile.terminalTabList.find((item) => item.id === activeTabId.value) ??
    props.profile.terminalTabList[0]
  )
})

function resolveToneClass(tone?: TerminalCodeLine['tone']): string {
  switch (tone) {
    case 'accent':
      return 'text-[var(--accent-cyan)]'
    case 'amber':
      return 'text-[var(--accent-amber)]'
    case 'success':
      return 'text-[var(--accent-emerald)]'
    case 'muted':
      return 'text-[var(--text-muted)]'
    default:
      return 'text-[var(--text-primary)]'
  }
}
</script>

<template>
  <section id="top" class="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
    <!-- 背景光晕与工程网格 -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-telemetry-grid opacity-80"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[780px] -translate-x-1/2 rounded-full blur-[120px]"
      style="background: radial-gradient(circle, var(--glow-hero) 0%, transparent 70%)"
    />

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- 左侧介绍主栏 -->
        <div class="lg:col-span-7">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-xs text-[var(--text-secondary)]"
          >
            <span class="animate-pulse-dot h-2 w-2 rounded-full bg-[var(--accent-emerald)]" />
            <span>{{ profile.statusText }}</span>
          </div>

          <h1
            class="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]"
          >
            你好，我是
            <span
              class="bg-gradient-to-r from-[var(--accent-cyan)] via-[#7de8f8] to-[var(--accent-emerald)] bg-clip-text text-transparent"
            >
              {{ profile.name }}
            </span>
          </h1>

          <p class="mt-4 text-base font-medium text-[var(--accent-cyan)] sm:text-lg">
            {{ profile.roleTitle }}
          </p>

          <p class="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {{ profile.heroLead }}
          </p>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-[15px]">
            {{ profile.heroSubLead }}
          </p>

          <!-- 主 CTA 操作区 -->
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-cyan)] px-5 py-3 text-sm font-semibold text-[#031318] shadow-lg shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              <span>访问个人主站 {{ profile.websiteDisplay }}</span>
              <ArrowUpRight class="h-4 w-4" />
            </a>

            <a
              href="#works"
              class="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-[var(--border-strong)]"
            >
              <span>浏览代表作品</span>
              <ArrowDown class="h-4 w-4 text-[var(--accent-cyan)]" />
            </a>
          </div>

          <!-- 快捷身份与联系方式 -->
          <div class="mt-6 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              <Github class="h-4 w-4" />
              <span class="font-mono-tech">github.com/{{ profile.handle }}</span>
            </a>

            <button
              type="button"
              class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              @click="emit('copyEmail')"
            >
              <Mail class="h-4 w-4 text-[var(--accent-cyan)]" />
              <span class="font-mono-tech">{{ profile.email }}</span>
              <Check v-if="emailCopied" class="h-3.5 w-3.5 text-[var(--accent-emerald)]" />
              <Copy v-else class="h-3.5 w-3.5 opacity-60" />
            </button>
          </div>
        </div>

        <!-- 右侧交互式开发者遥测终端卡片 -->
        <div class="lg:col-span-5">
          <div class="surface-card overflow-hidden rounded-2xl">
            <!-- 终端顶栏 -->
            <div
              class="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3"
            >
              <div class="flex items-center gap-1.5">
                <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span class="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span class="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div class="flex items-center gap-1.5 font-mono-tech text-[11px] text-[var(--text-muted)]">
                <Terminal class="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                <span>crysu@{{ profile.handle }}</span>
              </div>
            </div>

            <!-- 终端可切换 Tab -->
            <div
              class="flex items-center gap-1 overflow-x-auto border-b border-[var(--border-subtle)] px-3 py-2"
            >
              <button
                v-for="tab in profile.terminalTabList"
                :key="tab.id"
                type="button"
                class="cursor-pointer whitespace-nowrap rounded-lg px-2.5 py-1 font-mono-tech text-xs transition-colors"
                :class="
                  activeTabId === tab.id
                    ? 'bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                "
                @click="activeTabId = tab.id"
              >
                {{ tab.filename }}
              </button>
            </div>

            <!-- 终端内容区 -->
            <div v-if="currentTab" class="p-4 font-mono-tech text-xs leading-6 sm:p-5 sm:text-[13px]">
              <div class="mb-3 flex items-center gap-2 text-[var(--text-muted)]">
                <span class="text-[var(--accent-cyan)]">❯</span>
                <span>{{ currentTab.command }}</span>
              </div>

              <div class="space-y-2">
                <div
                  v-for="(line, index) in currentTab.lineList"
                  :key="index"
                  class="flex items-start gap-2.5"
                >
                  <span
                    v-if="line.prefix"
                    class="w-5 shrink-0 select-none text-right text-[var(--text-muted)]"
                  >
                    {{ line.prefix }}
                  </span>
                  <span v-if="line.key" class="shrink-0 text-[var(--text-muted)]">
                    {{ line.key }}:
                  </span>
                  <span class="break-words" :class="resolveToneClass(line.tone)">
                    {{ line.value }}
                  </span>
                </div>
              </div>

              <div
                class="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-[11px] text-[var(--text-muted)]"
              >
                <span>STATUS: ONLINE · READY TO SHIP</span>
                <a
                  :href="profile.websiteUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-[var(--accent-cyan)] hover:underline"
                >
                  <span>{{ profile.websiteDisplay }}</span>
                  <ArrowUpRight class="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实证数字条 -->
      <div class="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
        <div
          v-for="metric in profile.statMetricList"
          :key="metric.label"
          class="surface-card rounded-2xl p-4 sm:p-5"
        >
          <div class="font-mono-tech text-2xl font-bold text-[var(--accent-cyan)] sm:text-3xl">
            {{ metric.value }}
          </div>
          <div class="mt-1 text-sm font-semibold text-[var(--text-primary)]">
            {{ metric.label }}
          </div>
          <p class="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
            {{ metric.hint }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
