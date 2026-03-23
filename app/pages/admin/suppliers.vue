<template>
  <div class="p-6 space-y-5" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Tiekėjai</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">Registruoti sandėliai ir automobilių dalių tiekėjai · 38 iš viso</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0; background:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Eksportuoti
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#6366F1; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Pridėti tiekėją
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

    <!-- Search + filter -->
    <div class="flex items-center gap-3">
      <div class="relative flex-1 max-w-sm">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input v-model="search" type="text" placeholder="Ieškoti tiekėjų..." class="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
      </div>
      <select v-model="filterCity" class="px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
        <option value="">Visi miestai</option>
        <option>Vilnius</option><option>Kaunas</option><option>Klaipėda</option><option>Šiauliai</option>
      </select>
      <select v-model="filterStatus" class="px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
        <option value="">Visos būsenos</option>
        <option value="active">Aktyvus</option>
        <option value="pending">Laukia</option>
        <option value="blocked">Užblokuotas</option>
      </select>
    </div>

    <!-- Table -->
    <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
      <div class="overflow-x-auto">
        <div class="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider min-w-[900px]"
          style="grid-template-columns:44px 1fr 120px 80px 90px 90px 90px 80px 80px; color:#94A3B8; border-bottom:1px solid #F1F5F9;">
          <span></span><span>Tiekėjas</span><span>Miestas</span><span>Įvertinimas</span><span>Užklausos</span><span>Pasiūlymai</span><span>GMV</span><span>Būsena</span><span>Veiksmai</span>
        </div>
        <div class="divide-y min-w-[900px]">
          <div v-for="s in filteredSuppliers" :key="s.id"
            class="grid items-center px-5 py-3.5 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
            style="grid-template-columns:44px 1fr 120px 80px 90px 90px 90px 80px 80px;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" :style="`background:${s.bg}; color:${s.color};`">{{ s.initials }}</div>
            <div class="min-w-0">
              <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ s.name }}</p>
              <p class="text-xs truncate mt-0.5" style="color:#94A3B8;">{{ s.email }}</p>
            </div>
            <p class="text-xs" style="color:#64748B;">{{ s.city }}</p>
            <div class="flex items-center gap-1">
              <svg class="w-3 h-3" style="color:#F59E0B;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span class="text-xs font-bold" style="color:#0F172A;">{{ s.rating }}</span>
            </div>
            <p class="text-sm font-semibold" style="color:#0F172A;">{{ s.queries }}</p>
            <p class="text-sm font-semibold" style="color:#0F172A;">{{ s.offers }}</p>
            <p class="text-sm font-bold" style="color:#6366F1;">{{ s.gmv }}</p>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" :style="supStyle(s.status)">
              <span class="w-1.5 h-1.5 rounded-full" :style="supDot(s.status)"></span>
              {{ supLabel(s.status) }}
            </span>
            <div class="flex items-center gap-1">
              <button class="px-2 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors duration-150 hover:bg-indigo-50" style="color:#6366F1;">Peržiūrėti</button>
              <button v-if="s.status === 'pending'" class="px-2 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors duration-150 hover:bg-green-50" style="color:#14A34A;">Patvirtinti</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Tiekėjai — recar Admin' })

const search = ref('')
const filterCity = ref('')
const filterStatus = ref('')

const kpis = [
  { label:'Visi tiekėjai',     value:'38',    trend:'+2 šį mėnesį',  trendColor:'#14A34A', icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5', iconBg:'#EEF2FF', iconColor:'#6366F1' },
  { label:'Aktyvūs',           value:'31',    trend:'82% aktyvūs',   trendColor:'#14A34A', icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',                         iconBg:'#F0FDF4', iconColor:'#14A34A' },
  { label:'Laukia verifikacijos', value:'5',  trend:'Neverifikuoti', trendColor:'#D97706', icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                           iconBg:'#FFFBEB', iconColor:'#F59E0B' },
  { label:'Vid. įvertinimas',  value:'4.7★',  trend:'312 atsiliepimų',trendColor:'#64748B', icon:'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', iconBg:'#FFFBEB', iconColor:'#F59E0B' },
]

const suppliers = [
  { id:1,  name:'UAB AutoDalys',   initials:'AD', email:'info@autodalys.lt',    city:'Vilnius',  rating:4.9, queries:187, offers:142, gmv:'€12.4k', status:'active',  bg:'#F0FDF4', color:'#14A34A' },
  { id:2,  name:'MB AutoSalvage',  initials:'MS', email:'info@autosalvage.lt',  city:'Kaunas',   rating:4.7, queries:124, offers:89,  gmv:'€8.2k',  status:'active',  bg:'#EFF6FF', color:'#3B82F6' },
  { id:3,  name:'Parts24.lt',      initials:'P2', email:'hello@parts24.lt',     city:'Klaipėda', rating:4.5, queries:98,  offers:71,  gmv:'€6.1k',  status:'active',  bg:'#EEF2FF', color:'#6366F1' },
  { id:4,  name:'MB Parts LT',     initials:'MP', email:'mb@partslt.lt',        city:'Vilnius',  rating:4.8, queries:76,  offers:58,  gmv:'€4.8k',  status:'active',  bg:'#FFFBEB', color:'#F59E0B' },
  { id:5,  name:'UAB FastParts',   initials:'FP', email:'fast@parts.lt',        city:'Kaunas',   rating:null, queries:0,  offers:0,   gmv:'—',      status:'pending', bg:'#FDF4FF', color:'#A855F7' },
  { id:6,  name:'AutoDonoras MB',  initials:'AU', email:'auto@donoras.lt',      city:'Šiauliai', rating:4.3, queries:45,  offers:31,  gmv:'€2.9k',  status:'active',  bg:'#FEF2F2', color:'#EF4444' },
  { id:7,  name:'MB AutoVilnius',  initials:'AV', email:'info@autovilnius.lt',  city:'Vilnius',  rating:null, queries:0,  offers:0,   gmv:'—',      status:'pending', bg:'#F8FAFC', color:'#64748B' },
  { id:8,  name:'SandėlisLT UAB', initials:'SL', email:'sandelis@lt.lt',       city:'Kaunas',   rating:4.6, queries:62,  offers:44,  gmv:'€3.4k',  status:'active',  bg:'#F0FDF4', color:'#14A34A' },
]

const filteredSuppliers = computed(() => suppliers.filter(s => {
  if (search.value && !s.name.toLowerCase().includes(search.value.toLowerCase())) return false
  if (filterCity.value && s.city !== filterCity.value) return false
  if (filterStatus.value && s.status !== filterStatus.value) return false
  return true
}))

function supStyle(s: string) {
  if (s === 'active')  return 'background:#F0FDF4; color:#14A34A;'
  if (s === 'pending') return 'background:#FFFBEB; color:#D97706;'
  if (s === 'blocked') return 'background:#FEF2F2; color:#DC2626;'
  return 'background:#F1F5F9; color:#64748B;'
}
function supDot(s: string) {
  if (s === 'active')  return 'background:#14A34A;'
  if (s === 'pending') return 'background:#F59E0B;'
  if (s === 'blocked') return 'background:#EF4444;'
  return 'background:#94A3B8;'
}
function supLabel(s: string) {
  return { active:'Aktyvus', pending:'Laukia', blocked:'Užblokuotas' }[s] ?? s
}
</script>
