<template>
  <div class="p-6 max-w-6xl" style="font-family:'Plus Jakarta Sans','Inter',sans-serif;">

    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 mb-6">
      <NuxtLink to="/supplier/queries" class="flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors duration-150 hover:opacity-70" style="color:#64748B;">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Užklausos
      </NuxtLink>
      <svg class="w-3.5 h-3.5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
      </svg>
      <span class="text-sm font-semibold" style="color:#0F172A;">#{{ query.id }}</span>
    </div>

    <!-- Header -->
    <div class="flex items-start justify-between mb-6 gap-4">
      <div>
        <div class="flex items-center gap-3 mb-1.5">
          <h1 class="text-xl font-bold" style="color:#0F172A;">{{ query.part }}</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" :style="statusStyle(query.status).badge">
            <span class="w-1.5 h-1.5 rounded-full" :style="statusStyle(query.status).dot"></span>
            {{ statusStyle(query.status).label }}
          </span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" :style="priorityStyle(query.priority).badge">
            {{ priorityStyle(query.priority).label }}
          </span>
        </div>
        <p class="text-sm" style="color:#64748B;">{{ query.carFull }} &middot; VIN: <span class="font-mono font-medium" style="color:#475569;">{{ query.vin }}</span></p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <span class="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg" style="background:#F0FDF4; border:1px solid #BBF7D0; color:#15803D;">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          Peržiūros režimas
        </span>
        <button @click="activeTab = 'offer'; showOfferForm = true"
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
          style="background:#14A34A; color:#fff;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
          </svg>
          {{ myOffer ? 'Redaguoti pasiūlymą' : 'Pateikti pasiūlymą' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5">

      <!-- Left column (2/3) -->
      <div class="col-span-2 space-y-5">

        <!-- Tab switcher -->
        <div class="flex items-center gap-0.5 p-1 rounded-xl w-fit" style="background:#F8FAFC; border:1px solid #E2E8F0;">
          <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
            class="px-4 py-1.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-150 flex items-center gap-2"
            :style="activeTab === tab.key
              ? 'background:#fff; color:#0F172A; box-shadow:0 1px 3px rgba(0,0,0,0.08);'
              : 'color:#64748B;'"
          >
            {{ tab.label }}
            <span v-if="tab.badge" class="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              :style="activeTab === tab.key ? 'background:#F0FDF4; color:#14A34A;' : 'background:#F1F5F9; color:#94A3B8;'">
              {{ tab.badge }}
            </span>
          </button>
        </div>

        <!-- ── TAB: Užklausa ── -->
        <template v-if="activeTab === 'query'">

          <!-- Donor vehicle card -->
          <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
            <!-- Card header -->
            <div class="flex items-center gap-3 px-5 py-4" style="border-bottom:1px solid #E2E8F0; background:#F8FAFC;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:#EFF6FF;">
                <svg class="w-4 h-4" style="color:#3B82F6;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"/>
                </svg>
              </div>
              <div>
                <h2 class="text-sm font-bold" style="color:#0F172A;">Kliento automobilis</h2>
                <p class="text-xs" style="color:#64748B;">Automobilis, kuriam reikalinga dalis</p>
              </div>
            </div>
            <!-- Specs grid -->
            <div class="p-5">
              <div class="grid grid-cols-3 gap-x-6 gap-y-4">
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Markė</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.make }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Modelis</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.model }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Generacija</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.generation }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Metai</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.year }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Rida</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.mileage }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Kuro tipas</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.fuelType }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Pavara</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.driveType }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Kėbulo tipas</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.bodyType }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Spalva</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.color }}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Variklis</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.engine }}</p>
                </div>
                <div class="col-span-3 pt-1" style="border-top:1px solid #F1F5F9;">
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style="color:#94A3B8;">VIN kodas</p>
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-sm font-bold px-3 py-1.5 rounded-lg" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; letter-spacing:0.08em;">{{ query.vin }}</span>
                    <button class="px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100 flex items-center gap-1.5" style="color:#64748B; border:1px solid #E2E8F0; background:#F8FAFC;" @click="copyVin">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      {{ vinCopied ? 'Nukopijuota!' : 'Kopijuoti' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Damaged car photos -->
          <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-sm font-bold" style="color:#0F172A;">Automobilio nuotraukos</h2>
                <p class="text-xs mt-0.5" style="color:#64748B;">Pažeidimų ir dalies vietos nuotraukos</p>
              </div>
              <span class="text-xs px-2.5 py-1 rounded-full font-medium" style="background:#F1F5F9; color:#64748B;">{{ query.carPhotos.length }} nuotr.</span>
            </div>
            <div class="grid grid-cols-5 gap-2.5">
              <div v-for="(photo, i) in query.carPhotos" :key="i"
                class="aspect-square rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-150 hover:opacity-80 relative overflow-hidden group"
                :style="photo.label ? 'background:#F1F5F9; border:1px solid #E2E8F0;' : 'background:#F1F5F9; border:1px solid #E2E8F0;'">
                <!-- Photo placeholder -->
                <svg class="w-5 h-5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span v-if="photo.label" class="text-[9px] font-medium text-center px-1 leading-tight" style="color:#94A3B8;">{{ photo.label }}</span>
              </div>
            </div>
          </div>

          <!-- Part request -->
          <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
            <div class="flex items-center gap-3 px-5 py-4" style="border-bottom:1px solid #E2E8F0; background:#FFFBEB;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:#FEF3C7;">
                <svg class="w-4 h-4" style="color:#D97706;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 class="text-sm font-bold" style="color:#0F172A;">Ieškoma dalis</h2>
                <p class="text-xs" style="color:#64748B;">Dalies specifikacija ir reikalavimai</p>
              </div>
            </div>
            <div class="p-5">
              <div class="grid grid-cols-3 gap-x-6 gap-y-4 mb-4">
                <div class="col-span-2">
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Dalies pavadinimas</p>
                  <p class="text-sm font-bold" style="color:#0F172A;">{{ query.part }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Būklė</p>
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full" style="background:#F0FDF4; color:#15803D;">Naudota (gera)</span>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">OEM numeris</p>
                  <p class="text-sm font-mono font-semibold" style="color:#0F172A;">{{ query.oem }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Kiekis</p>
                  <p class="text-sm font-semibold" style="color:#0F172A;">1 vnt.</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Maks. biudžetas</p>
                  <p class="text-sm font-semibold" style="color:#14A34A;">{{ query.budget }}</p>
                </div>
                <div class="col-span-3 pt-2" style="border-top:1px solid #F1F5F9;">
                  <p class="text-[10px] font-semibold uppercase tracking-wider mb-2" style="color:#94A3B8;">Papildomos pastabos</p>
                  <p class="text-sm leading-relaxed" style="color:#475569;">{{ query.notes }}</p>
                </div>
              </div>
            </div>
          </div>

        </template>

        <!-- ── TAB: Mano pasiūlymas ── -->
        <template v-if="activeTab === 'offer'">

          <!-- No offer yet -->
          <template v-if="!myOffer && !showOfferForm">
            <div class="rounded-xl p-10 flex flex-col items-center gap-4 text-center"
              style="border:2px dashed #D1FAE5; background:#F0FDF4;">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center" style="background:#DCFCE7;">
                <svg class="w-7 h-7" style="color:#14A34A;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                </svg>
              </div>
              <div>
                <p class="text-base font-bold mb-1" style="color:#0F172A;">Dar nepateikėte pasiūlymo</p>
                <p class="text-sm" style="color:#64748B;">Nurodykite donorinio automobilio informaciją, dalies būklę ir kainą</p>
              </div>
              <button @click="showOfferForm = true"
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
                style="background:#14A34A; color:#fff;">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                Pateikti pasiūlymą
              </button>
            </div>
          </template>

          <!-- Offer form -->
          <template v-if="showOfferForm">
            <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
              <div class="flex items-center justify-between px-5 py-4" style="border-bottom:1px solid #E2E8F0; background:#F8FAFC;">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:#F0FDF4;">
                    <svg class="w-4 h-4" style="color:#14A34A;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"/>
                    </svg>
                  </div>
                  <h2 class="text-sm font-bold" style="color:#0F172A;">Donorinis automobilis</h2>
                </div>
                <button @click="showOfferForm = false" class="p-1.5 rounded-lg cursor-pointer hover:bg-slate-100" style="color:#94A3B8;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div class="p-5 space-y-5">

                <!-- Donor vehicle specs -->
                <div class="grid grid-cols-3 gap-3">
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Markė *</label>
                    <input v-model="form.donorMake" type="text" placeholder="pvz. BMW" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Modelis *</label>
                    <input v-model="form.donorModel" type="text" placeholder="pvz. 5 Series" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Generacija</label>
                    <input v-model="form.donorGeneration" type="text" placeholder="pvz. E60" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Metai *</label>
                    <input v-model="form.donorYear" type="text" placeholder="pvz. 2004" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Rida *</label>
                    <input v-model="form.donorMileage" type="text" placeholder="pvz. 187 400 km" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Variklis</label>
                    <input v-model="form.donorEngine" type="text" placeholder="pvz. 2.0d 163ps" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Kuro tipas *</label>
                    <select v-model="form.donorFuel" class="w-full px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                      <option value="">Pasirinkti...</option>
                      <option>Benzinas</option>
                      <option>Dyzelis</option>
                      <option>Elektra</option>
                      <option>Hibridas</option>
                      <option>Dujos</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Pavara *</label>
                    <select v-model="form.donorDrive" class="w-full px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                      <option value="">Pasirinkti...</option>
                      <option>RWD (galinė)</option>
                      <option>FWD (priekinė)</option>
                      <option>AWD (pilna)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">VIN kodas</label>
                    <input v-model="form.donorVin" type="text" placeholder="17 simbolių..." class="w-full px-3 py-2 text-sm font-mono rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:'Courier New',monospace; letter-spacing:0.04em;">
                  </div>
                </div>

                <!-- Donor vehicle photos -->
                <div style="border-top:1px solid #E2E8F0; padding-top:16px;">
                  <label class="block text-[11px] font-semibold uppercase tracking-wider mb-3" style="color:#64748B;">Donorinio automobilio nuotraukos</label>
                  <div class="grid grid-cols-5 gap-2.5">
                    <div v-for="i in 4" :key="i"
                      class="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-150 hover:bg-slate-50"
                      style="border:2px dashed #E2E8F0;">
                      <svg class="w-5 h-5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-[9px] font-medium" style="color:#CBD5E1;">Įkelti</span>
                    </div>
                    <div class="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-150 hover:bg-green-50"
                      style="border:2px dashed #BBF7D0;">
                      <svg class="w-5 h-5" style="color:#14A34A;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                      </svg>
                      <span class="text-[9px] font-semibold" style="color:#14A34A;">Pridėti</span>
                    </div>
                  </div>
                </div>

                <!-- Part details -->
                <div style="border-top:1px solid #E2E8F0; padding-top:16px;">
                  <h3 class="text-sm font-bold mb-3" style="color:#0F172A;">Dalies informacija</h3>
                  <div class="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Kaina (€, be PVM) *</label>
                      <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style="color:#94A3B8;">€</span>
                        <input v-model="form.price" type="number" placeholder="0.00" class="w-full pl-7 pr-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                      </div>
                    </div>
                    <div>
                      <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Būklė *</label>
                      <select v-model="form.condition" class="w-full px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                        <option value="">Pasirinkti...</option>
                        <option>Naudota — puiki</option>
                        <option>Naudota — gera</option>
                        <option>Naudota — vidutinė</option>
                        <option>OEM nauja</option>
                        <option>Atnaujinta</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Garantija</label>
                      <select v-model="form.warranty" class="w-full px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                        <option value="">Nėra</option>
                        <option>1 mėn.</option>
                        <option>3 mėn.</option>
                        <option>6 mėn.</option>
                        <option>12 mėn.</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Pristatymas *</label>
                      <select v-model="form.delivery" class="w-full px-3 py-2 text-sm rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                        <option value="">Pasirinkti...</option>
                        <option>Tą pačią dieną</option>
                        <option>1 d.d.</option>
                        <option>1–2 d.d.</option>
                        <option>2–3 d.d.</option>
                        <option>3–5 d.d.</option>
                        <option>Atsiimti vietoje</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">OEM numeris</label>
                      <input v-model="form.oem" type="text" placeholder="Pvz. 51117896897" class="w-full px-3 py-2 text-sm font-mono rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:'Courier New',monospace;">
                    </div>
                    <div>
                      <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Spalva</label>
                      <input v-model="form.partColor" type="text" placeholder="pvz. Titansilber" class="w-full px-3 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
                    </div>
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#64748B;">Komentaras</label>
                    <textarea v-model="form.notes" rows="3" placeholder="Papildoma informacija apie dalį, pristatymo sąlygas ar kainos derybas..." class="w-full px-3 py-2.5 text-sm rounded-lg resize-none focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit; line-height:1.6;"></textarea>
                  </div>
                </div>

                <!-- Part photos -->
                <div style="border-top:1px solid #E2E8F0; padding-top:16px;">
                  <label class="block text-[11px] font-semibold uppercase tracking-wider mb-3" style="color:#64748B;">Dalies nuotraukos</label>
                  <div class="grid grid-cols-5 gap-2.5">
                    <div v-for="i in 6" :key="i"
                      class="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-150 hover:bg-slate-50"
                      style="border:2px dashed #E2E8F0;">
                      <svg class="w-5 h-5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-[9px] font-medium" style="color:#CBD5E1;">Įkelti</span>
                    </div>
                  </div>
                </div>

                <!-- Form actions -->
                <div class="flex items-center justify-between pt-1" style="border-top:1px solid #E2E8F0;">
                  <button @click="showOfferForm = false" class="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#64748B; border:1px solid #E2E8F0; background:#F8FAFC;">
                    Atšaukti
                  </button>
                  <button @click="submitOffer"
                    class="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
                    style="background:#14A34A; color:#fff;">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    Pateikti pasiūlymą
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- My offer (submitted) -->
          <template v-if="myOffer && !showOfferForm">

            <!-- Status banner -->
            <div class="flex items-center gap-3 px-5 py-3.5 rounded-xl mb-1" :style="myOffer.accepted ? 'background:#F0FDF4; border:1px solid #BBF7D0;' : 'background:#FFFBEB; border:1px solid #FDE68A;'">
              <svg class="w-4 h-4 flex-shrink-0" :style="myOffer.accepted ? 'color:#14A34A;' : 'color:#D97706;'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path v-if="myOffer.accepted" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-semibold" :style="myOffer.accepted ? 'color:#15803D;' : 'color:#B45309;'">
                {{ myOffer.accepted ? 'Pasiūlymas priimtas — laukiamas apmokėjimas' : 'Pasiūlymas pateiktas — laukiama kliento sprendimo' }}
              </span>
              <div class="ml-auto flex items-center gap-2">
                <button @click="showOfferForm = true" class="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-150 hover:bg-white" :style="myOffer.accepted ? 'color:#15803D; border:1px solid #86EFAC; background:#DCFCE7;' : 'color:#B45309; border:1px solid #FDE68A; background:#FEF9C3;'">
                  Redaguoti
                </button>
              </div>
            </div>

            <!-- Offer card -->
            <div class="rounded-xl overflow-hidden" style="background:#fff; border:2px solid #14A34A;">
              <!-- Offer header -->
              <div class="flex items-start justify-between px-5 py-4" style="border-bottom:1px solid #E2E8F0; background:#F0FDF4;">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style="background:#DCFCE7; color:#14A34A;">
                    {{ myOffer.initials }}
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <p class="text-sm font-bold" style="color:#0F172A;">{{ myOffer.supplier }}</p>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:#14A34A; color:#fff;">Mūsų pasiūlymas</span>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5">
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span class="text-xs" style="color:#64748B;">{{ myOffer.city }}</span>
                      </div>
                      <span style="color:#E2E8F0;">·</span>
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3" style="color:#F59E0B;" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span class="text-xs font-semibold" style="color:#0F172A;">{{ myOffer.rating }}</span>
                        <span class="text-xs" style="color:#94A3B8;">({{ myOffer.reviews }})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold" style="color:#14A34A;">€{{ myOffer.price }}</p>
                  <p class="text-xs" style="color:#94A3B8;">be PVM</p>
                  <p class="text-[11px] mt-0.5" style="color:#64748B;">Pateikta {{ myOffer.submittedAt }}</p>
                </div>
              </div>

              <div class="p-5 space-y-5">

                <!-- Donor vehicle section -->
                <div>
                  <h3 class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style="color:#64748B;">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1"/>
                    </svg>
                    Donorinis automobilis
                  </h3>
                  <div class="grid grid-cols-4 gap-3 mb-3">
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Markė / Modelis</p>
                      <p class="text-xs font-bold" style="color:#0F172A;">{{ myOffer.donorMake }} {{ myOffer.donorModel }}</p>
                      <p class="text-[11px]" style="color:#64748B;">{{ myOffer.donorGeneration }}</p>
                    </div>
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Metai / Rida</p>
                      <p class="text-xs font-bold" style="color:#0F172A;">{{ myOffer.donorYear }}</p>
                      <p class="text-[11px]" style="color:#64748B;">{{ myOffer.donorMileage }}</p>
                    </div>
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Kuras / Pavara</p>
                      <p class="text-xs font-bold" style="color:#0F172A;">{{ myOffer.donorFuel }}</p>
                      <p class="text-[11px]" style="color:#64748B;">{{ myOffer.donorDrive }}</p>
                    </div>
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">VIN kodas</p>
                      <p class="text-xs font-mono font-bold" style="color:#0F172A; font-size:10px; letter-spacing:0.04em;">{{ myOffer.donorVin }}</p>
                    </div>
                  </div>
                  <!-- Donor car photos -->
                  <div class="grid grid-cols-5 gap-2">
                    <div v-for="(photo, i) in myOffer.donorPhotos" :key="i"
                      class="aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-opacity duration-150 hover:opacity-80"
                      style="background:#F1F5F9; border:1px solid #E2E8F0;">
                      <svg class="w-5 h-5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Part details -->
                <div style="border-top:1px solid #F1F5F9; padding-top:16px;">
                  <h3 class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style="color:#64748B;">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Dalies duomenys
                  </h3>
                  <div class="grid grid-cols-4 gap-3 mb-3">
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Būklė</p>
                      <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :style="conditionStyle(myOffer.condition)">{{ myOffer.condition }}</span>
                    </div>
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Pristatymas</p>
                      <p class="text-xs font-bold" style="color:#0F172A;">{{ myOffer.delivery }}</p>
                    </div>
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Garantija</p>
                      <p class="text-xs font-bold" style="color:#0F172A;">{{ myOffer.warranty }}</p>
                    </div>
                    <div class="rounded-lg p-3" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                      <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">OEM numeris</p>
                      <p class="text-xs font-mono font-bold" style="color:#0F172A;">{{ myOffer.oem }}</p>
                    </div>
                  </div>
                  <!-- Part photos -->
                  <div class="grid grid-cols-5 gap-2 mb-3">
                    <div v-for="(photo, i) in myOffer.partPhotos" :key="i"
                      class="aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-opacity duration-150 hover:opacity-80"
                      style="background:#F1F5F9; border:1px solid #E2E8F0;">
                      <svg class="w-5 h-5" style="color:#CBD5E1;" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                  <p class="text-sm leading-relaxed" style="color:#475569;">{{ myOffer.notes }}</p>
                </div>

              </div>
            </div>
          </template>

        </template>

        <!-- ── TAB: Susirašinėjimas ── -->
        <template v-if="activeTab === 'messages'">
          <div class="rounded-xl overflow-hidden" style="background:#fff; border:1px solid #E2E8F0;">
            <div class="flex items-center gap-3 px-5 py-4" style="border-bottom:1px solid #E2E8F0; background:#F8FAFC;">
              <h2 class="text-sm font-bold" style="color:#0F172A;">Susirašinėjimas su klientu</h2>
              <span class="ml-auto text-xs px-2.5 py-1 rounded-full font-medium" style="background:#F1F5F9; color:#64748B;">{{ query.client }}</span>
            </div>
            <div class="p-5">
              <div class="space-y-4 mb-5">
                <div v-for="msg in query.messages" :key="msg.id" class="flex gap-3" :class="msg.fromMe ? 'flex-row-reverse' : ''">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    :style="msg.fromMe ? 'background:#14A34A; color:#fff;' : `background:${query.clientAvatarBg}; color:${query.clientAvatarColor};`">
                    {{ msg.fromMe ? 'JK' : query.clientInitial }}
                  </div>
                  <div class="max-w-sm">
                    <div class="rounded-xl px-4 py-3 text-sm"
                      :style="msg.fromMe ? 'background:#F0FDF4; color:#0F172A;' : 'background:#F8FAFC; color:#0F172A; border:1px solid #E2E8F0;'">
                      {{ msg.text }}
                    </div>
                    <p class="text-[11px] mt-1 px-1" style="color:#94A3B8;" :class="msg.fromMe ? 'text-right' : ''">{{ msg.time }}</p>
                  </div>
                </div>
              </div>
              <div class="pt-4" style="border-top:1px solid #E2E8F0;">
                <textarea v-model="replyText" rows="3" placeholder="Rašyti atsakymą..."
                  class="w-full px-4 py-3 text-sm rounded-xl resize-none focus:outline-none transition-all duration-150"
                  style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;"></textarea>
                <div class="flex items-center justify-end mt-3">
                  <button @click="sendReply"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
                    :style="replyText.trim() ? 'background:#14A34A; color:#fff;' : 'background:#F1F5F9; color:#94A3B8; cursor:not-allowed;'"
                    :disabled="!replyText.trim()">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Siųsti
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

      </div>

      <!-- ── Right sidebar ── -->
      <div class="space-y-4">

        <!-- Deadline -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3 flex items-center gap-2" style="color:#0F172A;">
            <svg class="w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Terminas
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold" :style="`color:${dueDateColor(query.dueDate)}`">{{ formatDate(query.dueDate) }}</span>
            <span class="text-xs ml-auto px-2 py-0.5 rounded-full font-semibold" :style="`background:${dueDateBg(query.dueDate)}; color:${dueDateColor(query.dueDate)};`">{{ dueRelative(query.dueDate) }}</span>
          </div>
        </div>

        <!-- My offer summary -->
        <div class="rounded-xl p-4" :style="myOffer ? 'background:#F0FDF4; border:1px solid #BBF7D0;' : 'background:#fff; border:1px solid #E2E8F0;'">
          <h3 class="text-xs font-bold mb-3" :style="myOffer ? 'color:#15803D;' : 'color:#0F172A;'">Mano pasiūlymas</h3>
          <template v-if="myOffer">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs" style="color:#64748B;">Kaina</span>
                <span class="text-sm font-bold" style="color:#14A34A;">€{{ myOffer.price }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs" style="color:#64748B;">Pristatymas</span>
                <span class="text-xs font-semibold" style="color:#0F172A;">{{ myOffer.delivery }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs" style="color:#64748B;">Būklė</span>
                <span class="text-xs font-semibold" style="color:#0F172A;">{{ myOffer.condition }}</span>
              </div>
              <div class="flex items-center justify-between pt-1" style="border-top:1px solid #BBF7D0;">
                <span class="text-xs" style="color:#64748B;">Statusas</span>
                <span class="text-xs font-bold" :style="myOffer.accepted ? 'color:#14A34A;' : 'color:#D97706;'">
                  {{ myOffer.accepted ? 'Priimtas' : 'Laukiama' }}
                </span>
              </div>
            </div>
            <button @click="showOfferForm = true; activeTab = 'offer'"
              class="w-full mt-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-150 hover:bg-green-200"
              style="background:#DCFCE7; color:#14A34A;">
              Redaguoti
            </button>
          </template>
          <template v-else>
            <p class="text-xs mb-3" style="color:#94A3B8;">Dar nepateikėte pasiūlymo šiai užklausai</p>
            <button @click="activeTab = 'offer'; showOfferForm = true"
              class="w-full py-2 rounded-lg text-xs font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
              style="background:#14A34A; color:#fff;">
              Pateikti pasiūlymą
            </button>
          </template>
        </div>

        <!-- Client -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Klientas</h3>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              :style="`background:${query.clientAvatarBg}; color:${query.clientAvatarColor};`">
              {{ query.clientInitial }}
            </div>
            <div>
              <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.client }}</p>
              <p class="text-xs" style="color:#94A3B8;">{{ query.clientType }}</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-xs" style="color:#475569;">
              <svg class="w-3.5 h-3.5 flex-shrink-0" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {{ query.clientEmail }}
            </div>
            <div class="flex items-center gap-2 text-xs" style="color:#475569;">
              <svg class="w-3.5 h-3.5 flex-shrink-0" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {{ query.clientPhone }}
            </div>
            <div class="flex items-center gap-2 text-xs" style="color:#475569;">
              <svg class="w-3.5 h-3.5 flex-shrink-0" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {{ query.clientCity }}
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Istorija</h3>
          <div class="space-y-3">
            <div v-for="(event, i) in query.timeline" :key="event.id" class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" :style="`background:${event.color}18;`">
                  <div class="w-1.5 h-1.5 rounded-full" :style="`background:${event.color}`"></div>
                </div>
                <div v-if="i < query.timeline.length - 1" class="w-px flex-1 mt-1" style="background:#E2E8F0; min-height:12px;"></div>
              </div>
              <div class="pb-3">
                <p class="text-xs font-medium" style="color:#0F172A;">{{ event.label }}</p>
                <p class="text-[11px]" style="color:#94A3B8;">{{ event.time }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'supplier' })
useHead({ title: 'Užklausa — recar PRO' })

const route = useRoute()
const replyText = ref('')
const activeTab = ref('query')
const showOfferForm = ref(false)
const vinCopied = ref(false)

const tabs = [
  { key: 'query',    label: 'Užklausa',           badge: null },
  { key: 'offer',    label: 'Mano pasiūlymas',     badge: null },
  { key: 'messages', label: 'Susirašinėjimas',     badge: '3' },
]

const query = reactive({
  id: route.params.id ?? 'UZK-2847',
  make: 'BMW',
  model: '5 Series',
  generation: 'E60 (2003–2010)',
  year: '2005',
  mileage: '214 500 km',
  fuelType: 'Dyzelis',
  driveType: 'RWD (galinė)',
  bodyType: 'Sedanas',
  color: 'Titansilber Metallic',
  engine: '2.0d 163 l.j. · M47 · 122 kW',
  vin: 'WBANE71060B123456',
  carFull: 'BMW 5 Series E60 520d 2005',
  oem: '51117896897',
  budget: '≤ €220',
  notes: 'Reikalingas originalus arba OEM kokybės priekinis bamperis su M-packet optika ir parkavimo jutiklių skylutėmis. Spalva nebūtina — turimas dažytas, tačiau pageidautina be stiprių mechaninių pažeidimų ar įtrūkimų.',
  part: 'Priekinis bamperis (M-packet)',
  status: 'new' as string,
  priority: 'high' as string,
  dueDate: '2026-03-24',
  client: 'UAB Draudimas LT',
  clientType: 'Draudimo kompanija',
  clientInitial: 'D',
  clientAvatarBg: '#EFF6FF',
  clientAvatarColor: '#3B82F6',
  clientEmail: 'info@draudimaslt.lt',
  clientPhone: '+370 5 212 3456',
  clientCity: 'Vilnius, Lietuva',
  carPhotos: [
    { label: 'Priekis' },
    { label: 'Galas' },
    { label: 'Kairė' },
    { label: 'Dešinė' },
    { label: 'Pažeidimas' },
  ],
  messages: [
    { id: 1, fromMe: false, text: 'Laba diena, ieškome priekinio bamperio BMW E60 su M-packet optika. Ar turite sandėlyje?', time: 'Šiandien, 09:14' },
    { id: 2, fromMe: true,  text: 'Laba diena! Tikriname sandėlį, turėtume atsakyti per 2 val.', time: 'Šiandien, 09:31' },
    { id: 3, fromMe: false, text: 'Ačiū, laukiame. Ar galėtumėte nurodyti ir OEM numerį?', time: 'Šiandien, 09:45' },
  ],
  timeline: [
    { id: 1, label: 'Užklausa gauta',            time: 'Šiandien, 09:14', color: '#3B82F6' },
    { id: 2, label: 'Atsakyta klientui',          time: 'Šiandien, 09:31', color: '#14A34A' },
    { id: 3, label: 'Sandėlio patikrinimas',      time: 'Šiandien, 09:35', color: '#F59E0B' },
    { id: 4, label: 'Laukiama kliento patvirt.',  time: 'Šiandien, 09:50', color: '#94A3B8' },
  ],
})

// My submitted offer (supplier sees only their own)
const myOffer = ref({
  id: 1,
  supplier: 'UAB AutoDalys',
  initials: 'AD',
  city: 'Vilnius',
  rating: 4.9,
  reviews: 312,
  price: 185,
  condition: 'Naudota — gera',
  delivery: '1–2 d.d.',
  warranty: '3 mėn.',
  oem: '51117896897',
  submittedAt: 'prieš 1 val.',
  accepted: false,
  notes: 'Turime originalų BMW bamperį iš E60 2004m. Būklė labai gera — be įtrūkimų, tik nedideli dažų nuskilimo pėdsakai viršutinėje dalyje. Turi parkavimo jutiklių skyles. Galimas pristatymas į visą Lietuvą.',
  // Donor vehicle
  donorMake: 'BMW',
  donorModel: '5 Series',
  donorGeneration: 'E60',
  donorYear: '2004',
  donorMileage: '187 400 km',
  donorFuel: 'Dyzelis',
  donorDrive: 'RWD (galinė)',
  donorVin: 'WBANE310X0B987654',
  donorPhotos: [{}, {}, {}, {}],
  partPhotos: [{}, {}, {}, {}, {}],
} as any)

// Offer form state
const form = reactive({
  donorMake: '',
  donorModel: '',
  donorGeneration: '',
  donorYear: '',
  donorMileage: '',
  donorEngine: '',
  donorFuel: '',
  donorDrive: '',
  donorVin: '',
  price: '',
  condition: '',
  warranty: '',
  delivery: '',
  oem: '',
  partColor: '',
  notes: '',
})

function submitOffer() {
  myOffer.value = {
    id: Date.now(),
    supplier: 'UAB AutoDalys',
    initials: 'AD',
    city: 'Vilnius',
    rating: 4.9,
    reviews: 312,
    price: Number(form.price) || 0,
    condition: form.condition,
    delivery: form.delivery,
    warranty: form.warranty || 'Nėra',
    oem: form.oem,
    submittedAt: 'ką tik',
    accepted: false,
    notes: form.notes,
    donorMake: form.donorMake,
    donorModel: form.donorModel,
    donorGeneration: form.donorGeneration,
    donorYear: form.donorYear,
    donorMileage: form.donorMileage,
    donorFuel: form.donorFuel,
    donorDrive: form.donorDrive,
    donorVin: form.donorVin,
    donorPhotos: [{}, {}, {}, {}],
    partPhotos: [{}, {}, {}, {}, {}],
  }
  showOfferForm.value = false
}

function copyVin() {
  navigator.clipboard?.writeText(query.vin)
  vinCopied.value = true
  setTimeout(() => { vinCopied.value = false }, 2000)
}

function sendReply() {
  if (!replyText.value.trim()) return
  query.messages.push({ id: Date.now(), fromMe: true, text: replyText.value.trim(), time: 'Dabar' })
  replyText.value = ''
}

function conditionStyle(c: string) {
  if (c?.includes('OEM') || c?.includes('nauja')) return 'background:#F0FDF4; color:#15803D;'
  if (c?.includes('puiki') || c?.includes('gera')) return 'background:#F0FDF4; color:#15803D;'
  if (c?.includes('vidutinė')) return 'background:#FFFBEB; color:#D97706;'
  return 'background:#F8FAFC; color:#475569;'
}

function statusStyle(status: string) {
  const map: Record<string, any> = {
    new:        { badge: 'background:#EFF6FF; color:#2563EB;', dot: 'background:#3B82F6;', label: 'Nauja' },
    inprogress: { badge: 'background:#FFFBEB; color:#D97706;', dot: 'background:#F59E0B;', label: 'Vykdoma' },
    waiting:    { badge: 'background:#FFFBEB; color:#D97706;', dot: 'background:#F59E0B;', label: 'Laukiama' },
    done:       { badge: 'background:#F0FDF4; color:#15803D;', dot: 'background:#14A34A;', label: 'Įvykdyta' },
    cancelled:  { badge: 'background:#FEF2F2; color:#DC2626;', dot: 'background:#EF4444;', label: 'Atšaukta' },
  }
  return map[status] ?? map.new
}

function priorityStyle(priority: string) {
  const map: Record<string, any> = {
    critical: { badge: 'background:#FEF2F2; color:#DC2626;', label: 'Kritinis' },
    high:     { badge: 'background:#FFF7ED; color:#EA580C;', label: 'Aukštas' },
    medium:   { badge: 'background:#FFFBEB; color:#D97706;', label: 'Vidutinis' },
    low:      { badge: 'background:#F8FAFC; color:#64748B;', label: 'Žemas' },
  }
  return map[priority] ?? map.medium
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' })
}
function dueDateColor(date: string) {
  const diff = new Date(date).getTime() - new Date('2026-03-23').getTime()
  if (diff < 0) return '#DC2626'
  if (diff < 86400000) return '#EA580C'
  if (diff < 172800000) return '#D97706'
  return '#64748B'
}
function dueDateBg(date: string) {
  const diff = new Date(date).getTime() - new Date('2026-03-23').getTime()
  if (diff < 0) return '#FEF2F2'
  if (diff < 86400000) return '#FFF7ED'
  if (diff < 172800000) return '#FFFBEB'
  return '#F8FAFC'
}
function dueRelative(date: string) {
  const diff = Math.ceil((new Date(date).getTime() - new Date('2026-03-23').getTime()) / 86400000)
  if (diff < 0) return 'Vėluoja!'
  if (diff === 0) return 'Šiandien'
  if (diff === 1) return 'Rytoj'
  return `Po ${diff}d.`
}
</script>
