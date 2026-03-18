<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <svg class="w-24 h-24 text-gray-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 96 96">
      <circle cx="42" cy="42" r="28" stroke-width="5"/>
      <line x1="62" y1="62" x2="84" y2="84" stroke-width="6" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="52" y2="52" stroke-width="5" stroke-linecap="round"/>
      <line x1="52" y1="32" x2="32" y2="52" stroke-width="5" stroke-linecap="round"/>
    </svg>
    <h3 class="text-xl font-bold text-gray-900 mb-2">Nieko nerasta</h3>
    <p class="text-sm text-gray-500 mb-6 max-w-xs">
      Pabandykite pakeisti filtrų nustatymus arba ieškoti kitu paieškos terminu
    </p>
    <div class="flex items-center gap-3">
      <button
        @click="emit('clear')"
        class="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-green-200"
      >
        Išvalyti filtrus
      </button>
      <a href="/" class="flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl hover:border-gray-300 transition-all">
        Į pradžią
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ clear: [] }>()
</script>
