<script setup lang="ts">
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
}))
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex-1">
      <slot />
    </div>
    <DhivalsSiteFooter />
  </div>
</template>
