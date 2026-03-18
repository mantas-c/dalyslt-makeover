<template>
  <header class="sticky top-0 z-50">
    <!-- Collapsible top bars (hide on scroll) -->
    <div
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :style="{ maxHeight: scrolled ? '0px' : '100px', opacity: scrolled ? 0 : 1 }"
    >
      <!-- Announcement Bar -->
      <div v-if="showAnnouncement" class="bg-gray-950 text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative">
        <div class="flex items-center gap-2">
          <span class="flex gap-1">
            <span class="w-2 h-2 rounded-full bg-green-500 inline-block mt-0.5"></span>
            <span class="w-2 h-2 rounded-full bg-yellow-400 inline-block mt-0.5"></span>
            <span class="w-4 h-2 rounded-full bg-green-700 inline-block mt-0.5"></span>
          </span>
          <span class="text-green-400">🏷️</span>
          <span class="text-yellow-400">⚡</span>
          <span>Naujiena: <strong>BMW & Mercedes OEM dalys</strong> dabar sandėlyje!</span>
          <a href="#" class="text-green-400 font-semibold hover:text-green-300 transition-colors underline underline-offset-2">
            Peržiūrėti →
          </a>
        </div>
        <button
          @click="showAnnouncement = false"
          class="absolute right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Secondary Nav — hidden on mobile -->
      <div class="hidden sm:block bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-4 lg:gap-6 py-2 text-xs text-gray-500 font-medium uppercase tracking-wide overflow-x-auto scrollbar-none">
            <a href="#" class="hover:text-gray-900 transition-colors">Pristatymas</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Atsiskaitymas</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Grąžinimas</a>
            <a href="#" class="hover:text-gray-900 transition-colors">D.U.K.</a>
            <a href="#" class="hover:text-gray-900 transition-colors">Tapk partneriu</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <nav
      class="bg-white border-b transition-shadow duration-300"
      :class="scrolled ? 'border-gray-200 shadow-md' : 'border-gray-200 shadow-sm'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-8">
            <a href="/" class="flex items-center">
              <span class="text-2xl font-black text-gray-900 tracking-tight">
                dalys<span class="text-brand-green">.lt</span>
              </span>
            </a>

            <!-- Desktop Nav Links -->
            <div class="hidden md:flex items-center gap-1">
              <div class="relative group">
                <button class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">
                  Katalogas
                  <svg class="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <!-- Dropdown -->
                <div class="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div class="p-2">
                    <a v-for="cat in categories" :key="cat.name" href="#" class="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                      <span class="text-base">{{ cat.icon }}</span>
                      <span>{{ cat.name }}</span>
                    </a>
                  </div>
                </div>
              </div>
              <a href="/catalog" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">Visos dalys</a>
              <a href="#" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">Naujienos</a>
              <a href="#" class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">Kontaktai</a>
            </div>
          </div>

          <!-- Right side -->
          <div class="flex items-center gap-2">
            <!-- Cart -->
            <button class="relative flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">
              <div class="relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span class="absolute -top-2 -right-2 bg-brand-green text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </div>
              <span class="hidden sm:inline">0.00 €</span>
            </button>

            <!-- Login -->
            <a href="#" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span class="hidden sm:inline">Prisijungti</span>
            </a>

            <!-- Mobile menu button -->
            <button class="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors" @click="mobileMenuOpen = !mobileMenuOpen">
              <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
        <a href="/catalog" class="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Katalogas</a>
        <a href="#" class="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Naujienos</a>
        <a href="#" class="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Kontaktai</a>
        <hr class="border-gray-100 my-2">
        <a href="#" class="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Pristatymas</a>
        <a href="#" class="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Atsiskaitymas</a>
        <a href="#" class="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">Tapk partneriu</a>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const showAnnouncement = ref(true)
const mobileMenuOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 50 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

const categories = [
  { icon: '🔧', name: 'Variklio dalys' },
  { icon: '⚙️', name: 'Transmisija' },
  { icon: '🛑', name: 'Stabdžių sistema' },
  { icon: '💡', name: 'Žibintai ir optika' },
  { icon: '🚗', name: 'Kėbulo dalys' },
  { icon: '❄️', name: 'Kondicionierius' },
  { icon: '🔌', name: 'Elektrika' },
  { icon: '🪑', name: 'Salonas' },
]
</script>
