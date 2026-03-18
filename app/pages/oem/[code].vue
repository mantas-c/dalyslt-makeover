<template>
  <div class="bg-gray-50 min-h-screen">

    <!-- Hero header — full width accent band -->
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
          <a href="/" class="hover:text-gray-700 transition-colors">Pagrindinis</a>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <a href="/catalog" class="hover:text-gray-700 transition-colors">Katalogas</a>
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <span class="text-gray-600 font-medium truncate">OEM {{ code }}</span>
        </nav>

        <div class="flex flex-col lg:flex-row lg:items-center gap-6">

          <!-- Icon + title -->
          <div class="flex items-center gap-5 flex-1 min-w-0">
            <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 shadow-sm border border-gray-100">
              {{ part?.icon ?? '🔧' }}
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <span class="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-green bg-green-50 border border-green-100 px-2.5 py-1 rounded-lg">
                  <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                  </svg>
                  {{ code }}
                </span>
                <span v-if="part" class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{{ part.category }}</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-tight">{{ part?.name ?? 'Dalis' }}</h1>
              <p v-if="part" class="text-sm text-gray-500 mt-1">{{ part.tags.join(' · ') }}</p>
            </div>
          </div>

          <!-- Stats row -->
          <div class="flex items-stretch gap-0 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex-shrink-0">
            <div class="px-6 py-4 text-center">
              <div class="text-3xl font-black text-gray-950">{{ sortedOffers.length }}</div>
              <div class="text-xs text-gray-400 mt-0.5 whitespace-nowrap">pasiūlymų</div>
            </div>
            <div class="w-px bg-gray-100"></div>
            <div class="px-6 py-4 text-center">
              <div class="text-3xl font-black text-green-600">{{ cheapestPrice }}</div>
              <div class="text-xs text-gray-400 mt-0.5 whitespace-nowrap">geriausia kaina</div>
            </div>
            <div class="w-px bg-gray-100"></div>
            <div class="px-6 py-4 text-center">
              <div class="text-3xl font-black text-gray-950">{{ availableCount }}</div>
              <div class="text-xs text-gray-400 mt-0.5 whitespace-nowrap">sandėlyje</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content — full width -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div class="flex flex-col lg:flex-row gap-8">

        <!-- Offers column -->
        <div class="flex-1 min-w-0">

          <!-- Sort + filter bar -->
          <div class="flex items-center justify-between mb-5 gap-4">
            <p class="text-sm text-gray-500">
              Rodoma <span class="font-semibold text-gray-900">{{ sortedOffers.length }}</span> pasiūlymų
            </p>
            <div class="flex items-center gap-2">
              <label class="text-xs text-gray-500 hidden sm:block">Rūšiuoti:</label>
              <select
                v-model="sort"
                class="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green"
              >
                <option value="price_asc">Kaina ↑</option>
                <option value="price_desc">Kaina ↓</option>
                <option value="condition">Geriausia būklė</option>
              </select>
            </div>
          </div>

          <!-- Offer cards -->
          <div class="space-y-3">
            <div
              v-for="(offer, i) in sortedOffers"
              :key="offer.id"
              class="group bg-white rounded-2xl border transition-all duration-200 cursor-pointer"
              :class="i === 0
                ? 'border-green-200 shadow-sm shadow-green-50 hover:shadow-md hover:shadow-green-100'
                : 'border-gray-100 hover:border-gray-200 hover:shadow-md'"
              @click="navigateTo(`/product/${offer.id}`)"
            >
              <!-- Best deal banner -->
              <div v-if="i === 0" class="flex items-center gap-2 px-5 py-2 bg-green-500 rounded-t-2xl">
                <svg class="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-xs font-bold text-white">Geriausias pasiūlymas</span>
              </div>

              <div class="p-5 flex items-start gap-4">
                <!-- Rank -->
                <div
                  class="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 mt-0.5"
                  :class="i === 0 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'"
                >{{ i + 1 }}</div>

                <!-- Details -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                    <div class="flex-1 min-w-0 space-y-2">

                      <!-- Badges row -->
                      <div class="flex items-center gap-2 flex-wrap">
                        <span
                          class="text-[10px] font-black px-2 py-0.5 rounded-md"
                          :class="{
                            'bg-green-600 text-white': offer.condition === 'A',
                            'bg-yellow-500 text-white': offer.condition === 'B',
                            'bg-orange-500 text-white': offer.condition === 'C',
                          }"
                        >Grade {{ offer.condition }}</span>
                        <span
                          class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          :class="{
                            'bg-green-100 text-green-700': offer.status === 'Sandėlyje',
                            'bg-yellow-100 text-yellow-700': offer.status === 'Rezervuota',
                            'bg-gray-100 text-gray-500': offer.status === 'Parduota',
                          }"
                        >● {{ offer.status }}</span>
                      </div>

                      <!-- Vehicle params -->
                      <div class="flex flex-wrap gap-1">
                        <span v-for="param in getParams(offer)" :key="param" class="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">{{ param }}</span>
                      </div>

                      <!-- Delivery + location -->
                      <div class="flex items-center gap-5 text-xs text-gray-500">
                        <div class="flex items-center gap-1.5">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12h12l1-12M10 12v4m4-4v4"/>
                          </svg>
                          {{ offer.delivery }}
                        </div>
                        <div class="flex items-center gap-1.5">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          </svg>
                          {{ offer.flag }} {{ offer.city }}
                        </div>
                      </div>
                    </div>

                    <!-- Price + CTA -->
                    <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 flex-shrink-0">
                      <div class="sm:text-right">
                        <div class="text-2xl font-black text-gray-950">{{ offer.price }}</div>
                        <div v-if="offer.originalPrice" class="text-sm text-gray-400 line-through">{{ offer.originalPrice }}</div>
                        <div class="text-xs text-gray-400">+ pristatymas</div>
                      </div>
                      <button
                        class="px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200"
                        :class="offer.status === 'Parduota'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-brand-green hover:bg-brand-green-dark text-white hover:shadow-md hover:shadow-green-200 hover:-translate-y-0.5'"
                        :disabled="offer.status === 'Parduota'"
                        @click.stop="navigateTo(`/product/${offer.id}`)"
                      >
                        {{ offer.status === 'Parduota' ? 'Parduota' : 'Peržiūrėti →' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="sortedOffers.length === 0" class="text-center py-20">
            <div class="text-5xl mb-4">🔍</div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">Pasiūlymų nerasta</h2>
            <p class="text-sm text-gray-500 mb-6">Pagal OEM kodą <span class="font-mono font-bold">{{ code }}</span> šiuo metu nėra aktyvių pasiūlymų.</p>
            <a href="/catalog" class="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-brand-green-dark transition-colors">
              Grįžti į katalogą
            </a>
          </div>
        </div>

        <!-- Right sidebar -->
        <aside class="lg:w-72 flex-shrink-0 space-y-4">

          <!-- Price chart summary -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 class="text-sm font-bold text-gray-900 mb-4">Kainų palyginimas</h2>
            <div class="space-y-2.5">
              <div v-for="offer in sortedOffers" :key="offer.id" class="flex items-center gap-3">
                <div class="text-sm w-6 text-center text-gray-400 font-mono flex-shrink-0">{{ offer.flag }}</div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-600 truncate">{{ offer.city }}</span>
                    <span class="text-xs font-bold text-gray-900 ml-2 flex-shrink-0">{{ offer.price }}</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="offer.priceNum === minPrice ? 'bg-green-500' : 'bg-gray-300'"
                      :style="{ width: `${(offer.priceNum / maxPrice) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Condition guide -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 class="text-sm font-bold text-gray-900 mb-3">Būklės aprašymas</h2>
            <div class="space-y-2.5">
              <div v-for="g in grades" :key="g.label" class="flex gap-2.5 items-start">
                <span class="text-[10px] font-black px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5" :class="g.cls">{{ g.label }}</span>
                <p class="text-xs text-gray-500 leading-relaxed">{{ g.desc }}</p>
              </div>
            </div>
          </div>

          <!-- Delivery info -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 class="text-sm font-bold text-gray-900 mb-3">Pristatymas</h2>
            <ul class="space-y-2 text-xs text-gray-500">
              <li class="flex items-center gap-2"><span class="text-green-500">✓</span> DPD, DHL, GLS, Venipak</li>
              <li class="flex items-center gap-2"><span class="text-green-500">✓</span> Pristatome į visą Lietuvą</li>
              <li class="flex items-center gap-2"><span class="text-green-500">✓</span> Sekite siuntą realiu laiku</li>
              <li class="flex items-center gap-2"><span class="text-green-500">✓</span> 14 dienų grąžinimas</li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- SEO text block -->
      <div class="mt-12 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
        <h2 class="text-lg font-bold text-gray-900 mb-3">{{ part?.name ?? 'Dalis' }} — OEM kodas {{ code }}</h2>
        <div class="prose prose-sm text-gray-500 max-w-none space-y-3">
          <p>
            Ieškote <strong class="text-gray-700">{{ part?.name ?? 'autodalies' }}</strong> pagal OEM kodą <strong class="text-gray-700">{{ code }}</strong>?
            Mūsų platformoje rasite <strong class="text-gray-700">{{ sortedOffers.length }} pasiūlymus</strong> iš patikimų Europos pardavėjų — visos kainos vienoje vietoje, kad galėtumėte pasirinkti geriausią sandorį.
          </p>
          <p v-if="part">
            Ši dalis tinka <strong class="text-gray-700">{{ part.tags.join(', ') }}</strong> automobiliams.
            Kainos prasideda nuo <strong class="text-gray-700">{{ cheapestPrice }}</strong> ir skiriasi priklausomai nuo dalies būklės (Grade A, B ar C), kilmės šalies bei pristatymo trukmės.
          </p>
          <p>
            Visos mūsų platformoje siūlomos dalys yra naudotos, tikrintos ir turi aiškiai nurodytą būklę. Prekiaujama pagal standartizuotą Grade sistemą: <strong class="text-gray-700">Grade A</strong> — puiki būklė, <strong class="text-gray-700">Grade B</strong> — gera būklė su nedideliais nusidėvėjimo ženklais, <strong class="text-gray-700">Grade C</strong> — veikianti dalis su matomais defektais.
          </p>
          <p>
            Užsakę dalį iš mūsų pardavėjų galite tikėtis <strong class="text-gray-700">greito pristatymo per 1–7 darbo dienas</strong> DPD, DHL, GLS arba Venipak kurjeriu. Kiekvienas pirkimas apsaugotas 14 dienų grąžinimo garantija.
          </p>
        </div>

        <!-- FAQ -->
        <div class="mt-6 space-y-3">
          <h3 class="text-base font-bold text-gray-900">Dažniausiai užduodami klausimai</h3>
          <details v-for="faq in faqs" :key="faq.q" class="group border border-gray-100 rounded-xl overflow-hidden">
            <summary class="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-gray-800 hover:bg-gray-50 list-none">
              {{ faq.q }}
              <svg class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </summary>
            <div class="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">{{ faq.a }}</div>
          </details>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/types/catalog'

const route = useRoute()
const code = computed(() => route.params.code as string)

const allListings: Listing[] = [
  { id: 1,  code: '11127553456',  name: 'BMW E60 Variklio Dangtis',                   icon: '🔧', condition: 'A', status: 'Sandėlyje',  price: '85€',   priceNum: 85,   tags: ['BMW', 'E60', '5 serija (2003–2010)'],              country: 'DE', flag: '🇩🇪', city: 'Berlynas',    delivery: '2–4 d.d.', year: 2006, body: 'Sedanas',     engine: '2.5 l', power: '177 kW', fuel: 'Benzinas',  gearbox: 'Automatinė',  drive: 'Užpakaliniai varantieji', category: 'Variklio dalys' },
  { id: 2,  code: '2109010247',   name: 'Mercedes W210 Priekinis Bamperis',            icon: '🚗', condition: 'B', status: 'Sandėlyje',  price: '210€',  priceNum: 210,  tags: ['Mercedes', 'W210', 'E klasė (1995–2003)'],         country: 'LT', flag: '🇱🇹', city: 'Vilnius',     delivery: '1–2 d.d.', year: 2001, body: 'Universalas', engine: '2.2 l', power: '105 kW', fuel: 'Dyzelinas', gearbox: 'Mechaninė',   drive: 'Užpakaliniai varantieji', category: 'Kėbulo dalys' },
  { id: 3,  code: '8N0823029',    name: 'Audi A4 Kapotas',                             icon: '🚗', condition: 'A', status: 'Sandėlyje',  price: '240€',  priceNum: 240,  originalPrice: '290€', tags: ['Audi', 'A4', 'B6 (2001–2004)'],               country: 'DE', flag: '🇩🇪', city: 'Hamburgas',   delivery: '2–4 d.d.', year: 2003, body: 'Sedanas',     engine: '1.9 l', power: '96 kW',  fuel: 'Dyzelinas', gearbox: 'Mechaninė',   drive: 'Priekiniai varantieji',   category: 'Kėbulo dalys' },
  { id: 4,  code: '4F0959643',    name: 'Audi A6 C6 Žibintas Kairys',                 icon: '💡', condition: 'B', status: 'Sandėlyje',  price: '320€',  priceNum: 320,  tags: ['Audi', 'A6', 'C6 (2004–2011)'],                   country: 'PL', flag: '🇵🇱', city: 'Varšuva',     delivery: '3–5 d.d.', year: 2007, body: 'Universalas', engine: '2.0 l', power: '103 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Priekiniai varantieji',   category: 'Žibintai ir optika' },
  { id: 5,  code: '1K5945093',    name: 'VW Golf V Galinis Žibintas',                  icon: '💡', condition: 'A', status: 'Sandėlyje',  price: '95€',   priceNum: 95,   tags: ['VW', 'Golf', 'V (2003–2008)'],                     country: 'LT', flag: '🇱🇹', city: 'Kaunas',      delivery: '1–2 d.d.', year: 2005, body: 'Hečbekas',    engine: '1.6 l', power: '75 kW',  fuel: 'Benzinas',  gearbox: 'Mechaninė',   drive: 'Priekiniai varantieji',   category: 'Žibintai ir optika' },
  { id: 6,  code: '30748021',     name: 'Volvo XC60 Stabdžių Diskas',                  icon: '🛑', condition: 'B', status: 'Sandėlyje',  price: '180€',  priceNum: 180,  tags: ['Volvo', 'XC60', 'I (2008–2017)'],                  country: 'LV', flag: '🇱🇻', city: 'Ryga',        delivery: '2–3 d.d.', year: 2012, body: 'Visureivis',  engine: '2.4 l', power: '136 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Stabdžių sistema' },
  { id: 7,  code: 'LR019608',     name: 'Land Rover Freelander Pavarų Dėžė',           icon: '⚙️', condition: 'C', status: 'Sandėlyje',  price: '890€',  priceNum: 890,  tags: ['Land Rover', 'Freelander', '2 (2006–2014)'],       country: 'DE', flag: '🇩🇪', city: 'Miunchenas',  delivery: '3–5 d.d.', year: 2009, body: 'Visureivis',  engine: '2.2 l', power: '112 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Transmisija' },
  { id: 8,  code: 'A6395420119',  name: 'Mercedes C W203 Kondicionierius',             icon: '❄️', condition: 'B', status: 'Rezervuota', price: '260€',  priceNum: 260,  tags: ['Mercedes', 'C klasė', 'W203 (2000–2007)'],         country: 'FR', flag: '🇫🇷', city: 'Paryžius',    delivery: '4–6 d.d.', year: 2004, body: 'Sedanas',     engine: '1.8 l', power: '105 kW', fuel: 'Benzinas',  gearbox: 'Mechaninė',   drive: 'Užpakaliniai varantieji', category: 'Kondicionierius' },
  { id: 9,  code: '7L6853677',    name: 'VW Touareg Priekiniai Žibintai',              icon: '💡', condition: 'A', status: 'Sandėlyje',  price: '450€',  priceNum: 450,  originalPrice: '520€', tags: ['VW', 'Touareg', '7L (2002–2010)'],             country: 'NL', flag: '🇳🇱', city: 'Amsterdamas', delivery: '3–5 d.d.', year: 2007, body: 'Visureivis',  engine: '3.0 l', power: '165 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Žibintai ir optika' },
  { id: 10, code: 'N52-11127',    name: 'BMW N52 Cilindro Galva',                      icon: '🔧', condition: 'B', status: 'Sandėlyje',  price: '540€',  priceNum: 540,  tags: ['BMW', 'N52', '3 serija E90 (2005–2012)'],          country: 'DE', flag: '🇩🇪', city: 'Štutgartas',  delivery: '2–4 d.d.', year: 2008, body: 'Sedanas',     engine: '2.5 l', power: '160 kW', fuel: 'Benzinas',  gearbox: 'Mechaninė',   drive: 'Užpakaliniai varantieji', category: 'Variklio dalys' },
  { id: 11, code: 'OP-13151777',  name: 'Opel Astra H Variklio Dangtis',               icon: '🔧', condition: 'A', status: 'Sandėlyje',  price: '65€',   priceNum: 65,   tags: ['Opel', 'Astra', 'H (2004–2009)'],                  country: 'PL', flag: '🇵🇱', city: 'Krokuva',     delivery: '3–5 d.d.', year: 2006, body: 'Hečbekas',    engine: '1.6 l', power: '85 kW',  fuel: 'Benzinas',  gearbox: 'Mechaninė',   drive: 'Priekiniai varantieji',   category: 'Kėbulo dalys' },
  { id: 12, code: 'FO-1367415',   name: 'Ford Focus III Priekinis Sparnas',             icon: '🚗', condition: 'C', status: 'Sandėlyje',  price: '120€',  priceNum: 120,  tags: ['Ford', 'Focus', 'III (2011–2018)'],                country: 'EE', flag: '🇪🇪', city: 'Talinas',     delivery: '3–4 d.d.', year: 2014, body: 'Universalas', engine: '1.6 l', power: '77 kW',  fuel: 'Dyzelinas', gearbox: 'Mechaninė',   drive: 'Priekiniai varantieji',   category: 'Kėbulo dalys' },
  { id: 13, code: 'RE-7701208',   name: 'Renault Megane III Variklis 1.5 dCi',         icon: '🔧', condition: 'B', status: 'Sandėlyje',  price: '1200€', priceNum: 1200, tags: ['Renault', 'Megane', 'III (2008–2016)'],            country: 'FR', flag: '🇫🇷', city: 'Lionas',      delivery: '5–7 d.d.', year: 2011, body: 'Hečbekas',    engine: '1.5 l', power: '81 kW',  fuel: 'Dyzelinas', gearbox: 'Mechaninė',   drive: 'Priekiniai varantieji',   category: 'Variklio dalys' },
  { id: 14, code: 'TO-4851031',   name: 'Toyota RAV4 2.0 Priekinė Ašis',              icon: '⚙️', condition: 'A', status: 'Sandėlyje',  price: '380€',  priceNum: 380,  tags: ['Toyota', 'RAV4', 'XA30 (2006–2012)'],              country: 'LT', flag: '🇱🇹', city: 'Kaunas',      delivery: '1–2 d.d.', year: 2009, body: 'Visureivis',  engine: '2.0 l', power: '112 kW', fuel: 'Benzinas',  gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Transmisija' },
  { id: 15, code: 'MB-2049062',   name: 'Mercedes E W212 Salonas',                     icon: '🪑', condition: 'A', status: 'Sandėlyje',  price: '650€',  priceNum: 650,  originalPrice: '750€', tags: ['Mercedes', 'E klasė', 'W212 (2009–2016)'],     country: 'DE', flag: '🇩🇪', city: 'Frankfurtas', delivery: '2–4 d.d.', year: 2013, body: 'Universalas', engine: '2.2 l', power: '125 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Užpakaliniai varantieji', category: 'Salonas' },
  { id: 16, code: 'VV-31272720',  name: 'Volvo V90 Galinis Bamperis',                  icon: '🚗', condition: 'B', status: 'Sandėlyje',  price: '290€',  priceNum: 290,  tags: ['Volvo', 'V90', 'II (2016–2023)'],                  country: 'LV', flag: '🇱🇻', city: 'Ryga',        delivery: '2–3 d.d.', year: 2018, body: 'Universalas', engine: '2.0 l', power: '140 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Kėbulo dalys' },
  { id: 17, code: 'BM-63117182',  name: 'BMW F10 ECU Valdymo Blokas',                  icon: '🔌', condition: 'A', status: 'Parduota',   price: '320€',  priceNum: 320,  tags: ['BMW', 'F10', '5 serija (2010–2017)'],              country: 'DE', flag: '🇩🇪', city: 'Berlynas',    delivery: '2–4 d.d.', year: 2014, body: 'Sedanas',     engine: '2.0 l', power: '135 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Užpakaliniai varantieji', category: 'Elektrika' },
  { id: 18, code: 'HO-5019380',   name: 'Honda CR-V III Priekinis Bamperis',            icon: '🚗', condition: 'B', status: 'Sandėlyje',  price: '175€',  priceNum: 175,  tags: ['Honda', 'CR-V', 'III (2006–2012)'],                country: 'NL', flag: '🇳🇱', city: 'Utrechtas',   delivery: '3–5 d.d.', year: 2009, body: 'Visureivis',  engine: '2.0 l', power: '110 kW', fuel: 'Benzinas',  gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Kėbulo dalys' },
  { id: 19, code: 'PE-7417621',   name: 'Peugeot 308 II Priekiniai Stabdžiai',         icon: '🛑', condition: 'A', status: 'Sandėlyje',  price: '95€',   priceNum: 95,   tags: ['Peugeot', '308', 'II (2013–2021)'],                country: 'FR', flag: '🇫🇷', city: 'Marselis',    delivery: '4–6 d.d.', year: 2016, body: 'Hečbekas',    engine: '1.6 l', power: '88 kW',  fuel: 'Dyzelinas', gearbox: 'Mechaninė',   drive: 'Priekiniai varantieji',   category: 'Stabdžių sistema' },
  { id: 20, code: 'AU-4H0260805', name: 'Audi A8 D4 Turbina',                          icon: '🔧', condition: 'C', status: 'Sandėlyje',  price: '780€',  priceNum: 780,  tags: ['Audi', 'A8', 'D4 (2010–2018)'],                   country: 'DE', flag: '🇩🇪', city: 'Diuseldorfas',delivery: '2–4 d.d.', year: 2012, body: 'Sedanas',     engine: '3.0 l', power: '184 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Variklio dalys' },
  { id: 21, code: 'MB-A2049064',  name: 'Mercedes GLC X253 Kairys Sparnas',            icon: '🚗', condition: 'A', status: 'Sandėlyje',  price: '420€',  priceNum: 420,  originalPrice: '480€', tags: ['Mercedes', 'GLC', 'X253 (2015–2022)'],         country: 'LT', flag: '🇱🇹', city: 'Klaipėda',    delivery: '1–2 d.d.', year: 2019, body: 'Visureivis',  engine: '2.0 l', power: '135 kW', fuel: 'Benzinas',  gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Kėbulo dalys' },
  { id: 22, code: 'VW-5Q0615301', name: 'VW Passat B8 Stabdžių Diskai',                icon: '🛑', condition: 'B', status: 'Sandėlyje',  price: '140€',  priceNum: 140,  tags: ['VW', 'Passat', 'B8 (2014–2023)'],                  country: 'PL', flag: '🇵🇱', city: 'Gdanskas',    delivery: '3–5 d.d.', year: 2017, body: 'Universalas', engine: '2.0 l', power: '110 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Priekiniai varantieji',   category: 'Stabdžių sistema' },
  { id: 23, code: 'FO-2250742',   name: 'Ford Mondeo V Priekiniai Žibintai',            icon: '💡', condition: 'A', status: 'Sandėlyje',  price: '310€',  priceNum: 310,  tags: ['Ford', 'Mondeo', 'V (2014–2022)'],                 country: 'EE', flag: '🇪🇪', city: 'Talinas',     delivery: '3–4 d.d.', year: 2016, body: 'Universalas', engine: '2.0 l', power: '132 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Priekiniai varantieji',   category: 'Žibintai ir optika' },
  { id: 24, code: 'BM-61357188',  name: 'BMW X5 E70 Starteris',                        icon: '🔌', condition: 'B', status: 'Sandėlyje',  price: '230€',  priceNum: 230,  tags: ['BMW', 'X5', 'E70 (2006–2013)'],                    country: 'DE', flag: '🇩🇪', city: 'Kelnas',      delivery: '2–4 d.d.', year: 2010, body: 'Visureivis',  engine: '3.0 l', power: '173 kW', fuel: 'Dyzelinas', gearbox: 'Automatinė',  drive: 'Visų ratų pavara',        category: 'Elektrika' },
]

const part = computed(() => allListings.find(l => l.code === code.value) ?? null)

const offers = computed<Listing[]>(() => {
  const base = part.value
  if (!base) return []
  return [
    { ...base },
    { ...base, id: base.id + 100, condition: 'B' as const, price: `${Math.round(base.priceNum * 0.78)}€`, priceNum: Math.round(base.priceNum * 0.78), city: 'Varšuva',    flag: '🇵🇱', country: 'PL', delivery: '3–5 d.d.', originalPrice: undefined },
    { ...base, id: base.id + 200, condition: 'A' as const, price: `${Math.round(base.priceNum * 1.15)}€`, priceNum: Math.round(base.priceNum * 1.15), city: 'Ryga',        flag: '🇱🇻', country: 'LV', delivery: '2–3 d.d.', originalPrice: undefined },
    { ...base, id: base.id + 300, condition: 'C' as const, price: `${Math.round(base.priceNum * 0.55)}€`, priceNum: Math.round(base.priceNum * 0.55), city: 'Berlynas',    flag: '🇩🇪', country: 'DE', delivery: '2–4 d.d.', originalPrice: undefined },
    { ...base, id: base.id + 400, condition: 'B' as const, price: `${Math.round(base.priceNum * 0.90)}€`, priceNum: Math.round(base.priceNum * 0.90), city: 'Talinas',     flag: '🇪🇪', country: 'EE', delivery: '3–4 d.d.', originalPrice: undefined },
  ]
})

const sort = ref('price_asc')

const sortedOffers = computed(() => {
  const list = [...offers.value]
  if (sort.value === 'price_asc')  return list.sort((a, b) => a.priceNum - b.priceNum)
  if (sort.value === 'price_desc') return list.sort((a, b) => b.priceNum - a.priceNum)
  const order = { A: 0, B: 1, C: 2 }
  return list.sort((a, b) => order[a.condition] - order[b.condition])
})

const cheapestPrice  = computed(() => offers.value.length ? `${Math.min(...offers.value.map(o => o.priceNum))}€` : '–')
const availableCount = computed(() => offers.value.filter(o => o.status === 'Sandėlyje').length)
const minPrice       = computed(() => Math.min(...offers.value.map(o => o.priceNum)))
const maxPrice       = computed(() => Math.max(...offers.value.map(o => o.priceNum)))

function getParams(l: Listing) {
  const p: string[] = ['Naudota/-as']
  if (l.body)    p.push(l.body)
  if (l.year)    p.push(`${l.year} m.`)
  if (l.engine)  p.push(l.engine)
  if (l.power)   p.push(l.power)
  if (l.fuel)    p.push(l.fuel)
  if (l.gearbox) p.push(l.gearbox)
  return p
}

const grades = [
  { label: 'Grade A', cls: 'bg-green-600 text-white',  desc: 'Puiki būklė — dalis be matomų defektų, minimalus nusidėvėjimas.' },
  { label: 'Grade B', cls: 'bg-yellow-500 text-white', desc: 'Gera būklė — maži nusidėvėjimo ženklai, dalis pilnai funkcionali.' },
  { label: 'Grade C', cls: 'bg-orange-500 text-white', desc: 'Veikianti dalis — matomi defektai, tačiau techninės funkcijos išsaugotos.' },
]

const faqs = computed(() => [
  {
    q: `Ar OEM kodas ${code.value} tinka mano automobiliui?`,
    a: part.value
      ? `OEM kodas ${code.value} yra unikalus gamyklinis numeris daliai „${part.value.name}". Šis kodas tinka: ${part.value.tags.join(', ')}. Prieš pirkdami patikrinkite automobilio technines specifikacijas arba susisiekite su pardavėju.`
      : `OEM kodas yra unikalus gamyklinis dalies identifikatorius. Prieš pirkdami patikrinkite, ar kodas atitinka jūsų automobilio modelį.`,
  },
  {
    q: 'Kuo skiriasi Grade A, B ir C dalys?',
    a: 'Grade A — puikios būklės dalis be matomų defektų. Grade B — funkcionali dalis su nedideliais nusidėvėjimo ženklais. Grade C — veikianti dalis su matomais defektais, tinkama naudoti, bet estetiškai prastesnė. Visos dalys yra tikrintos ir garantuotos.',
  },
  {
    q: 'Kiek kainuoja pristatymas?',
    a: 'Pristatymo kaina priklauso nuo dalies svorio, dydžio ir kilmės šalies. Tikslią pristatymo kainą matysite pirkimo metu. Pristatome DPD, DHL, GLS ir Venipak kurjeriais visoje Lietuvoje.',
  },
  {
    q: 'Ar galiu grąžinti dalį, jei ji netiks?',
    a: 'Taip, kiekvienas pirkimas apsaugotas 14 dienų grąžinimo garantija. Jei dalis neatitinka aprašymo arba netinka jūsų automobiliui, susisiekite su pardavėju ir grąžinkite be klausimų.',
  },
])

// SEO
const pageTitle       = computed(() => part.value ? `${part.value.name} OEM ${code.value} — kainų palyginimas | dalys.lt` : `OEM ${code.value} kainų palyginimas | dalys.lt`)
const pageDescription = computed(() => part.value
  ? `Palyginkite ${sortedOffers.value.length} pasiūlymus „${part.value.name}" (OEM ${code.value}). Kainos nuo ${cheapestPrice.value}. ${part.value.tags.join(', ')}. Greitas pristatymas, 14 d. grąžinimas.`
  : `Palyginkite kainas pagal OEM kodą ${code.value} dalys.lt platformoje. Patikimi Europos pardavėjai, greitas pristatymas.`
)

useHead({
  title: pageTitle,
  meta: [
    { name: 'description',         content: pageDescription },
    { name: 'robots',              content: 'index, follow' },
    { property: 'og:title',        content: pageTitle },
    { property: 'og:description',  content: pageDescription },
    { property: 'og:type',         content: 'website' },
    { property: 'og:site_name',    content: 'dalys.lt' },
    { name: 'twitter:card',        content: 'summary' },
    { name: 'twitter:title',       content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
  ],
  link: [
    { rel: 'canonical', href: computed(() => `https://dalys.lt/oem/${code.value}`) },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': pageTitle.value,
        'description': pageDescription.value,
        'numberOfItems': sortedOffers.value.length,
        'itemListElement': sortedOffers.value.map((offer, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'item': {
            '@type': 'Offer',
            'name': offer.name,
            'price': offer.priceNum,
            'priceCurrency': 'EUR',
            'availability': offer.status === 'Sandėlyje'
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            'seller': { '@type': 'Organization', 'address': { '@type': 'PostalAddress', 'addressLocality': offer.city } },
          },
        })),
      })),
    },
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.value.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
        })),
      })),
    },
  ],
})
</script>
