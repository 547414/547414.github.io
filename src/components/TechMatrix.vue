<script setup lang="ts">
import type { TechGroupItem } from '@/types/profile'

interface TechMatrixProps {
  techGroupList: TechGroupItem[]
}

defineProps<TechMatrixProps>()
</script>

<template>
  <section id="stack" class="py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div class="max-w-2xl">
          <div class="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
            TECH MATRIX · 技术版图
          </div>
          <h2 class="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            主力栈稳如磐石，遇到边界随时跨端穿透
          </h2>
        </div>
        <div class="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span class="inline-flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
            高频主力
          </span>
          <span class="inline-flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-[var(--border-strong)]" />
            实战拓展
          </span>
        </div>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article
          v-for="group in techGroupList"
          :key="group.id"
          class="surface-card surface-card-hover rounded-2xl p-6"
        >
          <div class="font-mono-tech text-[11px] font-semibold tracking-[0.2em] text-[var(--accent-cyan)]">
            {{ group.badge }}
          </div>
          <h3 class="mt-2 text-lg font-bold text-[var(--text-primary)]">
            {{ group.title }}
          </h3>
          <p class="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            {{ group.subtitle }}
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="skill in group.skillList"
              :key="skill.name"
              class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono-tech text-xs transition-colors"
              :class="
                skill.core
                  ? 'border-[var(--border-strong)] bg-[var(--accent-cyan-soft)] font-medium text-[var(--accent-cyan)]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
              "
            >
              <span
                v-if="skill.core"
                class="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]"
              />
              {{ skill.name }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
