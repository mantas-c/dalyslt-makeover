<template>
  <div class="p-6 space-y-6" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <p class="text-xs font-medium mb-0.5" style="color:#94A3B8;">{{ greeting }}, Elena K.</p>
        <h1 class="text-[22px] font-bold tracking-tight" style="color:#0F172A;">Suvestinė</h1>
        <p class="text-sm mt-0.5" style="color:#64748B;">UAB Draudimas LT · Vilnius · {{ today }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="showCreate = true"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
          style="background:#14A34A; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Nauja užklausa
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

        <!-- Monthly spend chart -->
        <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h2 class="text-sm font-bold" style="color:#0F172A;">Išlaidos per mėnesius</h2>
              <p class="text-xs mt-0.5" style="color:#64748B;">Apmokėtų užsakymų suma, €</p>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="text-xl font-bold" style="color:#3B82F6;">€432</p>
                <p class="text-xs" style="color:#94A3B8;">šį mėnesį</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold" style="color:#14A34A;">↓18%</p>
                <p class="text-xs" style="color:#94A3B8;">vs praėjęs</p>
              </div>
            </div>
          </div>
          <!-- SVG bar chart -->
          <svg viewBox="0 0 480 90" class="w-full" style="height:90px; overflow:visible;">
            <line x1="0" y1="0" x2="480" y2="0" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="30" x2="480" y2="30" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="60" x2="480" y2="60" stroke="#F1F5F9" stroke-width="1"/>
            <line x1="0" y1="90" x2="480" y2="90" stroke="#F1F5F9" stroke-width="1"/>
            <g v-for="(bar, i) in spendChart" :key="i">
              <!-- Background bar -->
              <rect :x="i * 62 + 6" y="0" :width="50" height="90" rx="4" style="fill:#F8FAFC;" opacity="0.5"/>
              <!-- Value bar -->
              <rect
                :x="i * 62 + 6" :y="90 - bar.h" :width="50" :height="bar.h"
                rx="4"
                :style="bar.current ? 'fill:#3B82F6;' : 'fill:#BFDBFE;'"
                class="transition-all duration-300 cursor-pointer hover:opacity-80"
              />
              <text :x="i * 62 + 31" y="107" text-anchor="middle" style="font-size:9px; fill:#94A3B8; font-family:inherit;">{{ bar.label }}</text>
              <text v-if="bar.current" :x="i * 62 + 31" :y="90 - bar.h - 5" text-anchor="middle" style="font-size:9px; fill:#2563EB; font-weight:700; font-family:inherit;">€{{ bar.value }}</text>
            </g>
          </svg>
        </div>

        <!-- Offers awaiting decision -->
        <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #E2E8F0; background:#F0FDF4;">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full animate-pulse" style="background:#14A34A;"></div>
              <h2 class="text-sm font-bold" style="color:#0F172A;">Pasiūlymai laukia sprendimo</h2>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="background:#14A34A; color:#fff;">2</span>
            </div>
            <NuxtLink to="/buyer/queries" class="text-xs font-semibold cursor-pointer" style="color:#14A34A;">Visos →</NuxtLink>
          </div>
          <div class="divide-y">
            <div v-for="aw in awaitingOffers" :key="aw.id"
              class="flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors duration-100 hover:bg-slate-50"
              @click="navigateTo(`/buyer/queries/${aw.id}`)">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0" :style="`background:${aw.avatarBg}; color:${aw.avatarColor};`">
                {{ aw.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ aw.part }}</p>
                <p class="text-xs truncate mt-0.5" style="color:#64748B;">{{ aw.car }} · {{ aw.offerCount }} pasiūlymai</p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-sm font-bold" style="color:#14A34A;">nuo €{{ aw.bestPrice }}</p>
                <p class="text-xs" style="color:#94A3B8;">geriausia kaina</p>
              </div>
              <button @click.stop="navigateTo(`/buyer/queries/${aw.id}`)"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90 flex-shrink-0"
                style="background:#14A34A; color:#fff;">
                Peržiūrėti
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Recent queries -->
        <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
          <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #E2E8F0;">
            <h2 class="text-sm font-bold" style="color:#0F172A;">Aktyvios užklausos</h2>
            <NuxtLink to="/buyer/queries" class="text-xs font-semibold cursor-pointer" style="color:#14A34A;">Visos →</NuxtLink>
          </div>
          <div class="divide-y">
            <div v-for="q in recentQueries" :key="q.id"
              class="grid items-center px-5 py-3 cursor-pointer transition-colors duration-100 hover:bg-slate-50 gap-4"
              style="grid-template-columns:1fr 120px 100px 90px 28px;"
              @click="navigateTo(`/buyer/queries/${q.id}`)">
              <div class="min-w-0">
                <p class="text-sm font-semibold truncate" style="color:#0F172A;">{{ q.part }}</p>
                <p class="text-xs truncate mt-0.5 font-mono" style="color:#94A3B8;">{{ q.car }}</p>
              </div>
              <div>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold" :style="statusStyle(q.status).badge">
                  <span class="w-1.5 h-1.5 rounded-full" :style="statusStyle(q.status).dot"></span>
                  {{ statusStyle(q.status).label }}
                </span>
              </div>
              <div>
                <div v-if="q.offerCount > 0" class="flex items-center gap-1.5">
                  <div class="flex gap-0.5">
                    <div v-for="n in Math.min(q.offerCount, 4)" :key="n" class="w-1.5 h-3 rounded-sm" style="background:#14A34A; opacity:0.7;"></div>
                  </div>
                  <span class="text-xs font-bold" style="color:#14A34A;">{{ q.offerCount }}</span>
                </div>
                <span v-else class="text-xs" style="color:#94A3B8;">Laukiama</span>
              </div>
              <div>
                <p class="text-xs font-semibold" :style="`color:${dueDateColor(q.dueDate)}`">{{ dueRelative(q.dueDate) }}</p>
              </div>
              <svg class="w-3.5 h-3.5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT (1/3) -->
      <div class="space-y-4">

        <!-- Quick actions -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Greiti veiksmai</h3>
          <div class="space-y-2">
            <button @click="showCreate = true"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-green-50 text-left"
              style="border:1px solid #E2E8F0;">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#F0FDF4;">
                <svg class="w-3.5 h-3.5" style="color:#14A34A;" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
              <span class="text-sm font-semibold" style="color:#0F172A;">Nauja užklausa</span>
            </button>
            <button @click="navigateTo('/buyer/queries')"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-50 text-left"
              style="border:1px solid #E2E8F0;">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#F1F5F9;">
                <svg class="w-3.5 h-3.5" style="color:#64748B;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <span class="text-sm font-medium" style="color:#475569;">Visos užklausos</span>
            </button>
            <button @click="navigateTo('/buyer/queries/7')"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-blue-50 text-left"
              style="border:1px solid #BFDBFE; background:#EFF6FF;">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#DBEAFE;">
                <svg class="w-3.5 h-3.5" style="color:#3B82F6;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <div class="flex-1">
                <span class="text-sm font-semibold" style="color:#2563EB;">Apmokėti €121.00</span>
                <p class="text-[11px]" style="color:#3B82F6;">Laukia patvirtinimo</p>
              </div>
              <span class="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style="background:#3B82F6;"></span>
            </button>
          </div>
        </div>

        <!-- Spending breakdown -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Išlaidos pagal kategoriją</h3>
          <div class="space-y-2.5">
            <div v-for="cat in spendCategories" :key="cat.name">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-medium" style="color:#475569;">{{ cat.name }}</span>
                <span class="text-xs font-bold" style="color:#0F172A;">€{{ cat.amount }}</span>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background:#F1F5F9;">
                <div class="h-full rounded-full" :style="`width:${cat.pct}%; background:#3B82F6;`"></div>
              </div>
            </div>
          </div>
          <div class="mt-3 pt-3 flex items-center justify-between" style="border-top:1px solid #E2E8F0;">
            <span class="text-xs" style="color:#64748B;">Iš viso šį mėnesį</span>
            <span class="text-sm font-bold" style="color:#0F172A;">€432</span>
          </div>
        </div>

        <!-- Top suppliers -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Mano tiekėjai</h3>
          <div class="space-y-3">
            <div v-for="sup in topSuppliers" :key="sup.name" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0" :style="`background:${sup.bg}; color:${sup.color};`">
                {{ sup.initials }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ sup.name }}</p>
                <p class="text-[11px]" style="color:#94A3B8;">{{ sup.city }} · {{ sup.orders }} užsakymai</p>
              </div>
              <div class="flex items-center gap-0.5">
                <svg class="w-3 h-3" style="color:#F59E0B;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-xs font-bold" style="color:#0F172A;">{{ sup.rating }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Savings widget -->
        <div class="rounded-xl p-4" style="background:linear-gradient(135deg,#14A34A,#059669); color:#fff;">
          <div class="flex items-center gap-2 mb-3">
            <svg class="w-4 h-4" style="color:rgba(255,255,255,0.8);" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            <h3 class="text-xs font-bold" style="color:rgba(255,255,255,0.9);">Sutaupyta šį mėnesį</h3>
          </div>
          <p class="text-3xl font-bold mb-1" style="color:#fff;">€186</p>
          <p class="text-xs" style="color:rgba(255,255,255,0.75);">palyginus su rinkos kainomis</p>
          <div class="mt-3 pt-3" style="border-top:1px solid rgba(255,255,255,0.2);">
            <div class="flex items-center justify-between text-xs">
              <span style="color:rgba(255,255,255,0.75);">Vidutinė rinkos kaina</span>
              <span style="color:#fff; font-weight:700;">€618</span>
            </div>
            <div class="flex items-center justify-between text-xs mt-1">
              <span style="color:rgba(255,255,255,0.75);">Mokėjote</span>
              <span style="color:#fff; font-weight:700;">€432</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Create modal (re-used from queries page) -->
    <Teleport to="body">
      <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background:rgba(0,0,0,0.4);">
        <div class="w-full max-w-lg rounded-2xl p-6" style="background:#fff; box-shadow:0 20px 60px rgba(0,0,0,0.15);">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-base font-bold" style="color:#0F172A;">Nauja užklausa</h2>
            <button @click="showCreate = false" class="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#64748B;">
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
              <input v-model="form.vin" type="text" placeholder="pvz. WBANE71060B123456" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none font-mono" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:'Courier New',monospace;">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">Ieškoma dalis</label>
                <input v-model="form.part" type="text" placeholder="pvz. Priekinis bamperis" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1.5" style="color:#475569;">OEM numeris</label>
                <input v-model="form.oem" type="text" placeholder="pvz. 51117896897" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:'Courier New',monospace;">
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
            <button @click="showCreate = false" class="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569;">Atšaukti</button>
            <button @click="showCreate = false; navigateTo('/buyer/queries')"
              class="px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
              style="background:#14A34A; color:#fff;">
              Sukurti užklausą
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'buyer' })
useHead({ title: 'Suvestinė — recar BUY' })

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? 'Labas rytas' : hour < 18 ? 'Laba diena' : 'Labas vakaras'
const today = now.toLocaleDateString('lt-LT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

const showCreate = ref(false)
const form = reactive({ car: '', year: '', vin: '', part: '', oem: '', dueDate: '', priority: 'medium', notes: '' })

const kpis = [
  {
    label: 'Aktyvios užklausos',
    value: '5',
    trend: '+2 šią savaitę',
    trendColor: '#14A34A',
    up: true,
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    iconBg: '#F0FDF4', iconColor: '#14A34A',
  },
  {
    label: 'Gauta pasiūlymų',
    value: '12',
    trend: '+4 šiandien',
    trendColor: '#14A34A',
    up: true,
    icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z',
    iconBg: '#EFF6FF', iconColor: '#3B82F6',
  },
  {
    label: 'Laukia sprendimo',
    value: '2',
    trend: 'priimkite pasiūlymą',
    trendColor: '#D97706',
    up: null,
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: '#FFFBEB', iconColor: '#F59E0B',
  },
  {
    label: 'Išlaidos šį mėn.',
    value: '€432',
    trend: '↓18% vs praėjęs',
    trendColor: '#14A34A',
    up: false,
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    iconBg: '#FDF4FF', iconColor: '#A855F7',
  },
]

const spendChart = [
  { label: 'Spa', value: '520',  h: 52, current: false },
  { label: 'Geg', value: '380',  h: 38, current: false },
  { label: 'Bir', value: '690',  h: 69, current: false },
  { label: 'Lie', value: '440',  h: 44, current: false },
  { label: 'Rug', value: '510',  h: 51, current: false },
  { label: 'Rgs', value: '620',  h: 62, current: false },
  { label: 'Spa', value: '527',  h: 53, current: false },
  { label: 'Kov', value: '432',  h: 43, current: true  },
]

const awaitingOffers = [
  { id: 1, part: 'Priekinis bamperis (M-packet)', car: 'BMW E60 520d', offerCount: 4, bestPrice: 120, initials: 'B5', avatarBg: '#EFF6FF', avatarColor: '#3B82F6' },
  { id: 3, part: 'Kairės pusės durys', car: 'VW Golf VII 1.6', offerCount: 3, bestPrice: 89, initials: 'VW', avatarBg: '#F0FDF4', avatarColor: '#14A34A' },
]

const recentQueries = [
  { id: 1, part: 'Priekinis bamperis (M-packet)', car: 'BMW E60 520d', status: 'offers', offerCount: 4, dueDate: '2026-03-24' },
  { id: 2, part: 'Variklio dangtis', car: 'Audi A4 B8', status: 'open', offerCount: 0, dueDate: '2026-03-26' },
  { id: 3, part: 'Kairės pusės durys', car: 'VW Golf VII', status: 'offers', offerCount: 3, dueDate: '2026-03-25' },
  { id: 6, part: 'Dešinės pusės veidrodis', car: 'VW Passat B7', status: 'transit', offerCount: 1, dueDate: '2026-03-24' },
]

const spendCategories = [
  { name: 'Kėbulo dalys', amount: '218', pct: 71 },
  { name: 'Pakabos dalys', amount: '95', pct: 31 },
  { name: 'Variklio dalys', amount: '75', pct: 24 },
  { name: 'Elektros dalys', amount: '44', pct: 14 },
]

const topSuppliers = [
  { name: 'UAB AutoDalys', city: 'Vilnius', orders: 8, rating: 4.9, initials: 'AD', bg: '#F0FDF4', color: '#14A34A' },
  { name: 'MB AutoSalvage', city: 'Kaunas', orders: 4, rating: 4.7, initials: 'MS', bg: '#EFF6FF', color: '#3B82F6' },
  { name: 'Parts24.lt', city: 'Klaipėda', orders: 2, rating: 4.5, initials: 'P2', bg: '#FDF4FF', color: '#A855F7' },
]

function statusStyle(status: string) {
  const map: Record<string, any> = {
    open:    { badge: 'background:#EFF6FF; color:#2563EB;', dot: 'background:#3B82F6;', label: 'Aktyvi' },
    offers:  { badge: 'background:#F0FDF4; color:#15803D;', dot: 'background:#14A34A;', label: 'Pasiūlymai' },
    transit: { badge: 'background:#FFFBEB; color:#D97706;', dot: 'background:#F59E0B;', label: 'Pristatoma' },
    completed: { badge: 'background:#FDF4FF; color:#9333EA;', dot: 'background:#A855F7;', label: 'Apmokėjimas' },
  }
  return map[status] ?? map.open
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
