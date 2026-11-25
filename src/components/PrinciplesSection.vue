<script setup lang="ts">
import type { PrincipleItem } from '@/types/profile'

interface PrinciplesSectionProps {
  principleList: PrincipleItem[]
}

defineProps<PrinciplesSectionProps>()
</script>

<template>
  <section id="principles" class="border-t border-[var(--mac-border-soft)] py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 sm:px-10">
      <div class="max-w-2xl">
        <p class="text-[13px] font-medium text-[var(--mac-blue)]">工程信条</p>
        <h2 class="mt-2.5 text-3xl font-bold tracking-tight text-[var(--mac-text)] sm:text-4xl">
          写代码与做产品的四条朴素原则。
        </h2>
      </div>

      <!-- 大留白开放式 2×2 排版，给页面充分呼吸感 -->
      <div class="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
        <article v-for="item in principleList" :key="item.index">
          <span class="font-mono-mac text-[13px] font-medium text-[var(--mac-text-tertiary)]">
            {{ item.index }}
          </span>
          <h3 class="mt-3 text-[19px] font-semibold tracking-tight text-[var(--mac-text)]">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-[15px] leading-[1.85] text-[var(--mac-text-secondary)]">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
