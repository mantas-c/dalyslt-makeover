<template>
  <div class="p-6 space-y-5" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Mokėjimai</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">Visos platformos transakcijos · {{ today }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0; background:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Eksportuoti CSV
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#6366F1; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          Ataskaita
        </button>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="k in kpis" :key="k.label" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
        <div class="flex items-start justify-between mb-3">
          <p class="text-xs font-medium" style="color:#64748B;">{{ k.label }}</p>
          <div class="w-7 h-7 rounded-lg flex items-center justify-center" :style="`background:${k.iconBg}`">
            <svg class="w-3.5 h-3.5" :style="`color:${k.iconColor}`" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" :d="k.icon"/></svg>
          </div>
        </div>
        <p class="text-xl font-bold" style="color:#0F172A;">{{ k.value }}</p>
        <p class="text-[11px] mt-1" :style="`color:${k.trendColor}`">{{ k.trend }}</p>
      </div>
    </div>

    <!-- Revenue mini-bars -->
    <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-sm font-bold" style="color:#0F172A;">Savaitinės pajamos</h2>
          <p class="text-xs mt-0.5" style="color:#64748B;">Bendros transakcijos per dieną, €</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5"><div class="w-3 h-3 rounded-sm" style="background:#6366F1;"></div><span class="text-xs" style="color:#64748B;">GMV</span></div>
          <div class="flex items-center gap-1.5"><div class="w-3 h-3 rounded-sm" style="background:#14A34A;"></div><span class="text-xs" style="color:#64748B;">Komisija</span></div>
        </div>
      </div>
      <div class="flex items-end gap-2" style="height:72px;">
        <div v-for="(d, i) in dailyRevenue" :key="i" class="flex-1 flex flex-col items-center gap-1">
          <div class="w-full relative rounded-t-sm overflow-hidden flex flex-col justify-end" :style="`height:${d.gmvH}px; background:#EEF2FF;`">
            <div class="w-full rounded-t-sm" :style="`height:${d.comH}px; background:#6366F1; min-height:2px;`"></div>
          </div>
          <span class="text-[10px]" style="color:#94A3B8;">{{ d.label }}</span>
        </div>
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
          <span v-if="tab.count !== undefined" class="ml-1">{{ tab.count }}</span>
        </button>
      </div>
      <div class="relative flex-1 max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input v-model="search" type="text" placeholder="Ieškoti TXN ID, tiekėjo..." class="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
      </div>
    </div>

    <!-- Transactions table -->
    <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
      <div class="overflow-x-auto">
        <div class="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider min-w-[940px]"
          style="grid-template-columns:110px 1fr 140px 130px 90px 80px 80px 90px; color:#94A3B8; border-bottom:1px solid #F1F5F9;">
          <span>TXN ID</span><span>Dalis / Užklausa</span><span>Tiekėjas</span><span>Pirkėjas</span><span>Suma</span><span>Komisija</span><span>Būsena</span><span>Data</span>
        </div>
        <div class="divide-y min-w-[940px]">
          <div v-for="tx in filteredTx" :key="tx.id"
            class="grid items-center px-5 py-3 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
            style="grid-template-columns:110px 1fr 140px 130px 90px 80px 80px 90px;">
            <span class="text-xs font-mono font-bold" style="color:#6366F1;">{{ tx.id }}</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ tx.part }}</p>
              <p class="text-[11px] font-mono truncate" style="color:#94A3B8;">{{ tx.query }}</p>
            </div>
            <div class="min-w-0">
              <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ tx.supplier }}</p>
            </div>
            <p class="text-xs truncate" style="color:#64748B;">{{ tx.buyer }}</p>
            <p class="text-sm font-bold" style="color:#0F172A;">€{{ tx.amount }}</p>
            <p class="text-sm font-semibold" style="color:#6366F1;">€{{ tx.commission }}</p>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" :style="txStyle(tx.status)">
              <span class="w-1.5 h-1.5 rounded-full" :style="txDot(tx.status)"></span>
              {{ txLabel(tx.status) }}
            </span>
            <p class="text-xs" style="color:#94A3B8;">{{ tx.date }}</p>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex items-center justify-between px-5 py-3" style="border-top:1px solid #F1F5F9;">
        <p class="text-xs" style="color:#94A3B8;">Rodoma 1–10 iš 284</p>
        <div class="flex items-center gap-1">
          <button v-for="p in [1,2,3,'...',28]" :key="p"
            class="w-7 h-7 flex items-center justify-center rounded-md text-xs font-semibold cursor-pointer transition-colors duration-150"
            :style="p === 1 ? 'background:#EEF2FF; color:#6366F1;' : 'color:#64748B; hover:background:#F8FAFC;'">
            {{ p }}
          </button>
          <button class="w-7 h-7 flex items-center justify-center rounded-md text-xs cursor-pointer hover:bg-slate-100" style="color:#64748B;">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Mokėjimai — recar Admin' })

const today = new Date().toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' })
const activeTab = ref('all')
const search = ref('')

const tabs = [
  { key: 'all',       label: 'Visi',      count: 284 },
  { key: 'completed', label: 'Atlikti',   count: 198 },
  { key: 'pending',   label: 'Laukia',    count: 52  },
  { key: 'transit',   label: 'Siunčiama', count: 34  },
]

const kpis = [
  { label:'GMV šį mėnesį',   value:'€48 320', trend:'↑23% vs vasaris', trendColor:'#14A34A', icon:'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', iconBg:'#EEF2FF', iconColor:'#6366F1' },
  { label:'Komisija (3%)',    value:'€1 450',  trend:'↑18% vs vasaris', trendColor:'#14A34A', icon:'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z', iconBg:'#F0FDF4', iconColor:'#14A34A' },
  { label:'Laukia mokėjimo', value:'€3 840',  trend:'52 transakcijos', trendColor:'#D97706', icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', iconBg:'#FFFBEB', iconColor:'#F59E0B' },
  { label:'Vid. sandorio',    value:'€163',    trend:'per transakciją', trendColor:'#64748B', icon:'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1', iconBg:'#FDF4FF', iconColor:'#A855F7' },
]

const dailyRevenue = [
  { label:'Pir', gmvH: 45, comH: 14 },
  { label:'Ant', gmvH: 62, comH: 19 },
  { label:'Tre', gmvH: 38, comH: 11 },
  { label:'Ket', gmvH: 71, comH: 21 },
  { label:'Pen', gmvH: 55, comH: 17 },
  { label:'Šeš', gmvH: 28, comH:  8 },
  { label:'Sek', gmvH: 18, comH:  5 },
]

const transactions = [
  { id:'TXN-8821', part:'Priekinis bamperis (M-packet)', query:'UZK-2855', supplier:'UAB AutoDalys',  buyer:'Draudimas LT',  amount:'185', commission:'5.55',  status:'completed', date:'23.03.26 14:22' },
  { id:'TXN-8820', part:'Kolona dešinė',                  query:'UZK-2852', supplier:'MB AutoSalvage', buyer:'Gjensidige LT', amount:'95',  commission:'2.85',  status:'completed', date:'23.03.26 12:05' },
  { id:'TXN-8819', part:'Dešinės pusės veidrodis',        query:'UZK-2848', supplier:'Parts24.lt',     buyer:'If P&C',        amount:'65',  commission:'1.95',  status:'pending',   date:'22.03.26 18:44' },
  { id:'TXN-8818', part:'Priekinė optika kairė',          query:'UZK-2851', supplier:'UAB AutoDalys',  buyer:'Ergo LT',       amount:'280', commission:'8.40',  status:'transit',   date:'22.03.26 16:30' },
  { id:'TXN-8817', part:'Durys kairės pusės',             query:'UZK-2853', supplier:'MB Parts LT',    buyer:'Balta',         amount:'121', commission:'3.63',  status:'pending',   date:'22.03.26 11:15' },
  { id:'TXN-8816', part:'Variklio dangtis',                query:'UZK-2854', supplier:'UAB AutoDalys',  buyer:'If P&C',        amount:'145', commission:'4.35',  status:'completed', date:'21.03.26 09:50' },
  { id:'TXN-8815', part:'Priekinė ašis',                  query:'UZK-2849', supplier:'MB AutoSalvage', buyer:'Draudimas LT',  amount:'195', commission:'5.85',  status:'transit',   date:'21.03.26 08:20' },
  { id:'TXN-8814', part:'Stiklas priekinis',              query:'UZK-2846', supplier:'UAB AutoDalys',  buyer:'Balta',         amount:'320', commission:'9.60',  status:'completed', date:'20.03.26 16:44' },
  { id:'TXN-8813', part:'Galinis bamperis',               query:'UZK-2847', supplier:'Parts24.lt',     buyer:'Ergo LT',       amount:'88',  commission:'2.64',  status:'pending',   date:'20.03.26 14:12' },
  { id:'TXN-8812', part:'Oro kondicionierius',             query:'UZK-2850', supplier:'MB Parts LT',    buyer:'Gjensidige LT', amount:'240', commission:'7.20',  status:'completed', date:'20.03.26 10:05' },
]

const filteredTx = computed(() => transactions.filter(tx => {
  if (activeTab.value !== 'all' && tx.status !== activeTab.value) return false
  if (search.value && !tx.id.toLowerCase().includes(search.value.toLowerCase()) && !tx.supplier.toLowerCase().includes(search.value.toLowerCase())) return false
  return true
}))

function txStyle(s: string) {
  if (s === 'completed') return 'background:#F0FDF4; color:#14A34A;'
  if (s === 'pending')   return 'background:#FFFBEB; color:#D97706;'
  if (s === 'transit')   return 'background:#EFF6FF; color:#3B82F6;'
  return 'background:#F1F5F9; color:#64748B;'
}
function txDot(s: string) {
  if (s === 'completed') return 'background:#14A34A;'
  if (s === 'pending')   return 'background:#F59E0B;'
  if (s === 'transit')   return 'background:#3B82F6;'
  return 'background:#94A3B8;'
}
function txLabel(s: string) {
  return { completed:'Atlikta', pending:'Laukia', transit:'Siunčiama' }[s] ?? s
}
</script>
