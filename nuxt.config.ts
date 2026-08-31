import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // Microsoft Graph (OAuth2 app-only) - préféré quand SMTP AUTH est désactivé
    msTenantId: '',
    msClientId: '',
    msClientSecret: '',
    contactEmail: 'marianne.ngom@dhivals.com',
    /** Boîte qui envoie via Graph (souvent la même que contactEmail). */
    mailFromUser: 'marianne.ngom@dhivals.com',
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/icon.png' },
        { rel: 'apple-touch-icon', href: '/assets/icon.png' },
        {
          rel: 'preload',
          as: 'image',
          href: '/assets/hero1.jpg',
          fetchpriority: 'high',
        },
      ],
    },
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'dhivals_i18n',
      redirectOn: 'root',
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
