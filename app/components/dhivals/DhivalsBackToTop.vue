<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const visible = ref(false)
const prefersReducedMotion = ref(false)

function onScroll() {
  visible.value = window.scrollY > 420
}

function goHome() {
  const top = localePath({ name: 'index' })
  if (import.meta.client) {
    window.history.replaceState(null, '', top)
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion.value ? 'auto' : 'smooth',
    })
  }
}

onMounted(() => {
  if (!import.meta.client) return
  prefersReducedMotion.value = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-show="visible"
      type="button"
      class="fixed bottom-6 right-[5.5rem] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg ring-1 ring-black/5 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dh-teal sm:bottom-8 sm:right-[6.5rem]"
      :aria-label="t('nav.backToTop')"
      @click="goHome"
    >
      <svg
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
