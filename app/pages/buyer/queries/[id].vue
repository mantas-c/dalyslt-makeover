<template>
  <div class="p-6 max-w-6xl" style="font-family:'Plus Jakarta Sans',sans-serif;">

    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 mb-6">
      <NuxtLink to="/buyer/queries" class="flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors duration-150 hover:opacity-70" style="color:#64748B;">
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
        <div class="flex items-center gap-3 mb-1">
          <h1 class="text-xl font-bold" style="color:#0F172A;">{{ query.part }}</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" :style="statusBadge.badge">
            <span class="w-1.5 h-1.5 rounded-full" :style="statusBadge.dot"></span>
            {{ statusBadge.label }}
          </span>
        </div>
        <p class="text-sm" style="color:#64748B;">{{ query.car }} &middot; VIN: <span class="font-mono font-medium" style="color:#475569;">{{ query.vin }}</span></p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0; background:#F8FAFC;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Redaguoti
        </button>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-5">

      <!-- ─── LEFT COLUMN ─── -->
      <div class="col-span-2 space-y-5">

        <!-- ══════════════════════════════
             MODE: OFFERS (id=1)
             ══════════════════════════════ -->
        <template v-if="query.status === 'offers'">
          <div class="grid grid-cols-4 gap-4">
            <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#94A3B8;">Pasiūlymų</p>
              <p class="text-2xl font-bold" style="color:#0F172A;">{{ offers.length }}</p>
            </div>
            <div class="rounded-xl p-4" style="background:#fff; border:2px solid #14A34A;">
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#14A34A;">Geriausia kaina</p>
              <p class="text-2xl font-bold" style="color:#14A34A;">€{{ Math.min(...offers.map(o => o.price)) }}</p>
            </div>
            <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#94A3B8;">Greičiausias</p>
              <p class="text-2xl font-bold" style="color:#0F172A;">1d.</p>
            </div>
            <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color:#94A3B8;">Pasirinkta</p>
              <p class="text-sm font-bold mt-1" :style="offers.some(o => o.accepted) ? 'color:#14A34A;' : 'color:#94A3B8;'">
                {{ offers.some(o => o.accepted) ? offers.find(o => o.accepted)?.supplier : 'Nepasirinkta' }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <h2 class="text-sm font-bold" style="color:#0F172A;">Visi pasiūlymai ({{ offers.length }})</h2>
            <div class="flex items-center gap-2">
              <span class="text-xs" style="color:#64748B;">Rūšiuoti:</span>
              <select v-model="sortBy" class="text-xs px-2.5 py-1.5 rounded-lg cursor-pointer focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#475569; font-family:inherit;">
                <option value="price">Kaina ↑</option>
                <option value="rating">Įvertinimas ↓</option>
              </select>
            </div>
          </div>

          <div class="space-y-3">
            <div v-for="(offer, idx) in sortedOffers" :key="offer.id" class="rounded-xl p-5 transition-all duration-150"
              :style="offer.accepted ? 'background:#F0FDF4; border:2px solid #14A34A;' : idx === 0 && !offers.some(o => o.accepted) ? 'background:#fff; border:2px solid #14A34A;' : 'background:#fff; border:1px solid #E2E8F0;'">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" :style="`background:${offer.avatarBg}; color:${offer.avatarColor};`">{{ offer.initials }}</div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <p class="text-sm font-bold" style="color:#0F172A;">{{ offer.supplier }}</p>
                      <span v-if="offer.accepted" class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:#14A34A; color:#fff;">Priimtas</span>
                      <span v-else-if="idx === 0 && !offers.some(o => o.accepted)" class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:#F0FDF4; color:#14A34A;">Geriausias</span>
                    </div>
                    <div class="flex items-center gap-3 mt-0.5">
                      <span class="text-xs" style="color:#64748B;">{{ offer.city }}</span>
                      <div class="flex items-center gap-1">
                        <svg class="w-3 h-3" style="color:#F59E0B;" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        <span class="text-xs font-semibold" style="color:#0F172A;">{{ offer.rating }}</span>
                        <span class="text-xs" style="color:#94A3B8;">({{ offer.reviews }})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold" :style="offer.accepted || (idx === 0 && !offers.some(o => o.accepted)) ? 'color:#14A34A;' : 'color:#0F172A;'">€{{ offer.price }}</p>
                  <p class="text-xs" style="color:#94A3B8;">be PVM</p>
                </div>
              </div>
              <!-- ── DONOR VEHICLE ── -->
              <div v-if="offer.donorSpecs" class="rounded-xl p-4 mb-4" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-3.5 h-3.5" style="color:#64748B;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 17a2 2 0 104 0m0 0a2 2 0 104 0M3 17V9l3-5h12l3 5v8M3 13h18"/>
                  </svg>
                  <p class="text-[11px] font-bold uppercase tracking-wider" style="color:#64748B;">Donoro automobilis</p>
                </div>

                <!-- Donor vehicle photos -->
                <div v-if="offer.donorPhotos?.length" class="flex gap-2 mb-3 overflow-x-auto pb-1">
                  <button
                    v-for="(photo, pi) in offer.donorPhotos" :key="pi"
                    @click.stop="Object.assign(lightbox, { open: true, offer: { ...offer, photos: offer.donorPhotos, supplier: offer.supplier + ' — Donoro automobilis' }, index: pi })"
                    class="relative rounded-lg overflow-hidden cursor-pointer group/photo flex-shrink-0 transition-all duration-150 hover:opacity-90"
                    style="width:120px; height:80px; border:1px solid #E2E8F0;"
                  >
                    <img :src="photo.url" :alt="photo.label" class="w-full h-full object-cover">
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-150" style="background:rgba(0,0,0,0.35);">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 px-1.5 py-1" style="background:linear-gradient(transparent,rgba(0,0,0,0.55));">
                      <p class="text-[10px] font-medium text-white truncate">{{ photo.label }}</p>
                    </div>
                  </button>
                </div>

                <!-- Donor specs grid -->
                <div class="grid grid-cols-4 gap-2">
                  <div v-for="spec in offer.donorSpecs" :key="spec.label" class="rounded-lg p-2" style="background:#fff; border:1px solid #E2E8F0;">
                    <p class="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style="color:#94A3B8;">{{ spec.label }}</p>
                    <p class="text-xs font-semibold truncate" style="color:#0F172A;">{{ spec.value }}</p>
                  </div>
                </div>
              </div>

              <!-- ── PART DETAILS ── -->
              <div class="rounded-xl p-4 mb-4" style="background:#F8FAFC; border:1px solid #E2E8F0;">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-3.5 h-3.5" style="color:#64748B;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <p class="text-[11px] font-bold uppercase tracking-wider" style="color:#64748B;">Siūloma dalis</p>
                </div>

                <!-- Part photos -->
                <div v-if="offer.photos?.length" class="flex gap-2 mb-3 overflow-x-auto pb-1">
                  <button
                    v-for="(photo, pi) in offer.photos" :key="pi"
                    @click.stop="Object.assign(lightbox, { open: true, offer, index: pi })"
                    class="relative rounded-lg overflow-hidden cursor-pointer group/photo flex-shrink-0 transition-all duration-150 hover:opacity-90"
                    style="width:120px; height:80px; border:1px solid #E2E8F0;"
                  >
                    <img :src="photo.url" :alt="photo.label" class="w-full h-full object-cover">
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-150" style="background:rgba(0,0,0,0.35);">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 px-1.5 py-1" style="background:linear-gradient(transparent,rgba(0,0,0,0.55));">
                      <p class="text-[10px] font-medium text-white truncate">{{ photo.label }}</p>
                    </div>
                  </button>
                </div>

                <!-- Part specs -->
                <div class="grid grid-cols-4 gap-2 mb-3">
                  <div v-for="chip in [['Būklė', offer.condition], ['Pristatymas', offer.delivery], ['Garantija', offer.warranty], ['Pateikta', offer.submittedAt]]" :key="chip[0]" class="rounded-lg p-2" style="background:#fff; border:1px solid #E2E8F0;">
                    <p class="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style="color:#94A3B8;">{{ chip[0] }}</p>
                    <p class="text-xs font-semibold" style="color:#0F172A;">{{ chip[1] }}</p>
                  </div>
                </div>

                <p class="text-sm leading-relaxed" style="color:#475569;">{{ offer.notes }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button @click="acceptOffer(offer)" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-150"
                  :style="offer.accepted ? 'color:#DC2626; border:1px solid #FECACA; background:#FEF2F2;' : 'background:#14A34A; color:#fff;'">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path v-if="!offer.accepted" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  {{ offer.accepted ? 'Atšaukti' : 'Priimti pasiūlymą' }}
                </button>
                <button class="px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569; border:1px solid #E2E8F0;">Rašyti žinutę</button>
              </div>
            </div>
          </div>
        </template>

        <!-- ══════════════════════════════
             MODE: IN TRANSIT (id=6)
             ══════════════════════════════ -->
        <template v-if="query.status === 'transit'">

          <!-- Accepted supplier banner -->
          <div class="rounded-xl p-4 flex items-center gap-4" style="background:#FFFBEB; border:2px solid #F59E0B;">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style="background:#FEF3C7; color:#D97706;">MB</div>
            <div class="flex-1">
              <p class="text-sm font-bold" style="color:#0F172A;">MB AutoSalvage — Kaunas</p>
              <p class="text-xs" style="color:#64748B;">Priimtas pasiūlymas · €65 · Pristatymas DPD</p>
            </div>
            <div class="text-right">
              <p class="text-xl font-bold" style="color:#D97706;">€65</p>
              <p class="text-xs" style="color:#94A3B8;">be PVM</p>
            </div>
          </div>

          <!-- Tracking card -->
          <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h2 class="text-sm font-bold" style="color:#0F172A;">Siuntimo sekimas</h2>
                <p class="text-xs mt-0.5" style="color:#64748B;">DPD · Sekimo nr.: <span class="font-mono font-semibold" style="color:#475569;">05933452781LT</span></p>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style="background:#FFFBEB; color:#D97706;">
                <span class="w-2 h-2 rounded-full animate-pulse" style="background:#F59E0B;"></span>
                Pakeliui
              </span>
            </div>

            <!-- Progress bar -->
            <div class="relative mb-8">
              <div class="h-1.5 rounded-full" style="background:#E2E8F0;"></div>
              <div class="absolute top-0 left-0 h-1.5 rounded-full transition-all duration-500" style="background:#F59E0B; width:60%;"></div>
              <div class="absolute -top-1 flex justify-between w-full">
                <div v-for="(step, i) in trackingSteps" :key="i" class="flex flex-col items-center" :style="`left:${i * 25}%; position:absolute; transform:translateX(-50%);`">
                  <div class="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                    :style="step.done ? 'background:#14A34A; border-color:#14A34A;' : step.active ? 'background:#F59E0B; border-color:#F59E0B;' : 'background:#fff; border-color:#E2E8F0;'">
                    <svg v-if="step.done" class="w-2 h-2" style="color:#fff;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p class="text-[10px] font-semibold mt-3 whitespace-nowrap" :style="step.done ? 'color:#14A34A;' : step.active ? 'color:#D97706;' : 'color:#94A3B8;'">{{ step.label }}</p>
                </div>
              </div>
            </div>

            <!-- Event log -->
            <div class="space-y-0 mt-2">
              <div v-for="(event, i) in trackingEvents" :key="i"
                class="flex gap-4 py-3"
                :style="i < trackingEvents.length - 1 ? 'border-bottom:1px solid #F8FAFC;' : ''">
                <div class="w-28 flex-shrink-0 text-right">
                  <p class="text-xs font-semibold" style="color:#0F172A;">{{ event.date }}</p>
                  <p class="text-[11px]" style="color:#94A3B8;">{{ event.time }}</p>
                </div>
                <div class="flex flex-col items-center gap-1 flex-shrink-0">
                  <div class="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
                    :style="i === 0 ? 'background:#F59E0B;' : 'background:#14A34A;'"></div>
                  <div v-if="i < trackingEvents.length - 1" class="w-px flex-1" style="background:#E2E8F0; min-height:16px;"></div>
                </div>
                <div class="pb-1">
                  <p class="text-sm font-semibold" style="color:#0F172A;">{{ event.status }}</p>
                  <p class="text-xs mt-0.5" style="color:#64748B;">{{ event.location }}</p>
                </div>
              </div>
            </div>

            <!-- ETA -->
            <div class="mt-4 pt-4 flex items-center justify-between" style="border-top:1px solid #E2E8F0;">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" style="color:#F59E0B;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-sm font-medium" style="color:#475569;">Numatomas pristatymas:</span>
                <span class="text-sm font-bold" style="color:#0F172A;">Rytoj, kovo 24 d.</span>
              </div>
              <span class="text-xs px-3 py-1 rounded-full font-semibold" style="background:#FFFBEB; color:#D97706;">Pristatoma kurjeriu</span>
            </div>
          </div>
        </template>

        <!-- ══════════════════════════════
             MODE: COMPLETED — PAYOUT + REVIEW (id=7)
             ══════════════════════════════ -->
        <template v-if="query.status === 'completed'">

          <!-- Supplier + order summary -->
          <div class="rounded-xl p-4 flex items-center gap-4" style="background:#F0FDF4; border:2px solid #14A34A;">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style="background:#DCFCE7; color:#14A34A;">AD</div>
            <div class="flex-1">
              <p class="text-sm font-bold" style="color:#0F172A;">UAB AutoDalys — Vilnius</p>
              <p class="text-xs" style="color:#64748B;">Priimtas pasiūlymas · Pristatytas kovo 22 d.</p>
            </div>
            <div class="text-right">
              <p class="text-xl font-bold" style="color:#14A34A;">€95</p>
              <p class="text-xs" style="color:#94A3B8;">be PVM</p>
            </div>
          </div>

          <!-- Payout card -->
          <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
            <h2 class="text-sm font-bold mb-4" style="color:#0F172A;">Apmokėjimas</h2>

            <div class="rounded-xl p-4 mb-5" style="background:#F8FAFC; border:1px solid #E2E8F0;">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between text-sm">
                  <span style="color:#64748B;">Priekinė dešinė amortizatoriaus kolona</span>
                  <span class="font-semibold" style="color:#0F172A;">€95.00</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span style="color:#64748B;">Pristatymas (DPD)</span>
                  <span class="font-semibold" style="color:#0F172A;">€5.00</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span style="color:#64748B;">PVM (21%)</span>
                  <span class="font-semibold" style="color:#0F172A;">€21.00</span>
                </div>
                <div class="pt-2 mt-1" style="border-top:1px solid #E2E8F0;">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold" style="color:#0F172A;">Iš viso</span>
                    <span class="text-xl font-bold" style="color:#0F172A;">€121.00</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment methods -->
            <p class="text-xs font-semibold mb-3" style="color:#475569;">Mokėjimo būdas</p>
            <div class="grid grid-cols-3 gap-3 mb-5">
              <button v-for="pm in paymentMethods" :key="pm.id"
                @click="selectedPayment = pm.id"
                class="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-150"
                :style="selectedPayment === pm.id
                  ? 'border:2px solid #14A34A; background:#F0FDF4;'
                  : 'border:1px solid #E2E8F0; background:#F8FAFC;'"
              >
                <svg class="w-5 h-5" :style="`color:${selectedPayment === pm.id ? '#14A34A' : '#64748B'}`" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="pm.icon"/>
                </svg>
                <span class="text-xs font-semibold" :style="selectedPayment === pm.id ? 'color:#14A34A;' : 'color:#475569;'">{{ pm.label }}</span>
              </button>
            </div>

            <button v-if="!paid" @click="paid = true"
              class="w-full py-3 rounded-xl text-sm font-bold cursor-pointer transition-opacity duration-150 hover:opacity-90 flex items-center justify-center gap-2"
              style="background:#14A34A; color:#fff;">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Apmokėti €121.00
            </button>

            <div v-else class="flex items-center justify-center gap-2 py-3 rounded-xl" style="background:#F0FDF4; border:2px solid #14A34A;">
              <svg class="w-5 h-5" style="color:#14A34A;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-bold" style="color:#14A34A;">Apmokėta sėkmingai</span>
            </div>
          </div>

          <!-- Review card -->
          <div class="rounded-xl p-5" style="background:#fff; border:1px solid #E2E8F0;">
            <h2 class="text-sm font-bold mb-1" style="color:#0F172A;">Palikite atsiliepimą</h2>
            <p class="text-xs mb-4" style="color:#64748B;">Jūsų nuomonė padės kitiems pirkėjams</p>

            <!-- Stars -->
            <div class="flex items-center gap-1 mb-4">
              <button v-for="n in 5" :key="n"
                @click="rating = n; hoverRating = 0"
                @mouseenter="hoverRating = n"
                @mouseleave="hoverRating = 0"
                class="cursor-pointer transition-transform duration-100 hover:scale-110"
              >
                <svg class="w-8 h-8 transition-colors duration-100" :style="(hoverRating || rating) >= n ? 'color:#F59E0B;' : 'color:#E2E8F0;'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </button>
              <span v-if="rating" class="ml-2 text-sm font-semibold" style="color:#0F172A;">{{ ratingLabels[rating - 1] }}</span>
            </div>

            <!-- Review aspects -->
            <div class="grid grid-cols-3 gap-3 mb-4">
              <div v-for="aspect in reviewAspects" :key="aspect.label" class="text-center">
                <p class="text-[11px] font-semibold mb-1.5" style="color:#64748B;">{{ aspect.label }}</p>
                <div class="flex items-center justify-center gap-0.5">
                  <button v-for="n in 5" :key="n" @click="aspect.value = n" class="cursor-pointer">
                    <svg class="w-4 h-4 transition-colors duration-100" :style="aspect.value >= n ? 'color:#F59E0B;' : 'color:#E2E8F0;'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <textarea v-model="reviewText" rows="3" placeholder="Papasakokite apie savo patirtį su šiuo tiekėju..."
              class="w-full px-4 py-3 text-sm rounded-xl resize-none focus:outline-none mb-4"
              style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;"></textarea>

            <div class="flex items-center justify-end gap-3">
              <button class="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 hover:bg-slate-100" style="color:#475569;">Praleisti</button>
              <button
                @click="submitReview"
                class="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-opacity duration-150 hover:opacity-90"
                :style="reviewSubmitted ? 'background:#F0FDF4; color:#14A34A; border:1px solid #14A34A;' : rating ? 'background:#14A34A; color:#fff;' : 'background:#F1F5F9; color:#94A3B8; cursor:not-allowed;'"
                :disabled="!rating"
              >
                <svg v-if="reviewSubmitted" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                {{ reviewSubmitted ? 'Atsiliepimas išsaugotas' : 'Pateikti atsiliepimą' }}
              </button>
            </div>
          </div>
        </template>

      </div>

      <!-- ─── RIGHT SIDEBAR ─── -->
      <div class="space-y-4">

        <!-- Query info -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Užklausos informacija</h3>
          <div class="space-y-3">
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Ieškoma dalis</p>
              <p class="text-sm font-semibold" style="color:#0F172A;">{{ query.part }}</p>
            </div>
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">Automobilis</p>
              <p class="text-sm" style="color:#0F172A;">{{ query.car }}</p>
            </div>
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">VIN kodas</p>
              <p class="text-xs font-mono" style="color:#475569;">{{ query.vin }}</p>
            </div>
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider mb-1" style="color:#94A3B8;">OEM numeris</p>
              <p class="text-xs font-mono" style="color:#475569;">{{ query.oem }}</p>
            </div>
          </div>
        </div>

        <!-- Price comparison (offers mode only) -->
        <div v-if="query.status === 'offers'" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Kainų palyginimas</h3>
          <div class="space-y-2.5">
            <div v-for="offer in [...offers].sort((a,b) => a.price - b.price)" :key="offer.id" class="flex items-center gap-2">
              <span class="text-xs w-20 truncate flex-shrink-0" style="color:#475569;">{{ offer.supplier.split(' ')[0] }}</span>
              <div class="flex-1 h-4 rounded-md overflow-hidden" style="background:#F1F5F9;">
                <div class="h-full rounded-md" :style="`width:${(offer.price / Math.max(...offers.map(o=>o.price))) * 100}%; background:${offer.accepted ? '#14A34A' : '#CBD5E1'};`"></div>
              </div>
              <span class="text-xs font-bold w-10 text-right flex-shrink-0" :style="offer.accepted ? 'color:#14A34A;' : 'color:#0F172A;'">€{{ offer.price }}</span>
            </div>
          </div>
        </div>

        <!-- Delivery address (transit mode) -->
        <div v-if="query.status === 'transit'" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Pristatymo adresas</h3>
          <div class="flex items-start gap-2">
            <svg class="w-4 h-4 mt-0.5 flex-shrink-0" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <div>
              <p class="text-sm font-semibold" style="color:#0F172A;">UAB Draudimas LT</p>
              <p class="text-xs mt-1" style="color:#64748B;">Konstitucijos pr. 7<br>LT-09308 Vilnius</p>
            </div>
          </div>
        </div>

        <!-- Order summary (completed mode) -->
        <div v-if="query.status === 'completed'" class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-3" style="color:#0F172A;">Užsakymo istorija</h3>
          <div class="space-y-2.5">
            <div v-for="ev in completedTimeline" :key="ev.label" class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" :style="`background:${ev.color};`"></div>
              <div>
                <p class="text-xs font-medium" style="color:#0F172A;">{{ ev.label }}</p>
                <p class="text-[11px]" style="color:#94A3B8;">{{ ev.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Deadline -->
        <div class="rounded-xl p-4" style="background:#fff; border:1px solid #E2E8F0;">
          <h3 class="text-xs font-bold mb-2" style="color:#0F172A;">Terminas</h3>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" style="color:#64748B;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span class="text-sm font-semibold" style="color:#64748B;">{{ formatDate(query.dueDate) }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- ── Lightbox ── -->
  <Teleport to="body">
    <div v-if="lightbox.open" class="fixed inset-0 z-50 flex items-center justify-center p-4" style="background:rgba(0,0,0,0.85);" @click.self="lightbox.open = false; lightbox.offer = null">
      <div class="relative w-full max-w-3xl">
        <!-- Close -->
        <button @click="lightbox.open = false; lightbox.offer = null" class="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-150 hover:bg-white/20" style="color:#fff;">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Main image -->
        <div class="rounded-xl overflow-hidden" style="background:#111; aspect-ratio:16/9;">
          <img
            v-if="lightbox.offer?.photos?.[lightbox.index]"
            :src="lightbox.offer.photos[lightbox.index].url"
            :alt="lightbox.offer.photos[lightbox.index].label"
            class="w-full h-full object-contain"
          >
        </div>

        <!-- Caption -->
        <div class="flex items-center justify-between mt-3 px-1">
          <div>
            <p class="text-sm font-semibold text-white">{{ lightbox.offer?.photos?.[lightbox.index]?.label }}</p>
            <p class="text-xs" style="color:#94A3B8;">{{ lightbox.offer?.supplier }} · {{ lightbox.index + 1 }} / {{ lightbox.offer?.photos?.length }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button @click="lightbox.index = (lightbox.index - 1 + lightbox.offer.photos.length) % lightbox.offer.photos.length"
              class="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-white/20" style="color:#fff; border:1px solid rgba(255,255,255,0.2);">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click="lightbox.index = (lightbox.index + 1) % lightbox.offer.photos.length"
              class="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-white/20" style="color:#fff; border:1px solid rgba(255,255,255,0.2);">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <!-- Thumbnails -->
        <div class="flex gap-2 mt-3 overflow-x-auto pb-1">
          <button
            v-for="(photo, pi) in lightbox.offer?.photos" :key="pi"
            @click="lightbox.index = pi"
            class="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-150"
            :style="pi === lightbox.index ? 'border:2px solid #14A34A; opacity:1;' : 'border:2px solid transparent; opacity:0.5;'"
          >
            <img :src="photo.url" :alt="photo.label" class="w-full h-full object-cover">
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'buyer' })

const route = useRoute()
const id = Number(route.params.id)

// ── query data by id ──────────────────────────────
const allQueries: Record<number, any> = {
  1: { id: 1, status: 'offers', part: 'Priekinis bamperis (M-packet)', car: 'BMW E60 520d 2005', vin: 'WBANE71060B123456', oem: '51117896897', dueDate: '2026-03-24' },
  6: { id: 6, status: 'transit', part: 'Dešinės pusės veidrodis', car: 'VW Passat B7 2.0 TDI', vin: 'WVWZZZ3CZD1234567', oem: '3AF857508', dueDate: '2026-03-24' },
  7: { id: 7, status: 'completed', part: 'Priekinė dešinė amortizatoriaus kolona', car: 'Skoda Octavia A5', vin: 'TMBZZZ1ZAH1234567', oem: '1K0413031BJ', dueDate: '2026-03-22' },
}
const query = reactive(allQueries[id] ?? allQueries[1])

useHead({ title: `Užklausa #${query.id} — recar BUY` })

const statusBadge = computed(() => {
  const map: Record<string, any> = {
    offers:    { badge: 'background:#F0FDF4; color:#15803D;', dot: 'background:#14A34A;', label: 'Pasiūlymai gauti' },
    transit:   { badge: 'background:#FFFBEB; color:#D97706;', dot: 'background:#F59E0B;', label: 'Pristatoma' },
    completed: { badge: 'background:#FDF4FF; color:#9333EA;', dot: 'background:#A855F7;', label: 'Laukia apmokėjimo' },
  }
  return map[query.status] ?? map.offers
})

// ── offers mode ───────────────────────────────────
const lightbox = reactive<{ open: boolean; offer: any; index: number }>({ open: false, offer: null, index: 0 })

const sortBy = ref('price')
const offers = ref([
  {
    id: 1, supplier: 'UAB AutoDalys', initials: 'AD', avatarBg: '#F0FDF4', avatarColor: '#14A34A',
    city: 'Vilnius', rating: 4.9, reviews: 312, price: 185, condition: 'Naudota',
    delivery: '1–2 d.d.', warranty: '3 mėn.', submittedAt: 'prieš 1 val.',
    notes: 'Originalus BMW bamperis iš E60 2004m. Labai gera būklė. Turi parkavimo jutiklių skyles.', accepted: false,
    donorSpecs: [
      { label: 'Markė / Modelis', value: 'BMW E60 520d' },
      { label: 'Metai', value: '2004' },
      { label: 'Rida', value: '198 000 km' },
      { label: 'VIN', value: 'WBANE51060C4...' },
      { label: 'Variklis', value: '2.0d 120kW' },
      { label: 'Kuras', value: 'Dyzelis' },
      { label: 'Pavarų dėžė', value: 'Automatinė' },
      { label: 'Pavara', value: 'RWD' },
    ],
    donorPhotos: [
      { url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', label: 'Priekis' },
      { url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', label: 'Šonas' },
      { url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80', label: 'Galas' },
      { url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80', label: 'Salonas' },
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', label: 'Bamperis — priekis' },
      { url: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80', label: 'Kairė pusė' },
      { url: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80', label: 'Dešinė pusė' },
      { url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80', label: 'Jungiamosios detalės' },
    ],
  },
  {
    id: 2, supplier: 'MB AutoSalvage', initials: 'MS', avatarBg: '#EFF6FF', avatarColor: '#3B82F6',
    city: 'Kaunas', rating: 4.7, reviews: 218, price: 145, condition: 'Naudota',
    delivery: '2–3 d.d.', warranty: '1 mėn.', submittedAt: 'prieš 2 val.',
    notes: 'Bamperis be didesnių pažeidimų, nedidelė įdubimas kairėje.', accepted: false,
    donorSpecs: [
      { label: 'Markė / Modelis', value: 'BMW E60 523i' },
      { label: 'Metai', value: '2005' },
      { label: 'Rida', value: '224 000 km' },
      { label: 'VIN', value: 'WBANE71060B1...' },
      { label: 'Variklis', value: '2.5i 140kW' },
      { label: 'Kuras', value: 'Benzinas' },
      { label: 'Pavarų dėžė', value: 'Automatinė' },
      { label: 'Pavara', value: 'RWD' },
    ],
    donorPhotos: [
      { url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80', label: 'Priekis' },
      { url: 'https://images.unsplash.com/photo-1537984822441-cff330075342?w=800&q=80', label: 'Šonas' },
      { url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', label: 'Galas' },
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80', label: 'Bamperis — priekis' },
      { url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80', label: 'Įdubimas kairėje' },
    ],
  },
  {
    id: 3, supplier: 'Parts24.lt', initials: 'P2', avatarBg: '#FDF4FF', avatarColor: '#A855F7',
    city: 'Klaipėda', rating: 4.5, reviews: 97, price: 210, condition: 'OEM nauja',
    delivery: '3–5 d.d.', warranty: '12 mėn.', submittedAt: 'prieš 3 val.',
    notes: 'Nauja OEM analogas iš TYG. DPD kurjeriu.', accepted: false,
    donorSpecs: null,
    donorPhotos: [],
    photos: [
      { url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', label: 'Nauja dalis' },
      { url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80', label: 'Pakuotė' },
      { url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80', label: 'Sertifikatas' },
    ],
  },
  {
    id: 4, supplier: 'EuroAuto Vilnius', initials: 'EA', avatarBg: '#FFFBEB', avatarColor: '#D97706',
    city: 'Vilnius', rating: 4.3, reviews: 54, price: 120, condition: 'Naudota',
    delivery: '1 d.d.', warranty: 'Nėra', submittedAt: 'prieš 4 val.',
    notes: 'Pigiausia rinkoje. Bamperis turi įtrūkimą dešinėje — tinkamas dažymui.', accepted: false,
    donorSpecs: [
      { label: 'Markė / Modelis', value: 'BMW E60 520d' },
      { label: 'Metai', value: '2007' },
      { label: 'Rida', value: '310 000 km' },
      { label: 'VIN', value: 'WBANE71080C2...' },
      { label: 'Variklis', value: '2.0d 120kW' },
      { label: 'Kuras', value: 'Dyzelis' },
      { label: 'Pavarų dėžė', value: 'Rankinis' },
      { label: 'Pavara', value: 'RWD' },
    ],
    donorPhotos: [
      { url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80', label: 'Priekis' },
      { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', label: 'Šonas' },
    ],
    photos: [
      { url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80', label: 'Bamperis — bendras vaizdas' },
      { url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', label: 'Įtrūkimas dešinėje' },
    ],
  },
])
const sortedOffers = computed(() => [...offers.value].sort((a, b) => sortBy.value === 'price' ? a.price - b.price : b.rating - a.rating))
function acceptOffer(offer: any) {
  if (offer.accepted) { offer.accepted = false; return }
  offers.value.forEach(o => o.accepted = false)
  offer.accepted = true
}

// ── transit mode ──────────────────────────────────
const trackingSteps = [
  { label: 'Išsiųsta', done: true, active: false },
  { label: 'Rūšiavimo centras', done: true, active: false },
  { label: 'Pakeliui', done: false, active: true },
  { label: 'Pristatyta', done: false, active: false },
]
const trackingEvents = [
  { date: 'Kovo 23', time: '08:42', status: 'Siuntas pakeliui į gavėją', location: 'DPD Vilnius distribucijos centras' },
  { date: 'Kovo 23', time: '03:15', status: 'Atvyko į rūšiavimo centrą', location: 'DPD Vilnius HUB' },
  { date: 'Kovo 22', time: '18:30', status: 'Siuntas perduotas DPD', location: 'Kaunas, Savanorių g. 112' },
  { date: 'Kovo 22', time: '14:00', status: 'Siunta paruošta išsiuntimui', location: 'MB AutoSalvage, Kaunas' },
  { date: 'Kovo 21', time: '11:22', status: 'Užsakymas patvirtintas', location: 'MB AutoSalvage sistema' },
]

// ── completed mode ────────────────────────────────
const paid = ref(false)
const rating = ref(0)
const hoverRating = ref(0)
const reviewText = ref('')
const reviewSubmitted = ref(false)
const selectedPayment = ref('card')
const ratingLabels = ['Bloga', 'Patenkinama', 'Gera', 'Labai gera', 'Puiku!']
const paymentMethods = [
  { id: 'card', label: 'Banko kortelė', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'bank', label: 'Bankinis pavedimas', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
  { id: 'invoice', label: 'Sąskaita faktūra', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
]
const reviewAspects = reactive([
  { label: 'Kokybė', value: 0 },
  { label: 'Pristatymas', value: 0 },
  { label: 'Komunikacija', value: 0 },
])
const completedTimeline = [
  { label: 'Užklausa pateikta', time: 'Kovo 17, 10:22', color: '#3B82F6' },
  { label: 'Pasiūlymas priimtas', time: 'Kovo 18, 14:05', color: '#14A34A' },
  { label: 'Apmokėta', time: 'Kovo 18, 14:30', color: '#14A34A' },
  { label: 'Išsiųsta DPD', time: 'Kovo 19, 09:00', color: '#F59E0B' },
  { label: 'Pristatyta', time: 'Kovo 22, 11:45', color: '#14A34A' },
]
function submitReview() {
  if (!rating.value) return
  reviewSubmitted.value = true
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
