<script setup lang="ts">
import type { TechGroupItem } from '@/types/profile'

interface TechMatrixProps {
  techGroupList: TechGroupItem[]
}

defineProps<TechMatrixProps>()
</script>

<template>
  <section id="stack" class="border-t border-[var(--mac-border-soft)] py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 sm:px-10">
      <div class="max-w-2xl">
        <p class="text-[13px] font-medium text-[var(--mac-blue)]">技术版图</p>
        <h2 class="mt-2.5 text-3xl font-bold tracking-tight text-[var(--mac-text)] sm:text-4xl">
          主力栈稳如磐石，遇到边界随时跨端穿透。
        </h2>
      </div>

      <!-- 仿 macOS 系统设置分组列表：干干净净，一眼扫清 -->
      <div class="mac-card mt-14 divide-y divide-[var(--mac-border-soft)] rounded-2xl px-7 sm:px-10">
        <div
          v-for="group in techGroupList"
          :key="group.id"
          class="grid gap-4 py-8 sm:grid-cols-12 sm:items-start sm:gap-8"
        >
          <div class="sm:col-span-4">
            <h3 class="text-[16px] font-semibold text-[var(--mac-text)]">
              {{ group.title }}
            </h3>
            <p class="mt-1.5 text-[13px] leading-relaxed text-[var(--mac-text-tertiary)]">
              {{ group.subtitle }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2.5 sm:col-span-8">
            <span
              v-for="skill in group.skillList"
              :key="skill.name"
              class="rounded-full px-3.5 py-1.5 text-[13px]"
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
  </section>
</template>
