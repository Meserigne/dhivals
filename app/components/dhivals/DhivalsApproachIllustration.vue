<script setup lang="ts">
const gid = useId().replace(/:/g, '')
</script>

<template>
  <svg
    class="h-full w-full"
    viewBox="0 0 320 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        :id="`ap-bg-${gid}`"
        x1="40"
        y1="40"
        x2="280"
        y2="280"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#ccfbf1" />
        <stop offset="1" stop-color="#99f6e4" />
      </linearGradient>
    </defs>
    <circle
      cx="160"
      cy="160"
      r="150"
      :fill="`url(#ap-bg-${gid})`"
      stroke="#0d9488"
      stroke-width="3"
    />
    <!-- device -->
    <rect
      x="175"
      y="72"
      width="88"
      height="168"
      rx="12"
      fill="#1e293b"
    />
    <rect
      x="183"
      y="84"
      width="72"
      height="120"
      rx="6"
      fill="#f8fafc"
    />
    <!-- mini charts on screen -->
    <rect
      x="192"
      y="96"
      width="20"
      height="20"
      rx="2"
      fill="#e5b84a"
    />
    <path
      d="M218 118h36M218 126h28M218 134h32"
      stroke="#cbd5e1"
      stroke-width="3"
      stroke-linecap="round"
    />
    <rect
      x="192"
      y="148"
      width="8"
      height="28"
      rx="1"
      fill="#0d9488"
    />
    <rect
      x="204"
      y="156"
      width="8"
      height="20"
      rx="1"
      fill="#0d9488"
      opacity="0.7"
    />
    <rect
      x="216"
      y="140"
      width="8"
      height="36"
      rx="1"
      fill="#0d9488"
      opacity="0.5"
    />
    <circle
      cx="219"
      cy="200"
      r="14"
      fill="none"
      stroke="#e5b84a"
      stroke-width="3"
    />
    <!-- person -->
    <ellipse
      cx="118"
      cy="210"
      rx="42"
      ry="14"
      fill="#0f172a"
      opacity="0.12"
    />
    <path
      d="M118 88c-18 0-32 14-32 32v6c0 8 6 14 14 14h36c8 0 14-6 14-14v-6c0-18-14-32-32-32Z"
      fill="#422006"
    />
    <circle
      cx="118"
      cy="78"
      r="26"
      fill="#57534e"
    />
    <path
      d="M92 104c-8 12-12 28-12 48v68c0 10 8 18 18 18h40c10 0 18-8 18-18v-68c0-20-4-36-12-48"
      fill="#0d9488"
    />
    <path
      d="M86 178c-10 4-16 14-16 26v36c0 6 5 11 11 11h74c6 0 11-5 11-11v-36c0-12-6-22-16-26"
      fill="#334155"
    />
    <path
      d="M154 138h28c6 0 10 5 10 11v24"
      stroke="#334155"
      stroke-width="10"
      stroke-linecap="round"
    />
  </svg>
</template>
