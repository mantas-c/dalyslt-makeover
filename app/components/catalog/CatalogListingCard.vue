<template>
  <div
    class="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    @click="navigateTo(`/product/${listing.id}`)"
  >
    <!-- Image area -->
    <div class="relative bg-gradient-to-br from-gray-100 to-gray-50 h-52 flex items-center justify-center overflow-hidden">
      <span class="text-6xl select-none">{{ listing.icon }}</span>

      <!-- Discount badge top-left -->
      <span v-if="listing.originalPrice" class="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
        -{{ discount }}%
      </span>

      <!-- Status badge top-right -->
      <span
        class="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full"
        :class="{
          'bg-green-100 text-green-700': listing.status === 'Sandėlyje',
          'bg-yellow-100 text-yellow-700': listing.status === 'Rezervuota',
          'bg-gray-100 text-gray-500': listing.status === 'Parduota',
        }"
      >● {{ listing.status }}</span>

      <!-- Grade badge bottom-left -->
      <span
        class="absolute bottom-3 left-3 text-[10px] font-black px-2 py-1 rounded-lg"
        :class="{
          'bg-green-600 text-white': listing.condition === 'A',
          'bg-yellow-500 text-white': listing.condition === 'B',
          'bg-orange-500 text-white': listing.condition === 'C',
        }"
      >Grade {{ listing.condition }}</span>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1 gap-2.5">

      <!-- Name -->
      <h3 class="text-sm font-bold text-gray-950 leading-snug line-clamp-2">{{ listing.name }}</h3>

      <!-- Car compatibility -->
      <p class="text-xs text-gray-500 leading-tight line-clamp-1">{{ listing.tags.join(' · ') }}</p>

      <!-- Price -->
      <div class="flex items-baseline gap-2">
        <span class="text-xl font-black text-green-600">{{ listing.price }}</span>
        <span v-if="listing.originalPrice" class="text-sm text-gray-400 line-through">{{ listing.originalPrice }}</span>
      </div>

      <!-- Delivery + city -->
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-1.5 text-xs text-gray-500">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12h12l1-12M10 12v4m4-4v4"/>
          </svg>
          {{ listing.delivery }}
        </div>
        <div class="flex items-center gap-1.5 text-xs text-gray-500">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          </svg>
          {{ listing.flag }} {{ listing.city }}
        </div>
      </div>

      <!-- Vehicle params -->
      <div class="flex flex-wrap gap-1 pt-1 border-t border-gray-50">
        <span v-for="param in vehicleParams" :key="param" class="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{{ param }}</span>
      </div>

      <!-- Bottom: OEM code + compare + wishlist -->
      <div class="flex items-center justify-between mt-auto pt-2.5 border-t border-gray-100">
        <div class="flex flex-col gap-0.5 min-w-0">
          <span class="text-[10px] font-mono text-gray-400 truncate">{{ listing.code }}</span>
          <button
            class="flex items-center gap-1 text-[10px] font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
            @click.stop="navigateTo(`/oem/${listing.code}`)"
          >
            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Palyginti kainas
          </button>
        </div>
        <button @click.stop class="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
          <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/types/catalog'

const props = defineProps<{ listing: Listing }>()

const discount = computed(() => {
  if (!props.listing.originalPrice) return 0
  const orig = parseFloat(props.listing.originalPrice)
  const curr = props.listing.priceNum
  return Math.round((1 - curr / orig) * 100)
})

const vehicleParams = computed(() => {
  const l = props.listing
  const params: string[] = []
  if (l.condition === 'A') params.push('Naudota/-as')
  else if (l.condition === 'B') params.push('Naudota/-as')
  else params.push('Naudota/-as')
  if (l.body)    params.push(l.body)
  if (l.year)    params.push(`${l.year} m.`)
  if (l.engine)  params.push(l.engine)
  if (l.power)   params.push(l.power)
  if (l.fuel)    params.push(l.fuel)
  if (l.gearbox) params.push(l.gearbox)
  if (l.drive)   params.push(l.drive)
  return params
})
</script>
