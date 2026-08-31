<script setup lang="ts">
const { t } = useI18n()

const cards = [
  { key: 'impact', icon: 'leaf' as const, accent: 'teal' as const },
  { key: 'integrity', icon: 'hand' as const, accent: 'teal' as const },
  { key: 'excellence', icon: 'check' as const, accent: 'teal' as const },
  { key: 'innovation', icon: 'bulb' as const, accent: 'gold' as const },
  { key: 'commitment', icon: 'doc' as const, accent: 'gold' as const },
  { key: 'transmission', icon: 'users' as const, accent: 'gold' as const },
] as const

/** null = pas encore mesuré (SSR / premier frame) → cartes visibles */
const valuesGridInView = ref<boolean | null>(null)
const prefersReducedMotion = ref(false)
const valuesGridRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const cardsRevealed = computed(() => {
  if (prefersReducedMotion.value) return true
  if (valuesGridInView.value === false) return false
  return true
})

function staggerDelay(index: number): string | undefined {
  if (prefersReducedMotion.value) return undefined
  if (!cardsRevealed.value) return '0ms'
  return `${index * 85}ms`
}

function cardMotionStyle(index: number) {
  const d = staggerDelay(index)
  return d ? { transitionDelay: d } : {}
}

onMounted(() => {
  if (!import.meta.client) return

  prefersReducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion.value) {
    valuesGridInView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (e) valuesGridInView.value = e.isIntersecting
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  if (valuesGridRef.value) observer.observe(valuesGridRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    id="histoire"
    class="scroll-mt-28 bg-black px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16"
    aria-labelledby="histoire-title"
  >
    <div class="mx-auto max-w-6xl">
      <header class="max-w-3xl">
        <h2
          id="histoire-title"
          class="flex items-center gap-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          <span
            class="h-12 w-1 shrink-0 rounded-full bg-dh-teal sm:h-14"
            aria-hidden="true"
          />
          {{ t('story.title') }}
        </h2>
        <p class="mt-4 text-lg text-white sm:text-xl">
          {{ t('story.subtitle') }}
        </p>
        <p class="mt-8 text-base leading-relaxed text-slate-400 sm:text-lg">
          {{ t('story.body') }}
        </p>
        <blockquote
          class="mt-10 border-l-4 border-dh-gold pl-6 text-lg font-medium leading-relaxed text-white sm:text-xl"
        >
          {{ t('story.quote') }}
        </blockquote>
      </header>

      <div
        ref="valuesGridRef"
        class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        <article
          v-for="(card, index) in cards"
          :key="card.key"
          class="flex items-start gap-4 rounded-full border border-white/10 bg-white px-5 py-4 text-slate-900 shadow-sm transition-[opacity,transform] duration-[580ms] ease-out will-change-[opacity,transform] sm:px-6 sm:py-5 motion-reduce:duration-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          :class="
            cardsRevealed
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          "
          :style="cardMotionStyle(index)"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
            :class="
              card.accent === 'teal'
                ? 'bg-dh-teal'
                : 'bg-dh-gold text-slate-900'
            "
          >
            <DhivalsStoryIcon :name="card.icon" />
          </div>
          <div class="min-w-0 pt-0.5">
            <h3 class="text-base font-semibold text-slate-900">
              {{ t(`story.values.${card.key}.title`) }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-slate-600">
              {{ t(`story.values.${card.key}.text`) }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
