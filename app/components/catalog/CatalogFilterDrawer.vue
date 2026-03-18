<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[999] flex"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)"></div>

        <div class="relative w-full max-w-sm bg-white h-full flex flex-col z-10 ml-auto sm:ml-0 shadow-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 class="text-lg font-black text-gray-950">Filtrai</h2>
            <button
              @click="$emit('update:modelValue', false)"
              class="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Scrollable filters -->
          <div class="flex-1 overflow-y-auto px-4 py-4">
            <CatalogFilterSidebar :filters="filters" @update:filters="emit('update:filters', $event)" @reset="emit('reset')" />
          </div>

          <!-- Footer -->
          <div class="px-4 py-4 border-t border-gray-100 flex gap-3">
            <button
              @click="emit('reset'); $emit('update:modelValue', false)"
              class="flex-1 py-3 text-sm font-semibold text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-all"
            >
              Išvalyti
            </button>
            <button
              @click="$emit('update:modelValue', false)"
              class="flex-[2] py-3 text-sm font-bold bg-brand-green hover:bg-brand-green-dark text-white rounded-xl transition-all hover:shadow-lg hover:shadow-green-200"
            >
              Rodyti rezultatus
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Filters } from '~/types/catalog'

defineProps<{ modelValue: boolean; filters: Filters }>()
const emit = defineEmits<{
  'update:modelValue': [v: boolean]
  'update:filters': [f: Filters]
  'reset': []
}>()
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-enter-active .relative,
.drawer-leave-active .relative {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .relative,
.drawer-leave-to .relative {
  transform: translateX(100%);
}
</style>
