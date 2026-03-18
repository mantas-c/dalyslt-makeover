<template>
  <section class="bg-gray-950 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-gray-800">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          v-reveal="{ delay: i * 100 }"
          class="text-center lg:px-8"
        >
          <div class="text-3xl sm:text-4xl xl:text-5xl font-black text-white tabular-nums">
            {{ stat.value }}
          </div>
          <div class="mt-2 text-sm text-gray-400 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '12,400+', label: 'Dalių sandėlyje' },
  { value: '340+', label: 'Patikimi pardavėjai' },
  { value: '18', label: 'Šalių Europoje' },
  { value: '4.9★', label: 'Klientų įvertinimas' },
]
</script>
