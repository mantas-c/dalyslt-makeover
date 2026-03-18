<template>
  <footer class="bg-gray-950 text-gray-400">
    <!-- Newsletter CTA -->
    <div class="border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 class="text-xl font-bold text-white">Gaukite naujausias dalių pasiūlymus</h3>
            <p class="text-sm text-gray-400 mt-1">Prenumeruokite ir sužinokite apie naujus skelbimus pirmieji</p>
          </div>
          <div class="flex gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="jusu@email.lt"
              class="flex-1 lg:w-64 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
            >
            <button class="px-6 py-3 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-xl transition-all whitespace-nowrap">
              Prenumeruoti
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-10">
        <!-- Brand -->
        <div class="col-span-2 lg:col-span-2">
          <a href="/" class="text-2xl font-black text-white tracking-tight">
            dalys<span class="text-brand-green">.lt</span>
          </a>
          <p class="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
            Naudotos automobilių dalys iš patikimų Europos pardavėjų. Greitas pristatymas, saugi apmokėjimo sistema ir 14 dienų grąžinimas.
          </p>
          <!-- Social -->
          <div class="flex gap-3 mt-6">
            <a v-for="social in socials" :key="social.name" href="#"
              class="w-10 h-10 bg-gray-800 hover:bg-brand-green rounded-xl flex items-center justify-center transition-colors text-sm">
              {{ social.icon }}
            </a>
          </div>
        </div>

        <!-- Links -->
        <div v-for="group in footerLinks" :key="group.title">
          <h4 class="text-sm font-semibold text-white uppercase tracking-wide mb-4">{{ group.title }}</h4>
          <ul class="space-y-3">
            <li v-for="link in group.links" :key="link">
              <a href="#" class="text-sm text-gray-500 hover:text-white transition-colors">{{ link }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
        <div>© {{ new Date().getFullYear() }} dalys.lt — Visos teisės saugomos</div>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-gray-400 transition-colors">Privatumo politika</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Naudojimo sąlygos</a>
          <a href="#" class="hover:text-gray-400 transition-colors">Slapukai</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { name: 'Facebook', icon: 'f' },
  { name: 'Instagram', icon: 'ig' },
  { name: 'YouTube', icon: '▶' },
]

const footerLinks = [
  {
    title: 'Paslaugos',
    links: ['Katalogas', 'Kaip veikia', 'Pardavėjams', 'Tapk partneriu', 'API integracija']
  },
  {
    title: 'Pagalba',
    links: ['D.U.K.', 'Pristatymas', 'Atsiskaitymas', 'Grąžinimas', 'Kontaktai']
  },
  {
    title: 'Įmonė',
    links: ['Apie mus', 'Naujienos', 'Karjera', 'Privatumo politika', 'Sąlygos']
  }
]
</script>
