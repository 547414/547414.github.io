<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { ArrowUpRight, CornerDownLeft, Search } from 'lucide-vue-next'
import type { ProfileData } from '@/types/profile'
import type { MainViewId, SpotlightEntry, WindowId } from '@/types/os'

interface SpotlightModalProps {
  open: boolean
  profile: ProfileData
}

const props = defineProps<SpotlightModalProps>()

const emit = defineEmits<{
  close: []
  navigateView: [view: MainViewId]
  selectEnterprise: [id: string]
  openWindow: [id: WindowId]
  copyEmail: []
}>()

const query = ref<string>('')
const selectedIndex = ref<number>(0)
const inputEl = ref<HTMLInputElement | null>(null)

const allEntryList = computed<SpotlightEntry[]>(() => {
  const list: SpotlightEntry[] = [
    {
      id: 'ext-crysu',
      group: '传送门',
      title: `访问个人主站 ${props.profile.websiteDisplay}`,
      subtitle: props.profile.motto,
      keywords: 'crysu 网站 主站 小游戏 高速 blog',
      actionType: 'external',
      url: props.profile.websiteUrl
    },
    {
      id: 'win-terminal',
      group: '应用',
      title: '打开交互终端 Terminal',
      subtitle: '输入 whoami、projects 或 sudo ship --from=beach 试试彩蛋',
      keywords: 'terminal 终端 命令行 shell 彩蛋',
      actionType: 'window',
      windowId: 'terminal'
    },
    {
      id: 'win-about',
      group: '应用',
      title: '关于本机 · Crysu',
      subtitle: '查看核心规格、技术定位与个人概况',
      keywords: 'about 关于 本机 自我介绍 简介',
      actionType: 'window',
      windowId: 'about'
    },
    {
      id: 'act-email',
      group: '联系',
      title: `复制邮箱 ${props.profile.email}`,
      subtitle: '一键复制到剪贴板',
      keywords: 'email 邮箱 联系 mail 268zhb',
      actionType: 'copy-email'
    },
    {
      id: 'ext-github',
      group: '传送门',
      title: `GitHub · @${props.profile.handle}`,
      subtitle: props.profile.githubUrl,
      keywords: 'github 开源 源码 547414',
      actionType: 'external',
      url: props.profile.githubUrl
    },
    {
      id: 'view-stack',
      group: '导航',
      title: '技术版图',
      subtitle: 'Python / FastAPI、Vue 3 / TypeScript、Go、Kotlin、微信小程序与基建',
      keywords: 'stack 技能 技术栈 python fastapi vue go kotlin',
      actionType: 'view',
      viewId: 'stack'
    },
    {
      id: 'view-principles',
      group: '导航',
      title: '工程信条',
      subtitle: '写代码与做产品的四条朴素原则',
      keywords: 'principles 原则 信条 理念 架构',
      actionType: 'view',
      viewId: 'principles'
    }
  ]

  for (const project of props.profile.projectList) {
    list.push({
      id: `proj-${project.id}`,
      group: '代表作品',
      title: project.title,
      subtitle: project.subtitle,
      keywords: `${project.title} ${project.subtitle} ${project.summary} ${project.tagList.join(' ')}`,
      actionType: project.linkList[0] ? 'external' : 'view',
      url: project.linkList[0]?.url,
      viewId: 'works'
    })
  }

  for (const track of props.profile.enterpriseTrackList) {
    list.push({
      id: `ent-${track.id}`,
      group: '生产工程档案',
      title: track.title,
      subtitle: track.subtitle,
      keywords: `${track.title} ${track.subtitle} ${track.detail} ${track.tagList.join(' ')}`,
      actionType: 'enterprise',
      enterpriseId: track.id
    })
  }

  return list
})

const filteredList = computed<SpotlightEntry[]>(() => {
  const kw = query.value.trim().toLowerCase()
  if (!kw) {
    return allEntryList.value.slice(0, 8)
  }
  return allEntryList.value
    .filter((entry) => {
      const hay = `${entry.title} ${entry.subtitle} ${entry.keywords} ${entry.group}`.toLowerCase()
      return hay.includes(kw)
    })
    .slice(0, 8)
})

watch(
  () => props.open,
  (val) => {
    if (val) {
      query.value = ''
      selectedIndex.value = 0
      nextTick(() => {
        inputEl.value?.focus()
      })
    }
  }
)

watch(filteredList, () => {
  selectedIndex.value = 0
})

function executeEntry(entry: SpotlightEntry): void {
  if (entry.actionType === 'external' && entry.url) {
    window.open(entry.url, '_blank', 'noopener,noreferrer')
  } else if (entry.actionType === 'window' && entry.windowId) {
    emit('openWindow', entry.windowId)
  } else if (entry.actionType === 'view' && entry.viewId) {
    emit('navigateView', entry.viewId)
  } else if (entry.actionType === 'enterprise' && entry.enterpriseId) {
    emit('selectEnterprise', entry.enterpriseId)
  } else if (entry.actionType === 'copy-email') {
    emit('copyEmail')
  }
  emit('close')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (filteredList.value.length > 0) {
      selectedIndex.value = (selectedIndex.value + 1) % filteredList.value.length
    }
    return
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (filteredList.value.length > 0) {
      selectedIndex.value =
        (selectedIndex.value - 1 + filteredList.value.length) % filteredList.value.length
    }
    return
  }
  if (event.key === 'Enter') {
    const entry = filteredList.value[selectedIndex.value]
    if (entry) {
      event.preventDefault()
      executeEntry(entry)
    }
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-120 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-start justify-center bg-black/20 px-4 pt-[14vh] backdrop-blur-[2px]"
      @click.self="emit('close')"
    >
      <div
        class="mac-window-glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
        @keydown="handleKeydown"
      >
        <div class="flex items-center gap-3 border-b border-[var(--mac-border-soft)] px-4 py-3.5">
          <Search class="h-5 w-5 shrink-0 text-[var(--mac-text-tertiary)]" />
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            placeholder="搜索作品、网盘、投屏、终端、crysu.com..."
            class="w-full bg-transparent text-[16px] text-[var(--mac-text)] placeholder:text-[var(--mac-text-tertiary)] focus:outline-none"
          />
          <kbd
            class="hidden rounded-md border border-[var(--mac-border)] px-1.5 py-0.5 font-mono-mac text-[11px] text-[var(--mac-text-tertiary)] sm:inline-block"
          >
            ESC
          </kbd>
        </div>

        <div class="mac-scroll max-h-[52vh] overflow-y-auto p-2">
          <div
            v-if="filteredList.length === 0"
            class="py-10 text-center text-[13px] text-[var(--mac-text-tertiary)]"
          >
            没有找到与「{{ query }}」相关的内容
          </div>

          <button
            v-for="(entry, idx) in filteredList"
            :key="entry.id"
            type="button"
            class="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-left transition-colors"
            :class="
              idx === selectedIndex
                ? 'bg-[var(--mac-blue)] text-white'
                : 'text-[var(--mac-text)] hover:bg-[var(--mac-hover)]'
            "
            @mouseenter="selectedIndex = idx"
            @click="executeEntry(entry)"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="truncate text-[14px] font-medium">{{ entry.title }}</span>
                <span
                  class="shrink-0 rounded px-1.5 py-0.5 text-[10px]"
                  :class="
                    idx === selectedIndex
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--mac-hover)] text-[var(--mac-text-tertiary)]'
                  "
                >
                  {{ entry.group }}
                </span>
              </div>
              <p
                class="mt-0.5 truncate text-[12px]"
                :class="idx === selectedIndex ? 'text-white/80' : 'text-[var(--mac-text-tertiary)]'"
              >
                {{ entry.subtitle }}
              </p>
            </div>

            <ArrowUpRight
              v-if="entry.actionType === 'external'"
              class="h-4 w-4 shrink-0 opacity-75"
            />
            <CornerDownLeft
              v-else-if="idx === selectedIndex"
              class="h-4 w-4 shrink-0 opacity-85"
            />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
