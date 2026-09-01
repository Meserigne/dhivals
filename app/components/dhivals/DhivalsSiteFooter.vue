<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const LOGO_SRC = '/assets/logo.png'

/** Renseigner les URLs réelles des réseaux sociaux. */
const SOCIAL = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
  linkedin: 'https://www.linkedin.com/company/dhivals/',
} as const

function homeHash(hash: string) {
  return `${localePath({ name: 'index' })}${hash}`
}

const enterpriseLinks = [
  { hash: '#histoire', labelKey: 'footer.links.story' },
  { hash: '#services', labelKey: 'footer.links.services' },
  { hash: '#approche', labelKey: 'footer.links.approach' },
  { hash: '#pourquoi', labelKey: 'footer.links.why' },
] as const

const settingsLinks = [
  { hash: '#mentions-legales', labelKey: 'footer.links.terms' },
  { hash: '#confidentialite', labelKey: 'footer.links.privacy' },
  { hash: '#cookies', labelKey: 'footer.links.cookies' },
] as const

const exploreLinks = [
  { hash: '#ressources', labelKey: 'footer.links.resources' },
  { hash: '#blog', labelKey: 'footer.links.blog' },
  { hash: '#documents', labelKey: 'footer.links.documents' },
] as const

const socials = [
  { key: 'facebook', href: SOCIAL.facebook, labelKey: 'footer.social.facebook' },
  { key: 'twitter', href: SOCIAL.twitter, labelKey: 'footer.social.twitter' },
  { key: 'instagram', href: SOCIAL.instagram, labelKey: 'footer.social.instagram' },
  { key: 'linkedin', href: SOCIAL.linkedin, labelKey: 'footer.social.linkedin' },
] as const
</script>

<template>
  <footer
    class="border-b-[12px] border-dh-teal bg-white text-slate-700"
    :aria-label="t('footer.aria')"
  >
    <div
      class="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:px-12 lg:py-14"
    >
      <div
        class="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16"
      >
        <NuxtLink
          :to="localePath({ name: 'index' })"
          class="inline-flex shrink-0 self-start transition-opacity hover:opacity-90"
        >
          <img
            :src="LOGO_SRC"
            alt="Dhivals"
            width="140"
            height="36"
            class="h-9 w-auto sm:h-10"
            loading="lazy"
            decoding="async"
          >
        </NuxtLink>

        <div
          class="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:max-w-2xl xl:max-w-3xl"
        >
          <div>
            <h3 class="text-sm font-bold text-slate-900">
              {{ t('footer.columns.company') }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm" role="list">
              <li v-for="item in enterpriseLinks" :key="item.hash">
                <a
                  :href="homeHash(item.hash)"
                  class="text-slate-600 transition hover:text-dh-teal"
                >{{ t(item.labelKey) }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">
              {{ t('footer.columns.settings') }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm" role="list">
              <li v-for="item in settingsLinks" :key="item.hash">
                <a
                  :href="homeHash(item.hash)"
                  class="text-slate-600 transition hover:text-dh-teal"
                >{{ t(item.labelKey) }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">
              {{ t('footer.columns.explore') }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm" role="list">
              <li v-for="item in exploreLinks" :key="item.hash">
                <a
                  :href="homeHash(item.hash)"
                  class="text-slate-600 transition hover:text-dh-teal"
                >{{ t(item.labelKey) }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="w-full shrink-0 lg:max-w-xs">
          <div class="relative">
            <span
              class="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path
                  d="m20 20-3.2-3.2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <input
              type="search"
              name="footer-search"
              class="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/20"
              :placeholder="t('footer.searchPlaceholder')"
              :aria-label="t('footer.searchAria')"
              autocomplete="off"
            >
          </div>
          <ul
            class="mt-5 flex items-center gap-4 text-slate-800"
            role="list"
          >
            <li v-for="s in socials" :key="s.key">
              <a
                :href="s.href"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition hover:border-dh-teal hover:text-dh-teal"
                :target="s.href.startsWith('http') ? '_blank' : undefined"
                :rel="s.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                :aria-label="t(s.labelKey)"
              >
                <span class="sr-only">{{ t(s.labelKey) }}</span>
                <!-- facebook -->
                <svg
                  v-if="s.key === 'facebook'"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M14 13.5h2.5l1-4H14v-1.5c0-1 .3-1.9 1.9-1.9H17V3.1c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8V9.5H7v4h2.5V21h4V13.5Z"
                  />
                </svg>
                <!-- twitter / X -->
                <svg
                  v-else-if="s.key === 'twitter'"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
                <!-- instagram -->
                <svg
                  v-else-if="s.key === 'instagram'"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                <!-- linkedin -->
                <svg
                  v-else
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M6.5 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4.5 20.5h4V10h-4v10.5ZM11 10h3.8v1.4h.1c.5-1 1.8-2.4 3.7-2.4 3.9 0 4.6 2.6 4.6 5.9V20.5h-4v-5.2c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7v5.3h-4V10Z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
