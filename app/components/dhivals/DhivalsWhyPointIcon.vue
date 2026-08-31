<script setup lang="ts">
defineProps<{
  name: 'eye' | 'building' | 'plus'
}>()
</script>

<template>
  <svg
    v-if="name === 'eye'"
    class="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
    />
  </svg>
  <svg
    v-else-if="name === 'building'"
    class="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 12h4v10M14 16h4M10 12v4M10 8h4"
      stroke-linecap="round"
    />
  </svg>
  <svg
    v-else
    class="h-7 w-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.25"
    aria-hidden="true"
  >
    <path
      d="M12 5v14M5 12h14"
      stroke-linecap="round"
    />
  </svg>
</template>
