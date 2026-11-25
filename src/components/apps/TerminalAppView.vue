<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import type { ProfileData } from '@/types/profile'
import type { MainViewId, TerminalHistoryLine } from '@/types/os'

interface TerminalAppViewProps {
  profile: ProfileData
}

const props = defineProps<TerminalAppViewProps>()

const emit = defineEmits<{
  navigateView: [view: MainViewId]
  toggleTheme: []
  copyEmail: []
}>()

let lineSeq = 1
function createLine(text: string, type: TerminalHistoryLine['type'] = 'output'): TerminalHistoryLine {
  const item: TerminalHistoryLine = { id: lineSeq, type, text }
  lineSeq += 1
  return item
}

const historyList = ref<TerminalHistoryLine[]>([
  createLine('CrysuOS zsh · 欢迎来到 Crysu (@547414) 的交互终端', 'accent'),
  createLine('输入 help 查看命令，或点击底部快捷指令直接运行。', 'muted')
])

const commandInput = ref<string>('')
const commandHistory = ref<string[]>([])
const commandCursor = ref<number>(-1)
const scrollEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

const quickCommandList: string[] = [
  'whoami',
  'projects',
  'enterprise',
  'sudo ship --from=beach',
  'open crysu'
]

function scrollToBottom(): void {
  nextTick(() => {
    if (scrollEl.value) {
      scrollEl.value.scrollTop = scrollEl.value.scrollHeight
    }
  })
}

function appendLines(items: TerminalHistoryLine[]): void {
  historyList.value.push(...items)
  scrollToBottom()
}

function runCommand(raw: string): void {
  const cmd = raw.trim()
  if (!cmd) {
    return
  }

  commandHistory.value.unshift(cmd)
  commandCursor.value = -1
  commandInput.value = ''

  appendLines([createLine(`crysu@macbook ~ % ${cmd}`, 'command')])

  const lower = cmd.toLowerCase()

  if (lower === 'clear') {
    historyList.value = []
    return
  }

  if (lower === 'help') {
    appendLines([
      createLine('可用命令：', 'accent'),
      createLine('  whoami                   查看 Crysu 工程师档案'),
      createLine('  projects                 列出 7 个公开代表作品'),
      createLine('  enterprise               列出 5 个脱敏企业级系统'),
      createLine('  skills                   查看主力与跨端技术栈'),
      createLine('  contact                  查看联系方式并复制邮箱'),
      createLine('  open crysu               在新标签页打开 https://crysu.com'),
      createLine('  sudo ship --from=beach   海边遥控 AI 上线彩蛋'),
      createLine('  theme                    切换浅色 / 深色 macOS 外观'),
      createLine('  clear                    清屏')
    ])
    return
  }

  if (lower === 'whoami') {
    appendLines([
      createLine(`Name:     ${props.profile.name} (@${props.profile.handle})`, 'success'),
      createLine(`Role:     ${props.profile.roleTitle}`),
      createLine('Style:    单向分层架构 + 零 any 强契约 + 24+ 项目共享规范底座'),
      createLine(`Portal:   ${props.profile.websiteUrl}`, 'accent'),
      createLine(`Motto:    ${props.profile.motto}`, 'muted')
    ])
    return
  }

  if (lower === 'projects') {
    const lines = props.profile.projectList.map((item, idx) =>
      createLine(`  0${idx + 1}. ${item.title} — ${item.subtitle}`)
    )
    appendLines([
      createLine('公开代表作品（7 项）：', 'accent'),
      ...lines,
      createLine('提示：已同步切换主窗口到「代表作品」视图。', 'muted')
    ])
    emit('navigateView', 'works')
    return
  }

  if (lower === 'enterprise') {
    const lines = props.profile.enterpriseTrackList.map((item, idx) =>
      createLine(`  0${idx + 1}. ${item.title} — ${item.subtitle}`)
    )
    appendLines([
      createLine('生产级工程沉淀（脱敏，5 项）：', 'accent'),
      ...lines,
      createLine('提示：可在主窗口「生产工程档案」查看完整架构细节。', 'muted')
    ])
    emit('navigateView', 'enterprise')
    return
  }

  if (lower === 'skills') {
    appendLines([
      createLine('Core:    Python 3.12 · FastAPI · SQLAlchemy 2 · Vue 3 · TypeScript', 'accent'),
      createLine('AI:      Claude Code / Codex / AGY · Agent Gate · ONNX · ChatTTS'),
      createLine('Beyond:  Go · Kotlin · macOS AppKit / WPF · 微信小程序 & 小游戏 · 嵌入式 mDNS'),
      createLine('Infra:   PostgreSQL · Redis · RustFS / MinIO · 蓝绿部署 · 事务脱敏')
    ])
    return
  }

  if (lower === 'contact') {
    emit('copyEmail')
    appendLines([
      createLine(`Website: ${props.profile.websiteUrl}`, 'accent'),
      createLine(`GitHub:  ${props.profile.githubUrl}`),
      createLine(`Email:   ${props.profile.email}  [✓ 已复制到剪贴板]`, 'success')
    ])
    return
  }

  if (lower === 'open crysu' || lower === 'open crysu.com') {
    window.open(props.profile.websiteUrl, '_blank', 'noopener,noreferrer')
    appendLines([createLine(`正在打开 ${props.profile.websiteUrl} · 全速前进...`, 'success')])
    return
  }

  if (lower === 'theme') {
    emit('toggleTheme')
    appendLines([createLine('已切换 macOS 浅色 / 深色外观。', 'success')])
    return
  }

  if (lower.startsWith('sudo ship')) {
    appendLines([
      createLine('[Phone AI Audit] 收到远端 Mac 任务审批请求：发布 30,000 行新需求', 'accent'),
      createLine('[锁屏通知] 你在海边喝了一口椰子水，顺手点了「允许 ✓」...'),
      createLine('[面容 ID] 高危操作二次门禁验证通过。', 'success'),
      createLine('[Git] commit -> push origin main -> 蓝绿切换无损完成，耗时 3.0s。', 'success'),
      createLine('老板查岗：「他人都不在工位，需求怎么全上线了？！」', 'muted')
    ])
    return
  }

  appendLines([
    createLine(`zsh: command not found: ${cmd}`, 'muted'),
    createLine('输入 help 查看可用命令。', 'muted')
  ])
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (commandHistory.value.length === 0) return
    const next = Math.min(commandHistory.value.length - 1, commandCursor.value + 1)
    commandCursor.value = next
    commandInput.value = commandHistory.value[next] ?? ''
    return
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (commandCursor.value <= 0) {
      commandCursor.value = -1
      commandInput.value = ''
      return
    }
    commandCursor.value -= 1
    commandInput.value = commandHistory.value[commandCursor.value] ?? ''
  }
}

function focusInput(): void {
  inputEl.value?.focus()
}

onMounted(() => {
  focusInput()
})
</script>

<template>
  <div class="flex h-full flex-col font-mono-mac text-[12.5px] leading-6" @click="focusInput">
    <!-- 终端输出区 -->
    <div ref="scrollEl" class="mac-scroll min-h-0 flex-1 overflow-y-auto px-5 py-4">
      <div
        v-for="line in historyList"
        :key="line.id"
        class="whitespace-pre-wrap break-words"
        :class="{
          'mt-2 font-semibold text-white': line.type === 'command',
          'text-sky-400': line.type === 'accent',
          'text-emerald-400': line.type === 'success',
          'text-white/45': line.type === 'muted',
          'text-white/85': line.type === 'output'
        }"
      >
        {{ line.text }}
      </div>

      <!-- 输入行 -->
      <form class="mt-2 flex items-center gap-2" @submit.prevent="runCommand(commandInput)">
        <span class="shrink-0 text-emerald-400">crysu@macbook ~ %</span>
        <input
          ref="inputEl"
          v-model="commandInput"
          type="text"
          autocomplete="off"
          spellcheck="false"
          class="w-full bg-transparent text-white caret-sky-400 focus:outline-none"
          placeholder="输入 help 或点击下方快捷指令..."
          @keydown="handleKeydown"
        />
      </form>
    </div>

    <!-- 底部快捷指令条 -->
    <div class="flex flex-wrap items-center gap-1.5 border-t border-white/10 bg-black/25 px-4 py-2.5">
      <span class="mr-1 text-[11px] text-white/40">快捷运行:</span>
      <button
        v-for="cmd in quickCommandList"
        :key="cmd"
        type="button"
        class="cursor-pointer rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/75 transition-colors hover:border-sky-400/50 hover:bg-sky-400/15 hover:text-sky-300"
        @click.stop="runCommand(cmd)"
      >
        {{ cmd }}
      </button>
    </div>
  </div>
</template>
