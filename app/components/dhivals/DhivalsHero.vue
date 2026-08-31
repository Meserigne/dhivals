<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { preloadImages } = usePreloadImages()

const HERO_IMAGES = ['/assets/hero1.jpg', '/assets/hero2.jpg'] as const
const LOGO_SRC = '/assets/logo.png'
/** Première slide + logo avant d’enlever le voile ; slide 2 en arrière-plan */
const CRITICAL_PRELOAD = [HERO_IMAGES[0], LOGO_SRC] as const

const surfaceReady = ref(false)
const removeLoader = ref(false)

const activeSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined

const prefersReducedMotion = ref(false)

function sectionHref(hash: string) {
  return `${localePath({ name: 'index' })}${hash}`
}

onMounted(async () => {
  if (!import.meta.client) return

  prefersReducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  try {
    await preloadImages([...CRITICAL_PRELOAD])
  } catch (e) {
    console.error(e)
  }

  preloadImages([HERO_IMAGES[1]]).catch((e) => console.error(e))

  await nextTick()
  requestAnimationFrame(() => {
    surfaceReady.value = true
  })

  window.setTimeout(() => {
    removeLoader.value = true
  }, 620)

  if (prefersReducedMotion.value) return

  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % HERO_IMAGES.length
  }, 7500)
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-950 text-white">
    <!-- Voile blanc semi-transparent sur tout le site + indicateur au-dessus -->
    <div
      v-if="!removeLoader"
      class="pointer-events-auto fixed inset-0 z-[200] flex items-center justify-center transition-opacity duration-500 ease-out motion-reduce:transition-none"
      :class="
        surfaceReady
          ? 'pointer-events-none opacity-0'
          : 'opacity-100'
      "
      aria-live="polite"
      :aria-busy="!surfaceReady"
    >
      <div
        class="absolute inset-0 bg-white/65 backdrop-blur-[2px] motion-reduce:backdrop-blur-none"
        aria-hidden="true"
      />
      <div
        class="relative flex flex-col items-center gap-5 rounded-2xl bg-white/90 px-10 py-8 shadow-lg ring-1 ring-slate-200/80"
        role="status"
      >
        <div
          class="h-11 w-11 rounded-full border-2 border-slate-200 border-t-dh-teal motion-reduce:animate-none"
          :class="prefersReducedMotion ? '' : 'animate-spin'"
          aria-hidden="true"
        />
        <p class="text-sm font-semibold tracking-wide text-slate-700">
          {{ t('hero.loading') }}
        </p>
      </div>
    </div>

    <!-- Contenu visible sous le voile (images en cours de chargement) -->
    <div class="relative min-h-screen">
      <!-- Slider fond -->
      <div class="absolute inset-0 z-0" aria-hidden="true">
        <div
          v-for="(src, i) in HERO_IMAGES"
          :key="src"
          class="absolute inset-0 bg-slate-900 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none"
          :class="activeSlide === i ? 'opacity-100' : 'opacity-0'"
        >
          <img
            :src="src"
            alt=""
            class="h-full w-full object-cover"
            :fetchpriority="i === 0 ? 'high' : 'low'"
            :loading="i === 0 ? 'eager' : 'lazy'"
            decoding="async"
            width="1920"
            height="1280"
          >
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
        />
      </div>

      <DhivalsSiteNav>
        <template #logo>
          <img
            :src="LOGO_SRC"
            alt="Dhivals"
            width="120"
            height="30"
            class="h-7 w-auto sm:h-8"
            decoding="async"
          >
        </template>
      </DhivalsSiteNav>

      <!-- Hero copy -->
      <main
        class="relative z-10 mx-auto flex max-w-6xl flex-col justify-end px-6 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-28 lg:min-h-[calc(100vh-7rem)] lg:pb-24 lg:pt-32"
      >
        <div class="max-w-2xl text-left">
          <p
            class="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-white/90"
          >
            <span
              class="h-8 w-1 shrink-0 rounded-full bg-dh-gold shadow-[0_0_20px_rgba(229,184,74,0.45)]"
              aria-hidden="true"
            />
            <span>{{ t('hero.eyebrow') }}</span>
          </p>

          <h1
            class="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {{ t('hero.titleBefore') }}<span class="text-dh-gold">{{
              t('hero.titleHighlight')
            }}</span>{{ t('hero.titleAfter') }}
          </h1>

          <p class="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
            {{ t('hero.lead') }}
          </p>

          <div class="mt-10 flex flex-wrap items-center gap-4">
            <a
              :href="sectionHref('#services')"
              class="inline-flex items-center gap-2 rounded-full bg-dh-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/30 transition hover:bg-dh-teal-dark"
            >
              {{ t('hero.ctaServices') }}
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <a
              :href="sectionHref('#contact')"
              class="inline-flex items-center gap-2 rounded-full bg-dh-gold px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-900/20 transition hover:bg-dh-gold-deep"
            >
              {{ t('hero.ctaContact') }}
              <svg
                class="h-4 w-4 text-slate-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <p
          class="relative z-10 mt-16 max-w-6xl text-sm font-medium tracking-wide text-white/70 sm:mt-24"
        >
          {{ t('hero.footerTagline') }}
        </p>
      </main>
    </div>
  </div>
</template>
