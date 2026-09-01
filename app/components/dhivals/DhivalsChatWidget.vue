<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const open = ref(false)
const input = ref('')
const panelRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

const { messages, sendMessage, status, error, clearError } = useChat({
  api: '/api/chat',
})

const busy = computed(
  () => status.value === 'generating' || status.value === 'streaming',
)

const suggestions = computed(() => [
  t('chat.suggestions.s1'),
  t('chat.suggestions.s2'),
  t('chat.suggestions.s3'),
])

function messageText(message: { parts?: Array<{ type: string; text?: string }> }) {
  return (message.parts || [])
    .filter((p) => p.type === 'text' && p.text)
    .map((p) => p.text)
    .join('')
}

async function submit() {
  const text = input.value.trim()
  if (!text || busy.value) return
  clearError()
  input.value = ''
  await sendMessage({ text })
  await nextTick()
  scrollToBottom()
}

function askSuggestion(text: string) {
  input.value = text
  void submit()
}

function scrollToBottom() {
  const el = listRef.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

function toggle() {
  open.value = !open.value
  if (open.value) {
    nextTick(() => {
      panelRef.value?.querySelector('textarea')?.focus()
      scrollToBottom()
    })
  }
}

function goContact() {
  open.value = false
  if (import.meta.client) {
    window.location.href = `${localePath({ name: 'index' })}#contact`
  }
}

watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    scrollToBottom()
  },
)

watch(status, async (s) => {
  if (s === 'streaming' || s === 'ready') {
    await nextTick()
    scrollToBottom()
  }
})
</script>

<template>
  <div class="fixed bottom-6 right-4 z-[60] sm:bottom-8 sm:right-8">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-3 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100 scale-100"
      leave-to-class="translate-y-3 opacity-0 scale-95"
    >
      <div
        v-if="open"
        ref="panelRef"
        class="mb-3 flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        role="dialog"
        :aria-label="t('chat.title')"
      >
        <header class="flex items-start justify-between gap-3 bg-dh-teal px-4 py-3 text-white">
          <div>
            <p class="text-sm font-semibold">{{ t('chat.title') }}</p>
            <p class="mt-0.5 text-xs text-white/85">{{ t('chat.subtitle') }}</p>
          </div>
          <button
            type="button"
            class="rounded-full p-1 text-white/90 transition hover:bg-white/15"
            :aria-label="t('chat.close')"
            @click="open = false"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </header>

        <div
          ref="listRef"
          class="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm text-slate-700"
        >
          <div class="rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-slate-700">
            {{ t('chat.welcome') }}
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="s in suggestions"
              :key="s"
              type="button"
              class="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-dh-teal hover:text-dh-teal"
              :disabled="busy"
              @click="askSuggestion(s)"
            >
              {{ s }}
            </button>
          </div>

          <div
            v-for="(m, index) in messages"
            :key="m.id || index"
            class="flex"
            :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2"
              :class="
                m.role === 'user'
                  ? 'rounded-tr-md bg-dh-teal text-white'
                  : 'rounded-tl-md bg-slate-100 text-slate-700'
              "
            >
              {{ messageText(m) }}
            </div>
          </div>

          <p v-if="busy" class="text-xs text-slate-500">{{ t('chat.thinking') }}</p>
          <p v-if="error" class="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
            {{ t('chat.error') }}
          </p>
        </div>

        <div class="border-t border-slate-100 px-3 py-2">
          <button
            type="button"
            class="mb-2 w-full rounded-lg border border-dh-teal/30 bg-dh-teal/5 px-3 py-2 text-xs font-semibold text-dh-teal transition hover:bg-dh-teal/10"
            @click="goContact"
          >
            {{ t('chat.ctaContact') }}
          </button>
          <form class="flex items-end gap-2" @submit.prevent="submit">
            <label class="sr-only" :for="`chat-input-${locale}`">{{ t('chat.placeholder') }}</label>
            <textarea
              :id="`chat-input-${locale}`"
              v-model="input"
              rows="2"
              class="min-h-[2.75rem] flex-1 resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none ring-dh-teal/30 placeholder:text-slate-400 focus:ring-2"
              :placeholder="t('chat.placeholder')"
              :disabled="busy"
              @keydown.enter.exact.prevent="submit"
            />
            <button
              type="submit"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dh-teal text-white transition hover:bg-dh-teal-dark disabled:opacity-50"
              :disabled="busy || !input.trim()"
              :aria-label="t('chat.send')"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.4 20.6 21 12 3.4 3.4l-.1 7.2L15 12l-11.7 1.4.1 7.2Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <button
      type="button"
      class="flex h-14 w-14 items-center justify-center rounded-full bg-dh-teal text-white shadow-lg ring-1 ring-black/5 transition hover:bg-dh-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dh-teal"
      :aria-label="open ? t('chat.close') : t('chat.open')"
      :aria-expanded="open"
      @click="toggle"
    >
      <svg
        v-if="!open"
        class="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path
          d="M4 12a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v5a3 3 0 0 1-3 3h-5a8 8 0 0 1-8-8Z"
          stroke-linejoin="round"
        />
        <path d="M9 11h.01M12 11h.01M15 11h.01" stroke-linecap="round" />
      </svg>
      <svg
        v-else
        class="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
