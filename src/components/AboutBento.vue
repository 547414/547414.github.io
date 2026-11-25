<script setup lang="ts">
import { ArrowUpRight, Cpu, Gamepad2, Layers } from 'lucide-vue-next'
import type { PortraitCardItem, ProfileData } from '@/types/profile'

interface AboutBentoProps {
  profile: ProfileData
}

defineProps<AboutBentoProps>()

function accentBadgeClass(accent: PortraitCardItem['accent']): string {
  switch (accent) {
    case 'amber':
      return 'bg-[var(--accent-amber-soft)] text-[var(--accent-amber)]'
    case 'emerald':
      return 'bg-[var(--accent-emerald-soft)] text-[var(--accent-emerald)]'
    default:
      return 'bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan)]'
  }
}
</script>

<template>
  <section id="about" class="py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <div class="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
          ABOUT ME · 程序员画像
        </div>
        <h2 class="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          左手架构洁癖，右手 AI 工具链，心里装着好玩的产品
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
          从几十个全栈业务系统、AI 基础设施到独立微信小游戏，这些是我最真实的工程切面。
        </p>
      </div>

      <!-- 非对称 Bento Grid -->
      <div class="mt-10 grid gap-5 lg:grid-cols-12">
        <!-- 卡片 1：工程纪律（占 7 列） -->
        <article
          v-if="profile.portraitCardList[0]"
          class="surface-card surface-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-7"
        >
          <div>
            <div class="flex items-center justify-between gap-4">
              <span
                class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono-tech text-xs font-medium"
                :class="accentBadgeClass(profile.portraitCardList[0].accent)"
              >
                <Layers class="h-3.5 w-3.5" />
                {{ profile.portraitCardList[0].eyebrow }}
              </span>
              <span class="hidden font-mono-tech text-xs text-[var(--text-muted)] sm:inline">
                basic → basic_module → biz_module
              </span>
            </div>

            <h3 class="mt-4 text-xl font-bold text-[var(--text-primary)]">
              {{ profile.portraitCardList[0].title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {{ profile.portraitCardList[0].summary }}
            </p>
          </div>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in profile.portraitCardList[0].highlightList"
              :key="tag"
              class="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono-tech text-xs text-[var(--text-secondary)]"
            >
              {{ tag }}
            </span>
          </div>
        </article>

        <!-- 卡片 2：AI-Native（占 5 列） -->
        <article
          v-if="profile.portraitCardList[1]"
          class="surface-card surface-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-5"
        >
          <div>
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono-tech text-xs font-medium"
              :class="accentBadgeClass(profile.portraitCardList[1].accent)"
            >
              <Cpu class="h-3.5 w-3.5" />
              {{ profile.portraitCardList[1].eyebrow }}
            </span>

            <h3 class="mt-4 text-xl font-bold text-[var(--text-primary)]">
              {{ profile.portraitCardList[1].title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {{ profile.portraitCardList[1].summary }}
            </p>
          </div>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in profile.portraitCardList[1].highlightList"
              :key="tag"
              class="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono-tech text-xs text-[var(--text-secondary)]"
            >
              {{ tag }}
            </span>
          </div>
        </article>

        <!-- 卡片 3：独立产品魂（占 5 列） -->
        <article
          v-if="profile.portraitCardList[2]"
          class="surface-card surface-card-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-5"
        >
          <div>
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono-tech text-xs font-medium"
              :class="accentBadgeClass(profile.portraitCardList[2].accent)"
            >
              <Gamepad2 class="h-3.5 w-3.5" />
              {{ profile.portraitCardList[2].eyebrow }}
            </span>

            <h3 class="mt-4 text-xl font-bold text-[var(--text-primary)]">
              {{ profile.portraitCardList[2].title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {{ profile.portraitCardList[2].summary }}
            </p>
          </div>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tag in profile.portraitCardList[2].highlightList"
              :key="tag"
              class="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono-tech text-xs text-[var(--text-secondary)]"
            >
              {{ tag }}
            </span>
          </div>
        </article>

        <!-- 卡片 4：致敬 crysu.com 的高速出口路牌传送门（占 7 列） -->
        <a
          :href="profile.websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="highway-sign group flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-7"
        >
          <div class="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 rounded-md border border-white/50 bg-black/20 px-2.5 py-0.5 font-mono-tech text-xs font-semibold tracking-wider text-white">
                <span>出口 00</span>
                <span class="opacity-60">·</span>
                <span>EXIT TO HOME BASE</span>
              </div>
              <h3 class="mt-4 text-2xl font-extrabold tracking-wide text-white sm:text-3xl">
                前往个人主站 · {{ profile.websiteDisplay }}
              </h3>
              <p class="mt-1 font-mono-tech text-xs tracking-[0.22em] text-emerald-100/80">
                CRYSU · PERSONAL PORTAL &amp; EXITS AHEAD
              </p>
            </div>

            <!-- 高速出口右转箭头 -->
            <svg
              class="h-12 w-12 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M14 38 L14 24 Q14 14 24 14 L30 14"
                fill="none"
                stroke="currentColor"
                stroke-width="5.5"
                stroke-linecap="round"
              />
              <path d="M27 5 L41 14 L27 23 Z" fill="currentColor" />
            </svg>
          </div>

          <p class="relative z-10 mt-4 max-w-xl text-sm leading-7 text-emerald-50/90">
            {{ profile.motto }} 这里收着我的夜间高速入口、网页小游戏合集（彩虹数数乐园、颠勺、转乾坤、彗星邮差、一笔收妖、飞爪夜行）、微信小程序介绍页、百年庆典复盘，以及更多正在修建的新出口。
          </p>

          <div
            class="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/25 pt-4"
          >
            <div class="flex items-baseline gap-1 font-mono-tech text-white">
              <span class="text-2xl font-bold">0.0</span>
              <span class="text-xs opacity-80">km · 即刻直达</span>
            </div>

            <span
              class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[#074729]"
            >
              <span>打灯下高速 → https://crysu.com</span>
              <ArrowUpRight class="h-3.5 w-3.5" />
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
