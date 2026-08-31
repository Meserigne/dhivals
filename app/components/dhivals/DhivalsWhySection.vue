<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const WHY_IMAGE_SRC = '/assets/PourquoiDhivals.jpg'

const points = [
  { key: 's1', icon: 'eye' as const, accent: 'teal' as const },
  { key: 's2', icon: 'building' as const, accent: 'teal' as const },
  { key: 's3', icon: 'plus' as const, accent: 'gold' as const },
] as const

function sectionHref(hash: string) {
  return `${localePath({ name: 'index' })}${hash}`
}

/** Glissage depuis la gauche (translation négative → 0) + opacité, décalage entre les blocs */
const whyRevealInView = ref<boolean | null>(null)
const prefersReducedMotion = ref(false)
const whyRevealRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

const contentRevealed = computed(() => {
  if (prefersReducedMotion.value) return true
  if (whyRevealInView.value === false) return false
  return true
})

/** Slots : 0 = en-tête, 1 = visuel + CTA, 2–4 = points (vision, éclairage, etc.) */
function staggerDelay(slot: number): string | undefined {
  if (prefersReducedMotion.value) return undefined
  if (!contentRevealed.value) return '0ms'
  return `${slot * 88}ms`
}

function motionStyle(slot: number) {
  const d = staggerDelay(slot)
  return d ? { transitionDelay: d } : {}
}

onMounted(() => {
  if (!import.meta.client) return

  prefersReducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion.value) {
    whyRevealInView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (e) whyRevealInView.value = e.isIntersecting
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  if (whyRevealRef.value) observer.observe(whyRevealRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section
    id="pourquoi"
    class="scroll-mt-28 overflow-x-hidden bg-white px-6 py-20 text-slate-900 sm:px-10 sm:py-24 lg:px-16"
    aria-labelledby="pourquoi-heading"
  >
    <div
      ref="whyRevealRef"
      class="mx-auto max-w-6xl"
    >
      <header
        class="max-w-4xl transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:duration-0"
        :class="
          contentRevealed
            ? 'translate-x-0 opacity-100'
            : '-translate-x-24 opacity-0 sm:-translate-x-28'
        "
        :style="motionStyle(0)"
      >
        <h2
          id="pourquoi-heading"
          class="flex items-center gap-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]"
        >
          <span
            class="h-12 w-1 shrink-0 rounded-full bg-dh-teal sm:h-14"
            aria-hidden="true"
          />
          {{ t('whyDhivals.title') }}
        </h2>
        <p class="mt-3 text-xl font-semibold text-dh-teal sm:text-2xl">
          {{ t('whyDhivals.tagline') }}
        </p>
        <p class="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
          {{ t('whyDhivals.body') }}
        </p>
      </header>

      <div
        class="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-16"
      >
        <div
          class="flex min-w-0 flex-col transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:duration-0"
          :class="
            contentRevealed
              ? 'translate-x-0 opacity-100'
              : '-translate-x-24 opacity-0 sm:-translate-x-28'
          "
          :style="motionStyle(1)"
        >
          <div
            class="overflow-hidden rounded-[1.75rem] shadow-lg ring-1 ring-slate-200/80 sm:rounded-[2rem]"
          >
            <img
              :src="WHY_IMAGE_SRC"
              :alt="t('whyDhivals.imageAlt')"
              class="aspect-[16/10] h-auto w-full object-cover"
              loading="lazy"
              decoding="async"
              width="960"
              height="600"
            >
          </div>
          <a
            :href="sectionHref('#contact')"
            class="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-dh-teal px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-dh-teal-dark sm:text-base"
          >
            {{ t('whyDhivals.cta') }}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul class="flex flex-col gap-10 sm:gap-12" role="list">
          <li
            v-for="(p, index) in points"
            :key="p.key"
          >
            <div
              class="flex gap-5 transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:duration-0"
              :class="
                contentRevealed
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-24 opacity-0 sm:-translate-x-28'
              "
              :style="motionStyle(2 + index)"
            >
              <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white sm:h-16 sm:w-16"
                :class="
                  p.accent === 'gold' ? 'bg-dh-gold' : 'bg-dh-teal'
                "
                aria-hidden="true"
              >
                <DhivalsWhyPointIcon :name="p.icon" />
              </div>
              <div class="min-w-0 pt-1">
                <p class="text-lg font-bold text-slate-900 sm:text-xl">
                  {{ t(`whyDhivals.items.${p.key}.label`) }}
                </p>
                <p class="mt-1 text-base text-slate-600 sm:text-lg">
                  {{ t(`whyDhivals.items.${p.key}.line`) }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
