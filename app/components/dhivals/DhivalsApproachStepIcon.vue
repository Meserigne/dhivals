<script setup lang="ts">
defineProps<{
  name: 'ear' | 'strategy' | 'hand' | 'chart'
}>()
</script>

<template>
  <!-- ear -->
  <svg
    v-if="name === 'ear'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.85"
    aria-hidden="true"
  >
    <path
      d="M6 8.5a6.5 6.5 0 0 1 13 0c0 4.5-3 4.5-3 8"
      stroke-linecap="round"
    />
    <path
      d="M9 18a3 3 0 0 0 6 0"
      stroke-linecap="round"
    />
  </svg>
  <!-- strategy: nodes + arrows -->
  <svg
    v-else-if="name === 'strategy'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <circle
      cx="6"
      cy="6"
      r="2.5"
      fill="currentColor"
    />
    <circle
      cx="18"
      cy="6"
      r="2.5"
      fill="currentColor"
    />
    <circle
      cx="12"
      cy="18"
      r="2.5"
      fill="currentColor"
    />
    <path
      d="M8 7.5 10 16M16 7.5 14 16M7 10h10"
      stroke-linecap="round"
    />
  </svg>
  <!-- hand -->
  <svg
    v-else-if="name === 'hand'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"
      stroke-linecap="round"
    />
    <path
      d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"
      stroke-linecap="round"
    />
    <path
      d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"
      stroke-linecap="round"
    />
    <path
      d="M18 8a2 2 0 1 1 4 0v5a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.7l-1.9-2.4c-.43-.57-.33-1.38.23-1.82l.06-.04a1.38 1.38 0 0 1 1.76.17L8 19"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <!-- bar chart -->
  <svg
    v-else
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M4 20h16"
      stroke-linecap="round"
    />
    <rect
      x="6"
      y="12"
      width="3.5"
      height="6"
      rx="0.5"
      fill="currentColor"
    />
    <rect
      x="11.25"
      y="8"
      width="3.5"
      height="10"
      rx="0.5"
      fill="currentColor"
    />
    <rect
      x="16.5"
      y="4"
      width="3.5"
      height="14"
      rx="0.5"
      fill="currentColor"
    />
  </svg>
</template>
