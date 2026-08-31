<script setup lang="ts">
const { t } = useI18n()

const itemKeys = ['s1', 's2', 's3', 's4', 's5', 's6'] as const

type ServiceCard = { n: string; title: string; text: string }

const cards = computed<ServiceCard[]>(() =>
  itemKeys.map((key) => ({
    n: t(`services.items.${key}.n`),
    title: t(`services.items.${key}.title`),
    text: t(`services.items.${key}.text`),
  })),
)

/**
 * Animation au scroll, distincte de « Notre histoire » :
 * - Histoire : `translate-y` (vertical) + opacité
 * - Services : `translate-x` (horizontal, depuis la droite) + opacité — pas de translation verticale
 */
const servicesGridInView = ref<boolean | null>(null)
const prefersReducedMotion = ref(false)
const servicesGridRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const cardsRevealed = computed(() => {
  if (prefersReducedMotion.value) return true
  if (servicesGridInView.value === false) return false
  return true
})

function staggerDelay(index: number): string | undefined {
  if (prefersReducedMotion.value) return undefined
  if (!cardsRevealed.value) return '0ms'
  return `${index * 75}ms`
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
    servicesGridInView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (e) servicesGridInView.value = e.isIntersecting
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  if (servicesGridRef.value) observer.observe(servicesGridRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    id="services"
    class="scroll-mt-28 overflow-x-hidden bg-white px-6 py-20 text-slate-900 sm:px-10 sm:py-24 lg:px-16"
    aria-labelledby="services-heading"
  >
    <div class="mx-auto max-w-6xl">
      <div
        class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16"
      >
        <div class="max-w-2xl shrink-0">
          <p
            class="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-900"
          >
            <span
              class="h-7 w-1 shrink-0 rounded-full bg-dh-teal"
              aria-hidden="true"
            />
            {{ t('services.eyebrow') }}
          </p>
          <h2
            id="services-heading"
            class="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
          >
            {{ t('services.headline') }}
          </h2>
        </div>
        <div
          class="max-w-xl shrink-0 rounded-2xl bg-dh-gold px-6 py-5 text-sm leading-relaxed text-slate-900 shadow-sm sm:px-7 sm:py-6 sm:text-base lg:max-w-md"
        >
          {{ t('services.callout') }}
        </div>
      </div>

      <div
        ref="servicesGridRef"
        class="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
      >
        <article
          v-for="(card, index) in cards"
          :key="card.n"
          class="flex flex-col rounded-xl border border-slate-200 border-b-4 border-b-dh-teal bg-white p-8 shadow-sm transition-[opacity,transform] duration-[600ms] ease-out will-change-transform hover:shadow-md motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:duration-0"
          :class="
            cardsRevealed
              ? 'translate-x-0 opacity-100'
              : 'translate-x-12 opacity-0'
          "
          :style="cardMotionStyle(index)"
        >
          <span
            class="text-3xl font-bold tabular-nums text-dh-teal sm:text-4xl"
            aria-hidden="true"
          >{{ card.n }}</span>
          <h3 class="mt-5 text-lg font-bold text-slate-900">
            {{ card.title }}
          </h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {{ card.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
