<template>
  <div class="p-6 space-y-5" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Pirkėjai</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">Draudimo kompanijos ir pirkėjai · 24 iš viso</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0; background:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Eksportuoti
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#6366F1; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Pridėti pirkėją
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

    <!-- Search -->
    <div class="flex items-center gap-3">
      <div class="relative flex-1 max-w-sm">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input v-model="search" type="text" placeholder="Ieškoti pirkėjų..." class="w-full pl-9 pr-4 py-2 text-sm rounded-lg focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
      </div>
      <select v-model="filterType" class="px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
        <option value="">Visi tipai</option>
        <option value="insurance">Draudimo kompanija</option>
        <option value="company">Įmonė</option>
        <option value="private">Privatus</option>
      </select>
      <select v-model="filterStatus" class="px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#fff; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
        <option value="">Visos būsenos</option>
        <option value="active">Aktyvus</option>
        <option value="inactive">Neaktyvus</option>
      </select>
    </div>

    <!-- Table -->
    <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
      <div class="overflow-x-auto">
        <div class="grid px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider min-w-[860px]"
          style="grid-template-columns:44px 1fr 140px 110px 90px 90px 100px 80px; color:#94A3B8; border-bottom:1px solid #F1F5F9;">
          <span></span><span>Pirkėjas</span><span>El. paštas</span><span>Tipas</span><span>Užklausos</span><span>Išlaidos</span><span>Paskutinis aktyvumas</span><span>Būsena</span>
        </div>
        <div class="divide-y min-w-[860px]">
          <div v-for="c in filteredCustomers" :key="c.id"
            class="grid items-center px-5 py-3.5 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
            style="grid-template-columns:44px 1fr 140px 110px 90px 90px 100px 80px;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" :style="`background:${c.bg}; color:${c.color};`">{{ c.initials }}</div>
            <div class="min-w-0">
              <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ c.name }}</p>
              <p class="text-xs truncate mt-0.5" style="color:#94A3B8;">{{ c.contact }}</p>
            </div>
            <p class="text-xs truncate" style="color:#64748B;">{{ c.email }}</p>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold" :style="typeStyle(c.type)">{{ typeLabel(c.type) }}</span>
            <p class="text-sm font-semibold" style="color:#0F172A;">{{ c.queries }}</p>
            <p class="text-sm font-bold" style="color:#3B82F6;">€{{ c.spend }}</p>
            <p class="text-xs" style="color:#94A3B8;">{{ c.lastActive }}</p>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              :style="c.status === 'active' ? 'background:#F0FDF4; color:#14A34A;' : 'background:#F1F5F9; color:#94A3B8;'">
              <span class="w-1.5 h-1.5 rounded-full" :style="c.status === 'active' ? 'background:#14A34A;' : 'background:#94A3B8;'"></span>
              {{ c.status === 'active' ? 'Aktyvus' : 'Neaktyvus' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Pirkėjai — recar Admin' })

const search = ref('')
const filterType = ref('')
const filterStatus = ref('')

const kpis = [
  { label:'Visi pirkėjai',     value:'24',     trend:'+2 šį mėnesį',  trendColor:'#14A34A', icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', iconBg:'#EFF6FF', iconColor:'#3B82F6' },
  { label:'Draudimo kompanijos', value:'18',   trend:'75% rinkos',    trendColor:'#64748B', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', iconBg:'#EFF6FF', iconColor:'#3B82F6' },
  { label:'Vid. mėnesio išlaidos', value:'€432', trend:'per pirkėją', trendColor:'#64748B', icon:'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1', iconBg:'#EEF2FF', iconColor:'#6366F1' },
  { label:'Iš viso išleista',  value:'€48.3k', trend:'šį mėnesį',    trendColor:'#14A34A', icon:'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', iconBg:'#FFFBEB', iconColor:'#F59E0B' },
]

const customers = [
  { id:1,  name:'UAB Draudimas LT',   initials:'D',  email:'info@draudimas.lt',    contact:'Elena Kazlauskienė',    type:'insurance', queries:87,  spend:'12 840', lastActive:'prieš 2 val.',  status:'active',   bg:'#EFF6FF', color:'#3B82F6' },
  { id:2,  name:'If P&C Insurance',   initials:'IF', email:'lt@if.ee',             contact:'Tomas Petrauskas',       type:'insurance', queries:64,  spend:'9 120',  lastActive:'prieš 5 val.',  status:'active',   bg:'#F0FDF4', color:'#14A34A' },
  { id:3,  name:'Ergo Lietuva',        initials:'E',  email:'info@ergo.lt',         contact:'Rasa Jonaitienė',        type:'insurance', queries:51,  spend:'7 680',  lastActive:'vakar',          status:'active',   bg:'#FEF2F2', color:'#EF4444' },
  { id:4,  name:'Gjensidige LT',       initials:'GJ', email:'info@gjensidige.lt',  contact:'Andrius Savickas',       type:'insurance', queries:43,  spend:'6 450',  lastActive:'prieš 1 d.',    status:'active',   bg:'#FDF4FF', color:'#A855F7' },
  { id:5,  name:'Balta',               initials:'B',  email:'info@balta.lt',        contact:'Laura Mikalajūnaitė',   type:'insurance', queries:38,  spend:'5 700',  lastActive:'prieš 2 d.',    status:'active',   bg:'#FFFBEB', color:'#F59E0B' },
  { id:6,  name:'Compensa Vienna',     initials:'CV', email:'lt@compensa.lt',       contact:'Mantas Grigas',          type:'insurance', queries:29,  spend:'4 350',  lastActive:'prieš 3 d.',    status:'active',   bg:'#EEF2FF', color:'#6366F1' },
  { id:7,  name:'UAB AutoServisas',    initials:'AS', email:'info@autoservisas.lt', contact:'Viktorija Tamašauskė',  type:'company',   queries:12,  spend:'1 800',  lastActive:'prieš 1 sav.',  status:'active',   bg:'#F0FDF4', color:'#14A34A' },
  { id:8,  name:'MB Remonto Centras',  initials:'RC', email:'remonto@centras.lt',   contact:'Darius Liutkus',         type:'company',   queries:8,   spend:'1 200',  lastActive:'prieš 2 sav.',  status:'inactive', bg:'#F8FAFC', color:'#94A3B8' },
]

const filteredCustomers = computed(() => customers.filter(c => {
  if (search.value && !c.name.toLowerCase().includes(search.value.toLowerCase())) return false
  if (filterType.value && c.type !== filterType.value) return false
  if (filterStatus.value && c.status !== filterStatus.value) return false
  return true
}))

function typeStyle(t: string) {
  if (t === 'insurance') return 'background:#EFF6FF; color:#3B82F6;'
  if (t === 'company')   return 'background:#EEF2FF; color:#6366F1;'
  return 'background:#F1F5F9; color:#64748B;'
}
function typeLabel(t: string) {
  return { insurance:'Draudimas', company:'Įmonė', private:'Privatus' }[t] ?? t
}
</script>
