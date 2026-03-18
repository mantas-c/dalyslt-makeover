<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div v-reveal class="flex items-end justify-between mb-10">
        <div>
          <p class="text-sm font-semibold text-brand-green uppercase tracking-widest mb-2">Naujausi skelbimai</p>
          <h2 class="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">Ką rasite šiandien</h2>
        </div>
        <div class="hidden sm:flex items-center gap-2">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-all"
            :class="activeFilter === filter ? 'bg-gray-950 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Listings grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          v-for="(listing, i) in listings"
          :key="listing.id"
          v-reveal="{ delay: (i % 4) * 80 }"
          class="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <!-- Image placeholder -->
          <div class="relative bg-gradient-to-br from-gray-100 to-gray-50 h-44 flex items-center justify-center overflow-hidden">
            <span class="text-6xl opacity-40">{{ listing.icon }}</span>
            <!-- Status badge -->
            <div
              class="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
              :class="listing.status === 'Sandėlyje' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'"
            >
              {{ listing.status }}
            </div>
            <!-- Wishlist -->
            <button class="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-4 space-y-3">
            <div>
              <div class="text-xs text-gray-400 font-mono">{{ listing.code }}</div>
              <h3 class="font-bold text-gray-900 leading-tight mt-0.5">{{ listing.name }}</h3>
              <div class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                {{ listing.country }}
              </div>
            </div>

            <!-- Car info -->
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tag in listing.tags"
                :key="tag"
                class="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100"
              >{{ tag }}</span>
            </div>

            <!-- Price + action -->
            <div class="flex items-center justify-between pt-2 border-t border-gray-50">
              <div>
                <div class="text-xl font-black text-gray-950">{{ listing.price }}</div>
                <div class="text-xs text-gray-400">+ pristatymas</div>
              </div>
              <button class="flex items-center gap-1.5 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:shadow-md hover:shadow-green-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Pirkti
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- View all -->
      <div class="text-center mt-10">
        <a href="#" class="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-200">
          Rodyti visus skelbimus
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeFilter = ref('Visi')
const filters = ['Visi', 'BMW', 'Mercedes', 'Audi', 'Volvo']

const listings = [
  { id: 1, code: '1231754485', name: 'BMW E60 Kapotas', icon: '🚗', status: 'Sandėlyje', price: '85 €', country: 'Vokietija', tags: ['BMW', 'E60', '2004-2010'] },
  { id: 2, code: '10365353', name: 'Opel Insignia Priekinis Buferis', icon: '🚙', status: 'Sandėlyje', price: '210 €', country: 'Lenkija', tags: ['Opel', 'Insignia', '2008-2013'] },
  { id: 3, code: '8N0823029', name: 'Audi A4 B6 Kapotas', icon: '🏎️', status: 'Sandėlyje', price: '240 €', country: 'Latvija', tags: ['Audi', 'A4', 'B6'] },
  { id: 4, code: 'A21388', name: 'Mercedes W213 Grotos', icon: '🚘', status: 'Parduota', price: '120 €', country: 'Lietuva', tags: ['Mercedes', 'E-klasė', 'W213'] },
  { id: 5, code: 'VO-9931', name: 'Volvo V90 Veidrodėlis D.', icon: '🚐', status: 'Rezervuota', price: '180 €', country: 'Švedija', tags: ['Volvo', 'V90', '2016+'] },
  { id: 6, code: '4L0698087', name: 'Audi Q7 Kompresorius', icon: '⚙️', status: 'Parduota', price: '290 €', country: 'Estija', tags: ['Audi', 'Q7', '4L'] },
  { id: 7, code: 'HN-4412', name: 'Honda CR-V Durų Stiklas', icon: '🪟', status: 'Sandėlyje', price: '130 €', country: 'Čekija', tags: ['Honda', 'CR-V', 'III gen'] },
  { id: 8, code: 'VW-2847', name: 'VW Passat B8 Priekinis Faras', icon: '💡', status: 'Sandėlyje', price: '150 €', country: 'Vokietija', tags: ['VW', 'Passat', 'B8'] },
]
</script>
