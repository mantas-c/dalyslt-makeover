<template>
  <div class="space-y-3">
    <!-- Breadcrumb + controls row -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <!-- Left: breadcrumb + count -->
      <div>
        <nav class="flex items-center gap-1 text-xs text-gray-400 mb-1">
          <a href="/" class="hover:text-gray-700 transition-colors">Pagrindinis</a>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <span class="text-gray-700 font-medium">Katalogas</span>
          <template v-if="activeCategory">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            <span class="text-gray-700 font-medium">{{ activeCategory }}</span>
          </template>
        </nav>
        <p class="text-sm font-semibold text-gray-900">
          <span class="text-brand-green">{{ totalCount.toLocaleString('lt') }}</span> dalių rasta
        </p>
      </div>

      <!-- Right: sort + view + mobile filter btn -->
      <div class="flex items-center gap-2">
        <!-- Mobile filter button -->
        <button
          @click="emit('open-drawer')"
          class="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-300 transition-all relative"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
          </svg>
          Filtrai
          <span v-if="activeFilterCount > 0" class="absolute -top-2 -right-2 bg-brand-green text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {{ activeFilterCount }}
          </span>
        </button>

        <!-- Sort -->
        <div class="relative">
          <select
            :value="sort"
            @change="emit('update:sort', ($event.target as HTMLSelectElement).value)"
            class="pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green appearance-none cursor-pointer"
          >
            <option value="newest">Naujausi</option>
            <option value="price_asc">Kaina ↑</option>
            <option value="price_desc">Kaina ↓</option>
            <option value="popular">Populiariausi</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>

        <!-- View toggle -->
        <div class="flex bg-gray-100 rounded-xl p-1 gap-1">
          <button
            @click="emit('update:view', 'grid')"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            :class="view === 'grid' ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-700'"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
            </svg>
          </button>
          <button
            @click="emit('update:view', 'list')"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            :class="view === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-700'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Active filter chips -->
    <div v-if="chips.length > 0" class="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
      <span class="text-xs text-gray-400 font-medium flex-shrink-0">Aktyvūs filtrai:</span>
      <button
        v-for="chip in chips"
        :key="chip.key"
        @click="emit('remove-filter', chip.key)"
        class="flex-shrink-0 flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
      >
        {{ chip.label }}
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <button @click="emit('clear-all')" class="flex-shrink-0 text-xs font-semibold text-brand-green hover:text-brand-green-dark transition-colors">
        Išvalyti viską
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalCount: number
  sort: string
  view: 'grid' | 'list'
  chips: { key: string; label: string }[]
  activeFilterCount: number
  activeCategory?: string
}>()

const emit = defineEmits<{
  'update:sort': [v: string]
  'update:view': [v: 'grid' | 'list']
  'open-drawer': []
  'remove-filter': [key: string]
  'clear-all': []
}>()
</script>
