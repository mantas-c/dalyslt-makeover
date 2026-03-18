<template>
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">Kaip tai veikia</p>
        <h2 class="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">Paprastai ir greitai</h2>
        <p class="mt-4 text-lg text-gray-500">Nuo paieškos iki pristatymo – viskas vienoje platformoje</p>
      </div>

      <!-- Steps -->
      <div class="relative">
        <!-- Connector line (desktop) -->
        <div class="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="relative flex flex-col items-center text-center group"
          >
            <!-- Step number + icon -->
            <div class="relative mb-6">
              <div class="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300"
                :class="step.bg">
                {{ step.icon }}
              </div>
              <div class="absolute -top-2 -right-2 w-7 h-7 bg-gray-950 text-white text-xs font-black rounded-full flex items-center justify-center">
                {{ i + 1 }}
              </div>
            </div>

            <h3 class="text-lg font-bold text-gray-950 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <a href="#" class="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5">
          Pradėti paiešką dabar
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    icon: '🔍',
    bg: 'bg-blue-50',
    title: 'Ieškokite dalies',
    desc: 'Įveskite automobilio markę, modelį ir reikiamą dalį arba OEM kodą'
  },
  {
    icon: '🌍',
    bg: 'bg-green-50',
    title: 'Rinkitės iš Europos',
    desc: 'Peržiūrėkite šimtus pasiūlymų iš patikrintų pardavėjų visoje Europoje'
  },
  {
    icon: '💳',
    bg: 'bg-purple-50',
    title: 'Atsiskaitykite saugiai',
    desc: 'Apmokėkite su Visa, Mastercard, Apple Pay ar banko pavedimu'
  },
  {
    icon: '📦',
    bg: 'bg-yellow-50',
    title: 'Gaukite pristatymą',
    desc: 'Dalis pristatoma tiesiai į jūsų duris per 2–5 darbo dienas'
  }
]
</script>
