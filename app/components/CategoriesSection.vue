<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div v-reveal class="flex items-end justify-between mb-10">
        <div>
          <p class="text-sm font-semibold text-brand-green uppercase tracking-widest mb-2">Katalogas</p>
          <h2 class="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">Naršyti pagal kategoriją</h2>
        </div>
        <a href="#" class="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors">
          Visos kategorijos
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Categories grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <a
          v-for="(cat, i) in categories"
          :key="cat.name"
          v-reveal="{ delay: (i % 4) * 80 }"
          href="#"
          class="group relative bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl p-6 flex flex-col items-center gap-4 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
        >
          <div class="w-14 h-14 bg-white group-hover:bg-green-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:shadow transition-all duration-200">
            {{ cat.icon }}
          </div>
          <div>
            <div class="font-semibold text-gray-900 text-sm leading-tight">{{ cat.name }}</div>
            <div class="text-xs text-gray-400 mt-1">{{ cat.count }} dalių</div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  { icon: '🔧', name: 'Variklio dalys', count: '2,840' },
  { icon: '⚙️', name: 'Transmisija', count: '1,200' },
  { icon: '🛑', name: 'Stabdžių sistema', count: '980' },
  { icon: '💡', name: 'Žibintai ir optika', count: '1,540' },
  { icon: '🚗', name: 'Kėbulo dalys', count: '3,100' },
  { icon: '❄️', name: 'Kondicionierius', count: '450' },
  { icon: '🔌', name: 'Elektrika', count: '760' },
  { icon: '🪑', name: 'Salonas', count: '890' },
  { icon: '🔩', name: 'Važiuoklė', count: '1,320' },
  { icon: '🛢️', name: 'Tepalai ir skysčiai', count: '340' },
  { icon: '🪟', name: 'Stiklai', count: '670' },
  { icon: '🔋', name: 'Baterijos', count: '220' },
]
</script>
