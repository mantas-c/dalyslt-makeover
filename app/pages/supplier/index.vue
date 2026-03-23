<template>
  <div class="p-6 space-y-6" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-medium mb-0.5" style="color:#94A3B8;">{{ greeting }}, Jonas K.</p>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Suvestinė</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">UAB AutoDalys · Vilnius · {{ today }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="navigateTo('/supplier/queries')"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
          style="background:#14A34A; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Peržiūrėti užklausas
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="background:rgba(255,255,255,0.25);">12</span>
        </button>
      </div>
    </div>

    <!-- KPI row -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="kpi in kpis" :key="kpi.label"
        class="rounded-xl p-4 cursor-pointer transition-all duration-150 hover:-translate-y-0.5"
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
        <div class="flex items-center gap-1">
          <svg v-if="kpi.up !== null" class="w-3 h-3" :style="kpi.up ? 'color:#14A34A' : 'color:#EF4444'" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" :d="kpi.up ? 'M5 10l7-7 7 7' : 'M19 14l-7 7-7-7'"/>
          </svg>
          <p class="text-xs" :style="`color:${kpi.trendColor}`">{{ kpi.trend }}</p>
        </div>
      </div>
    </div>

    <!-- Main 2-col grid -->
    <div class="grid grid-cols-3 gap-5">

      <!-- LEFT (2/3) -->
      <div class="col-span-2 space-y-5">

        <!-- Revenue sparkline -->
        <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h2 class="text-sm font-bold" style="color:#0F172A;">Pajamos — paskutinės 8 savaitės</h2>
              <p class="text-xs mt-0.5" style="color:#64748B;">Priimtų pasiūlymų suma, €</p>
            </div>
            <div class="text-right">
              <p class="text-xl font-bold" style="color:#14A34A;">€3 840</p>
              <p class="text-xs" style="color:#94A3B8;">šį mėnesį</p>
            </div>
          </div>
          <!-- SVG bar chart -->
          <svg viewBox="0 0 480 80" class="w-full" style="height:80px; overflow:visible;">
            <!-- Grid lines -->
            <line x1="0" y1="0" x2="480" y2="0" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="26" x2="480" y2="26" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="53" x2="480" y2="53" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="80" x2="480" y2="80" stroke="#F1F5F9" stroke-width="1"/>
            <!-- Bars -->
            <g v-for="(bar, i) in revenueChart" :key="i">
              <rect
                :x="i * 62 + 6" :y="80 - bar.h" :width="50" :height="bar.h"
                :rx="4"
                :style="bar.current ? 'fill:#14A34A;' : 'fill:#E2E8F0;'"
                class="transition-all duration-300 cursor-pointer hover:opacity-80"
              />
              <text :x="i * 62 + 31" y="96" text-anchor="middle" style="font-size:9px; fill:#94A3B8; font-family:inherit;">{{ bar.label }}</text>
              <text v-if="bar.current" :x="i * 62 + 31" :y="80 - bar.h - 5" text-anchor="middle" style="font-size:9px; fill:#14A34A; font-weight:700; font-family:inherit;">€{{ bar.value }}</text>
            </g>
          </svg>
        </div>

        <!-- Urgent queries -->
        <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #E2E8F0;">
            <div class="flex items-center gap-2">
              <h2 class="text-sm font-bold" style="color:#0F172A;">Reikia atsakyti</h2>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="background:#FEF2F2; color:#DC2626;">5 skubios</span>
            </div>
            <NuxtLink to="/supplier/queries" class="text-xs font-semibold cursor-pointer" style="color:#14A34A;">Visos →</NuxtLink>
          </div>
          <div class="divide-y" style="--tw-divide-opacity:1;">
            <div v-for="q in urgentQueries" :key="q.id"
              @click="navigateTo(`/supplier/queries/${q.id}`)"
              class="grid items-center px-5 py-3 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
              style="grid-template-columns:1fr 110px 90px 80px 36px;">
              <div class="min-w-0">
                <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ q.part }}</p>
                <p class="text-xs truncate mt-0.5" style="color:#64748B;">{{ q.car }}</p>
              </div>
              <div>
                <p class="text-xs font-medium truncate" style="color:#475569;">{{ q.client }}</p>
              </div>
              <div>
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" :style="priorityStyle(q.priority)">
                  {{ q.priority === 'critical' ? 'Kritinis' : q.priority === 'high' ? 'Aukštas' : 'Vidutinis' }}
                </span>
              </div>
              <div>
                <p class="text-xs font-semibold" :style="`color:${dueDateColor(q.dueDate)}`">{{ dueRelative(q.dueDate) }}</p>
              </div>
              <div class="flex items-center justify-end">
                <svg class="w-3.5 h-3.5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent activity -->
        <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
          <h2 class="text-sm font-bold mb-4" style="color:#0F172A;">Paskutinė veikla</h2>
          <div class="space-y-0">
            <div v-for="(ev, i) in activity" :key="ev.id" class="flex gap-3 py-3" :style="i < activity.length - 1 ? 'border-bottom:1px solid #F8FAFC;' : ''">
              <div class="flex flex-col items-center flex-shrink-0">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="`background:${ev.color}15`">
                  <svg class="w-4 h-4" :style="`color:${ev.color}`" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="ev.icon"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0 pt-1">
                <p class="text-sm font-medium" style="color:#0F172A;">{{ ev.text }}</p>
                <p class="text-xs mt-0.5" style="color:#94A3B8;">{{ ev.time }}</p>
              </div>
              <div v-if="ev.amount" class="pt-1 text-right flex-shrink-0">
                <p class="text-sm font-bold" :style="`color:${ev.color}`">{{ ev.amount }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT (1/3) -->
      <div class="space-y-4">

        <!-- My rating -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold" style="color:#0F172A;">Mano įvertinimas</h3>
            <span class="text-xs font-semibold" style="color:#64748B;">312 atsiliepimai</span>
          </div>
          <div class="flex items-center gap-3 mb-4">
            <p class="text-4xl font-bold" style="color:#0F172A;">4.9</p>
            <div>
              <div class="flex items-center gap-0.5 mb-1">
                <svg v-for="n in 5" :key="n" class="w-4 h-4" :style="n <= 5 ? 'color:#F59E0B;' : 'color:#E2E8F0;'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p class="text-xs" style="color:#64748B;">Puikus tiekėjas</p>
            </div>
          </div>
          <!-- Rating bars -->
          <div class="space-y-1.5">
            <div v-for="rb in ratingBars" :key="rb.stars" class="flex items-center gap-2">
              <span class="text-[11px] w-3 font-semibold" style="color:#64748B;">{{ rb.stars }}</span>
              <svg class="w-3 h-3" style="color:#F59E0B;" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <div class="flex-1 h-1.5 rounded-full overflow-hidden" style="background:#F1F5F9;">
                <div class="h-full rounded-full transition-all duration-500" :style="`width:${rb.pct}%; background:${rb.pct > 50 ? '#14A34A' : '#CBD5E1'};`"></div>
              </div>
              <span class="text-[11px] w-6 text-right" style="color:#94A3B8;">{{ rb.pct }}%</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Šio mėnesio statistika</h3>
          <div class="space-y-3">
            <div v-for="stat in stats" :key="stat.label" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-md flex items-center justify-center" :style="`background:${stat.iconBg}`">
                  <svg class="w-3 h-3" :style="`color:${stat.iconColor}`" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" :d="stat.icon"/>
                  </svg>
                </div>
                <span class="text-xs" style="color:#64748B;">{{ stat.label }}</span>
              </div>
              <span class="text-sm font-bold" style="color:#0F172A;">{{ stat.value }}</span>
            </div>
          </div>
        </div>

        <!-- Top categories -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Populiariausios kategorijos</h3>
          <div class="space-y-2.5">
            <div v-for="cat in categories" :key="cat.name">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium" style="color:#475569;">{{ cat.name }}</span>
                <span class="text-xs font-bold" style="color:#0F172A;">{{ cat.count }}</span>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background:#F1F5F9;">
                <div class="h-full rounded-full transition-all duration-500" :style="`width:${cat.pct}%; background:#14A34A;`"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending actions -->
        <div class="rounded-xl p-4" style="background:#FFFBEB; border:1px solid #FDE68A;">
          <div class="flex items-center gap-2 mb-3">
            <svg class="w-4 h-4 flex-shrink-0" style="color:#D97706;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <h3 class="text-xs font-bold" style="color:#B45309;">Reikia dėmesio</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs" style="color:#92400E;">Neatsakytos užklausos</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:#FEF3C7; color:#B45309;">12</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs" style="color:#92400E;">Skubios (terminas rytoj)</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:#FEE2E2; color:#DC2626;">3</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs" style="color:#92400E;">Laukia patvirtinimo</span>
              <span class="text-xs font-bold px-2 py-0.5 rounded-full" style="background:#FEF3C7; color:#B45309;">2</span>
            </div>
          </div>
          <button @click="navigateTo('/supplier/queries')"
            class="w-full mt-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
            style="background:#D97706; color:#fff;">
            Atsakyti dabar
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'supplier' })
useHead({ title: 'Suvestinė — recar PRO' })

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Labas rytas' : hour < 18 ? 'Laba diena' : 'Labas vakaras'
const today = now.toLocaleDateString('lt-LT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const kpis = [
  {
    label: 'Aktyvios užklausos',
    value: '12',
    trend: '↑3 nuo vakar',
    trendColor: '#14A34A',
    up: true,
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    iconBg: '#F0FDF4', iconColor: '#14A34A',
  },
  {
    label: 'Pateikti pasiūlymai',
    value: '8',
    trend: 'šią savaitę',
    trendColor: '#64748B',
    up: null,
    icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
    iconBg: '#EFF6FF', iconColor: '#3B82F6',
  },
  {
    label: 'Priimti šį mėnesį',
    value: '5',
    trend: '62% konversija',
    trendColor: '#14A34A',
    up: true,
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: '#F0FDF4', iconColor: '#14A34A',
  },
  {
    label: 'Pajamos šį mėnesį',
    value: '€3 840',
    trend: '↑12% vs praėjęs',
    trendColor: '#14A34A',
    up: true,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: '#FFFBEB', iconColor: '#F59E0B',
  },
]

const revenueChart = [
  { label: 'Sau 3', value: '420',  h: 44, current: false },
  { label: 'Sau 4', value: '380',  h: 40, current: false },
  { label: 'Vas 1', value: '510',  h: 54, current: false },
  { label: 'Vas 2', value: '620',  h: 65, current: false },
  { label: 'Vas 3', value: '480',  h: 50, current: false },
  { label: 'Kov 1', value: '590',  h: 62, current: false },
  { label: 'Kov 2', value: '750',  h: 79, current: false },
  { label: 'Kov 3', value: '3840', h: 75, current: true  },
]

const urgentQueries = [
  { id: 'UZK-2847', part: 'Priekinis bamperis (M-packet)', car: 'BMW E60 520d', client: 'UAB Draudimas LT', priority: 'high', dueDate: '2026-03-24' },
  { id: 'UZK-2851', part: 'Variklio dangtis', car: 'Audi A4 B8', client: 'If P&C Insurance', priority: 'critical', dueDate: '2026-03-23' },
  { id: 'UZK-2853', part: 'Kairės pusės durys', car: 'VW Golf VII', client: 'Ergo Lietuva', priority: 'medium', dueDate: '2026-03-25' },
  { id: 'UZK-2855', part: 'Dešinės pusės veidrodis', car: 'Skoda Octavia A5', client: 'Gjensidige LT', priority: 'high', dueDate: '2026-03-24' },
]

const activity = [
  { id: 1, text: 'Pasiūlymas priimtas — BMW E60 bamperis', time: 'prieš 35 min.', color: '#14A34A', amount: '+€185', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 2, text: 'Nauja skubi užklausa — Audi A4 variklio dangtis', time: 'prieš 1 val.', color: '#EF4444', amount: null, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { id: 3, text: 'Žinutė nuo UAB Draudimas LT', time: 'prieš 2 val.', color: '#3B82F6', amount: null, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { id: 4, text: 'Pasiūlymas pateiktas — VW Passat veidrodis', time: 'vakar, 16:22', color: '#6366F1', amount: '€65', icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' },
  { id: 5, text: 'Apmokėjimas gautas — Skoda Octavia kolona', time: 'vakar, 12:05', color: '#14A34A', amount: '+€95', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
]

const ratingBars = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]

const stats = [
  { label: 'Vid. atsakymo laikas', value: '2.4 val.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', iconBg: '#EFF6FF', iconColor: '#3B82F6' },
  { label: 'Konversijų rodiklis', value: '62%', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', iconBg: '#F0FDF4', iconColor: '#14A34A' },
  { label: 'Vid. pasiūlymo kaina', value: '€148', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1', iconBg: '#FFFBEB', iconColor: '#F59E0B' },
  { label: 'Aktyvūs klientai', value: '8', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', iconBg: '#FDF4FF', iconColor: '#A855F7' },
]

const categories = [
  { name: 'Kėbulo dalys', count: 38, pct: 76 },
  { name: 'Variklio dalys', count: 24, pct: 48 },
  { name: 'Pakabos dalys', count: 19, pct: 38 },
  { name: 'Elektros dalys', count: 12, pct: 24 },
  { name: 'Salono dalys', count: 7, pct: 14 },
]

function priorityStyle(p: string) {
  if (p === 'critical') return 'background:#FEF2F2; color:#DC2626;'
  if (p === 'high') return 'background:#FFF7ED; color:#EA580C;'
  return 'background:#FFFBEB; color:#D97706;'
}

function dueDateColor(date: string) {
  const diff = new Date(date).getTime() - new Date('2026-03-23').getTime()
  if (diff < 0) return '#DC2626'
  if (diff < 86400000) return '#EA580C'
  if (diff < 172800000) return '#D97706'
  return '#64748B'
}

function dueRelative(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - new Date('2026-03-23').getTime()) / 86400000)
  if (diff < 0) return 'Vėluoja!'
  if (diff === 0) return 'Šiandien'
  if (diff === 1) return 'Rytoj'
  return `Po ${diff}d.`
}
</script>
