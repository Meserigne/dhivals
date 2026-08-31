<script setup lang="ts">
const { t } = useI18n()

const BG_SRC = '/assets/contact.jpg'

const typeKeys = ['t1', 't2', 't3', 't4', 't5'] as const

const form = reactive({
  name: '',
  organization: '',
  email: '',
  type: '',
  message: '',
})

const submitted = ref(false)
const sending = ref(false)
const formError = ref('')
const website = ref('')

function resetFeedback() {
  formError.value = ''
}

async function onSubmit() {
  resetFeedback()
  if (sending.value) return
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    formError.value = t('contactSection.errors.required')
    return
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  if (!emailOk) {
    formError.value = t('contactSection.errors.email')
    return
  }

  sending.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        organization: form.organization.trim(),
        email: form.email.trim(),
        type: form.type
          ? t(`contactSection.types.${form.type}`)
          : '',
        message: form.message.trim(),
        website: website.value,
      },
    })
    submitted.value = true
    Object.assign(form, {
      name: '',
      organization: '',
      email: '',
      type: '',
      message: '',
    })
    website.value = ''
  }
  catch {
    formError.value = t('contactSection.errors.send')
  }
  finally {
    sending.value = false
  }
}
</script>

<template>
  <section
    id="contact"
    class="relative scroll-mt-28 overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        :src="BG_SRC"
        alt=""
        class="h-full w-full scale-105 object-cover"
        loading="lazy"
        decoding="async"
      >
      <div
        class="absolute inset-0 bg-dh-teal/80 backdrop-blur-[3px]"
      />
    </div>

    <div
      class="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div
        class="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16"
      >
        <div
          class="rounded-[2rem] border border-white/40 bg-white/95 p-8 shadow-xl backdrop-blur-md sm:p-10"
        >
          <p
            class="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-900"
          >
            <span
              class="h-8 w-1 shrink-0 rounded-full bg-dh-gold"
              aria-hidden="true"
            />
            {{ t('contactSection.eyebrow') }}
          </p>
          <h2
            id="contact-heading"
            class="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            {{ t('contactSection.heading') }}
          </h2>
          <p class="mt-6 text-base leading-relaxed text-slate-800 sm:text-lg">
            {{ t('contactSection.lead') }}
          </p>
        </div>

        <div
          class="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-xl sm:p-10"
        >
          <div
            v-if="submitted"
            class="rounded-xl border border-dh-teal/30 bg-teal-50/80 px-5 py-6 text-center text-slate-800"
            role="status"
            aria-live="polite"
          >
            <p class="text-base font-medium text-dh-teal-dark">
              {{ t('contactSection.thanks') }}
            </p>
            <button
              type="button"
              class="mt-5 text-sm font-semibold text-dh-teal underline decoration-2 underline-offset-4 hover:text-dh-teal-dark"
              @click="submitted = false"
            >
              {{ t('contactSection.sendAnother') }}
            </button>
          </div>

          <form
            v-else
            class="flex flex-col gap-6"
            novalidate
            @submit.prevent="onSubmit"
            @input="resetFeedback"
          >
            <p
              v-if="formError"
              class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {{ formError }}
            </p>

            <div class="hidden" aria-hidden="true">
              <label for="contact-website">Website</label>
              <input
                id="contact-website"
                v-model="website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              >
            </div>

            <div>
              <label
                for="contact-name"
                class="mb-2 block text-sm font-bold text-slate-900"
              >{{ t('contactSection.fields.name') }}</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/25"
                required
              >
            </div>

            <div>
              <label
                for="contact-org"
                class="mb-2 block text-sm font-bold text-slate-900"
              >{{ t('contactSection.fields.organization') }}</label>
              <input
                id="contact-org"
                v-model="form.organization"
                type="text"
                autocomplete="organization"
                class="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/25"
              >
            </div>

            <div>
              <label
                for="contact-email"
                class="mb-2 block text-sm font-bold text-slate-900"
              >{{ t('contactSection.fields.email') }}</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                class="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/25"
                required
              >
            </div>

            <div>
              <label
                for="contact-type"
                class="mb-2 block text-sm font-bold text-slate-900"
              >{{ t('contactSection.fields.type') }}</label>
              <select
                id="contact-type"
                v-model="form.type"
                class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/25"
              >
                <option value="" disabled>
                  {{ t('contactSection.typePlaceholder') }}
                </option>
                <option
                  v-for="key in typeKeys"
                  :key="key"
                  :value="key"
                >
                  {{ t(`contactSection.types.${key}`) }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="contact-message"
                class="mb-2 block text-sm font-bold text-slate-900"
              >{{ t('contactSection.fields.message') }}</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="5"
                class="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-dh-teal focus:ring-2 focus:ring-dh-teal/25"
                :placeholder="t('contactSection.placeholderMessage')"
                required
              />
            </div>

            <button
              type="submit"
              class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70 sm:text-base"
              :disabled="sending"
            >
              <svg
                class="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ sending ? t('contactSection.sending') : t('contactSection.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
