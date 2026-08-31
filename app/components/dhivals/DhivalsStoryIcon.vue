<script setup lang="ts">
defineProps<{
  name: 'leaf' | 'hand' | 'check' | 'bulb' | 'doc' | 'users'
}>()
</script>

<template>
  <!-- leaf -->
  <svg
    v-if="name === 'leaf'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 8.8-1 7-6.5 10-10 11Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 6c0 2-1.5 3.5-4 5.5"
      stroke-linecap="round"
    />
  </svg>
  <!-- hand / integrity -->
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
  <!-- check -->
  <svg
    v-else-if="name === 'check'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M20 6 9 17l-5-5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <!-- bulb -->
  <svg
    v-else-if="name === 'bulb'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 18h6"
      stroke-linecap="round"
    />
    <path
      d="M10 22h4"
      stroke-linecap="round"
    />
  </svg>
  <!-- doc -->
  <svg
    v-else-if="name === 'doc'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 2v6h6M8 13h8M8 17h6"
      stroke-linecap="round"
    />
  </svg>
  <!-- users -->
  <svg
    v-else-if="name === 'users'"
    class="h-6 w-6"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <path
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      stroke-linecap="round"
    />
    <circle
      cx="9"
      cy="7"
      r="4"
    />
    <path
      d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      stroke-linecap="round"
    />
  </svg>
</template>
