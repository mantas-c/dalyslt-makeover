<template>
  <div class="p-6 space-y-6" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-medium mb-0.5" style="color:#94A3B8;">{{ greeting }}, Super Admin</p>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Platformos suvestinė</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">recar marketplace · {{ today }}</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5 px-3 py-2 rounded-lg" style="background:#F0FDF4; border:1px solid #BBF7D0;">
          <span class="w-2 h-2 rounded-full animate-pulse" style="background:#14A34A;"></span>
          <span class="text-xs font-semibold" style="color:#14A34A;">Uptime 99.98%</span>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#6366F1; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Eksportuoti
        </button>
      </div>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 cursor-default"
        style="background:#fff; border:1px solid #E2E8F0; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
        <div class="flex items-start justify-between mb-3">
          <p class="text-xs font-medium" style="color:#64748B;">{{ kpi.label }}</p>
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :style="`background:${kpi.iconBg}`">
            <svg class="w-4 h-4" :style="`color:${kpi.iconColor}`" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="kpi.icon"/>
            </svg>
          </div>
        </div>
        <p class="text-2xl font-bold mb-1" style="color:#0F172A;">{{ kpi.value }}</p>
        <p class="text-xs" :style="`color:${kpi.trendColor}`">{{ kpi.trend }}</p>
      </div>
    </div>

    <!-- Main grid -->
    <div class="grid grid-cols-3 gap-5">

      <!-- LEFT (2/3) -->
      <div class="col-span-2 space-y-5">

        <!-- GMV chart -->
        <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h2 class="text-sm font-bold" style="color:#0F172A;">Bendras apyvartumas (GMV)</h2>
              <p class="text-xs mt-0.5" style="color:#64748B;">Mėnesinės platformos operacijos, €</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="text-xl font-bold" style="color:#6366F1;">€48 320</p>
                <p class="text-xs" style="color:#94A3B8;">kovo mėn.</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold" style="color:#14A34A;">↑23%</p>
                <p class="text-xs" style="color:#94A3B8;">vs vasaris</p>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 540 90" class="w-full" style="height:90px; overflow:visible;">
            <defs>
              <linearGradient id="gmv-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366F1" stop-opacity="0.15"/>
                <stop offset="100%" stop-color="#6366F1" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="0"  x2="540" y2="0"  stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="30" x2="540" y2="30" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="60" x2="540" y2="60" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="90" x2="540" y2="90" stroke="#F1F5F9" stroke-width="1"/>
            <polygon points="0,90 0,72 60,65 120,58 180,50 240,44 300,38 360,30 420,22 480,12 540,0 540,90" fill="url(#gmv-grad)"/>
            <polyline points="0,72 60,65 120,58 180,50 240,44 300,38 360,30 420,22 480,12 540,0" fill="none" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="540" cy="0" r="3.5" fill="#6366F1" stroke="#fff" stroke-width="2"/>
            <text x="540" y="-8" text-anchor="middle" style="font-size:9px; fill:#6366F1; font-weight:700; font-family:inherit;">€48.3k</text>
            <g v-for="(lbl, i) in gmvLabels" :key="'l'+i">
              <text :x="i * 60" y="107" text-anchor="middle" style="font-size:9px; fill:#94A3B8; font-family:inherit;">{{ lbl }}</text>
            </g>
          </svg>
        </div>

        <!-- 2-col: new users + recent queries -->
        <div class="grid grid-cols-2 gap-5">
          <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
            <div class="flex items-center justify-between px-4 py-3" style="border-bottom:1px solid #E2E8F0;">
              <h3 class="text-sm font-bold" style="color:#0F172A;">Nauji vartotojai</h3>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#EEF2FF; color:#6366F1;">+7 šiandien</span>
            </div>
            <div class="divide-y" style="border-color:#F8FAFC;">
              <div v-for="u in newUsers" :key="u.id" class="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-100 hover:bg-slate-50">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" :style="`background:${u.bg}; color:${u.color};`">{{ u.initials }}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ u.name }}</p>
                  <p class="text-[11px] truncate" style="color:#94A3B8;">{{ u.time }}</p>
                </div>
                <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0" :style="u.role === 'Tiekėjas' ? 'background:#F0FDF4; color:#14A34A;' : 'background:#EFF6FF; color:#3B82F6;'">{{ u.role }}</span>
              </div>
            </div>
          </div>

          <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
            <div class="flex items-center justify-between px-4 py-3" style="border-bottom:1px solid #E2E8F0;">
              <h3 class="text-sm font-bold" style="color:#0F172A;">Paskutinės užklausos</h3>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background:#F0FDF4; color:#14A34A;">+12 šiandien</span>
            </div>
            <div class="divide-y">
              <div v-for="q in recentQueries" :key="q.id" class="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-100 hover:bg-slate-50">
                <div class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="`background:${q.dot};`"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ q.part }}</p>
                  <p class="text-[11px] truncate" style="color:#94A3B8;">{{ q.client }} · {{ q.time }}</p>
                </div>
                <span class="text-[10px] font-semibold flex-shrink-0" :style="`color:${q.dot}`">{{ q.offers }}p.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent payments -->
        <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #E2E8F0;">
            <h2 class="text-sm font-bold" style="color:#0F172A;">Paskutiniai mokėjimai</h2>
            <NuxtLink to="/admin/payments" class="text-xs font-semibold cursor-pointer" style="color:#6366F1;">Visi →</NuxtLink>
          </div>
          <div class="grid px-5 py-2 text-[11px] font-semibold uppercase tracking-wider" style="grid-template-columns:1fr 130px 110px 80px 80px; color:#94A3B8; border-bottom:1px solid #F1F5F9;">
            <span>Dalis</span><span>Tiekėjas</span><span>Pirkėjas</span><span>Suma</span><span>Būsena</span>
          </div>
          <div class="divide-y">
            <div v-for="tx in transactions" :key="tx.id"
              class="grid items-center px-5 py-3 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
              style="grid-template-columns:1fr 130px 110px 80px 80px;">
              <div class="min-w-0">
                <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ tx.part }}</p>
                <p class="text-[11px] truncate font-mono" style="color:#94A3B8;">{{ tx.id }}</p>
              </div>
              <p class="text-xs truncate" style="color:#64748B;">{{ tx.supplier }}</p>
              <p class="text-xs truncate" style="color:#64748B;">{{ tx.buyer }}</p>
              <p class="text-sm font-bold" style="color:#0F172A;">€{{ tx.amount }}</p>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" :style="txStyle(tx.status)">{{ txLabel(tx.status) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT (1/3) -->
      <div class="space-y-4">

        <!-- System health -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-2 h-2 rounded-full animate-pulse" style="background:#14A34A;"></div>
            <h3 class="text-xs font-bold" style="color:#0F172A;">Sistemos būsena</h3>
          </div>
          <div class="space-y-2.5">
            <div v-for="svc in services" :key="svc.name" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full" :style="`background:${svc.ok ? '#14A34A' : '#EF4444'};`"></div>
                <span class="text-xs" style="color:#64748B;">{{ svc.name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-semibold" :style="svc.ok ? 'color:#14A34A' : 'color:#EF4444'">{{ svc.status }}</span>
                <span class="text-[10px]" style="color:#94A3B8;">{{ svc.ms }}</span>
              </div>
            </div>
          </div>
          <div class="mt-3 pt-3" style="border-top:1px solid #E2E8F0;">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs" style="color:#64748B;">Server load</span>
              <span class="text-xs font-bold" style="color:#0F172A;">34%</span>
            </div>
            <div class="h-1.5 rounded-full overflow-hidden" style="background:#F1F5F9;">
              <div class="h-full rounded-full" style="width:34%; background:linear-gradient(90deg,#6366F1,#A5B4FC);"></div>
            </div>
          </div>
        </div>

        <!-- Platform stats -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Platformos rodikliai</h3>
          <div class="space-y-3">
            <div v-for="st in platformStats" :key="st.label" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-md flex items-center justify-center" :style="`background:${st.iconBg}`">
                  <svg class="w-3 h-3" :style="`color:${st.iconColor}`" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="st.icon"/>
                  </svg>
                </div>
                <span class="text-xs" style="color:#64748B;">{{ st.label }}</span>
              </div>
              <span class="text-sm font-bold" style="color:#0F172A;">{{ st.value }}</span>
            </div>
          </div>
        </div>

        <!-- Top suppliers -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold" style="color:#0F172A;">Top tiekėjai</h3>
            <NuxtLink to="/admin/suppliers" class="text-[11px] font-semibold cursor-pointer" style="color:#6366F1;">Visi →</NuxtLink>
          </div>
          <div class="space-y-3">
            <div v-for="(sup, i) in topSuppliers" :key="sup.name" class="flex items-center gap-3">
              <span class="text-[11px] font-bold w-4 text-center flex-shrink-0" style="color:#94A3B8;">{{ i + 1 }}</span>
              <div class="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] flex-shrink-0" :style="`background:${sup.bg}; color:${sup.color};`">{{ sup.initials }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ sup.name }}</p>
                <div class="mt-0.5 h-1 rounded-full overflow-hidden" style="background:#F1F5F9;">
                  <div class="h-full rounded-full" :style="`width:${sup.pct}%; background:#6366F1;`"></div>
                </div>
              </div>
              <span class="text-xs font-bold flex-shrink-0" style="color:#6366F1;">€{{ sup.gmv }}</span>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #FECACA;">
          <div class="flex items-center gap-2 px-4 py-3" style="border-bottom:1px solid #FEE2E2; background:#FEF2F2;">
            <svg class="w-3.5 h-3.5 flex-shrink-0" style="color:#EF4444;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <h3 class="text-xs font-bold" style="color:#DC2626;">Įspėjimai</h3>
            <span class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="background:#EF4444; color:#fff;">3</span>
          </div>
          <div class="divide-y" style="border-color:#FEE2E2;">
            <div v-for="al in alerts" :key="al.id" class="px-4 py-2.5 cursor-pointer transition-colors duration-100 hover:bg-red-50">
              <p class="text-xs font-medium" style="color:#DC2626;">{{ al.text }}</p>
              <p class="text-[11px] mt-0.5" style="color:#94A3B8;">{{ al.time }}</p>
            </div>
          </div>
        </div>

        <!-- Geo -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Geografija</h3>
          <div class="space-y-2">
            <div v-for="geo in geoData" :key="geo.city" class="flex items-center gap-2">
              <span class="text-xs w-16 flex-shrink-0" style="color:#64748B;">{{ geo.city }}</span>
              <div class="flex-1 h-1.5 rounded-full overflow-hidden" style="background:#F1F5F9;">
                <div class="h-full rounded-full" :style="`width:${geo.pct}%; background:#6366F1;`"></div>
              </div>
              <span class="text-xs font-bold w-8 text-right flex-shrink-0" style="color:#6366F1;">{{ geo.pct }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
useHead({ title: 'Admin suvestinė — recar' })

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Labas rytas' : hour < 18 ? 'Laba diena' : 'Labas vakaras'
const today = now.toLocaleDateString('lt-LT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const kpis = [
  { label: 'Visi vartotojai',    value: '142',     trend: '+7 šiandien',    trendColor: '#14A34A', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', iconBg:'#EEF2FF', iconColor:'#6366F1' },
  { label: 'Aktyvios užklausos', value: '284',     trend: '+12 šiandien',   trendColor: '#14A34A', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', iconBg:'#F0FDF4', iconColor:'#14A34A' },
  { label: 'GMV šį mėnesį',      value: '€48 320', trend: '↑23% vs vasaris', trendColor: '#14A34A', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', iconBg:'#FFFBEB', iconColor:'#F59E0B' },
  { label: 'Komisija (3%)',       value: '€1 450',  trend: '↑18% vs vasaris', trendColor: '#14A34A', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z', iconBg:'#FDF4FF', iconColor:'#A855F7' },
]
const gmvLabels = ['Bir','Lie','Rug','Rgs','Spa','Lap','Gru','Sau','Vas','Kov']
const newUsers = [
  { id:1, name:'UAB FastParts',    initials:'FP', role:'Tiekėjas', time:'prieš 12 min.', bg:'#F0FDF4', color:'#14A34A' },
  { id:2, name:'If P&C Insurance', initials:'IF', role:'Pirkėjas', time:'prieš 38 min.', bg:'#EFF6FF', color:'#3B82F6' },
  { id:3, name:'MB AutoVilnius',   initials:'AV', role:'Tiekėjas', time:'prieš 1 val.',  bg:'#F0FDF4', color:'#14A34A' },
  { id:4, name:'Gjensidige LT',    initials:'GJ', role:'Pirkėjas', time:'prieš 2 val.',  bg:'#EFF6FF', color:'#3B82F6' },
  { id:5, name:'UAB AutoDonoras',  initials:'AD', role:'Tiekėjas', time:'prieš 3 val.',  bg:'#F0FDF4', color:'#14A34A' },
]
const recentQueries = [
  { id:1, part:'BMW E60 — Priekinis bamperis', client:'Draudimas LT', time:'5 min.', offers:3, dot:'#14A34A' },
  { id:2, part:'Audi A4 — Variklio dangtis',   client:'If P&C',       time:'18 min.', offers:1, dot:'#F59E0B' },
  { id:3, part:'VW Golf VII — Durys kairė',     client:'Ergo LT',      time:'32 min.', offers:4, dot:'#14A34A' },
  { id:4, part:'Skoda Octavia — Veidrodis',     client:'Gjensidige',   time:'1 val.',  offers:2, dot:'#6366F1' },
  { id:5, part:'Mercedes W204 — Sparnas',       client:'Balta',        time:'1.5 val.',offers:0, dot:'#94A3B8' },
]
const transactions = [
  { id:'TXN-8821', part:'BMW E60 — Bamperis',     supplier:'UAB AutoDalys',  buyer:'Draudimas LT', amount:'185', status:'completed' },
  { id:'TXN-8820', part:'Skoda Octavia — Kolona', supplier:'MB AutoSalvage', buyer:'Gjensidige',   amount:'95',  status:'completed' },
  { id:'TXN-8819', part:'VW Passat — Veidrodis',  supplier:'Parts24.lt',     buyer:'If P&C',       amount:'65',  status:'pending'   },
  { id:'TXN-8818', part:'Audi A4 — Optika',       supplier:'UAB AutoDalys',  buyer:'Ergo LT',      amount:'280', status:'transit'   },
  { id:'TXN-8817', part:'VW Golf — Durys',        supplier:'MB Parts LT',    buyer:'Balta',        amount:'121', status:'pending'   },
]
const services = [
  { name:'API serveris',   status:'Veikia',   ms:'12ms',  ok:true  },
  { name:'Duomenų bazė',   status:'Veikia',   ms:'4ms',   ok:true  },
  { name:'Failų saugykla', status:'Veikia',   ms:'8ms',   ok:true  },
  { name:'El. paštas',     status:'Veikia',   ms:'45ms',  ok:true  },
  { name:'SMS paslauga',   status:'Delsimas', ms:'320ms', ok:false },
]
const platformStats = [
  { label:'Vid. atsakymo laikas', value:'2.8 val.', icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',                                                                          iconBg:'#EEF2FF', iconColor:'#6366F1' },
  { label:'Konversijų rodiklis',  value:'61%',      icon:'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',                                                                                       iconBg:'#F0FDF4', iconColor:'#14A34A' },
  { label:'Vid. sandorio kaina',  value:'€163',     icon:'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1',                                      iconBg:'#FFFBEB', iconColor:'#F59E0B' },
  { label:'Aktyvūs tiekėjai',     value:'38',       icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5',                                                 iconBg:'#F0FDF4', iconColor:'#14A34A' },
  { label:'Aktyvūs pirkėjai',     value:'24',       icon:'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',                                                                           iconBg:'#EFF6FF', iconColor:'#3B82F6' },
]
const topSuppliers = [
  { name:'UAB AutoDalys',  initials:'AD', gmv:'12.4k', pct:90, bg:'#F0FDF4', color:'#14A34A' },
  { name:'MB AutoSalvage', initials:'MS', gmv:'8.2k',  pct:60, bg:'#EFF6FF', color:'#3B82F6' },
  { name:'Parts24.lt',     initials:'P2', gmv:'6.1k',  pct:44, bg:'#EEF2FF', color:'#6366F1' },
  { name:'MB Parts LT',    initials:'MP', gmv:'4.8k',  pct:35, bg:'#FFFBEB', color:'#F59E0B' },
]
const alerts = [
  { id:1, text:'SMS paslauga — atsakymo delsimas >300ms',      time:'prieš 15 min.' },
  { id:2, text:'3 mokėjimai laukia >24 val. patvirtinimo',     time:'prieš 1 val.'  },
  { id:3, text:'Tiekėjas UAB FastParts neverifikuotas',        time:'prieš 3 val.'  },
]
const geoData = [
  { city:'Vilnius',   pct:58 },
  { city:'Kaunas',    pct:24 },
  { city:'Klaipėda', pct:11 },
  { city:'Šiauliai',  pct:5  },
  { city:'Kita',      pct:2  },
]
function txStyle(s: string) {
  if (s === 'completed') return 'background:#F0FDF4; color:#14A34A;'
  if (s === 'pending')   return 'background:#FFFBEB; color:#D97706;'
  if (s === 'transit')   return 'background:#EFF6FF; color:#3B82F6;'
  return 'background:#F1F5F9; color:#64748B;'
}
function txLabel(s: string) {
  if (s === 'completed') return 'Atlikta'
  if (s === 'pending')   return 'Laukia'
  if (s === 'transit')   return 'Siunčiama'
  return s
}
</script>
