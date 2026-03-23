<template>
  <div class="p-6" style="font-family:'Plus Jakarta Sans',sans-serif;">

    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Mano užklausos</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">Valdykite autodalių pirkimo užklausas</p>
      </div>
      <button @click="showCreate = true" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#14A34A; color:#fff;">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
        </svg>
        Nauja užklausa
      </button>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div v-for="kpi in kpis" :key="kpi.label" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
        <div class="flex items-start justify-between mb-3">
          <p class="text-xs font-medium" style="color:#64748B;">{{ kpi.label }}</p>
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="`background:${kpi.iconBg}`">
            <svg class="w-4 h-4" :style="`color:${kpi.iconColor}`" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="kpi.icon"/>
            </svg>
          </div>
        </div>
        <p class="text-2xl font-bold mb-1" style="color:#0F172A;">{{ kpi.value }}</p>
        <p class="text-xs" :style="`color:${kpi.trendColor}`">{{ kpi.trend }}</p>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">

      <!-- Toolbar -->
      <div class="flex items-center gap-3 px-4 py-3 flex-wrap" style="border-bottom:1px solid #E2E8F0;">
        <div class="flex items-center gap-0.5 p-1 rounded-lg" style="background:#F8FAFC; border:1px solid #E2E8F0;">
          <button v-for="tab in statusTabs" :key="tab.value" @click="activeStatus = tab.value"
            class="px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all duration-150 flex items-center gap-1.5"
            :style="activeStatus === tab.value
              ? 'background:#fff; color:#0F172A; box-shadow:0 1px 3px rgba(0,0,0,0.08);'
              : 'color:#64748B;'"
          >
            {{ tab.label }}
            <span v-if="tab.count !== null" class="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
              :style="activeStatus === tab.value ? 'background:#F0FDF4; color:#14A34A;' : 'background:#F1F5F9; color:#94A3B8;'">
              {{ tab.count }}
            </span>
          </button>
        </div>
        <div class="relative">
          <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="search" type="text" placeholder="Ieškoti..." class="pl-8 pr-3 py-1.5 text-xs rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; width:190px; font-family:inherit;">
        </div>
      </div>

      <!-- Table header -->
      <div class="overflow-x-auto">
        <div class="grid items-center px-4 py-2.5" style="grid-template-columns:36px minmax(180px,1fr) minmax(130px,1fr) 110px 120px 90px 100px 64px; min-width:820px; border-bottom:1px solid #E2E8F0; background:#F8FAFC;">
          <input type="checkbox" class="w-3.5 h-3.5 rounded cursor-pointer" style="accent-color:#14A34A;">
          <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Automobilis / Dalis</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Automobilis</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Statusas</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Pasiūlymai</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Terminas</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider" style="color:#94A3B8;">Sukurta</span>
          <span></span>
        </div>

        <div class="divide-y" style="divide-color:#F8FAFC;">
          <div v-for="q in filtered" :key="q.id"
            class="grid items-center px-4 py-3 group transition-colors duration-100 cursor-pointer hover:bg-slate-50"
            style="grid-template-columns:36px minmax(180px,1fr) minmax(130px,1fr) 110px 120px 90px 100px 64px; min-width:820px;"
            @click="navigateTo(`/buyer/queries/${q.id}`)"
          >
            <input type="checkbox" class="w-3.5 h-3.5 rounded cursor-pointer" style="accent-color:#14A34A;" @click.stop>

            <div class="pr-4">
              <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ q.part }}</p>
              <p class="text-xs truncate mt-0.5" style="color:#64748B;">OEM: {{ q.oem }}</p>
            </div>

            <div class="pr-4">
              <p class="text-xs font-medium truncate" style="color:#0F172A;">{{ q.car }}</p>
              <p class="text-[11px] truncate font-mono" style="color:#94A3B8;">{{ q.vin }}</p>
            </div>

            <div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" :style="statusStyle(q.status).badge">
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :style="statusStyle(q.status).dot"></span>
                {{ statusStyle(q.status).label }}
              </span>
            </div>

            <!-- Offer count with mini bar -->
            <div>
              <div v-if="q.offerCount > 0" class="flex items-center gap-2">
                <span class="text-sm font-bold" style="color:#0F172A;">{{ q.offerCount }}</span>
                <div class="flex gap-0.5">
                  <div v-for="n in Math.min(q.offerCount, 5)" :key="n" class="w-1.5 h-4 rounded-sm" style="background:#14A34A; opacity:0.7;"></div>
                </div>
                <span v-if="q.bestPrice" class="text-xs font-semibold" style="color:#14A34A;">€{{ q.bestPrice }}</span>
              </div>
              <span v-else class="text-xs" style="color:#94A3B8;">Laukiama...</span>
            </div>

            <div>
              <p class="text-xs font-semibold" :style="`color:${dueDateColor(q.dueDate)}`">{{ formatDate(q.dueDate) }}</p>
              <p class="text-[11px]" :style="`color:${dueDateColor(q.dueDate)}99`">{{ dueRelative(q.dueDate) }}</p>
            </div>

            <p class="text-xs" style="color:#64748B;">{{ q.createdAt }}</p>

            <!-- Actions -->
            <div class="flex items-center gap-0.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button @click.stop="startEdit(q)" class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" title="Redaguoti">
                <svg class="w-3.5 h-3.5" style="color:#475569;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button @click.stop="deleteQuery(q.id)" class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-red-50" title="Ištrinti">
                <svg class="w-3.5 h-3.5" style="color:#EF4444;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-if="filtered.length === 0" class="py-16 flex flex-col items-center gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:#F1F5F9;">
            <svg class="w-6 h-6" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <p class="text-sm font-semibold" style="color:#0F172A;">Užklausų nerasta</p>
          <button @click="showCreate = true" class="text-sm font-semibold cursor-pointer" style="color:#14A34A;">+ Sukurti pirmąją užklausą</button>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3" style="border-top:1px solid #E2E8F0;">
        <p class="text-xs" style="color:#64748B;">Rodoma <span class="font-semibold" style="color:#0F172A;">{{ filtered.length }}</span> iš <span class="font-semibold" style="color:#0F172A;">{{ queries.length }}</span></p>
        <div class="flex items-center gap-1">
          <button class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button class="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold" style="background:#14A34A; color:#fff;">1</button>
          <button class="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Create / Edit modal -->
    <Teleport to="body">
      <div v-if="showCreate || editQuery" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background:rgba(0,0,0,0.4);">
        <div class="w-full max-w-lg rounded-2xl p-6" style="background:#fff; box-shadow:0 20px 60px rgba(0,0,0,0.15);">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold" style="color:#0F172A;">{{ editQuery ? 'Redaguoti užklausą' : 'Nauja užklausa' }}</h2>
            <button @click="closeModal" class="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#64748B;">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Automobilio markė / modelis</label>
                <input v-model="form.car" type="text" placeholder="pvz. BMW E60 520d" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Metai</label>
                <input v-model="form.year" type="text" placeholder="pvz. 2005" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">VIN kodas</label>
              <input v-model="form.vin" type="text" placeholder="pvz. WBANE71060B123456" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none font-mono" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Ieškoma dalis</label>
                <input v-model="form.part" type="text" placeholder="pvz. Priekinis bamperis" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">OEM numeris</label>
                <input v-model="form.oem" type="text" placeholder="pvz. 51117896897" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none font-mono" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Terminas</label>
                <input v-model="form.dueDate" type="date" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Prioritetas</label>
                <select v-model="form.priority" class="w-full px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  <option value="low">Žemas</option>
                  <option value="medium">Vidutinis</option>
                  <option value="high">Aukštas</option>
                  <option value="critical">Kritinis</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Papildoma informacija</label>
              <textarea v-model="form.notes" rows="3" placeholder="Aprašykite reikalavimus..." class="w-full px-3 py-2 text-sm rounded-lg resize-none focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 mt-6 pt-4" style="border-top:1px solid #E2E8F0;">
            <button @click="closeModal" class="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569;">Atšaukti</button>
            <button @click="saveQuery" class="px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90" style="background:#14A34A; color:#fff;">
              {{ editQuery ? 'Išsaugoti' : 'Sukurti užklausą' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'buyer' })
useHead({ title: 'Užklausos — recar BUY' })

const activeStatus = ref('all')
const search = ref('')
const showCreate = ref(false)
const editQuery = ref<any>(null)

const form = reactive({ car: '', year: '', vin: '', part: '', oem: '', dueDate: '', priority: 'medium', notes: '' })

const statusTabs = [
  { value: 'all',       label: 'Visos',             count: 7 },
  { value: 'open',      label: 'Aktyvios',           count: 3 },
  { value: 'offers',    label: 'Pasiūlymai',         count: 2 },
  { value: 'transit',   label: 'Pristatoma',         count: 1 },
  { value: 'completed', label: 'Apmokėjimas',        count: 1 },
  { value: 'closed',    label: 'Uždaryta',           count: null },
]

const kpis = [
  { label: 'Visos užklausos', value: '5', trend: '+2 šią savaitę', trendColor: '#14A34A', iconBg: '#F0FDF4', iconColor: '#14A34A', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Gauta pasiūlymų', value: '12', trend: '+4 šiandien', trendColor: '#14A34A', iconBg: '#EFF6FF', iconColor: '#3B82F6', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
  { label: 'Geriausia kaina', value: '€120', trend: 'EuroAuto Vilnius', trendColor: '#64748B', iconBg: '#FFFBEB', iconColor: '#F59E0B', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Uždarytos šį mėn.', value: '3', trend: '100% sėkmingos', trendColor: '#14A34A', iconBg: '#F0FDF4', iconColor: '#14A34A', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
]

const queries = ref([
  { id: 1, part: 'Priekinis bamperis (M-packet)', car: 'BMW E60 520d', vin: 'WBANE71060B...', oem: '51117896897', status: 'offers', dueDate: '2026-03-24', priority: 'high', offerCount: 4, bestPrice: 120, createdAt: 'prieš 2 d.' },
  { id: 2, part: 'Variklio dangtis', car: 'Audi A4 B8 2.0 TDI', vin: 'WAUZZZ8K9B...', oem: '8K0823029A', status: 'open', dueDate: '2026-03-25', priority: 'medium', offerCount: 2, bestPrice: 85, createdAt: 'prieš 1 d.' },
  { id: 3, part: 'Kairės pusės durys', car: 'VW Golf VII 1.6', vin: 'WVWZZZ7NZJ...', oem: '5G4831055', status: 'open', dueDate: '2026-03-26', priority: 'medium', offerCount: 0, bestPrice: null, createdAt: 'prieš 5 val.' },
  { id: 4, part: 'Galinis stiklas', car: 'Mercedes W204', vin: 'WDDGF4HB1E...', oem: 'A2047400810', status: 'open', dueDate: '2026-03-27', priority: 'low', offerCount: 6, bestPrice: 95, createdAt: 'prieš 3 d.' },
  { id: 5, part: 'Alternatorius', car: 'Toyota Yaris III', vin: 'VNKKD3D30D...', oem: '27060-0Q040', status: 'closed', dueDate: '2026-03-20', priority: 'low', offerCount: 3, bestPrice: 55, createdAt: 'prieš 5 d.' },
  { id: 6, part: 'Dešinės pusės veidrodis', car: 'VW Passat B7 2.0 TDI', vin: 'WVWZZZ3CZD...', oem: '3AF857508', status: 'transit', dueDate: '2026-03-24', priority: 'medium', offerCount: 3, bestPrice: 65, createdAt: 'prieš 4 d.' },
  { id: 7, part: 'Priekinė dešinė amortizatoriaus kolona', car: 'Skoda Octavia A5', vin: 'TMBZZZ1ZAH...', oem: '1K0413031BJ', status: 'completed', dueDate: '2026-03-22', priority: 'high', offerCount: 4, bestPrice: 95, createdAt: 'prieš 6 d.' },
])

const filtered = computed(() => queries.value.filter(q => {
  if (activeStatus.value !== 'all' && q.status !== activeStatus.value) return false
  if (search.value) {
    const s = search.value.toLowerCase()
    return q.part.toLowerCase().includes(s) || q.car.toLowerCase().includes(s)
  }
  return true
}))

function startEdit(q: any) {
  editQuery.value = q
  Object.assign(form, { car: q.car, year: '', vin: q.vin, part: q.part, oem: q.oem, dueDate: q.dueDate, priority: q.priority, notes: '' })
  showCreate.value = false
}

function closeModal() {
  showCreate.value = false
  editQuery.value = null
  Object.assign(form, { car: '', year: '', vin: '', part: '', oem: '', dueDate: '', priority: 'medium', notes: '' })
}

function saveQuery() {
  if (!form.part || !form.car) return
  if (editQuery.value) {
    const q = queries.value.find(q => q.id === editQuery.value.id)
    if (q) Object.assign(q, { car: form.car, part: form.part, oem: form.oem, dueDate: form.dueDate, priority: form.priority })
  } else {
    queries.value.unshift({
      id: Date.now(),
      part: form.part,
      car: form.car,
      vin: form.vin || '—',
      oem: form.oem || '—',
      status: 'open',
      dueDate: form.dueDate || '2026-04-01',
      priority: form.priority,
      offerCount: 0,
      bestPrice: null,
      createdAt: 'ką tik',
    })
  }
  closeModal()
}

function deleteQuery(id: number) {
  queries.value = queries.value.filter(q => q.id !== id)
}

function statusStyle(s: string) {
  const map: Record<string, any> = {
    open:      { badge: 'background:#EFF6FF; color:#2563EB;', dot: 'background:#3B82F6;', label: 'Aktyvi' },
    offers:    { badge: 'background:#F0FDF4; color:#15803D;', dot: 'background:#14A34A;', label: 'Pasiūlymai' },
    transit:   { badge: 'background:#FFFBEB; color:#D97706;', dot: 'background:#F59E0B;', label: 'Pristatoma' },
    completed: { badge: 'background:#FDF4FF; color:#9333EA;', dot: 'background:#A855F7;', label: 'Apmokėjimas' },
    closed:    { badge: 'background:#F1F5F9; color:#475569;', dot: 'background:#94A3B8;', label: 'Uždaryta' },
  }
  return map[s] ?? map.open
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('lt-LT', { month: 'short', day: 'numeric' })
}
function dueDateColor(d: string) {
  const diff = new Date(d).getTime() - new Date('2026-03-23').getTime()
  if (diff < 0) return '#DC2626'
  if (diff < 86400000) return '#EA580C'
  if (diff < 172800000) return '#D97706'
  return '#64748B'
}
function dueRelative(d: string) {
  const diff = Math.ceil((new Date(d).getTime() - new Date('2026-03-23').getTime()) / 86400000)
  if (diff < 0) return 'Vėluoja!'
  if (diff === 0) return 'Šiandien'
  if (diff === 1) return 'Rytoj'
  return `Po ${diff}d.`
}
</script>
