<script setup lang="ts">
const { t, locale } = useI18n()
const config = useRuntimeConfig()
const requestURL = useRequestURL()

const siteUrl = 'https://www.dhivals.com'
const ogImage = `${siteUrl}/assets/hero1.jpg`

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

const pageUrl = computed(() => {
  if (locale.value === 'en') return `${siteUrl}/en`
  return `${siteUrl}/`
})

const pageTitle = computed(() => t('seo.pageTitle'))
const pageDescription = computed(() => t('seo.description'))

useHead(() => {
  const verification = String(config.public.googleSiteVerification || '').trim()
  const meta = [...(i18nHead.value.meta || [])].filter((item) => {
    const name = 'name' in item ? String(item.name || '') : ''
    const property = 'property' in item ? String(item.property || '') : ''
    // Keep hreflang-related locale tags; drop weak default titles from i18n head
    return !(
      name === 'description' ||
      property === 'og:title' ||
      property === 'og:description' ||
      property === 'og:url'
    )
  })
  if (verification) {
    meta.push({
      name: 'google-site-verification',
      content: verification,
    })
  }

  return {
    htmlAttrs: {
      ...i18nHead.value.htmlAttrs,
      lang: locale.value === 'en' ? 'en' : 'fr',
    },
    title: pageTitle.value,
    titleTemplate: '%s',
    link: [
      ...(i18nHead.value.link || []).filter(
        (l) => !('rel' in l && l.rel === 'canonical'),
      ),
      { rel: 'canonical', href: pageUrl.value },
    ],
    meta,
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Dhivals',
          url: siteUrl,
          logo: `${siteUrl}/assets/logo.png`,
          email: 'marianne.ngom@dhivals.com',
          description: pageDescription.value,
          sameAs: ['https://www.linkedin.com/company/dhivals/'],
        }),
      },
    ],
  }
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  ogLocale: () => (locale.value === 'en' ? 'en_US' : 'fr_FR'),
  ogImage,
  ogImageAlt: () => t('seo.ogAlt'),
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImage,
  robots: () =>
    requestURL.hostname.includes('vercel.app') ? 'noindex,follow' : 'index,follow',
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex-1">
      <slot />
    </div>
    <DhivalsSiteFooter />
    <DhivalsBackToTop />
  </div>
</template>
