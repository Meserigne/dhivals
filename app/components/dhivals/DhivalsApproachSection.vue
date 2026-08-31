<script setup lang="ts">
const { t } = useI18n()

const APPROACH_IMAGE_SRC = '/assets/NotreApproche.jpg'

const steps = [
  { key: 's1', icon: 'ear' as const },
  { key: 's2', icon: 'strategy' as const },
  { key: 's3', icon: 'hand' as const },
  { key: 's4', icon: 'chart' as const },
] as const

/** Blocs qui glissent vers le haut ; entrées décalées une par une (pas de chevauchement). */
const stepsListInView = ref<boolean | null>(null)
const prefersReducedMotion = ref(false)
const stepsListRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const cardsRevealed = computed(() => {
  if (prefersReducedMotion.value) return true
  if (stepsListInView.value === false) return false
  return true
})

function staggerDelay(index: number): string | undefined {
  if (prefersReducedMotion.value) return undefined
  if (!cardsRevealed.value) return '0ms'
  /* Délai entre chaque carte ≥ durée de transition pour un effet « un à un » */
  return `${index * 620}ms`
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
    stepsListInView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (e) stepsListInView.value = e.isIntersecting
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  if (stepsListRef.value) observer.observe(stepsListRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    id="approche"
    class="scroll-mt-28 bg-dh-teal px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16"
    aria-labelledby="approche-heading"
  >
    <div
      class="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20"
    >
      <div class="flex flex-col">
        <h2
          id="approche-heading"
          class="flex items-center gap-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]"
        >
          <span
            class="h-12 w-1 shrink-0 rounded-full bg-dh-gold sm:h-14"
            aria-hidden="true"
          />
          {{ t('approach.title') }}
        </h2>
        <p class="mt-4 text-lg font-semibold text-white/95 sm:text-xl">
          {{ t('approach.subtitle') }}
        </p>

        <div
          class="relative mx-auto mt-10 w-full max-w-[min(100%,20rem)] shrink-0 sm:max-w-xs lg:mx-0 lg:mt-12"
        >
          <div class="aspect-square w-full overflow-hidden rounded-full shadow-lg ring-4 ring-white/20">
            <img
              :src="APPROACH_IMAGE_SRC"
              :alt="t('approach.title')"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="400"
              height="400"
            >
          </div>
        </div>

        <p
          class="mt-10 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg lg:mt-12"
        >
          {{ t('approach.summary') }}
        </p>
      </div>

      <ul
        ref="stepsListRef"
        class="flex flex-col gap-4 sm:gap-5"
        role="list"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.key"
        >
          <article
            class="flex items-start gap-4 rounded-full bg-white px-5 py-4 text-slate-900 shadow-md transition-[opacity,transform] duration-[600ms] ease-out will-change-transform sm:gap-5 sm:px-7 sm:py-5 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:duration-0"
            :class="
              cardsRevealed
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            "
            :style="cardMotionStyle(index)"
          >
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dh-gold text-slate-900 sm:h-14 sm:w-14"
              aria-hidden="true"
            >
              <DhivalsApproachStepIcon :name="step.icon" />
            </div>
            <div class="min-w-0 pt-0.5">
              <h3 class="text-base font-bold text-slate-900 sm:text-lg">
                {{ t(`approach.items.${step.key}.title`) }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                {{ t(`approach.items.${step.key}.text`) }}
              </p>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
