<template>
  <div class="p-6" style="font-family:'Plus Jakarta Sans','Inter',sans-serif; min-height:100%;">

    <!-- Page header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Užklausos</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">Klientų užklausos dėl autodalių paieškos</p>
      </div>
      <div class="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style="background:#F0FDF4; border:1px solid #BBF7D0; color:#15803D;">
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Galite tik peržiūrėti užklausas ir teikti pasiūlymus
      </div>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
        <div class="flex items-start justify-between mb-3">
          <p class="text-xs font-medium" style="color:#64748B;">{{ kpi.label }}</p>
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :style="`background:${kpi.iconBg}`">
            <svg class="w-4 h-4" :style="`color:${kpi.iconColor}`" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="kpi.iconPath"/>
            </svg>
          </div>
        </div>
        <p class="text-2xl font-bold mb-1" style="color:#0F172A;">{{ kpi.value }}</p>
        <p class="text-xs" :style="`color:${kpi.trendColor}`">{{ kpi.trend }}</p>
      </div>
    </div>

    <!-- Table card -->
    <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">

      <!-- Toolbar -->
      <div class="flex items-center gap-3 px-4 py-3 flex-wrap" style="border-bottom:1px solid #E2E8F0;">

        <!-- Status tabs -->
        <div class="flex items-center gap-0.5 p-1 rounded-lg" style="background:#F8FAFC; border:1px solid #E2E8F0;">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 flex items-center gap-1.5"
            :style="activeTab === tab.key
              ? 'background:#fff; color:#0F172A; box-shadow:0 1px 3px rgba(0,0,0,0.08);'
              : 'color:#64748B;'"
          >
            {{ tab.label }}
            <span v-if="tab.count !== null" class="px-1.5 py-0.5 rounded-full text-[10px] font-bold" :style="activeTab === tab.key ? 'background:#F0FDF4; color:#14A34A;' : 'background:#F1F5F9; color:#94A3B8;'">{{ tab.count }}</span>
          </button>
        </div>

        <div class="h-5 w-px" style="background:#E2E8F0;"></div>

        <!-- Search -->
        <div class="relative">
          <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Ieškoti..." class="pl-8 pr-3 py-1.5 text-xs rounded-lg focus:outline-none transition-all duration-150" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; width:190px; font-family:inherit;">
        </div>

        <!-- Priority -->
        <select v-model="filterPriority" class="px-2.5 py-1.5 text-xs rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
          <option value="">Visi prioritetai</option>
          <option value="critical">Kritinis</option>
          <option value="high">Aukštas</option>
          <option value="medium">Vidutinis</option>
          <option value="low">Žemas</option>
        </select>

        <div class="ml-auto flex items-center gap-2">
          <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0; background:#F8FAFC;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Eksportuoti
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
      <!-- Table header -->
      <div class="grid items-center px-4 py-2.5" style="grid-template-columns:36px 44px minmax(160px,1fr) minmax(140px,1fr) 140px 120px 100px 90px 72px; border-bottom:1px solid #E2E8F0; background:#F8FAFC; min-width:860px;">
        <input type="checkbox" class="w-3.5 h-3.5 rounded cursor-pointer" style="accent-color:#14A34A;" @change="toggleAll">
        <span></span>
        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Automobilis / Dalis</span>
        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Klientas</span>
        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Statusas</span>
        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Prioritetas</span>
        <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Terminas</span>
        <button class="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-150 hover:text-slate-600" style="color:#94A3B8;">
          Gauta
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <span></span>
      </div>

      <!-- Skeleton rows (loading state) -->
      <div v-if="loading" class="divide-y" style="divide-color:#F8FAFC;">
        <div v-for="i in 6" :key="i" class="grid items-center px-4 py-3" style="grid-template-columns:36px 44px minmax(160px,1fr) minmax(140px,1fr) 140px 120px 100px 90px 72px; min-width:860px;">
          <div class="w-3.5 h-3.5 rounded skeleton"></div>
          <div class="w-8 h-8 rounded-lg skeleton"></div>
          <div class="space-y-1.5 pr-4">
            <div class="h-3 rounded skeleton" style="width:70%"></div>
            <div class="h-2.5 rounded skeleton" style="width:50%"></div>
          </div>
          <div class="flex items-center gap-2 pr-4">
            <div class="w-6 h-6 rounded-full skeleton flex-shrink-0"></div>
            <div class="space-y-1.5 flex-1">
              <div class="h-3 rounded skeleton" style="width:60%"></div>
              <div class="h-2.5 rounded skeleton" style="width:40%"></div>
            </div>
          </div>
          <div><div class="h-5 w-20 rounded-full skeleton"></div></div>
          <div><div class="h-3 w-16 rounded skeleton"></div></div>
          <div><div class="h-3 w-14 rounded skeleton"></div></div>
          <div><div class="h-3 w-12 rounded skeleton"></div></div>
          <div></div>
        </div>
      </div>

      <!-- Rows -->
      <div v-else class="divide-y" style="--tw-divide-opacity:1; divide-color:#F8FAFC;">
        <div
          v-for="query in filteredQueries"
          :key="query.id"
          class="grid items-center px-4 py-3 group transition-colors duration-100 cursor-pointer hover:bg-slate-50"
          style="grid-template-columns:36px 44px minmax(160px,1fr) minmax(140px,1fr) 140px 120px 100px 90px 72px; min-width:860px;"
          @click="navigateTo(`/supplier/queries/${query.id}`)"
        >
          <!-- Checkbox -->
          <input type="checkbox" v-model="query.selected" class="w-3.5 h-3.5 rounded cursor-pointer" style="accent-color:#14A34A;" @click.stop>

          <!-- Car icon -->
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#F1F5F9;">
            <svg class="w-4 h-4" style="color:#64748B;" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 17a2 2 0 104 0m0 0a2 2 0 104 0M3 17V9l3-5h12l3 5v8M3 13h18"/>
            </svg>
          </div>

          <!-- Car + Part -->
          <div class="min-w-0 pr-4">
            <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ query.car }}</p>
            <p class="text-xs truncate mt-0.5" style="color:#64748B;">{{ query.part }}</p>
          </div>

          <!-- Client -->
          <div class="min-w-0 pr-4">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" :style="`background:${query.avatarBg}; color:${query.avatarColor};`">{{ query.clientInitial }}</div>
              <div class="min-w-0">
                <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ query.client }}</p>
                <p class="text-[11px] truncate" style="color:#94A3B8;">{{ query.clientType }}</p>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" :style="statusStyle(query.status).badge">
              <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="statusStyle(query.status).dot"></span>
              {{ statusStyle(query.status).label }}
            </span>
          </div>

          <!-- Priority -->
          <div>
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="`background:${priorityStyle(query.priority).color}`"></span>
              <span class="text-xs font-semibold" :style="`color:${priorityStyle(query.priority).color}`">{{ priorityStyle(query.priority).label }}</span>
            </div>
          </div>

          <!-- Due date -->
          <div>
            <div class="flex items-center gap-1.5">
              <svg class="w-3 h-3 flex-shrink-0" :style="`color:${dueDateColor(query.dueDate)}`" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <div>
                <p class="text-xs font-semibold" :style="`color:${dueDateColor(query.dueDate)}`">{{ formatDate(query.dueDate) }}</p>
                <p class="text-[11px]" :style="`color:${dueDateColor(query.dueDate)}99`">{{ dueRelative(query.dueDate) }}</p>
              </div>
            </div>
          </div>

          <!-- Received -->
          <p class="text-xs" style="color:#64748B;">{{ query.received }}</p>

          <!-- Actions -->
          <div class="flex items-center gap-0.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button @click.stop class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-green-50" title="Atsakyti">
              <svg class="w-3.5 h-3.5" style="color:#14A34A;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
              </svg>
            </button>
            <button @click.stop class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" title="Peržiūrėti">
              <svg class="w-3.5 h-3.5" style="color:#475569;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </button>
            <button @click.stop class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" title="Daugiau">
              <svg class="w-3.5 h-3.5" style="color:#475569;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredQueries.length === 0" class="py-16 flex flex-col items-center gap-3">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:#F1F5F9;">
          <svg class="w-6 h-6" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <p class="text-sm font-semibold" style="color:#0F172A;">Užklausų nerasta</p>
        <p class="text-xs" style="color:#94A3B8;">Pabandykite pakeisti filtrus</p>
      </div>

      </div><!-- end overflow -->

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3" style="border-top:1px solid #E2E8F0;">
        <p class="text-xs" style="color:#64748B;">
          Rodoma <span class="font-semibold" style="color:#0F172A;">{{ filteredQueries.length }}</span>
          iš <span class="font-semibold" style="color:#0F172A;">{{ queries.length }}</span> užklausų
        </p>
        <div class="flex items-center gap-1">
          <button class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer" style="background:#14A34A; color:#fff;">1</button>
          <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569;">2</button>
          <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569;">3</button>
          <button class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs" style="color:#64748B;">Per puslapį:</span>
          <select class="text-xs px-2 py-1 rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
            <option>10</option><option>20</option><option>50</option>
          </select>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'supplier' })
useHead({ title: 'Užklausos — recar PRO' })

const loading = ref(true)
onMounted(() => { setTimeout(() => { loading.value = false }, 1200) })

const activeTab = ref('all')
const search = ref('')
const filterPriority = ref('')

const tabs = [
  { key: 'all',     label: 'Visos',    count: 8 },
  { key: 'new',     label: 'Naujos',   count: 4 },
  { key: 'urgent',  label: 'Skubios',  count: 2 },
  { key: 'pending', label: 'Laukiama', count: 1 },
  { key: 'done',    label: 'Atliktos', count: null },
]

const kpis = [
  {
    label: 'Visos užklausos',
    value: '47',
    trend: '+5 šiandien',
    trendColor: '#14A34A',
    iconBg: '#F0FDF4',
    iconColor: '#14A34A',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    label: 'Neatsakytos',
    value: '12',
    trend: '+3 nuo vakar',
    trendColor: '#EF4444',
    iconBg: '#FEF2F2',
    iconColor: '#EF4444',
    iconPath: 'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  },
  {
    label: 'Vid. atsakymo laikas',
    value: '2.4h',
    trend: '−18 min. šią savaitę',
    trendColor: '#14A34A',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    label: 'Konversijų rodiklis',
    value: '68%',
    trend: '+4% vs praeitą mėn.',
    trendColor: '#14A34A',
    iconBg: '#FFFBEB',
    iconColor: '#F59E0B',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
]

const queries = ref([
  { id: 1, car: 'BMW E60 520d 2005', part: 'Priekinis bamperis (M-packet)', client: 'UAB Draudimas LT', clientType: 'Draudimo kompanija', clientInitial: 'D', avatarBg: '#EFF6FF', avatarColor: '#3B82F6', status: 'new', dueDate: '2026-03-21', priority: 'high', received: 'prieš 2h', selected: false },
  { id: 2, car: 'Audi A4 B8 2.0 TDI 2011', part: 'Variklio dangtis', client: 'SEB Lizingas', clientType: 'Lizingo kompanija', clientInitial: 'S', avatarBg: '#F0FDF4', avatarColor: '#14A34A', status: 'urgent', dueDate: '2026-03-20', priority: 'critical', received: 'prieš 4h', selected: false },
  { id: 3, car: 'Volkswagen Golf VII 1.6 TDI', part: 'Kairės pusės durys', client: 'If P&C Insurance', clientType: 'Draudimo kompanija', clientInitial: 'I', avatarBg: '#FFFBEB', avatarColor: '#F59E0B', status: 'pending', dueDate: '2026-03-23', priority: 'medium', received: 'prieš 1d.', selected: false },
  { id: 4, car: 'Mercedes-Benz W204 C220', part: 'Galinis stiklas', client: 'Ergo Insurance', clientType: 'Draudimo kompanija', clientInitial: 'E', avatarBg: '#FDF4FF', avatarColor: '#A855F7', status: 'new', dueDate: '2026-03-24', priority: 'medium', received: 'prieš 1d.', selected: false },
  { id: 5, car: 'Toyota Yaris III 1.33', part: 'Alternatorius', client: 'Gjensidige LT', clientType: 'Draudimo kompanija', clientInitial: 'G', avatarBg: '#FFF7ED', avatarColor: '#F97316', status: 'done', dueDate: '2026-03-19', priority: 'low', received: 'prieš 2d.', selected: false },
  { id: 6, car: 'Ford Focus III 1.6 EcoBoost', part: 'Radiatorius + ventiliatorius', client: 'BTA Insurance', clientType: 'Draudimo kompanija', clientInitial: 'B', avatarBg: '#FEF2F2', avatarColor: '#EF4444', status: 'urgent', dueDate: '2026-03-20', priority: 'critical', received: 'prieš 5h', selected: false },
  { id: 7, car: 'Renault Megane III 1.5 dCi', part: 'Priekinė dešinė sparnų arka', client: 'Lietuvos draudimas', clientType: 'Draudimo kompanija', clientInitial: 'L', avatarBg: '#EFF6FF', avatarColor: '#3B82F6', status: 'new', dueDate: '2026-03-25', priority: 'low', received: 'prieš 3h', selected: false },
  { id: 8, car: 'Volvo XC60 D4 2014', part: 'Priekinė ašis dešinė', client: 'Compensa Vienna', clientType: 'Draudimo kompanija', clientInitial: 'C', avatarBg: '#F0FDF4', avatarColor: '#14A34A', status: 'new', dueDate: '2026-03-22', priority: 'high', received: 'prieš 6h', selected: false },
])

const filteredQueries = computed(() => {
  return queries.value.filter(q => {
    if (activeTab.value !== 'all' && q.status !== activeTab.value) return false
    if (filterPriority.value && q.priority !== filterPriority.value) return false
    if (search.value) {
      const s = search.value.toLowerCase()
      return q.car.toLowerCase().includes(s) || q.part.toLowerCase().includes(s) || q.client.toLowerCase().includes(s)
    }
    return true
  })
})

function toggleAll(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  queries.value.forEach(q => q.selected = checked)
}

function statusStyle(status: string) {
  const map: Record<string, any> = {
    new:     { badge: 'background:#EFF6FF; color:#2563EB;', dot: 'background:#3B82F6;', label: 'Nauja' },
    pending: { badge: 'background:#FFFBEB; color:#D97706;', dot: 'background:#F59E0B;', label: 'Laukiama' },
    urgent:  { badge: 'background:#FEF2F2; color:#DC2626;', dot: 'background:#EF4444;', label: 'Skubu' },
    done:    { badge: 'background:#F0FDF4; color:#15803D;', dot: 'background:#14A34A;', label: 'Atlikta' },
  }
  return map[status] ?? map.new
}

function priorityStyle(priority: string) {
  const map: Record<string, any> = {
    critical: { color: '#DC2626', label: 'Kritinis' },
    high:     { color: '#EA580C', label: 'Aukštas' },
    medium:   { color: '#D97706', label: 'Vidutinis' },
    low:      { color: '#94A3B8', label: 'Žemas' },
  }
  return map[priority] ?? map.medium
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('lt-LT', { month: 'short', day: 'numeric' })
}

function dueDateColor(date: string) {
  const diff = new Date(date).getTime() - new Date('2026-03-20').getTime()
  if (diff < 0) return '#DC2626'
  if (diff < 86400000) return '#EA580C'
  if (diff < 172800000) return '#D97706'
  return '#64748B'
}

function dueRelative(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - new Date('2026-03-20').getTime()) / 86400000)
  if (diff < 0) return 'Vėluoja!'
  if (diff === 0) return 'Šiandien'
  if (diff === 1) return 'Rytoj'
  return `Po ${diff}d.`
}
</script>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
