<template>
  <div class="min-h-screen flex items-center justify-center px-4"
    style="background:#F8FAFC; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Card -->
    <div class="w-full max-w-sm">

      <!-- Logo -->
      <div class="flex flex-col items-center mb-8">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style="background:#14A34A;">
          <svg class="w-6 h-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h1 class="text-xl font-bold tracking-tight" style="color:#0F172A;">
          recar<span style="color:#14A34A;">marketplace</span>
        </h1>
        <p class="text-sm mt-1" style="color:#94A3B8;">Privati demonstracinė versija</p>
      </div>

      <!-- Form card -->
      <div class="rounded-2xl p-8 shadow-sm" style="background:#fff; border:1px solid #E2E8F0;">
        <h2 class="text-base font-bold mb-1" style="color:#0F172A;">Įveskite slaptažodį</h2>
        <p class="text-sm mb-6" style="color:#64748B;">Ši aplinka yra prieinama tik kviestiniams nariams.</p>

        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Slaptažodis</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Įveskite slaptažodį..."
                autofocus
                class="w-full px-4 py-3 text-sm rounded-xl focus:outline-none transition-all"
                :style="`background:#F8FAFC; border:1px solid ${error ? '#FCA5A5' : '#E2E8F0'}; color:#0F172A; font-family:inherit;`"
                @input="error = ''"
              >
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-opacity hover:opacity-70"
                style="color:#94A3B8;">
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
            <p v-if="error" class="text-xs mt-1.5" style="color:#EF4444;">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all"
            :style="loading
              ? 'background:#F1F5F9; color:#94A3B8; cursor:not-allowed;'
              : 'background:#14A34A; color:#fff;'">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Tikrinama...
            </span>
            <span v-else>Prisijungti →</span>
          </button>
        </form>
      </div>

      <p class="text-center text-xs mt-6" style="color:#CBD5E1;">
        recar · Privataus naudojimo demonstracija
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: 'Prisijungimas — recar' })

const DEMO_PASSWORD = 'recar2026'

const password     = ref('')
const showPassword = ref(false)
const error        = ref('')
const loading      = ref(false)

async function submit() {
  if (!password.value.trim()) {
    error.value = 'Įveskite slaptažodį.'
    return
  }
  loading.value = true
  await new Promise(r => setTimeout(r, 500)) // small UX delay

  if (password.value === DEMO_PASSWORD) {
    const access = useCookie('demo_access', { maxAge: 60 * 60 * 24 * 7 })
    access.value = DEMO_PASSWORD
    await navigateTo('/portal')
  } else {
    error.value = 'Neteisingas slaptažodis. Bandykite dar kartą.'
    password.value = ''
  }
  loading.value = false
}
</script>
