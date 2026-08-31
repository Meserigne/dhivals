<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const navItems = [
  { hash: '#histoire', labelKey: 'nav.story' },
  { hash: '#services', labelKey: 'nav.services' },
  { hash: '#approche', labelKey: 'nav.approach' },
  { hash: '#pourquoi', labelKey: 'nav.why' },
  { hash: '#contact', labelKey: 'nav.contact' },
] as const

function sectionHref(hash: string) {
  return `${localePath({ name: 'index' })}${hash}`
}

function localeSwitchHref(code: string) {
  const base = switchLocalePath(code as 'fr' | 'en') ?? '/'
  const h = route.hash || ''
  return `${base}${h}`
}

const activeHash = computed(() => route.hash)
</script>

<template>
  <header class="relative z-20 px-4 pt-5 sm:px-6 lg:px-10">
    <nav
      class="mx-auto flex max-w-6xl flex-col gap-4 rounded-full bg-white px-4 py-3 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3.5 lg:px-8"
      :aria-label="t('nav.aria')"
    >
      <div class="flex items-center justify-between gap-4 sm:justify-start">
        <NuxtLink
          :to="localePath({ name: 'index' })"
          class="flex shrink-0 items-center gap-2"
        >
          <slot name="logo" />
        </NuxtLink>
        <div class="flex items-center gap-2 sm:hidden">
          <div class="flex items-center rounded-full border border-slate-200 p-0.5 text-xs font-semibold text-slate-600">
            <NuxtLink
              v-for="loc in locales as { code: string }[]"
              :key="loc.code"
              :to="localeSwitchHref(loc.code)"
              class="rounded-full px-2.5 py-1.5 transition"
              :class="
                locale === loc.code
                  ? 'bg-slate-900 text-white'
                  : 'hover:text-dh-teal'
              "
            >
              {{ loc.code.toUpperCase() }}
            </NuxtLink>
          </div>
          <a
            :href="sectionHref('#contact')"
            class="rounded-full bg-dh-teal px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-dh-teal-dark"
          >
            {{ t('nav.ctaWork') }}
          </a>
        </div>
      </div>

      <ul
        class="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-slate-600 xl:flex"
      >
        <li v-for="item in navItems" :key="item.hash">
          <a
            :href="sectionHref(item.hash)"
            class="transition hover:text-dh-teal"
            :class="activeHash === item.hash ? 'text-dh-teal' : ''"
          >{{ t(item.labelKey) }}</a>
        </li>
      </ul>

      <div class="hidden items-center gap-3 sm:flex">
        <div
          class="flex items-center rounded-full border border-slate-200 p-0.5 text-xs font-semibold text-slate-600"
          role="group"
          :aria-label="t('nav.switchLang')"
        >
          <NuxtLink
            v-for="loc in locales as { code: string }[]"
            :key="loc.code"
            :to="localeSwitchHref(loc.code)"
            class="rounded-full px-2.5 py-1.5 transition"
            :class="
              locale === loc.code
                ? 'bg-slate-900 text-white'
                : 'hover:text-dh-teal'
            "
          >
            {{ loc.code.toUpperCase() }}
          </NuxtLink>
        </div>
        <a
          :href="sectionHref('#contact')"
          class="rounded-full bg-dh-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-dh-teal-dark"
        >
          {{ t('nav.ctaWork') }}
        </a>
      </div>
    </nav>
  </header>
</template>
