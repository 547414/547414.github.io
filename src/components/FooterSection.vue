<script setup lang="ts">
import { ArrowUpRight, Check, Copy, Github, Globe, Mail } from 'lucide-vue-next'
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
  <footer id="contact" class="border-t border-[var(--border-subtle)] pb-14 pt-16 sm:pt-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="surface-card relative overflow-hidden rounded-2xl p-6 sm:p-10">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-[90px]"
          style="background: var(--glow-hero)"
        />

        <div class="relative grid gap-8 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <div class="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
              CONNECT · 找到我
            </div>
            <h2 class="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              欢迎聊架构、聊 AI 工具链，或者顺手来玩一把小游戏
            </h2>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              无论是开源项目交流、工程实践探讨，还是有趣的独立产品脑洞，都欢迎发邮件或在 GitHub 上打个招呼。
            </p>
          </div>

          <div class="flex flex-col gap-3 lg:col-span-5">
            <a
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--accent-cyan-soft)] px-4 py-3 text-sm font-semibold text-[var(--accent-cyan)] transition-all hover:bg-[var(--accent-cyan)] hover:text-[#031318]"
            >
              <span class="inline-flex items-center gap-2.5">
                <Globe class="h-4 w-4" />
                <span>个人网站 · {{ profile.websiteDisplay }}</span>
              </span>
              <ArrowUpRight class="h-4 w-4" />
            </a>

            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
            >
              <span class="inline-flex items-center gap-2.5">
                <Github class="h-4 w-4 text-[var(--accent-cyan)]" />
                <span class="font-mono-tech">GitHub · @{{ profile.handle }}</span>
              </span>
              <ArrowUpRight class="h-4 w-4 text-[var(--text-muted)]" />
            </a>

            <div
              class="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3 text-sm"
            >
              <a
                :href="`mailto:${profile.email}`"
                class="inline-flex min-w-0 items-center gap-2.5 font-mono-tech text-[var(--text-primary)] hover:text-[var(--accent-cyan)]"
              >
                <Mail class="h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                <span class="truncate">{{ profile.email }}</span>
              </a>
              <button
                type="button"
                class="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border-subtle)] px-2.5 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                @click="emit('copyEmail')"
              >
                <Check v-if="emailCopied" class="h-3.5 w-3.5 text-[var(--accent-emerald)]" />
                <Copy v-else class="h-3.5 w-3.5" />
                <span>{{ emailCopied ? '已复制' : '复制' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col items-center justify-between gap-3 text-xs text-[var(--text-muted)] sm:flex-row"
      >
        <div class="flex items-center gap-2.5">
          <span class="font-bold tracking-[0.26em] text-[var(--text-primary)]">
            CRYS<span class="text-[var(--accent-cyan)]">U</span>
          </span>
          <span>·</span>
          <span>{{ profile.motto }}</span>
        </div>
        <div class="font-mono-tech">
          © {{ currentYear }} {{ profile.name }} (@{{ profile.handle }})
        </div>
      </div>
    </div>
  </footer>
</template>
