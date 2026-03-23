<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8" style="background:#F8FAFC; font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Logo -->
    <div class="flex items-center gap-3 mb-12">
      <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:#14A34A;">
        <svg class="w-5 h-5" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <span class="text-2xl font-bold tracking-tight" style="color:#0F172A;">recar<span style="color:#14A34A;">marketplace</span></span>
    </div>

    <!-- Heading -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold mb-2" style="color:#0F172A;">Pasirinkite rodinį</h1>
      <p class="text-sm" style="color:#64748B;">Tai prototipas — pasirinkite noriamą portalo vaizdą</p>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-3 gap-5 w-full max-w-3xl">

      <!-- Admin -->
      <button @click="navigateTo('/admin')"
        class="group relative flex flex-col items-center gap-5 p-8 rounded-2xl text-left cursor-pointer transition-all duration-200 hover:-translate-y-1"
        style="background:#fff; border:2px solid #E2E8F0; box-shadow:0 1px 4px rgba(0,0,0,0.04);"
        @mouseenter="hovered = 'admin'" @mouseleave="hovered = null"
        :style="hovered === 'admin' ? 'border-color:#6366F1; box-shadow:0 8px 24px rgba(99,102,241,0.12);' : 'border:2px solid #E2E8F0; box-shadow:0 1px 4px rgba(0,0,0,0.04);'"
      >
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200"
          :style="hovered === 'admin' ? 'background:#EEF2FF;' : 'background:#F1F5F9;'">
          <svg class="w-7 h-7 transition-colors duration-200" :style="hovered === 'admin' ? 'color:#6366F1;' : 'color:#64748B;'" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div class="text-center">
          <p class="text-base font-bold mb-1" style="color:#0F172A;">Administratorius</p>
          <p class="text-xs leading-relaxed" style="color:#64748B;">Platformos valdymas, vartotojai, statistika, konfigūracija</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
          :style="hovered === 'admin' ? 'color:#6366F1;' : 'color:#94A3B8;'">
          Atidaryti
          <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="hovered === 'admin' ? 'translate-x-0.5' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <!-- Badge -->
        <span class="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:#EEF2FF; color:#6366F1;">Aktyvus</span>
      </button>

      <!-- Supplier -->
      <button
        class="group relative flex flex-col items-center gap-5 p-8 rounded-2xl text-left cursor-pointer transition-all duration-200 hover:-translate-y-1"
        @click="navigateTo('/supplier')"
        @mouseenter="hovered = 'supplier'" @mouseleave="hovered = null"
        :style="hovered === 'supplier' ? 'border:2px solid #14A34A; box-shadow:0 8px 24px rgba(20,163,74,0.12); background:#fff;' : 'background:#fff; border:2px solid #E2E8F0; box-shadow:0 1px 4px rgba(0,0,0,0.04);'"
      >
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200"
          :style="hovered === 'supplier' ? 'background:#F0FDF4;' : 'background:#F1F5F9;'">
          <svg class="w-7 h-7 transition-colors duration-200" :style="hovered === 'supplier' ? 'color:#14A34A;' : 'color:#64748B;'" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <div class="text-center">
          <p class="text-base font-bold mb-1" style="color:#0F172A;">Tiekėjas</p>
          <p class="text-xs leading-relaxed" style="color:#64748B;">Sandėlio valdymas, užklausos, pasiūlymų pateikimas</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
          :style="hovered === 'supplier' ? 'color:#14A34A;' : 'color:#94A3B8;'">
          Atidaryti
          <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="hovered === 'supplier' ? 'translate-x-0.5' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <span class="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:#F0FDF4; color:#14A34A;">Aktyvus</span>
      </button>

      <!-- Buyer / Customer -->
      <button
        class="group relative flex flex-col items-center gap-5 p-8 rounded-2xl text-left cursor-pointer transition-all duration-200 hover:-translate-y-1"
        @click="navigateTo('/buyer')"
        @mouseenter="hovered = 'buyer'" @mouseleave="hovered = null"
        :style="hovered === 'buyer' ? 'border:2px solid #3B82F6; box-shadow:0 8px 24px rgba(59,130,246,0.12); background:#fff;' : 'background:#fff; border:2px solid #E2E8F0; box-shadow:0 1px 4px rgba(0,0,0,0.04);'"
      >
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200"
          :style="hovered === 'buyer' ? 'background:#EFF6FF;' : 'background:#F1F5F9;'">
          <svg class="w-7 h-7 transition-colors duration-200" :style="hovered === 'buyer' ? 'color:#3B82F6;' : 'color:#64748B;'" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <div class="text-center">
          <p class="text-base font-bold mb-1" style="color:#0F172A;">Pirkėjas</p>
          <p class="text-xs leading-relaxed" style="color:#64748B;">Užklausų kūrimas, pasiūlymų peržiūra, apmokėjimas</p>
        </div>
        <div class="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
          :style="hovered === 'buyer' ? 'color:#3B82F6;' : 'color:#94A3B8;'">
          Atidaryti
          <svg class="w-3.5 h-3.5 transition-transform duration-200" :class="hovered === 'buyer' ? 'translate-x-0.5' : ''" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <span class="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:#EFF6FF; color:#3B82F6;">Aktyvus</span>
      </button>

    </div>

    <!-- Footer note -->
    <p class="mt-10 text-xs" style="color:#94A3B8;">recar marketplace · Prototipas · v0.1</p>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const hovered = ref<string | null>(null)
</script>
