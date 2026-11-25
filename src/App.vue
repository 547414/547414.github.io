<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Check } from 'lucide-vue-next'
import AboutBento from '@/components/AboutBento.vue'
import FooterSection from '@/components/FooterSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import NavBar from '@/components/NavBar.vue'
import PrinciplesSection from '@/components/PrinciplesSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import TechMatrix from '@/components/TechMatrix.vue'
import { PROFILE_DATA } from '@/data/profile'

const THEME_STORAGE_KEY = 'crysu-homepage-theme'

const isDark = ref<boolean>(true)
const emailCopied = ref<boolean>(false)
const toastMessage = ref<string>('')
let copyTimer: number | undefined

function applyTheme(dark: boolean): void {
  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeMeta) {
    themeMeta.content = dark ? '#040a0d' : '#f4f7f9'
  }
}

function handleToggleTheme(): void {
  const next = !isDark.value
  applyTheme(next)
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
  } catch {
    // 忽略隐私模式存储限制
  }
}

function showCopiedToast(): void {
  emailCopied.value = true
  toastMessage.value = `已复制邮箱 ${PROFILE_DATA.email}`
  if (copyTimer !== undefined) {
    window.clearTimeout(copyTimer)
  }
  copyTimer = window.setTimeout(() => {
    emailCopied.value = false
    toastMessage.value = ''
  }, 2400)
}

function handleCopyEmail(): void {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PROFILE_DATA.email).then(
      () => {
        showCopiedToast()
      },
      () => {
        fallbackCopy(PROFILE_DATA.email)
      }
    )
    return
  }
  fallbackCopy(PROFILE_DATA.email)
}

function fallbackCopy(text: string): void {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  showCopiedToast()
}

onMounted(() => {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === 'light') {
      applyTheme(false)
      return
    }
  } catch {
    // 默认深色
  }
  applyTheme(true)
})
</script>

<template>
  <div class="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
    <NavBar
      :brand-name="PROFILE_DATA.name"
      :handle="PROFILE_DATA.handle"
      :website-url="PROFILE_DATA.websiteUrl"
      :website-display="PROFILE_DATA.websiteDisplay"
      :nav-item-list="PROFILE_DATA.navItemList"
      :is-dark="isDark"
      @toggle-theme="handleToggleTheme"
    />

    <main>
      <HeroSection
        :profile="PROFILE_DATA"
        :email-copied="emailCopied"
        @copy-email="handleCopyEmail"
      />
      <AboutBento :profile="PROFILE_DATA" />
      <TechMatrix :tech-group-list="PROFILE_DATA.techGroupList" />
      <ProjectsSection
        :project-list="PROFILE_DATA.projectList"
        :enterprise-track-list="PROFILE_DATA.enterpriseTrackList"
        :website-url="PROFILE_DATA.websiteUrl"
      />
      <PrinciplesSection :principle-list="PROFILE_DATA.principleList" />
    </main>

    <FooterSection
      :profile="PROFILE_DATA"
      :email-copied="emailCopied"
      @copy-email="handleCopyEmail"
    />

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="toastMessage"
        role="status"
        class="fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-strong)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] shadow-xl"
      >
        <Check class="h-3.5 w-3.5 text-[var(--accent-emerald)]" />
        <span class="font-mono-tech">{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>
