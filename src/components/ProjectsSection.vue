<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowUpRight, ExternalLink, Server, Sparkles } from 'lucide-vue-next'
import { PROJECT_CATEGORY_LIST } from '@/data/profile'
import type { EnterpriseTrackItem, ProjectCategoryKey, ProjectItem } from '@/types/profile'

interface ProjectsSectionProps {
  projectList: ProjectItem[]
  enterpriseTrackList: EnterpriseTrackItem[]
  websiteUrl: string
}

const props = defineProps<ProjectsSectionProps>()

const activeCategory = ref<ProjectCategoryKey>('all')

const filteredProjectList = computed<ProjectItem[]>(() => {
  if (activeCategory.value === 'all') {
    return props.projectList
  }
  return props.projectList.filter((item) => item.category === activeCategory.value)
})

const featuredProject = computed<ProjectItem | null>(() => {
  const found = filteredProjectList.value.find((item) => item.featured)
  return found ?? null
})

const regularProjectList = computed<ProjectItem[]>(() => {
  if (!featuredProject.value) {
    return filteredProjectList.value
  }
  return filteredProjectList.value.filter((item) => item.id !== featuredProject.value?.id)
})

function countByCategory(categoryKey: ProjectCategoryKey): number {
  if (categoryKey === 'all') {
    return props.projectList.length
  }
  return props.projectList.filter((item) => item.category === categoryKey).length
}
</script>

<template>
  <section id="works" class="py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <div class="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
            SELECTED WORKS · 代表作品与实战
          </div>
          <h2 class="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            每一个卡片，都是跑在真实世界里的代码
          </h2>
          <p class="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            涵盖 AI 远程遥控工具、千人级大型生产案例、微信小程序/小游戏与开源底座，点击可直达源码、在线试玩或生产复盘。
          </p>
        </div>

        <!-- 分类筛选 -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in PROJECT_CATEGORY_LIST"
            :key="cat.key"
            type="button"
            class="cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all"
            :class="
              activeCategory === cat.key
                ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)] text-[#031318]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
            "
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
            <span class="ml-1 font-mono-tech opacity-75">({{ countByCategory(cat.key) }})</span>
          </button>
        </div>
      </div>

      <!-- 主推特色项目卡片（Phone AI Audit） -->
      <article
        v-if="featuredProject"
        class="surface-card surface-card-hover relative mt-10 overflow-hidden rounded-2xl border-[var(--border-strong)] p-6 sm:p-8"
      >
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px]"
          style="background: var(--glow-hero)"
        />

        <div class="relative grid gap-6 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-8">
            <div class="flex flex-wrap items-center gap-2.5">
              <span
                class="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-amber-soft)] px-3 py-1 font-mono-tech text-xs font-semibold text-[var(--accent-amber)]"
              >
                <Sparkles class="h-3.5 w-3.5" />
                {{ featuredProject.statusBadge }}
              </span>
              <span
                class="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-xs text-[var(--text-muted)]"
              >
                {{ featuredProject.categoryLabel }}
              </span>
            </div>

            <h3 class="mt-4 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              {{ featuredProject.title }}
            </h3>
            <p class="mt-1.5 text-sm font-medium text-[var(--accent-cyan)] sm:text-base">
              {{ featuredProject.subtitle }}
            </p>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
              {{ featuredProject.summary }}
            </p>

            <ul class="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
              <li
                v-for="point in featuredProject.highlightList"
                :key="point"
                class="flex items-start gap-2.5"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-cyan)]" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col justify-between gap-5 lg:col-span-4 lg:items-end">
            <div class="flex flex-wrap gap-2 lg:justify-end">
              <span
                v-for="tag in featuredProject.tagList"
                :key="tag"
                class="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono-tech text-xs text-[var(--text-secondary)]"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3">
              <a
                v-for="link in featuredProject.linkList"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-[#031318] transition-all hover:brightness-110"
              >
                <span>{{ link.label }}</span>
                <ArrowUpRight class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- 常规 6 大作品网格 -->
      <div class="mt-6 grid gap-5 md:grid-cols-2">
        <article
          v-for="project in regularProjectList"
          :key="project.id"
          class="surface-card surface-card-hover flex flex-col justify-between rounded-2xl p-6"
        >
          <div>
            <div class="flex items-center justify-between gap-3">
              <span class="font-mono-tech text-xs text-[var(--accent-cyan)]">
                {{ project.categoryLabel }}
              </span>
              <span
                v-if="project.statusBadge"
                class="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-0.5 font-mono-tech text-[11px] text-[var(--text-secondary)]"
              >
                {{ project.statusBadge }}
              </span>
            </div>

            <h3 class="mt-3 text-xl font-bold text-[var(--text-primary)]">
              {{ project.title }}
            </h3>
            <p class="mt-1 text-xs font-medium text-[var(--text-muted)] sm:text-sm">
              {{ project.subtitle }}
            </p>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {{ project.summary }}
            </p>

            <ul class="mt-4 space-y-1.5 text-xs leading-6 text-[var(--text-secondary)] sm:text-[13px]">
              <li
                v-for="point in project.highlightList"
                :key="point"
                class="flex items-start gap-2"
              >
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-emerald)]" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-6 border-t border-[var(--border-subtle)] pt-4">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tagList"
                :key="tag"
                class="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono-tech text-[11px] text-[var(--text-muted)]"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-3">
              <a
                v-for="link in project.linkList"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                :class="
                  link.primary
                    ? 'border border-[var(--border-strong)] bg-[var(--accent-cyan-soft)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[#031318]'
                    : 'border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                "
              >
                <span>{{ link.label }}</span>
                <ExternalLink class="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- 脱敏企业级工程沉淀概览 -->
      <div class="surface-card mt-10 rounded-2xl p-6 sm:p-7">
        <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div class="flex items-center gap-2.5">
            <Server class="h-4 w-4 text-[var(--accent-cyan)]" />
            <h3 class="text-base font-bold text-[var(--text-primary)]">
              更多生产级工程沉淀（脱敏概览）
            </h3>
          </div>
          <a
            :href="websiteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 font-mono-tech text-xs text-[var(--accent-cyan)] hover:underline"
          >
            <span>更多公开项目见 crysu.com</span>
            <ArrowUpRight class="h-3.5 w-3.5" />
          </a>
        </div>

        <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="track in enterpriseTrackList"
            :key="track.title"
            class="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
          >
            <div class="text-sm font-semibold text-[var(--text-primary)]">
              {{ track.title }}
            </div>
            <p class="mt-1.5 text-xs leading-6 text-[var(--text-secondary)]">
              {{ track.detail }}
            </p>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="tag in track.tagList"
                :key="tag"
                class="rounded bg-[var(--accent-cyan-soft)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--accent-cyan)]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
