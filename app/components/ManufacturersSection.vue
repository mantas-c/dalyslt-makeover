<template>
  <section class="py-14 sm:py-16 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-reveal class="flex items-end justify-between mb-8 sm:mb-10">
        <div>
          <p class="text-sm font-semibold text-brand-green uppercase tracking-widest mb-1">Populiarios markės</p>
          <h2 class="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">Ieškokite pagal markę</h2>
        </div>
        <a href="#" class="text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors hidden sm:block">
          Visos markės →
        </a>
      </div>

      <!-- 12 brands: 4 cols = 3 rows on mobile, 6 cols = 2 rows on md+ -->
      <div class="grid grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
        <a
          v-for="(brand, i) in brands"
          :key="brand.name"
          v-reveal="{ delay: (i % 6) * 60 }"
          :href="`/catalog?make=${brand.name}`"
          class="group flex flex-col items-center gap-2.5 p-3 sm:p-4 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl hover:shadow-md transition-all duration-200"
        >
          <!-- Logo -->
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            :style="{ background: brand.bg }"
          >
            <component :is="brand.logo" class="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <span class="text-xs sm:text-[13px] font-semibold text-gray-700 group-hover:text-gray-950 text-center leading-tight">{{ brand.name }}</span>
          <span class="text-[10px] text-gray-400">{{ brand.count }} dalių</span>
        </a>
      </div>

      <div class="mt-6 sm:hidden text-center">
        <a href="#" class="text-sm font-semibold text-brand-green">Visos markės →</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

// Inline SVG logo components
const BmwLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: '50', cy: '50', r: '48', fill: '#1C69D3', stroke: 'white', 'stroke-width': '4' }),
    h('circle', { cx: '50', cy: '50', r: '48', fill: 'none', stroke: '#1C69D3', 'stroke-width': '1' }),
    // Quadrants
    h('path', { d: 'M50 2 A48 48 0 0 1 98 50 L50 50 Z', fill: 'white' }),
    h('path', { d: 'M50 98 A48 48 0 0 1 2 50 L50 50 Z', fill: 'white' }),
    h('path', { d: 'M2 50 A48 48 0 0 1 50 2 L50 50 Z', fill: '#1C69D3' }),
    h('path', { d: 'M98 50 A48 48 0 0 1 50 98 L50 50 Z', fill: '#1C69D3' }),
    h('circle', { cx: '50', cy: '50', r: '48', fill: 'none', stroke: 'white', 'stroke-width': '5' }),
    h('circle', { cx: '50', cy: '50', r: '32', fill: 'none', stroke: 'white', 'stroke-width': '5' }),
    h('line', { x1: '50', y1: '2', x2: '50', y2: '98', stroke: 'white', 'stroke-width': '5' }),
    h('line', { x1: '2', y1: '50', x2: '98', y2: '50', stroke: 'white', 'stroke-width': '5' }),
  ])
})

const MercedesLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: '50', cy: '50', r: '47', fill: 'white', stroke: '#333', 'stroke-width': '4' }),
    h('path', { d: 'M50 8 L50 50 M50 50 L84 78 M50 50 L16 78', stroke: '#333', 'stroke-width': '5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
  ])
})

const AudiLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 160 50', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    ...[0, 37, 74, 111].map(x =>
      h('circle', { cx: String(x + 25), cy: '25', r: '22', fill: 'none', stroke: '#333', 'stroke-width': '5' })
    )
  ])
})

const VolkswagenLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: '50', cy: '50', r: '47', fill: '#1E3A8A', stroke: '#1E3A8A', 'stroke-width': '1' }),
    h('circle', { cx: '50', cy: '50', r: '47', fill: 'none', stroke: 'white', 'stroke-width': '5' }),
    // VW shape approximation
    h('path', { d: 'M22 28 L35 62 L50 38 L65 62 L78 28', stroke: 'white', 'stroke-width': '6', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('line', { x1: '36', y1: '50', x2: '64', y2: '50', stroke: 'white', 'stroke-width': '4' }),
  ])
})

const VolvoLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: '50', cy: '50', r: '38', fill: 'none', stroke: '#003057', 'stroke-width': '6' }),
    h('path', { d: 'M75 25 L90 10 M90 10 L75 10 M90 10 L90 25', stroke: '#003057', 'stroke-width': '6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('text', { x: '50', y: '57', 'text-anchor': 'middle', fill: '#003057', 'font-size': '18', 'font-weight': 'bold', 'font-family': 'Arial' }, 'VOLVO'),
  ])
})

const ToyotaLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 120 60', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('ellipse', { cx: '60', cy: '30', rx: '55', ry: '27', fill: 'none', stroke: '#EB0A1E', 'stroke-width': '5' }),
    h('ellipse', { cx: '60', cy: '30', rx: '28', ry: '20', fill: 'none', stroke: '#EB0A1E', 'stroke-width': '5' }),
    h('ellipse', { cx: '60', cy: '30', rx: '8', ry: '20', fill: 'none', stroke: '#EB0A1E', 'stroke-width': '5' }),
  ])
})

const OpelLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: '50', cy: '50', r: '45', fill: 'none', stroke: '#FFD700', 'stroke-width': '6' }),
    h('ellipse', { cx: '50', cy: '50', rx: '28', ry: '28', fill: 'none', stroke: '#FFD700', 'stroke-width': '5' }),
    h('path', { d: 'M20 50 Q50 20 80 50 Q50 80 20 50', fill: '#FFD700' }),
  ])
})

const FordLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 140 60', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('ellipse', { cx: '70', cy: '30', rx: '65', ry: '27', fill: '#003476', stroke: '#003476', 'stroke-width': '2' }),
    h('text', { x: '70', y: '39', 'text-anchor': 'middle', fill: 'white', 'font-size': '28', 'font-weight': 'bold', 'font-family': 'Arial, sans-serif', 'font-style': 'italic' }, 'Ford'),
  ])
})

const PeugeotLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('rect', { x: '15', y: '10', width: '70', height: '80', rx: '8', fill: '#1E3A8A' }),
    h('text', { x: '50', y: '65', 'text-anchor': 'middle', fill: 'white', 'font-size': '14', 'font-weight': 'bold', 'font-family': 'Arial' }, 'PEUGEOT'),
    h('path', { d: 'M38 15 L50 50 L62 15 Z', fill: '#C8B400', stroke: '#C8B400' }),
  ])
})

const RenaultLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('polygon', { points: '50,5 85,25 85,75 50,95 15,75 15,25', fill: '#FFCC00', stroke: '#FFCC00' }),
    h('polygon', { points: '50,20 70,35 70,65 50,80 30,65 30,35', fill: '#1A1A1A' }),
    h('polygon', { points: '50,35 62,45 62,55 50,65 38,55 38,45', fill: '#FFCC00' }),
  ])
})

const HondaLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('rect', { x: '10', y: '10', width: '80', height: '80', rx: '12', fill: '#CC0000' }),
    h('text', { x: '50', y: '67', 'text-anchor': 'middle', fill: 'white', 'font-size': '56', 'font-weight': 'bold', 'font-family': 'Arial' }, 'H'),
  ])
})

const SubaruLogo = defineComponent({
  render: () => h('svg', { viewBox: '0 0 100 100', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, [
    h('circle', { cx: '50', cy: '50', r: '45', fill: '#003399' }),
    // Subaru star cluster
    h('ellipse', { cx: '50', cy: '46', rx: '13', ry: '9', fill: 'white' }),
    h('ellipse', { cx: '68', cy: '40', rx: '8', ry: '5.5', fill: 'white' }),
    h('ellipse', { cx: '64', cy: '54', rx: '6', ry: '4', fill: 'white' }),
    h('ellipse', { cx: '36', cy: '38', rx: '6', ry: '4', fill: 'white' }),
    h('ellipse', { cx: '33', cy: '52', rx: '5', ry: '3.5', fill: 'white' }),
    h('ellipse', { cx: '50', cy: '62', rx: '5', ry: '3.5', fill: 'white' }),
  ])
})

const brands = [
  { name: 'BMW',        bg: '#1C69D3', logo: BmwLogo,        count: '1,840' },
  { name: 'Mercedes',   bg: '#E8E8E8', logo: MercedesLogo,   count: '1,520' },
  { name: 'Audi',       bg: '#F5F5F5', logo: AudiLogo,       count: '1,210' },
  { name: 'Volkswagen', bg: '#1E3A8A', logo: VolkswagenLogo, count: '1,090' },
  { name: 'Volvo',      bg: '#F0F4F8', logo: VolvoLogo,      count: '780' },
  { name: 'Toyota',     bg: '#FFF5F5', logo: ToyotaLogo,     count: '640' },
  { name: 'Opel',       bg: '#1A1A1A', logo: OpelLogo,       count: '590' },
  { name: 'Ford',       bg: '#003476', logo: FordLogo,       count: '540' },
  { name: 'Peugeot',    bg: '#1E3A8A', logo: PeugeotLogo,    count: '430' },
  { name: 'Renault',    bg: '#FFCC00', logo: RenaultLogo,    count: '410' },
  { name: 'Honda',      bg: '#CC0000', logo: HondaLogo,      count: '360' },
  { name: 'Subaru',     bg: '#003399', logo: SubaruLogo,     count: '280' },
]
</script>
