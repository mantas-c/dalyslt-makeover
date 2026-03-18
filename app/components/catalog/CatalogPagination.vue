<template>
  <div class="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
    <!-- Info -->
    <p class="text-sm text-gray-500 hidden sm:block">
      Rodoma <span class="font-semibold text-gray-900">{{ from }}–{{ to }}</span> iš <span class="font-semibold text-gray-900">{{ total }}</span>
    </p>

    <!-- Pages -->
    <div class="flex items-center gap-1 mx-auto sm:mx-0">
      <!-- Prev -->
      <button
        @click="emit('update:page', currentPage - 1)"
        :disabled="currentPage === 1"
        class="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Page buttons -->
      <template v-for="p in pageButtons" :key="p">
        <span v-if="p === '...'" class="w-9 h-9 flex items-center justify-center text-sm text-gray-400">…</span>
        <button
          v-else
          @click="emit('update:page', p as number)"
          class="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all"
          :class="p === currentPage ? 'bg-gray-950 text-white' : 'text-gray-600 hover:bg-gray-100'"
        >{{ p }}</button>
      </template>

      <!-- Next -->
      <button
        @click="emit('update:page', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  total: number
  perPage: number
}>()

const emit = defineEmits<{ 'update:page': [p: number] }>()

const from = computed(() => (props.currentPage - 1) * props.perPage + 1)
const to = computed(() => Math.min(props.currentPage * props.perPage, props.total))

const pageButtons = computed(() => {
  const pages: (number | string)[] = []
  const tp = props.totalPages
  const cp = props.currentPage
  if (tp <= 7) {
    for (let i = 1; i <= tp; i++) pages.push(i)
  } else {
    pages.push(1)
    if (cp > 3) pages.push('...')
    for (let i = Math.max(2, cp - 1); i <= Math.min(tp - 1, cp + 1); i++) pages.push(i)
    if (cp < tp - 2) pages.push('...')
    pages.push(tp)
  }
  return pages
})
</script>
