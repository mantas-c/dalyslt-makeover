<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

      <!-- Testimonials -->
      <div>
        <div v-reveal class="text-center max-w-2xl mx-auto mb-12">
          <p class="text-sm font-semibold text-brand-green uppercase tracking-widest mb-3">Atsiliepimai</p>
          <h2 class="text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">Ką sako mūsų klientai</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(review, i) in reviews"
            :key="review.name"
            v-reveal="{ delay: i * 100 }"
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <!-- Stars -->
            <div class="flex gap-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed mb-5">"{{ review.text }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                :class="review.color">
                {{ review.name[0] }}
              </div>
              <div>
                <div class="font-semibold text-gray-900 text-sm">{{ review.name }}</div>
                <div class="text-xs text-gray-400">{{ review.car }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust badges -->
      <div v-reveal class="bg-white rounded-3xl border border-gray-100 p-10">
        <p class="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Kodėl verta rinktis dalys.lt</p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="trust in trustItems" :key="trust.title" class="flex flex-col items-center text-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-2xl">{{ trust.icon }}</div>
            <div>
              <div class="font-bold text-gray-900 text-sm">{{ trust.title }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ trust.desc }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const reviews = [
  {
    text: 'Puikus servisas! Radau BMW E60 variklio dangtį labai geromis kainomis iš Vokietijos. Dalis atėjo greitai ir gerai supakuota.',
    name: 'Tomas Kazlauskas',
    car: 'BMW 5 serija',
    color: 'bg-blue-500'
  },
  {
    text: 'Labai patogu naršyti ir filtruoti pagal automobilio modelį. Radau retą dalį Audi Q7, kurios neradau jokioje kitoje vietoje.',
    name: 'Rasa Petrauskienė',
    car: 'Audi Q7 4L',
    color: 'bg-purple-500'
  },
  {
    text: 'Greitas pristatymas per DHL, dalis atitiko aprašymą. Tikrai rekomenduoju visiems, kas ieško naudotų automobilių dalių.',
    name: 'Mantas Jonaitis',
    car: 'Volvo XC60',
    color: 'bg-green-500'
  }
]

const trustItems = [
  { icon: '🛡️', title: 'Saugus mokėjimas', desc: 'SSL šifravimas ir patikimi mokėjimo sprendimai' },
  { icon: '↩️', title: '14 dienų grąžinimas', desc: 'Grąžinkite be klausimų per 14 dienų' },
  { icon: '✅', title: 'Patikrinti pardavėjai', desc: 'Visi pardavėjai patikrinti ir įvertinti' },
  { icon: '🚀', title: 'Greitas pristatymas', desc: 'Pristatome per 2–5 darbo dienas' },
]
</script>
