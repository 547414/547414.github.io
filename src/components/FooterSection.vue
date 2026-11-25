<script setup lang="ts">
import { ArrowUpRight, Check, Copy } from 'lucide-vue-next'
import type { ProfileData } from '@/types/profile'

interface FooterSectionProps {
  profile: ProfileData
  emailCopied: boolean
}

defineProps<FooterSectionProps>()

const emit = defineEmits<{
  copyEmail: []
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="border-t border-[var(--mac-border-soft)] pb-16 pt-24 sm:pt-32">
    <div class="mx-auto max-w-5xl px-6 sm:px-10">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-[13px] font-medium text-[var(--mac-blue)]">联系我</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-[var(--mac-text)] sm:text-4xl">
          欢迎聊架构、聊 AI 工具链，
          <br />
          或顺手来玩一把小游戏。
        </h2>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            :href="profile.websiteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-full bg-[var(--mac-blue)] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
          >
            <span>个人网站 {{ profile.websiteDisplay }}</span>
            <ArrowUpRight class="h-4 w-4" />
          </a>

          <a
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-full border border-[var(--mac-border)] bg-[var(--mac-surface)] px-5 py-3 text-[14px] font-medium text-[var(--mac-text)] transition-colors hover:bg-[var(--mac-hover)]"
          >
            <span>GitHub · @{{ profile.handle }}</span>
            <ArrowUpRight class="h-4 w-4 text-[var(--mac-text-tertiary)]" />
          </a>
        </div>

        <div class="mt-6 flex items-center justify-center gap-2 text-[14px] text-[var(--mac-text-secondary)]">
          <a :href="`mailto:${profile.email}`" class="font-mono-mac hover:text-[var(--mac-blue)]">
            {{ profile.email }}
          </a>
          <button
            type="button"
            class="inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-1 text-[12px] text-[var(--mac-text-tertiary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
            @click="emit('copyEmail')"
          >
            <Check v-if="emailCopied" class="h-3.5 w-3.5 text-[var(--mac-blue)]" />
            <Copy v-else class="h-3.5 w-3.5" />
            <span>{{ emailCopied ? '已复制' : '复制' }}</span>
          </button>
        </div>
      </div>

      <div
        class="mt-20 flex flex-col items-center justify-between gap-3 border-t border-[var(--mac-border-soft)] pt-8 text-[12px] text-[var(--mac-text-tertiary)] sm:flex-row"
      >
        <span>{{ profile.name }} · {{ profile.motto }}</span>
        <span class="font-mono-mac">© {{ currentYear }} {{ profile.name }} (@{{ profile.handle }})</span>
      </div>
    </div>
  </footer>
</template>
