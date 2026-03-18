<template>
  <section class="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">

    <!-- Background grid -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none"></div>

    <!-- Mobile: map as faded background -->
    <div class="absolute top-0 right-0 bottom-0 lg:hidden pointer-events-none overflow-hidden w-2/3 flex items-center justify-end">
      <img src="/europe-map.svg" alt="" class="w-full opacity-[0.06]" style="filter: grayscale(1) brightness(0.2); object-fit: contain;"/>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- ── TOP: two-column ── -->
      <div class="grid lg:grid-cols-2 gap-8 items-center py-16 sm:py-20">

        <!-- Left: Text + Search + Logos -->
        <div class="space-y-6 pb-20 lg:pb-0">

          <!-- Badge -->
          <div v-reveal="{ delay: 100 }" class="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
            12,400+ dalių iš Europos pardavėjų
          </div>

          <!-- Headline -->
          <div v-reveal="{ delay: 200 }">
            <h1 class="text-4xl sm:text-5xl xl:text-6xl font-black text-gray-950 leading-[1.05] tracking-tight">
              Naudotos<br>automobilių<br>dalys internetu iš
            </h1>
            <h1 class="text-4xl sm:text-5xl xl:text-6xl font-black text-brand-green leading-[1.05] tracking-tight mt-1">
              Europos pardavėjų.
            </h1>
          </div>

          <p v-reveal="{ delay: 300 }" class="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md">
            Raskite originalias naudotas dalis iš patikimų pardavėjų visoje Europoje. Greitas pristatymas, saugi apmokėjimo sistema.
          </p>

          <!-- Search wizard card with integrated tabs -->
          <div v-reveal="{ delay: 420, dir: 'scale' }" class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

            <!-- Tab bar -->
            <div class="grid grid-cols-4 border-b border-gray-100">
              <button
                v-for="vtype in vehicleTypes"
                :key="vtype.id"
                @click="activeType = vtype.id"
                class="relative flex flex-col items-center justify-center gap-1 py-3 px-1 transition-all duration-150 cursor-pointer select-none"
                :class="activeType === vtype.id
                  ? 'bg-white text-gray-950'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100/80 hover:text-gray-600'"
              >
                <span class="text-lg leading-none">{{ vtype.icon }}</span>
                <span class="text-[10px] sm:text-xs font-semibold leading-tight text-center">{{ vtype.label }}</span>
                <!-- Active underline -->
                <div
                  v-if="activeType === vtype.id"
                  class="absolute bottom-0 left-3 right-3 h-0.5 rounded-t-full"
                  :style="{ background: vtype.color }"
                ></div>
              </button>
            </div>

            <!-- Tab content -->
            <div class="p-4 sm:p-5 space-y-3">

              <!-- OEM search (OEM tab only) -->
              <template v-if="activeType === 'oem'">
                <div class="relative">
                  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                  </svg>
                  <input
                    v-model="oemCode"
                    type="text"
                    placeholder='Įveskite OEM kodą, pvz. "11127553456"...'
                    class="w-full pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all font-mono"
                  >
                </div>
                <div class="relative">
                  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="arba dalies pavadinimas..."
                    class="w-full pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                  >
                </div>
                <p class="text-xs text-gray-400 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  OEM kodas – gamintojo originalus detalės numeris
                </p>
              </template>

              <!-- Vehicle search (car / moto / commercial) -->
              <template v-else>
                <div class="relative">
                  <svg class="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder='activeType === "moto" ? "pvz. \"Honda CBR kapotas\"..." : activeType === "commercial" ? "pvz. \"Mercedes Sprinter durys\"..." : "pvz. \"BMW E60 kapotas\" arba OEM kodas..."'
                    class="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                  >
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex-1 h-px bg-gray-100"></div>
                  <span class="text-xs text-gray-400 font-medium whitespace-nowrap">arba filtruok</span>
                  <div class="flex-1 h-px bg-gray-100"></div>
                </div>
                <div class="grid grid-cols-2 gap-2 sm:gap-3">
                  <div class="relative">
                    <select v-model="make" @change="model = ''; generation = ''" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7">
                      <option value="">{{ activeType === 'moto' ? 'Gamintojas...' : 'Markė...' }}</option>
                      <template v-if="activeType === 'moto'">
                        <option>Honda</option><option>Yamaha</option><option>Kawasaki</option><option>Suzuki</option><option>BMW</option><option>Ducati</option>
                      </template>
                      <template v-else-if="activeType === 'commercial'">
                        <option>Mercedes-Benz</option><option>Volkswagen</option><option>Ford</option><option>Iveco</option><option>MAN</option><option>Volvo</option><option>DAF</option>
                      </template>
                      <template v-else>
                        <option>BMW</option><option>Mercedes-Benz</option><option>Audi</option><option>Volkswagen</option><option>Volvo</option><option>Opel</option><option>Toyota</option><option>Honda</option>
                      </template>
                    </select>
                    <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                  <div class="relative">
                    <select v-model="model" @change="generation = ''" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7">
                      <option value="">Modelis...</option>
                    </select>
                    <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                  <div class="relative">
                    <select v-model="generation" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7">
                      <option value="">Generacija...</option>
                    </select>
                    <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                  <div class="relative">
                    <select v-model="category" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none cursor-pointer pr-7">
                      <option value="">Kategorija...</option>
                      <option>Variklio dalys</option><option>Transmisija</option><option>Stabdžiai</option><option>Žibintai</option>
                    </select>
                    <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </template>

              <button
                @click="goSearch"
                class="w-full flex items-center justify-center gap-2 text-white font-semibold py-3.5 sm:py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
                :class="activeType === 'oem'
                  ? 'bg-amber-500 hover:bg-amber-600 hover:shadow-amber-200'
                  : 'bg-brand-green hover:bg-brand-green-dark hover:shadow-green-200'"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                {{ activeType === 'oem' ? 'IEŠKOTI PAGAL OEM' : 'IEŠKOTI' }}
              </button>
            </div>
          </div>

          <!-- Provider logos -->
          <div v-reveal="{ delay: 500 }" class="space-y-3">
            <!-- Carriers -->
            <div class="flex items-center gap-3 flex-wrap">
              <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-widest w-[72px] flex-shrink-0">Pristatymas</span>
              <div class="flex items-center gap-2 flex-wrap">
                <!-- DPD -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 60 24" class="h-4 w-auto">
                    <rect x="0" y="0" width="60" height="24" rx="3" fill="#DC0032"/>
                    <text x="30" y="17" text-anchor="middle" fill="white" font-size="13" font-weight="900" font-family="Arial,sans-serif" letter-spacing="1">DPD</text>
                  </svg>
                </div>
                <!-- DHL -->
                <div class="h-8 px-2.5 bg-[#FFCC00] border border-yellow-300 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 52 20" class="h-4 w-auto">
                    <text x="26" y="15" text-anchor="middle" fill="#D40511" font-size="15" font-weight="900" font-family="Arial,sans-serif" letter-spacing="0.5">DHL</text>
                  </svg>
                </div>
                <!-- GLS -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 52 22" class="h-4 w-auto">
                    <rect x="0" y="0" width="52" height="22" rx="3" fill="#005CA9"/>
                    <text x="26" y="15.5" text-anchor="middle" fill="white" font-size="12" font-weight="900" font-family="Arial,sans-serif" letter-spacing="1">GLS</text>
                  </svg>
                </div>
                <!-- Venipak -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 80 22" class="h-4 w-auto">
                    <text x="40" y="16" text-anchor="middle" fill="#E30613" font-size="12" font-weight="800" font-family="Arial,sans-serif">Venipak</text>
                  </svg>
                </div>
              </div>
            </div>
            <!-- Payments -->
            <div class="flex items-center gap-3 flex-wrap">
              <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-widest w-[72px] flex-shrink-0">Mokėjimas</span>
              <div class="flex items-center gap-2 flex-wrap">
                <!-- VISA -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 60 20" class="h-4 w-auto">
                    <text x="30" y="15" text-anchor="middle" fill="#1A1F71" font-size="15" font-weight="900" font-family="Arial,sans-serif" letter-spacing="2" font-style="italic">VISA</text>
                  </svg>
                </div>
                <!-- Mastercard -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 46 28" class="h-5 w-auto">
                    <circle cx="16" cy="14" r="12" fill="#EB001B" opacity="0.95"/>
                    <circle cx="30" cy="14" r="12" fill="#F79E1B" opacity="0.95"/>
                    <path d="M23 6.5 Q27 14 23 21.5 Q19 14 23 6.5Z" fill="#FF5F00"/>
                  </svg>
                </div>
                <!-- Apple Pay -->
                <div class="h-8 px-2.5 bg-black border border-black rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 70 22" class="h-4 w-auto">
                    <text x="35" y="16" text-anchor="middle" fill="white" font-size="11" font-weight="600" font-family="-apple-system,sans-serif" letter-spacing="0.3"> Pay</text>
                    <path d="M12 4 Q9 4 8 7 Q11 7 12 4Z M8.5 8 Q7 8.5 7 10.5 Q7 13 8.5 14.5 Q9.5 15.5 11 15.5 Q12 15.5 13 14.5 Q14 15.5 15.5 15.5 Q17 15.5 18 14.5 Q19.5 13 19.5 10.5 Q19.5 8 17.5 7 Q16.5 6.5 15.5 7 Q14.5 7.5 14 8 Q13.5 7.5 12.5 7 Q11.5 6.5 10.5 7 Q9.5 7.5 8.5 8Z" fill="white"/>
                  </svg>
                </div>
                <!-- Google Pay -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center gap-0.5">
                  <svg viewBox="0 0 76 24" class="h-4 w-auto">
                    <text x="2" y="17" fill="#4285F4" font-size="14" font-weight="700" font-family="Arial,sans-serif">G</text>
                    <text x="14" y="17" fill="#EA4335" font-size="14" font-weight="700" font-family="Arial,sans-serif">o</text>
                    <text x="23" y="17" fill="#FBBC05" font-size="14" font-weight="700" font-family="Arial,sans-serif">o</text>
                    <text x="33" y="17" fill="#4285F4" font-size="14" font-weight="700" font-family="Arial,sans-serif">g</text>
                    <text x="41" y="17" fill="#34A853" font-size="14" font-weight="700" font-family="Arial,sans-serif">le</text>
                    <text x="53" y="17" fill="#5F6368" font-size="12" font-weight="600" font-family="Arial,sans-serif"> Pay</text>
                  </svg>
                </div>
                <!-- Bank transfer -->
                <div class="h-8 px-2.5 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18l7.5-3 7.5 3M6.75 21V10.5m10.5 10.5V10.5M3 10.5h18M12 3v1.5M6 10.5v10.5M18 10.5v10.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Europe Map — desktop only -->
        <div v-reveal="{ delay: 300, dir: 'left' }" class="relative hidden lg:block">
          <div class="relative" style="width: 660px; height: 700px;">
            <img
              src="/europe-map.svg"
              alt="Europe map"
              class="absolute"
              style="width:115%;height:115%;top:-7%;left:-7%;object-fit:contain;object-position:center;opacity:0.14;filter:grayscale(1) brightness(0.25);"
            />
            <!-- Lithuania pin -->
            <div class="absolute" style="left: 58%; top: 55%;">
              <div class="absolute pointer-events-none" style="left:-160px;top:-160px;width:320px;height:320px;">
                <div class="absolute w-full h-full rounded-full border-2 border-green-300 opacity-40 animate-ping" style="animation-duration:3.5s;"></div>
              </div>
              <div class="absolute pointer-events-none" style="left:-110px;top:-110px;width:220px;height:220px;">
                <div class="absolute w-full h-full rounded-full border border-green-400 opacity-30 animate-ping" style="animation-duration:2.8s;animation-delay:0.7s;"></div>
              </div>
              <div class="absolute pointer-events-none" style="left:-65px;top:-65px;width:130px;height:130px;">
                <div class="absolute w-full h-full rounded-full border border-green-500 opacity-20 animate-ping" style="animation-duration:2.1s;animation-delay:1.4s;"></div>
              </div>
              <button
                @click="navigateTo('/catalog')"
                class="absolute bg-brand-green hover:bg-brand-green-dark text-white rounded-full shadow-2xl shadow-green-400 ring-4 ring-white transition-all duration-200 hover:scale-110 active:scale-95 z-20 flex items-center justify-center"
                style="width:56px;height:56px;top:-28px;left:-28px;"
              >
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
            <!-- Live activity badge -->
            <div class="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-2.5 py-1 shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Gyvas</span>
            </div>

            <!-- Animated sale notifications -->
            <TransitionGroup name="sale" tag="div" class="absolute inset-0">
              <div
                v-for="sale in activeSales"
                :key="sale.id"
                class="absolute z-10 pointer-events-none"
                :style="{ left: sale.x + '%', top: sale.y + '%' }"
              >
                <!-- Pulsing location dot -->
                <div class="absolute -translate-x-1/2 -translate-y-1/2">
                  <span class="absolute inset-0 w-3 h-3 rounded-full bg-brand-green animate-ping opacity-60"></span>
                  <span class="relative block w-3 h-3 rounded-full bg-brand-green ring-2 ring-white shadow-md"></span>
                </div>
                <!-- Card — positioned above/below dot depending on y -->
                <div
                  class="absolute w-44 bg-white rounded-xl shadow-xl border border-gray-100 p-2.5"
                  :style="cardOffset(sale)"
                >
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-1">
                      <span class="text-sm">{{ sale.flag }}</span>
                      <span class="text-[10px] font-semibold text-gray-500">{{ sale.city }}</span>
                    </div>
                    <span class="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                      Parduota
                    </span>
                  </div>
                  <div class="text-xs font-bold text-gray-900 leading-tight truncate">{{ sale.part }}</div>
                  <div class="text-sm font-black text-gray-950 mt-0.5">{{ sale.price }}</div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <!-- ── BOTTOM: How It Works — full width inside hero ── -->
      <div class="border-t border-gray-100 py-14 sm:py-16">
        <div v-reveal class="text-center mb-10 sm:mb-12">
          <p class="text-sm font-semibold text-brand-green uppercase tracking-widest mb-2">Kaip tai veikia</p>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">Paprastai ir greitai</h2>
          <p class="mt-3 text-base sm:text-lg text-gray-500">Nuo paieškos iki pristatymo – viskas vienoje platformoje</p>
        </div>

        <div class="relative">
          <!-- Connector line desktop -->
          <div class="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-green-200 to-transparent pointer-events-none"></div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div
              v-for="(step, i) in steps"
              :key="i"
              v-reveal="{ delay: i * 100 }"
              class="relative flex flex-col items-center text-center group"
            >
              <div class="relative mb-5">
                <div
                  class="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300"
                  :class="step.bg"
                >{{ step.icon }}</div>
                <div class="absolute -top-2 -right-2 w-7 h-7 bg-gray-950 text-white text-xs font-black rounded-full flex items-center justify-center">
                  {{ i + 1 }}
                </div>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-gray-950 mb-1.5">{{ step.title }}</h3>
              <p class="text-xs sm:text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-10 sm:mt-12">
          <button
            @click="navigateTo('/catalog')"
            class="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
          >
            Pradėti paiešką dabar
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const oemCode = ref('')
const searchModalOpen = ref(false)
const activeType = ref('car')

// Wizard selects
const make = ref('')
const model = ref('')
const generation = ref('')
const category = ref('')

function goSearch() {
  const params: Record<string, string> = {}
  if (activeType.value === 'oem') {
    if (oemCode.value) params.q = oemCode.value
    else if (searchQuery.value) params.q = searchQuery.value
  } else {
    if (searchQuery.value) params.q = searchQuery.value
    if (make.value) params.make = make.value
    if (model.value) params.model = model.value
    if (generation.value) params.generation = generation.value
    if (category.value) params.category = category.value
  }
  navigateTo({ path: '/catalog', query: params })
}

const vehicleTypes = [
  { id: 'car',        icon: '🚗',  label: 'Automobilis',  color: '#16a34a' },
  { id: 'moto',       icon: '🏍️',  label: 'Motociklas',   color: '#2563eb' },
  { id: 'commercial', icon: '🚛',  label: 'Komercinis',   color: '#7c3aed' },
  { id: 'oem',        icon: '🔩',  label: 'OEM Originalios', color: '#d97706' },
]

const steps = [
  { icon: '🔍', bg: 'bg-blue-50',   title: 'Ieškokite dalies',       desc: 'Įveskite automobilio markę, modelį ir reikiamą dalį arba OEM kodą' },
  { icon: '🌍', bg: 'bg-green-50',  title: 'Rinkitės iš Europos',    desc: 'Peržiūrėkite šimtus pasiūlymų iš patikrintų pardavėjų visoje Europoje' },
  { icon: '💳', bg: 'bg-purple-50', title: 'Atsiskaitykite saugiai', desc: 'Apmokėkite su Visa, Mastercard, Apple Pay ar banko pavedimu' },
  { icon: '📦', bg: 'bg-yellow-50', title: 'Gaukite pristatymą',     desc: 'Dalis pristatoma tiesiai į jūsų duris per 2–5 darbo dienas' },
]

// ── Live sales animation ──────────────────────────────────────────
const salePool = [
  { flag: '🇩🇪', city: 'Berlynas',    part: 'BMW E60 variklio dangtis',      price: '85€',  x: 43, y: 64 },
  { flag: '🇵🇱', city: 'Varšuva',     part: 'Audi A4 kapotas',               price: '240€', x: 54, y: 65 },
  { flag: '🇫🇷', city: 'Paryžius',    part: 'Mercedes W211 bamperis',        price: '210€', x: 28, y: 71 },
  { flag: '🇳🇱', city: 'Amsterdamas', part: 'VW Touareg priekiniai žib.',    price: '450€', x: 31, y: 65 },
  { flag: '🇸🇪', city: 'Stokholmas',  part: 'Volvo V90 galinis bamperis',    price: '290€', x: 50, y: 46 },
  { flag: '🇨🇿', city: 'Praha',       part: 'Skoda Octavia stabdžiai',       price: '135€', x: 45, y: 70 },
  { flag: '🇦🇹', city: 'Viena',       part: 'BMW X5 E70 sankaba',            price: '340€', x: 48, y: 74 },
  { flag: '🇧🇪', city: 'Briuselis',   part: 'Renault Megane variklis',       price: '890€', x: 31, y: 68 },
  { flag: '🇱🇻', city: 'Ryga',        part: 'Toyota RAV4 priekinė ašis',     price: '380€', x: 59, y: 53 },
  { flag: '🇭🇺', city: 'Budapeštas',  part: 'Opel Astra H variklio dangtis', price: '65€',  x: 51, y: 76 },
  { flag: '🇩🇰', city: 'Kopenhaga',   part: 'Volvo XC60 stabdžių diskai',    price: '180€', x: 42, y: 57 },
  { flag: '🇫🇮', city: 'Helsinkis',   part: 'Subaru Outback turbina',        price: '540€', x: 60, y: 44 },
  { flag: '🇮🇹', city: 'Milanas',     part: 'Alfa Romeo 159 durys',          price: '320€', x: 37, y: 80 },
  { flag: '🇬🇧', city: 'Londonas',    part: 'Range Rover Sport žibintas',    price: '620€', x: 24, y: 67 },
  { flag: '🇪🇸', city: 'Madridas',    part: 'Seat Leon 2.0 TDI variklis',    price: '760€', x: 19, y: 88 },
  { flag: '🇱🇹', city: 'Kaunas',      part: 'BMW 3 serija E90 sparnas',      price: '120€', x: 58, y: 59 },
  { flag: '🇷🇴', city: 'Bukureštas',  part: 'Dacia Logan sankaba',           price: '95€',  x: 62, y: 82 },
  { flag: '🇨🇭', city: 'Ciurichas',   part: 'Mercedes C klasė W204 ECU',     price: '280€', x: 36, y: 76 },
  { flag: '🇳🇴', city: 'Oslas',       part: 'Volvo S60 generatorius',        price: '195€', x: 40, y: 45 },
  { flag: '🇬🇷', city: 'Atėnai',      part: 'Toyota Yaris stabdžiai',        price: '88€',  x: 58, y: 92 },
]

interface Sale { id: number; flag: string; city: string; part: string; price: string; x: number; y: number }

const activeSales = ref<Sale[]>([])
let saleCounter = 0
let poolIndex = 0

function cardOffset(sale: Sale): string {
  // Position card above the dot, flip below if near top edge, nudge if near sides
  const above = sale.y > 22
  const nudgeLeft = sale.x > 72 ? '-100%' : sale.x < 20 ? '0%' : '-50%'
  const top = above ? 'auto' : '12px'
  const bottom = above ? '12px' : 'auto'
  return `bottom:${bottom};top:${top};left:0;transform:translateX(${nudgeLeft})`
}

function spawnSale() {
  // Remove oldest if already 4 active
  if (activeSales.value.length >= 4) activeSales.value.shift()
  const item = salePool[poolIndex % salePool.length]
  poolIndex++
  activeSales.value.push({ ...item, id: ++saleCounter })
}

onMounted(() => {
  // Stagger initial batch
  setTimeout(() => spawnSale(), 600)
  setTimeout(() => spawnSale(), 1800)
  setTimeout(() => spawnSale(), 3000)
  // Then regular interval
  const interval = setInterval(spawnSale, 2800)
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
.sale-enter-active { transition: opacity 0.45s ease, transform 0.45s cubic-bezier(.4,0,.2,1); }
.sale-leave-active { transition: opacity 0.35s ease, transform 0.35s cubic-bezier(.4,0,.2,1); }
.sale-enter-from   { opacity: 0; transform: translateY(10px) scale(0.95); }
.sale-leave-to     { opacity: 0; transform: translateY(-8px) scale(0.95); }
.sale-move         { transition: transform 0.4s ease; }
</style>
