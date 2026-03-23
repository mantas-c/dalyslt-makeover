<template>
  <div class="p-6 space-y-5" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Užklausos</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">Visos platformos užklausos · 284 iš viso</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#6366F1; color:#fff;">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        Eksportuoti CSV
      </button>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-5 gap-4">
      <div v-for="k in kpis" :key="k.label" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
        <p class="text-xs font-medium mb-2" style="color:#64748B;">{{ k.label }}</p>
        <p class="text-xl font-bold" style="color:#0F172A;">{{ k.value }}</p>
        <p class="text-[11px] mt-1" :style="`color:${k.trendColor}`">{{ k.trend }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex items-center gap-3">
      <!-- Tabs -->
      <div class="flex items-center gap-1 p-1 rounded-lg" style="background:#F1F5F9;">
        <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
          class="px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors duration-150"
          :style="activeTab === tab.key ? 'background:#fff; color:#6366F1; box-shadow:0 1px 3px rgba(0,0,0,0.1);' : 'color:#64748B;'">
          {{ tab.label }}
          <span v-if="tab.count" class="ml-1 text-[10px] font-bold">{{ tab.count }}</span>
        </button>
      </div>
      <div class="flex-1 relative max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input v-model="search" type="text" placeholder="Ieškoti..." class="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
      </div>
      <select v-model="filterStatus" class="px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
        <option value="">Visos būsenos</option>
        <option value="open">Aktyvi</option>
        <option value="offers">Pasiūlymai</option>
        <option value="transit">Pristatoma</option>
        <option value="completed">Atlikta</option>
      </select>
    </div>

    <!-- Table -->
    <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
      <div class="overflow-x-auto">
        <div class="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider min-w-[860px]"
          style="grid-template-columns:80px 1fr 140px 120px 80px 80px 80px 80px; color:#94A3B8; border-bottom:1px solid #F1F5F9;">
          <span>ID</span><span>Užklausa</span><span>Pirkėjas</span><span>Tiekėjas</span><span>Pasiūlymai</span><span>Suma</span><span>Būsena</span><span>Data</span>
        </div>
        <div class="divide-y min-w-[860px]">
          <div v-for="q in filteredQueries" :key="q.id"
            class="grid items-center px-5 py-3 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
            style="grid-template-columns:80px 1fr 140px 120px 80px 80px 80px 80px;">
            <span class="text-[11px] font-mono font-semibold" style="color:#6366F1;">{{ q.id }}</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ q.part }}</p>
              <p class="text-xs truncate mt-0.5" style="color:#94A3B8;">{{ q.car }}</p>
            </div>
            <p class="text-xs truncate" style="color:#64748B;">{{ q.buyer }}</p>
            <p class="text-xs truncate" style="color:#64748B;">{{ q.supplier || '—' }}</p>
            <div class="flex items-center gap-1">
              <div v-for="n in Math.min(q.offers,4)" :key="n" class="w-1.5 h-3 rounded-sm" :style="q.offers > 0 ? 'background:#14A34A; opacity:0.7;' : 'background:#E2E8F0;'"></div>
              <span class="text-xs font-bold ml-1" :style="q.offers > 0 ? 'color:#14A34A;' : 'color:#94A3B8;'">{{ q.offers }}</span>
            </div>
            <p class="text-sm font-bold" style="color:#0F172A;">{{ q.amount ? `€${q.amount}` : '—' }}</p>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" :style="statusStyle(q.status)">
              <span class="w-1.5 h-1.5 rounded-full" :style="statusDot(q.status)"></span>
              {{ statusLabel(q.status) }}
            </span>
            <p class="text-xs" style="color:#94A3B8;">{{ q.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Užklausos — recar Admin' })

const activeTab = ref('all')
const search = ref('')
const filterStatus = ref('')

const tabs = [
  { key: 'all',       label: 'Visos',       count: 284 },
  { key: 'open',      label: 'Aktyvios',    count: 142 },
  { key: 'offers',    label: 'Su pasiūlymais', count: 86 },
  { key: 'transit',   label: 'Siunčiamos',  count: 31 },
  { key: 'completed', label: 'Atliktos',    count: 25 },
]

const kpis = [
  { label: 'Iš viso užklausų',   value: '284', trend: '+12 šiandien',  trendColor: '#14A34A' },
  { label: 'Neatsakytos',        value: '142', trend: '50% neatsakyta', trendColor: '#D97706' },
  { label: 'Su pasiūlymais',     value: '86',  trend: '30% konversija', trendColor: '#6366F1' },
  { label: 'Vid. pasiūlymų sk.', value: '3.2', trend: 'per užklausą',   trendColor: '#64748B' },
  { label: 'Vid. uždaryta per',  value: '4.2d',trend: 'nuo sukūrimo',   trendColor: '#64748B' },
]

const allQueries = [
  { id:'UZK-2855', part:'Priekinis bamperis (M-packet)', car:'BMW E60 520d 2005',      buyer:'Draudimas LT',  supplier:'UAB AutoDalys',  offers:4, amount:'185', status:'offers',    date:'23.03' },
  { id:'UZK-2854', part:'Variklio dangtis',              car:'Audi A4 B8 2010',         buyer:'If P&C',        supplier:null,             offers:1, amount:null,  status:'open',      date:'23.03' },
  { id:'UZK-2853', part:'Kairės pusės durys',            car:'VW Golf VII 1.6 2016',    buyer:'Ergo LT',       supplier:'MB Parts LT',    offers:3, amount:'265', status:'transit',   date:'22.03' },
  { id:'UZK-2852', part:'Dešinės pusės veidrodis',       car:'Skoda Octavia A5 2009',   buyer:'Gjensidige',    supplier:'Parts24.lt',     offers:2, amount:'65',  status:'completed', date:'21.03' },
  { id:'UZK-2851', part:'Priekinė optika kairė',         car:'Mercedes C-Class W204',   buyer:'Balta',         supplier:'UAB AutoDalys',  offers:3, amount:'280', status:'completed', date:'20.03' },
  { id:'UZK-2850', part:'Oro kondicionierius',            car:'BMW 3 E90 320d 2007',     buyer:'Draudimas LT',  supplier:null,             offers:0, amount:null,  status:'open',      date:'20.03' },
  { id:'UZK-2849', part:'Priekinė ašis',                 car:'Toyota Corolla 2012',      buyer:'If P&C',        supplier:'MB AutoSalvage', offers:2, amount:'195', status:'transit',   date:'19.03' },
  { id:'UZK-2848', part:'Galinis bamperis',               car:'Honda Civic 2015',         buyer:'Ergo LT',       supplier:null,             offers:1, amount:null,  status:'open',      date:'19.03' },
  { id:'UZK-2847', part:'Vairas su airbag',              car:'Ford Focus III 2013',      buyer:'Gjensidige',    supplier:'Parts24.lt',     offers:4, amount:'145', status:'offers',    date:'18.03' },
  { id:'UZK-2846', part:'Stiklas priekinis',             car:'Volkswagen Passat B7',     buyer:'Balta',         supplier:'UAB AutoDalys',  offers:2, amount:'320', status:'transit',   date:'18.03' },
]

const filteredQueries = computed(() => {
  return allQueries.filter(q => {
    if (activeTab.value !== 'all' && q.status !== activeTab.value) return false
    if (filterStatus.value && q.status !== filterStatus.value) return false
    if (search.value && !q.part.toLowerCase().includes(search.value.toLowerCase()) && !q.id.toLowerCase().includes(search.value.toLowerCase())) return false
    return true
  })
})

function statusStyle(s: string) {
  if (s === 'open')      return 'background:#EFF6FF; color:#2563EB;'
  if (s === 'offers')    return 'background:#F0FDF4; color:#14A34A;'
  if (s === 'transit')   return 'background:#FFFBEB; color:#D97706;'
  if (s === 'completed') return 'background:#FDF4FF; color:#9333EA;'
  return 'background:#F1F5F9; color:#64748B;'
}
function statusDot(s: string) {
  if (s === 'open')      return 'background:#3B82F6;'
  if (s === 'offers')    return 'background:#14A34A;'
  if (s === 'transit')   return 'background:#F59E0B;'
  if (s === 'completed') return 'background:#A855F7;'
  return 'background:#94A3B8;'
}
function statusLabel(s: string) {
  const m: Record<string,string> = { open:'Aktyvi', offers:'Pasiūlymai', transit:'Siunčiama', completed:'Atlikta' }
  return m[s] ?? s
}
</script>
