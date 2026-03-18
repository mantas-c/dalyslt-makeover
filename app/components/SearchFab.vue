<template>
  <!-- On home: hidden on desktop (map pin handles it). On other pages: always visible -->
  <div
    class="fixed bottom-6 left-5 z-50"
    :class="isHome ? 'lg:hidden' : ''"
  >
    <div class="absolute pointer-events-none" style="left:-20px;top:-20px;width:96px;height:96px;">
      <div class="absolute w-full h-full rounded-full border-2 border-green-300 opacity-50 animate-ping" style="animation-duration:2.5s;"></div>
    </div>
    <div class="absolute pointer-events-none" style="left:-8px;top:-8px;width:72px;height:72px;">
      <div class="absolute w-full h-full rounded-full border border-green-400 opacity-35 animate-ping" style="animation-duration:2s;animation-delay:0.5s;"></div>
    </div>
    <button
      @click="open = true"
      class="relative w-14 h-14 bg-brand-green hover:bg-brand-green-dark text-white rounded-full shadow-2xl shadow-green-400 ring-4 ring-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label="Ieškoti dalies"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>
  </div>
  <SearchModal v-model="open" />
</template>

<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
const open = ref(false)
</script>
