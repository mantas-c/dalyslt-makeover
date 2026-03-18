<template>
  <div class="space-y-1">

    <!-- Vehicle type -->
    <FilterSection title="Transporto tipas" :open="true">
      <div class="flex flex-col gap-1.5">
        <button
          v-for="vt in vehicleTypes" :key="vt.id"
          @click="emit('update:filters', { ...filters, vehicleType: vt.id })"
          class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border transition-all"
          :class="filters.vehicleType === vt.id
            ? 'bg-gray-950 text-white border-gray-950'
            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'"
        >
          <span>{{ vt.icon }}</span> {{ vt.label }}
        </button>
      </div>
    </FilterSection>

    <!-- Make / Model / Generation -->
    <FilterSection title="Automobilis" :open="true">
      <div class="space-y-2">
        <div class="relative">
          <select
            :value="filters.make"
            @change="emit('update:filters', { ...filters, make: ($event.target as HTMLSelectElement).value, model: '', generation: '' })"
            class="w-full px-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7"
          >
            <option value="">Markė...</option>
            <option v-for="m in makes" :key="m">{{ m }}</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="relative">
          <select
            :value="filters.model"
            @change="emit('update:filters', { ...filters, model: ($event.target as HTMLSelectElement).value, generation: '' })"
            class="w-full px-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7"
            :disabled="!filters.make"
          >
            <option value="">Modelis...</option>
            <option v-for="m in modelsFor(filters.make)" :key="m">{{ m }}</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="relative">
          <select
            :value="filters.generation"
            @change="emit('update:filters', { ...filters, generation: ($event.target as HTMLSelectElement).value })"
            class="w-full px-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7"
            :disabled="!filters.model"
          >
            <option value="">Generacija / metai...</option>
            <option>2018–2023</option>
            <option>2014–2018</option>
            <option>2010–2014</option>
            <option>2005–2010</option>
            <option>2000–2005</option>
          </select>
          <svg class="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
      </div>
    </FilterSection>

    <!-- Category -->
    <FilterSection title="Kategorija" :open="true">
      <div class="space-y-0.5">
        <div v-for="cat in categories" :key="cat.name">
          <!-- Row: click name to filter, click arrow to expand -->
          <div
            class="flex items-center rounded-lg transition-colors"
            :class="filters.category === cat.name ? 'bg-green-50' : 'hover:bg-gray-50'"
          >
            <!-- Clickable name area -->
            <button
              @click="selectCategory(cat.name)"
              class="flex-1 flex items-center gap-2 px-2 py-2.5 text-left min-w-0"
            >
              <span class="text-base flex-shrink-0">{{ cat.icon }}</span>
              <span class="text-sm font-medium truncate" :class="filters.category === cat.name ? 'text-brand-green font-semibold' : 'text-gray-700'">{{ cat.name }}</span>
              <span class="text-[10px] text-gray-400 ml-auto flex-shrink-0 pr-1">{{ cat.count }}</span>
            </button>
            <!-- Expand/collapse arrow — separate click target -->
            <button
              @click="toggleExpand(cat.name)"
              class="w-8 h-9 flex items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-700 transition-colors"
              :aria-label="openCategories.includes(cat.name) ? 'Sutraukti' : 'Išplėsti'"
            >
              <svg
                class="w-3.5 h-3.5 transition-transform duration-200"
                :class="openCategories.includes(cat.name) ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
          <!-- Subcategories -->
          <div v-show="openCategories.includes(cat.name)" class="ml-9 mb-1 space-y-0.5">
            <button
              v-for="sub in cat.subs"
              :key="sub"
              @click="emit('update:filters', { ...filters, category: sub })"
              class="block w-full text-left text-xs px-2 py-1.5 rounded-lg transition-colors"
              :class="filters.category === sub
                ? 'text-brand-green font-semibold bg-green-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'"
            >
              {{ sub }}
            </button>
          </div>
        </div>
      </div>
    </FilterSection>

    <!-- Price range -->
    <FilterSection title="Kaina" :open="true">
      <div class="px-1">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-semibold text-gray-900">{{ filters.priceMin }} €</span>
          <span class="text-sm font-semibold text-gray-900">{{ filters.priceMax }} €</span>
        </div>
        <div class="relative h-5 flex items-center">
          <div class="absolute w-full h-1.5 bg-gray-200 rounded-full"></div>
          <div
            class="absolute h-1.5 bg-brand-green rounded-full pointer-events-none"
            :style="{ left: `${(filters.priceMin / 2000) * 100}%`, right: `${100 - (filters.priceMax / 2000) * 100}%` }"
          ></div>
          <input
            type="range" min="0" max="2000" step="10"
            :value="filters.priceMin"
            @input="emit('update:filters', { ...filters, priceMin: Math.min(+($event.target as HTMLInputElement).value, filters.priceMax - 10) })"
            class="absolute w-full appearance-none bg-transparent cursor-pointer range-thumb"
          />
          <input
            type="range" min="0" max="2000" step="10"
            :value="filters.priceMax"
            @input="emit('update:filters', { ...filters, priceMax: Math.max(+($event.target as HTMLInputElement).value, filters.priceMin + 10) })"
            class="absolute w-full appearance-none bg-transparent cursor-pointer range-thumb"
          />
        </div>
        <div class="flex gap-2 mt-4">
          <div class="flex-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">nuo</span>
            <input
              type="number" min="0" max="1990" step="10"
              :value="filters.priceMin"
              @change="emit('update:filters', { ...filters, priceMin: Math.min(+(($event.target as HTMLInputElement).value), filters.priceMax - 10) })"
              class="w-full pl-8 pr-2 py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>
          <div class="flex-1 relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">iki</span>
            <input
              type="number" min="10" max="2000" step="10"
              :value="filters.priceMax"
              @change="emit('update:filters', { ...filters, priceMax: Math.max(+(($event.target as HTMLInputElement).value), filters.priceMin + 10) })"
              class="w-full pl-8 pr-2 py-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>
        </div>
      </div>
    </FilterSection>

    <!-- Condition -->
    <FilterSection title="Būklė" :open="true">
      <div class="space-y-2">
        <label
          v-for="cond in conditions" :key="cond.id"
          class="flex items-center gap-3 cursor-pointer group"
        >
          <div
            class="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
            :class="filters.conditions.includes(cond.id)
              ? 'bg-brand-green border-brand-green'
              : 'border-gray-300 group-hover:border-gray-400'"
            @click="toggleCondition(cond.id)"
          >
            <svg v-if="filters.conditions.includes(cond.id)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div class="flex items-center gap-2 flex-1">
            <span
              class="text-xs font-black px-2 py-0.5 rounded-md text-white"
              :class="cond.id === 'A' ? 'bg-green-600' : cond.id === 'B' ? 'bg-yellow-500' : 'bg-orange-500'"
            >{{ cond.id }}</span>
            <span class="text-sm text-gray-700">{{ cond.label }}</span>
          </div>
        </label>
      </div>
    </FilterSection>

    <!-- Country -->
    <FilterSection title="Šalis" :open="false">
      <div class="space-y-1.5">
        <label v-for="c in countries" :key="c.code" class="flex items-center gap-2.5 cursor-pointer group">
          <div
            class="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
            :class="filters.countries.includes(c.code)
              ? 'bg-brand-green border-brand-green'
              : 'border-gray-300 group-hover:border-gray-400'"
            @click="toggleCountry(c.code)"
          >
            <svg v-if="filters.countries.includes(c.code)" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span class="text-base leading-none">{{ c.flag }}</span>
          <span class="text-sm text-gray-700">{{ c.name }}</span>
          <span class="ml-auto text-xs text-gray-400">{{ c.count }}</span>
        </label>
      </div>
    </FilterSection>

    <!-- Reset -->
    <button
      v-if="hasActiveFilters"
      @click="emit('reset')"
      class="w-full py-3 text-sm font-semibold text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-all"
    >
      Išvalyti filtrus
    </button>

  </div>
</template>

<script setup lang="ts">
import type { Filters } from '~/types/catalog'

const props = defineProps<{ filters: Filters }>()
const emit = defineEmits<{
  'update:filters': [f: Filters]
  'reset': []
}>()

// Collapsible filter section sub-component
const FilterSection = defineComponent({
  props: { title: String, open: Boolean },
  setup(p, { slots }) {
    const isOpen = ref(p.open ?? true)
    return () => h('div', { class: 'border border-gray-100 rounded-2xl overflow-hidden' }, [
      h('button', {
        class: 'w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors',
        onClick: () => { isOpen.value = !isOpen.value }
      }, [
        h('span', { class: 'text-sm font-bold text-gray-900' }, p.title),
        h('svg', { class: `w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen.value ? 'rotate-180' : ''}`, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 9l-7 7-7-7' })
        ])
      ]),
      h('div', {
        class: `border-t border-gray-100 bg-white px-4 pb-4 pt-3 ${isOpen.value ? '' : 'hidden'}`
      }, slots.default?.())
    ])
  }
})

const openCategories = ref<string[]>([])

function toggleExpand(name: string) {
  openCategories.value = openCategories.value.includes(name)
    ? openCategories.value.filter(c => c !== name)
    : [...openCategories.value, name]
}

function selectCategory(name: string) {
  // Toggle selection; also auto-expand so subs are visible
  const next = props.filters.category === name ? '' : name
  if (next && !openCategories.value.includes(name)) {
    openCategories.value = [...openCategories.value, name]
  }
  emit('update:filters', { ...props.filters, category: next })
}

function toggleCondition(id: string) {
  const cs = props.filters.conditions.includes(id)
    ? props.filters.conditions.filter(c => c !== id)
    : [...props.filters.conditions, id]
  emit('update:filters', { ...props.filters, conditions: cs })
}

function toggleCountry(code: string) {
  const cs = props.filters.countries.includes(code)
    ? props.filters.countries.filter(c => c !== code)
    : [...props.filters.countries, code]
  emit('update:filters', { ...props.filters, countries: cs })
}

const hasActiveFilters = computed(() =>
  props.filters.make || props.filters.category || props.filters.conditions.length < 3 ||
  props.filters.countries.length > 0 || props.filters.priceMin > 0 || props.filters.priceMax < 2000
)

const vehicleTypes = [
  { id: 'car', icon: '🚗', label: 'Automobilis' },
  { id: 'moto', icon: '🏍️', label: 'Motociklas' },
  { id: 'commercial', icon: '🚛', label: 'Komercinis' },
]

const makes = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Volvo', 'Toyota', 'Opel', 'Ford', 'Peugeot', 'Renault', 'Honda', 'Subaru']

const modelMap: Record<string, string[]> = {
  'BMW': ['1 serija', '3 serija', '5 serija', '7 serija', 'X3', 'X5', 'X6'],
  'Mercedes-Benz': ['A klasė', 'C klasė', 'E klasė', 'S klasė', 'GLC', 'GLE'],
  'Audi': ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7'],
  'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Touareg', 'Polo'],
  'Volvo': ['V40', 'V60', 'V90', 'XC40', 'XC60', 'XC90'],
  'Toyota': ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Yaris'],
  'Opel': ['Astra', 'Insignia', 'Mokka', 'Zafira', 'Corsa'],
  'Ford': ['Focus', 'Mondeo', 'Fiesta', 'Kuga', 'Explorer'],
}
function modelsFor(make: string) { return modelMap[make] ?? [] }

const conditions = [
  { id: 'A', label: 'Puiki būklė' },
  { id: 'B', label: 'Gera būklė' },
  { id: 'C', label: 'Patenkinama' },
]

const categories = [
  { icon: '🔧', name: 'Variklio dalys', count: '3,240', subs: ['Cilindro galva', 'Karter', 'Vožtuvai', 'Turbina'] },
  { icon: '⚙️', name: 'Transmisija', count: '1,850', subs: ['Pavarų dėžė', 'Sankaba', 'Kardanas', 'Reduktorius'] },
  { icon: '🛑', name: 'Stabdžių sistema', count: '980', subs: ['Diskai', 'Kaladėlės', 'Suportai', 'Žarnelės'] },
  { icon: '💡', name: 'Žibintai ir optika', count: '760', subs: ['Priekiniai žibintai', 'Galiniai žibintai', 'Rūko žibintai'] },
  { icon: '🚗', name: 'Kėbulo dalys', count: '2,100', subs: ['Kapotas', 'Sparnas', 'Durys', 'Bamperis'] },
  { icon: '❄️', name: 'Kondicionierius', count: '420', subs: ['Kompresorius', 'Radiatorius', 'Vožtuvas'] },
  { icon: '🔌', name: 'Elektrika', count: '650', subs: ['Starteris', 'Generatorius', 'ECU', 'Jutikliai'] },
  { icon: '🪑', name: 'Salonas', count: '390', subs: ['Sėdynės', 'Kilimėliai', 'Valdymo blokai', 'Airbag'] },
]

const countries = [
  { code: 'DE', flag: '🇩🇪', name: 'Vokietija', count: '4,120' },
  { code: 'LT', flag: '🇱🇹', name: 'Lietuva', count: '1,840' },
  { code: 'PL', flag: '🇵🇱', name: 'Lenkija', count: '2,380' },
  { code: 'LV', flag: '🇱🇻', name: 'Latvija', count: '620' },
  { code: 'EE', flag: '🇪🇪', name: 'Estija', count: '430' },
  { code: 'FR', flag: '🇫🇷', name: 'Prancūzija', count: '910' },
  { code: 'NL', flag: '🇳🇱', name: 'Olandija', count: '780' },
]
</script>

<style scoped>
.range-thumb::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #16a34a;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  cursor: pointer;
}
.range-thumb::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #16a34a;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  cursor: pointer;
}
</style>
