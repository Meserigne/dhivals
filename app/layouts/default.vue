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

useHead(() => {
  const verification = String(config.public.googleSiteVerification || '').trim()
  const meta = [...(i18nHead.value.meta || [])]
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
    title: t('seo.title'),
    link: [
      ...(i18nHead.value.link || []),
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
          description: t('seo.description'),
        }),
      },
    ],
  }
})

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogUrl: pageUrl,
  ogLocale: () => (locale.value === 'en' ? 'en_US' : 'fr_FR'),
  ogImage,
  ogImageAlt: () => t('seo.ogAlt'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: ogImage,
  // Avoid leaking preview host in social cards
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
  </div>
</template>
