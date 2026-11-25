<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Compass,
  Copy,
  Cpu,
  Dna,
  Gamepad2,
  Github,
  HardDrive,
  Kanban,
  Layers,
  Mail,
  MonitorSmartphone,
  Server,
  Sparkles,
  Terminal,
  User
} from 'lucide-vue-next'
import { PROJECT_CATEGORY_LIST } from '@/data/profile'
import type { EnterpriseTrackItem, ProfileData, ProjectCategoryKey, ProjectItem } from '@/types/profile'
import type { MainViewId, WindowId } from '@/types/os'

interface MainAppViewProps {
  profile: ProfileData
  activeView: MainViewId
  selectedEnterpriseId: string
  emailCopied: boolean
}

const props = defineProps<MainAppViewProps>()

const emit = defineEmits<{
  'update:activeView': [view: MainViewId]
  'update:selectedEnterpriseId': [id: string]
  openWindow: [id: WindowId]
  copyEmail: []
}>()

interface SidebarNavItem {
  id: MainViewId
  label: string
}

const profileNavList: SidebarNavItem[] = [
  { id: 'overview', label: '关于我' },
  { id: 'stack', label: '技术版图' },
  { id: 'principles', label: '工程信条' }
]

const workNavList: SidebarNavItem[] = [
  { id: 'works', label: '代表作品' },
  { id: 'enterprise', label: '生产工程档案' }
]

const activeCategory = ref<ProjectCategoryKey>('all')
const contentRef = ref<HTMLElement | null>(null)

watch(
  () => props.activeView,
  () => {
    if (contentRef.value) {
      contentRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)

const filteredProjectList = computed<ProjectItem[]>(() => {
  if (activeCategory.value === 'all') {
    return props.profile.projectList
  }
  return props.profile.projectList.filter((item) => item.category === activeCategory.value)
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

const currentEnterprise = computed<EnterpriseTrackItem | undefined>(() => {
  return (
    props.profile.enterpriseTrackList.find((item) => item.id === props.selectedEnterpriseId) ??
    props.profile.enterpriseTrackList[0]
  )
})
</script>

<template>
  <div class="flex h-full flex-col md:flex-row">
    <!-- 左侧 macOS 毛玻璃 Sidebar（桌面端） -->
    <aside
      class="mac-sidebar-glass hidden w-56 shrink-0 flex-col justify-between border-r border-[var(--mac-border-soft)] p-4 md:flex"
    >
      <div class="space-y-6">
        <!-- 个人档案分组 -->
        <div>
          <div class="px-2.5 text-[11px] font-semibold tracking-wide text-[var(--mac-text-tertiary)]">
            个人档案
          </div>
          <div class="mt-2 space-y-0.5">
            <button
              v-for="item in profileNavList"
              :key="item.id"
              type="button"
              class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors"
              :class="
                activeView === item.id
                  ? 'bg-[var(--mac-blue)] text-white'
                  : 'text-[var(--mac-text-secondary)] hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]'
              "
              @click="emit('update:activeView', item.id)"
            >
              <User v-if="item.id === 'overview'" class="h-4 w-4 shrink-0" />
              <Cpu v-else-if="item.id === 'stack'" class="h-4 w-4 shrink-0" />
              <Sparkles v-else class="h-4 w-4 shrink-0" />
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>

        <!-- 作品与实战分组 -->
        <div>
          <div class="px-2.5 text-[11px] font-semibold tracking-wide text-[var(--mac-text-tertiary)]">
            作品与实战
          </div>
          <div class="mt-2 space-y-0.5">
            <button
              v-for="item in workNavList"
              :key="item.id"
              type="button"
              class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors"
              :class="
                activeView === item.id
                  ? 'bg-[var(--mac-blue)] text-white'
                  : 'text-[var(--mac-text-secondary)] hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]'
              "
              @click="emit('update:activeView', item.id)"
            >
              <Briefcase v-if="item.id === 'works'" class="h-4 w-4 shrink-0" />
              <Server v-else class="h-4 w-4 shrink-0" />
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>

        <!-- 传送门分组 -->
        <div>
          <div class="px-2.5 text-[11px] font-semibold tracking-wide text-[var(--mac-text-tertiary)]">
            传送门
          </div>
          <div class="mt-2 space-y-0.5">
            <a
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium text-[var(--mac-blue)] transition-colors hover:bg-[var(--mac-hover)]"
            >
              <span class="inline-flex items-center gap-2.5">
                <Compass class="h-4 w-4 shrink-0" />
                <span>{{ profile.websiteDisplay }}</span>
              </span>
              <ArrowUpRight class="h-3.5 w-3.5 opacity-75" />
            </a>

            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
            >
              <span class="inline-flex items-center gap-2.5">
                <Github class="h-4 w-4 shrink-0" />
                <span>GitHub</span>
              </span>
              <ArrowUpRight class="h-3.5 w-3.5 opacity-60" />
            </a>

            <button
              type="button"
              class="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium text-[var(--mac-text-secondary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
              @click="emit('copyEmail')"
            >
              <span class="inline-flex items-center gap-2.5">
                <Mail class="h-4 w-4 shrink-0" />
                <span>{{ emailCopied ? '已复制邮箱' : '复制邮箱' }}</span>
              </span>
              <Check v-if="emailCopied" class="h-3.5 w-3.5 text-[var(--mac-blue)]" />
              <Copy v-else class="h-3.5 w-3.5 opacity-55" />
            </button>
          </div>
        </div>
      </div>

      <!-- 底部轻量提示 -->
      <div class="border-t border-[var(--mac-border-soft)] pt-3.5">
        <button
          type="button"
          class="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] text-[var(--mac-text-tertiary)] transition-colors hover:bg-[var(--mac-hover)] hover:text-[var(--mac-text)]"
          @click="emit('openWindow', 'terminal')"
        >
          <Terminal class="h-3.5 w-3.5" />
          <span>打开交互终端</span>
        </button>
      </div>
    </aside>

    <!-- 移动端顶部视图切换栏 -->
    <div
      class="flex shrink-0 gap-1.5 overflow-x-auto border-b border-[var(--mac-border-soft)] bg-[var(--mac-sidebar)] px-4 py-2.5 md:hidden"
    >
      <button
        v-for="item in [...profileNavList, ...workNavList]"
        :key="item.id"
        type="button"
        class="shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors"
        :class="
          activeView === item.id
            ? 'bg-[var(--mac-blue)] text-white'
            : 'text-[var(--mac-text-secondary)] hover:bg-[var(--mac-hover)]'
        "
        @click="emit('update:activeView', item.id)"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- 右侧宽敞主画布 -->
    <div ref="contentRef" class="mac-scroll min-h-0 flex-1 overflow-y-auto px-6 py-8 sm:px-11 sm:py-10">
      <!-- 视图 1：关于我（极简大留白） -->
      <div v-if="activeView === 'overview'" class="mx-auto max-w-3xl space-y-12">
        <div>
          <p class="font-mono-mac text-[12px] font-medium text-[var(--mac-blue)]">
            {{ profile.name }} · @{{ profile.handle }}
          </p>
          <h1
            class="mt-3 text-3xl font-bold tracking-tight text-[var(--mac-text)] sm:text-[40px] sm:leading-[1.15]"
          >
            全栈系统架构师，
            <br />
            也是 AI 工具链造物主。
          </h1>
          <p class="mt-5 text-[15px] leading-[1.85] text-[var(--mac-text-secondary)] sm:text-[16px]">
            {{ profile.heroLead }}
          </p>

          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full bg-[var(--mac-blue)] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
            >
              <span>访问个人主站 {{ profile.websiteDisplay }}</span>
              <ArrowUpRight class="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              class="inline-flex cursor-pointer items-center gap-1 rounded-full bg-[var(--mac-hover)] px-5 py-2.5 text-[13px] font-medium text-[var(--mac-text)] transition-colors hover:bg-[var(--mac-blue-soft)] hover:text-[var(--mac-blue)]"
              @click="emit('update:activeView', 'works')"
            >
              <span>查看代表作品</span>
              <span aria-hidden="true">›</span>
            </button>

            <button
              type="button"
              class="hidden cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[13px] text-[var(--mac-text-tertiary)] transition-colors hover:text-[var(--mac-text)] sm:inline-flex"
              @click="emit('openWindow', 'terminal')"
            >
              <Terminal class="h-3.5 w-3.5" />
              <span>试试终端彩蛋</span>
            </button>
          </div>
        </div>

        <!-- 四项实证数字（纯净无框线） -->
        <div class="grid grid-cols-2 gap-6 border-y border-[var(--mac-border-soft)] py-7 sm:grid-cols-4">
          <div v-for="metric in profile.statMetricList" :key="metric.label">
            <div class="text-2xl font-semibold tracking-tight text-[var(--mac-text)]">
              {{ metric.value }}
            </div>
            <div class="mt-1 text-[12px] text-[var(--mac-text-tertiary)]">
              {{ metric.label }}
            </div>
          </div>
        </div>

        <!-- 三大程序员特质 -->
        <div class="grid gap-5 sm:grid-cols-3">
          <article
            v-for="(card, index) in profile.portraitCardList"
            :key="card.id"
            class="mac-inner-card mac-inner-card-hover rounded-2xl p-6"
          >
            <div
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--mac-blue-soft)] text-[var(--mac-blue)]"
            >
              <Layers v-if="index === 0" class="h-4 w-4" />
              <Cpu v-else-if="index === 1" class="h-4 w-4" />
              <Gamepad2 v-else class="h-4 w-4" />
            </div>
            <h2 class="mt-4 text-[15px] font-semibold leading-snug text-[var(--mac-text)]">
              {{ card.title }}
            </h2>
            <p class="mt-2.5 text-[13px] leading-[1.8] text-[var(--mac-text-secondary)]">
              {{ card.summary }}
            </p>
          </article>
        </div>

        <!-- 主站 crysu.com 优雅通栏传送门 -->
        <a
          :href="profile.websiteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mac-inner-card mac-inner-card-hover group flex flex-col justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:px-7"
        >
          <div>
            <p class="text-[11px] font-medium text-[var(--mac-blue)]">
              个人主站 · {{ profile.websiteDisplay }}
            </p>
            <h3 class="mt-1 text-[16px] font-semibold text-[var(--mac-text)]">
              {{ profile.motto }}
            </h3>
            <p class="mt-1.5 text-[13px] text-[var(--mac-text-secondary)]">
              前往主站体验夜间高速入口、网页小游戏合集、小程序介绍页与百年庆典生产复盘。
            </p>
          </div>
          <span
            class="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-[var(--mac-blue)] group-hover:underline"
          >
            <span>立即前往</span>
            <ArrowUpRight class="h-4 w-4" />
          </span>
        </a>
      </div>

      <!-- 视图 2：代表作品 -->
      <div v-else-if="activeView === 'works'" class="mx-auto max-w-3xl space-y-8">
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 class="text-2xl font-bold tracking-tight text-[var(--mac-text)]">代表作品</h2>
            <p class="mt-1.5 text-[13px] text-[var(--mac-text-tertiary)]">
              7 个公开作品与生产实战，点开可直达源码、在线试玩或案例复盘。
            </p>
          </div>

          <div class="mac-segmented inline-flex w-fit max-w-full items-center gap-0.5 overflow-x-auto">
            <button
              v-for="cat in PROJECT_CATEGORY_LIST"
              :key="cat.key"
              type="button"
              class="cursor-pointer whitespace-nowrap rounded-[7px] px-3 py-1 text-[12px] font-medium transition-all"
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

        <!-- 头牌特色作品 -->
        <article
          v-if="featuredProject"
          class="mac-inner-card mac-inner-card-hover rounded-2xl p-7"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="text-[12px] font-medium text-[var(--mac-blue)]">
              {{ featuredProject.categoryLabel }} · {{ featuredProject.statusBadge }}
            </span>
            <a
              v-for="link in featuredProject.linkList"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 rounded-full bg-[var(--mac-blue)] px-4 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[var(--mac-blue-hover)]"
            >
              <span>{{ link.label }}</span>
              <ArrowUpRight class="h-3.5 w-3.5" />
            </a>
          </div>

          <h3 class="mt-3 text-xl font-bold tracking-tight text-[var(--mac-text)]">
            {{ featuredProject.title }}
          </h3>
          <p class="mt-1 text-[13px] text-[var(--mac-text-tertiary)]">
            {{ featuredProject.subtitle }}
          </p>
          <p class="mt-4 text-[14px] leading-[1.8] text-[var(--mac-text-secondary)]">
            {{ featuredProject.summary }}
          </p>

          <ul class="mt-4 space-y-2 text-[13px] leading-6 text-[var(--mac-text-secondary)]">
            <li
              v-for="point in featuredProject.highlightList"
              :key="point"
              class="flex items-start gap-2.5"
            >
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mac-blue)]" />
              <span>{{ point }}</span>
            </li>
          </ul>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="tag in featuredProject.tagList"
              :key="tag"
              class="rounded-full bg-[var(--mac-hover)] px-3 py-1 text-[11px] text-[var(--mac-text-tertiary)]"
            >
              {{ tag }}
            </span>
          </div>
        </article>

        <!-- 常规 6 大作品 2 列舒展网格 -->
        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="project in regularProjectList"
            :key="project.id"
            class="mac-inner-card mac-inner-card-hover flex flex-col justify-between rounded-2xl p-6"
          >
            <div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-[11px] font-medium text-[var(--mac-text-tertiary)]">
                  {{ project.categoryLabel }}
                </span>
                <div class="flex items-center gap-2.5">
                  <a
                    v-for="link in project.linkList"
                    :key="link.url"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-0.5 text-[12px] font-medium text-[var(--mac-blue)] hover:underline"
                  >
                    <span>{{ link.label }}</span>
                    <ArrowUpRight class="h-3 w-3" />
                  </a>
                </div>
              </div>

              <h3 class="mt-3 text-[17px] font-semibold tracking-tight text-[var(--mac-text)]">
                {{ project.title }}
              </h3>
              <p class="mt-1 text-[12px] text-[var(--mac-text-tertiary)]">
                {{ project.subtitle }}
              </p>
              <p class="mt-3 text-[13px] leading-[1.8] text-[var(--mac-text-secondary)]">
                {{ project.summary }}
              </p>
            </div>

            <div class="mt-5 flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tagList.slice(0, 4)"
                :key="tag"
                class="rounded-full bg-[var(--mac-hover)] px-2.5 py-0.5 text-[11px] text-[var(--mac-text-tertiary)]"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- 视图 3：生产工程档案（5 个脱敏企业级系统详览） -->
      <div v-else-if="activeView === 'enterprise'" class="mx-auto max-w-3xl space-y-7">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-[var(--mac-text)]">
            生产工程档案（脱敏概览）
          </h2>
          <p class="mt-1.5 text-[13px] text-[var(--mac-text-tertiary)]">
            从 0 到 1 主导架构与落地的 5 个企业级系统，切换下方项目查看详尽技术架构与核心亮点。
          </p>
        </div>

        <!-- 5 项目优雅选择胶囊 -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="track in profile.enterpriseTrackList"
            :key="track.id"
            type="button"
            class="inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-[13px] font-medium transition-all"
            :class="
              selectedEnterpriseId === track.id
                ? 'border-[var(--mac-blue)] bg-[var(--mac-blue)] text-white shadow-sm'
                : 'border-[var(--mac-border-soft)] bg-[var(--mac-surface-solid)] text-[var(--mac-text-secondary)] hover:border-[var(--mac-border)] hover:text-[var(--mac-text)]'
            "
            @click="emit('update:selectedEnterpriseId', track.id)"
          >
            <HardDrive v-if="track.id === 'enterprise-drive'" class="h-3.5 w-3.5" />
            <Cpu v-else-if="track.id === 'agent-gate'" class="h-3.5 w-3.5" />
            <Kanban v-else-if="track.id === 'work-quantification'" class="h-3.5 w-3.5" />
            <MonitorSmartphone v-else-if="track.id === 'screen-casting'" class="h-3.5 w-3.5" />
            <Dna v-else class="h-3.5 w-3.5" />
            <span>{{ track.title }}</span>
          </button>
        </div>

        <!-- 当前选中项目的宽敞详情卡 -->
        <article v-if="currentEnterprise" class="mac-inner-card rounded-2xl p-7 sm:p-9">
          <p class="font-mono-mac text-[11px] font-medium tracking-[0.14em] text-[var(--mac-blue)]">
            {{ currentEnterprise.badge }}
          </p>
          <h3 class="mt-2.5 text-2xl font-bold tracking-tight text-[var(--mac-text)]">
            {{ currentEnterprise.title }}
          </h3>
          <p class="mt-1.5 text-[14px] text-[var(--mac-text-tertiary)]">
            {{ currentEnterprise.subtitle }}
          </p>

          <p class="mt-6 text-[14px] leading-[1.9] text-[var(--mac-text-secondary)] sm:text-[15px]">
            {{ currentEnterprise.detail }}
          </p>

          <div class="mt-7 border-t border-[var(--mac-border-soft)] pt-6">
            <p class="text-[12px] font-semibold text-[var(--mac-text-tertiary)]">核心工程亮点</p>
            <ul class="mt-3.5 space-y-3 text-[14px] leading-7 text-[var(--mac-text-secondary)]">
              <li
                v-for="point in currentEnterprise.highlightList"
                :key="point"
                class="flex items-start gap-3"
              >
                <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mac-blue)]" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <div class="mt-7 flex flex-wrap gap-2">
            <span
              v-for="tag in currentEnterprise.tagList"
              :key="tag"
              class="rounded-full bg-[var(--mac-hover)] px-3 py-1 text-[12px] font-medium text-[var(--mac-text-secondary)]"
            >
              {{ tag }}
            </span>
          </div>
        </article>
      </div>

      <!-- 视图 4：技术版图 -->
      <div v-else-if="activeView === 'stack'" class="mx-auto max-w-3xl space-y-7">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-[var(--mac-text)]">技术版图</h2>
          <p class="mt-1.5 text-[13px] text-[var(--mac-text-tertiary)]">
            主力栈稳如磐石，遇到端侧或底层边界随时切最合适的语言穿透。
          </p>
        </div>

        <div class="mac-inner-card divide-y divide-[var(--mac-border-soft)] rounded-2xl px-7">
          <div
            v-for="group in profile.techGroupList"
            :key="group.id"
            class="grid gap-4 py-6 sm:grid-cols-12 sm:items-start sm:gap-6"
          >
            <div class="sm:col-span-4">
              <h3 class="text-[15px] font-semibold text-[var(--mac-text)]">{{ group.title }}</h3>
              <p class="mt-1 text-[12px] leading-relaxed text-[var(--mac-text-tertiary)]">
                {{ group.subtitle }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2 sm:col-span-8">
              <span
                v-for="skill in group.skillList"
                :key="skill.name"
                class="rounded-full px-3 py-1 text-[12px]"
                :class="
                  skill.core
                    ? 'bg-[var(--mac-blue-soft)] font-medium text-[var(--mac-blue)]'
                    : 'bg-[var(--mac-hover)] text-[var(--mac-text-secondary)]'
                "
              >
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 视图 5：工程信条与联系 -->
      <div v-else class="mx-auto max-w-3xl space-y-10">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-[var(--mac-text)]">工程信条</h2>
          <p class="mt-1.5 text-[13px] text-[var(--mac-text-tertiary)]">
            写代码与做产品的四条朴素原则。
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <article
            v-for="item in profile.principleList"
            :key="item.index"
            class="mac-inner-card rounded-2xl p-6"
          >
            <span class="font-mono-mac text-[12px] font-medium text-[var(--mac-blue)]">
              {{ item.index }}
            </span>
            <h3 class="mt-2.5 text-[16px] font-semibold text-[var(--mac-text)]">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-[13px] leading-[1.85] text-[var(--mac-text-secondary)]">
              {{ item.description }}
            </p>
          </article>
        </div>

        <!-- 联系卡片 -->
        <div class="mac-inner-card rounded-2xl p-7 text-center">
          <p class="text-[13px] text-[var(--mac-text-tertiary)]">找到我</p>
          <h3 class="mt-2 text-lg font-semibold text-[var(--mac-text)]">
            欢迎聊架构、聊 AI 工具链，或顺手来玩一把小游戏
          </h3>
          <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              :href="profile.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full bg-[var(--mac-blue)] px-5 py-2 text-[13px] font-medium text-white hover:bg-[var(--mac-blue-hover)]"
            >
              <span>{{ profile.websiteDisplay }}</span>
              <ArrowUpRight class="h-3.5 w-3.5" />
            </a>
            <a
              :href="profile.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full bg-[var(--mac-hover)] px-4 py-2 text-[13px] font-medium text-[var(--mac-text)]"
            >
              <Github class="h-3.5 w-3.5" />
              <span>@{{ profile.handle }}</span>
            </a>
            <button
              type="button"
              class="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[var(--mac-hover)] px-4 py-2 font-mono-mac text-[12px] text-[var(--mac-text-secondary)] hover:text-[var(--mac-text)]"
              @click="emit('copyEmail')"
            >
              <span>{{ profile.email }}</span>
              <Check v-if="emailCopied" class="h-3.5 w-3.5 text-[var(--mac-blue)]" />
              <Copy v-else class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
