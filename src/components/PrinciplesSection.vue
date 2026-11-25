<script setup lang="ts">
import type { PrincipleItem } from '@/types/profile'

interface PrinciplesSectionProps {
  principleList: PrincipleItem[]
}

defineProps<PrinciplesSectionProps>()
</script>

<template>
  <section id="principles" class="py-16 sm:py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <div class="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-cyan)]">
          PRINCIPLES · 工程信条
        </div>
        <h2 class="mt-2 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          写代码与做产品的四条朴素原则
        </h2>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2">
        <article
          v-for="item in principleList"
          :key="item.index"
          class="surface-card surface-card-hover rounded-2xl p-6"
        >
          <div class="flex items-baseline justify-between gap-4">
            <span class="font-mono-tech text-2xl font-bold text-[var(--accent-cyan)]">
              {{ item.index }}
            </span>
            <span class="font-mono-tech text-[11px] tracking-[0.18em] text-[var(--text-muted)]">
              {{ item.enTitle }}
            </span>
          </div>
          <h3 class="mt-3 text-lg font-bold text-[var(--text-primary)]">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
