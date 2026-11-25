<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowUpRight,
  Cpu,
  Dna,
  HardDrive,
  Kanban,
  MonitorSmartphone
} from 'lucide-vue-next'
import { PROJECT_CATEGORY_LIST } from '@/data/profile'
import type { EnterpriseTrackItem, ProjectCategoryKey, ProjectItem } from '@/types/profile'

interface ProjectsSectionProps {
  projectList: ProjectItem[]
  enterpriseTrackList: EnterpriseTrackItem[]
}

const props = defineProps<ProjectsSectionProps>()

const activeCategory = ref<ProjectCategoryKey>('all')
const activeTrackId = ref<string>(props.enterpriseTrackList[0]?.id ?? 'enterprise-drive')

const filteredProjectList = computed<ProjectItem[]>(() => {
  if (activeCategory.value === 'all') {
    return props.projectList
  }
  return props.projectList.filter((item) => item.category === activeCategory.value)
})

const featuredProject = computed<ProjectItem | null>(() => {
  return filteredProjectList.value.find((item) => item.featured) ?? null
})

const regularProjectList = computed<ProjectItem[]>(() => {
  if (!featuredProject.value) {
    return filteredProjectList.value
  }
  return filteredProjectList.value.filter((item) => item.id !== featuredProject.value?.id)
})

const currentTrack = computed<EnterpriseTrackItem | undefined>(() => {
  return (
    props.enterpriseTrackList.find((item) => item.id === activeTrackId.value) ??
    props.enterpriseTrackList[0]
  )
})
</script>

<template>
  <section id="works" class="border-t border-[var(--mac-border-soft)] py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 sm:px-10">
      <!-- 标题 + macOS Segmented Control -->
      <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div class="max-w-xl">
          <p class="text-[13px] font-medium text-[var(--mac-blue)]">代表作品</p>
          <h2 class="mt-2.5 text-3xl font-bold tracking-tight text-[var(--mac-text)] sm:text-4xl">
            跑在真实世界里的代码。
          </h2>
        </div>

        <div class="mac-segmented inline-flex w-fit max-w-full items-center gap-0.5 overflow-x-auto">
          <button
            v-for="cat in PROJECT_CATEGORY_LIST"
            :key="cat.key"
            type="button"
            class="cursor-pointer whitespace-nowrap rounded-[7px] px-3.5 py-1.5 text-[13px] font-medium transition-all"
            :class="
              activeCategory === cat.key
                ? 'mac-segment-active'
                : 'text-[var(--mac-text-secondary)] hover:text-[var(--mac-text)]'
            "
            @click="activeCategory = cat.key"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- 头牌特色作品（Phone AI Audit） -->
      <article
        v-if="featuredProject"
        class="mac-card mac-card-interactive mt-12 rounded-2xl p-8 sm:p-10"
      >
        <div class="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div class="lg:col-span-8">
            <p class="text-[12px] font-medium text-[var(--mac-blue)]">
              {{ featuredProject.categoryLabel }} · {{ featuredProject.statusBadge }}
            </p>
            <h3 class="mt-2.5 text-2xl font-bold tracking-tight text-[var(--mac-text)] sm:text-[28px]">
              {{ featuredProject.title }}
            </h3>
            <p class="mt-2 text-[15px] text-[var(--mac-text-tertiary)]">
              {{ featuredProject.subtitle }}
            </p>
            <p class="mt-5 text-[15px] leading-[1.85] text-[var(--mac-text-secondary)]">
              {{ featuredProject.summary }}
            </p>

            <ul class="mt-6 space-y-2.5 text-[14px] leading-relaxed text-[var(--mac-text-secondary)]">
              <li
                v-for="point in featuredProject.highlightList"
                :key="point"
                class="flex items-start gap-3"
              >
                <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mac-blue)]" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col justify-between gap-6 lg:col-span-4 lg:items-end">
            <div class="flex flex-wrap gap-2 lg:justify-end">
              <span
                v-for="tag in featuredProject.tagList"
                :key="tag"
                class="rounded-full bg-[var(--mac-hover)] px-3 py-1 text-[12px] text-[var(--mac-text-secondary)]"
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
                class="inline-flex items-center gap-1.5 rounded-full bg-[var(--mac-blue)] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
              >
                <span>{{ link.label }}</span>
                <ArrowUpRight class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- 常规 6 大作品（2 列舒展网格） -->
      <div class="mt-7 grid gap-6 md:grid-cols-2 md:gap-7">
        <article
          v-for="project in regularProjectList"
          :key="project.id"
          class="mac-card mac-card-interactive flex flex-col justify-between rounded-2xl p-8"
        >
          <div>
            <div class="flex items-center justify-between gap-4">
              <span class="text-[12px] font-medium text-[var(--mac-text-tertiary)]">
                {{ project.categoryLabel }}
              </span>
              <div class="flex items-center gap-3">
                <a
                  v-for="link in project.linkList"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-0.5 text-[13px] font-medium text-[var(--mac-blue)] hover:underline"
                >
                  <span>{{ link.label }}</span>
                  <ArrowUpRight class="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <h3 class="mt-4 text-[20px] font-semibold tracking-tight text-[var(--mac-text)]">
              {{ project.title }}
            </h3>
            <p class="mt-1.5 text-[13px] text-[var(--mac-text-tertiary)]">
              {{ project.subtitle }}
            </p>
            <p class="mt-4 text-[14px] leading-[1.85] text-[var(--mac-text-secondary)]">
              {{ project.summary }}
            </p>
          </div>

          <div class="mt-7 flex flex-wrap gap-2">
            <span
              v-for="tag in project.tagList.slice(0, 4)"
              :key="tag"
              class="rounded-full bg-[var(--mac-hover)] px-3 py-1 text-[12px] text-[var(--mac-text-tertiary)]"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>

      <!-- 生产级工程沉淀（仿 macOS「系统设置」左右分栏窗口） -->
      <div class="mt-24 sm:mt-28">
        <div class="max-w-2xl">
          <p class="text-[13px] font-medium text-[var(--mac-blue)]">生产级工程沉淀</p>
          <h3 class="mt-2.5 text-2xl font-bold tracking-tight text-[var(--mac-text)] sm:text-3xl">
            更多从 0 到 1 落地的系统架构（脱敏概览）
          </h3>
          <p class="mt-3 text-[15px] leading-relaxed text-[var(--mac-text-secondary)]">
            在左侧切换不同系统，查看各项目的核心定位、关键技术细节与架构选型。
          </p>
        </div>

        <div class="mac-window mt-10 overflow-hidden rounded-2xl">
          <!-- macOS 窗口顶栏 -->
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
              工程档案 · 系统概览
            </span>
          </div>

          <!-- 窗口主体：左侧 macOS Sidebar + 右侧宽敞详情面板 -->
          <div class="grid md:grid-cols-12">
            <!-- 左侧边栏（移动端为横向切换列表） -->
            <aside
              class="border-b border-[var(--mac-border-soft)] bg-[var(--mac-sidebar)] p-3 md:col-span-4 md:border-b-0 md:border-r md:p-4"
            >
              <div class="flex gap-1.5 overflow-x-auto md:flex-col md:gap-1">
                <button
                  v-for="track in enterpriseTrackList"
                  :key="track.id"
                  type="button"
                  class="flex shrink-0 cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors md:w-full"
                  :class="
                    activeTrackId === track.id
                      ? 'bg-[var(--mac-blue)] text-white'
                      : 'text-[var(--mac-text-secondary)] hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]'
                  "
                  @click="activeTrackId = track.id"
                >
                  <HardDrive v-if="track.id === 'enterprise-drive'" class="h-4 w-4 shrink-0" />
                  <Cpu v-else-if="track.id === 'agent-gate'" class="h-4 w-4 shrink-0" />
                  <Kanban v-else-if="track.id === 'work-quantification'" class="h-4 w-4 shrink-0" />
                  <MonitorSmartphone v-else-if="track.id === 'screen-casting'" class="h-4 w-4 shrink-0" />
                  <Dna v-else class="h-4 w-4 shrink-0" />
                  <span class="truncate">{{ track.title }}</span>
                </button>
              </div>
            </aside>

            <!-- 右侧宽敞详情面板 -->
            <div v-if="currentTrack" class="p-8 sm:p-10 md:col-span-8">
              <p class="font-mono-mac text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--mac-text-tertiary)]">
                {{ currentTrack.badge }}
              </p>

              <h4 class="mt-2.5 text-2xl font-bold tracking-tight text-[var(--mac-text)]">
                {{ currentTrack.title }}
              </h4>
              <p class="mt-2 text-[14px] text-[var(--mac-text-tertiary)]">
                {{ currentTrack.subtitle }}
              </p>

              <p class="mt-6 text-[15px] leading-[1.85] text-[var(--mac-text-secondary)]">
                {{ currentTrack.detail }}
              </p>

              <div class="mt-7 border-t border-[var(--mac-border-soft)] pt-6">
                <p class="text-[12px] font-semibold text-[var(--mac-text-tertiary)]">核心工程亮点</p>
                <ul class="mt-3.5 space-y-3 text-[14px] leading-7 text-[var(--mac-text-secondary)]">
                  <li
                    v-for="point in currentTrack.highlightList"
                    :key="point"
                    class="flex items-start gap-3"
                  >
                    <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mac-blue)]" />
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </div>

              <div class="mt-8 flex flex-wrap gap-2">
                <span
                  v-for="tag in currentTrack.tagList"
                  :key="tag"
                  class="rounded-full bg-[var(--mac-hover)] px-3.5 py-1 text-[12px] font-medium text-[var(--mac-text-secondary)]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
