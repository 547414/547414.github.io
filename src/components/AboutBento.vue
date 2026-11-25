<script setup lang="ts">
import { ArrowUpRight, Cpu, Gamepad2, Layers } from 'lucide-vue-next'
import type { ProfileData } from '@/types/profile'

interface AboutBentoProps {
  profile: ProfileData
}

defineProps<AboutBentoProps>()
</script>

<template>
  <section id="about" class="border-t border-[var(--mac-border-soft)] py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 sm:px-10">
      <div class="max-w-2xl">
        <p class="text-[13px] font-medium text-[var(--mac-blue)]">关于我</p>
        <h2 class="mt-2.5 text-3xl font-bold tracking-tight text-[var(--mac-text)] sm:text-4xl">
          左手工程纪律，右手 AI 工具链，
          <br class="hidden sm:block" />
          也留一份给好玩的产品。
        </h2>
      </div>

      <!-- 3 列等宽留白卡片，简洁克制 -->
      <div class="mt-14 grid gap-6 md:grid-cols-3 md:gap-7">
        <article
          v-for="(card, index) in profile.portraitCardList"
          :key="card.id"
          class="mac-card mac-card-interactive flex flex-col justify-between rounded-2xl p-8"
        >
          <div>
            <div
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mac-blue-soft)] text-[var(--mac-blue)]"
            >
              <Layers v-if="index === 0" class="h-5 w-5" />
              <Cpu v-else-if="index === 1" class="h-5 w-5" />
              <Gamepad2 v-else class="h-5 w-5" />
            </div>

            <h3 class="mt-6 text-[18px] font-semibold leading-snug text-[var(--mac-text)]">
              {{ card.title }}
            </h3>
            <p class="mt-3.5 text-[14px] leading-[1.8] text-[var(--mac-text-secondary)]">
              {{ card.summary }}
            </p>
          </div>
        </article>
      </div>

      <!-- 个人主站 crysu.com 简洁通栏入口卡片 -->
      <a
        :href="profile.websiteUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mac-card mac-card-interactive group mt-8 flex flex-col justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:px-10 sm:py-9"
      >
        <div class="max-w-2xl">
          <p class="text-[12px] font-medium text-[var(--mac-text-tertiary)]">
            个人主站 · {{ profile.websiteDisplay }}
          </p>
          <h3 class="mt-2 text-xl font-semibold tracking-tight text-[var(--mac-text)] sm:text-2xl">
            {{ profile.motto }}
          </h3>
          <p class="mt-2.5 text-[14px] leading-relaxed text-[var(--mac-text-secondary)]">
            主站收录了我的夜间高速入口、网页小游戏合集、微信小程序介绍页以及百年庆典生产复盘，欢迎顺路去逛逛。
          </p>
        </div>

        <span
          class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--mac-blue)] px-5 py-2.5 text-[14px] font-medium text-white transition-colors group-hover:bg-[var(--mac-blue-hover)]"
        >
          <span>前往 {{ profile.websiteDisplay }}</span>
          <ArrowUpRight class="h-4 w-4" />
        </span>
      </a>
    </div>
  </section>
</template>
