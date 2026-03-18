<template>
  <div class="bg-gray-50 min-h-screen">

    <!-- Breadcrumb bar -->
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav class="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
          <a href="/" class="hover:text-gray-700 transition-colors">Pagrindinis</a>
          <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <a href="/catalog" class="hover:text-gray-700 transition-colors">Katalogas</a>
          <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <a href="/catalog" class="hover:text-gray-700 transition-colors">{{ product.category }}</a>
          <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <span class="text-gray-600 font-medium truncate max-w-xs">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      <!-- Main product block -->
      <div class="grid lg:grid-cols-[1fr_420px] gap-6 lg:gap-8">

        <!-- Left: Gallery + Tabs -->
        <div class="space-y-5">

          <!-- Image gallery -->
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <!-- Main image -->
            <div class="relative bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center" style="height: 340px;">
              <span class="text-9xl select-none">{{ product.thumbnails[activeThumb] }}</span>
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span
                  class="text-xs font-black px-3 py-1.5 rounded-xl text-white shadow-sm"
                  :class="{
                    'bg-green-600': product.condition === 'A',
                    'bg-yellow-500': product.condition === 'B',
                    'bg-orange-500': product.condition === 'C',
                  }"
                >Grade {{ product.condition }}</span>
                <span
                  class="text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm"
                  :class="{
                    'bg-green-100 text-green-700': product.status === 'Sandėlyje',
                    'bg-yellow-100 text-yellow-700': product.status === 'Rezervuota',
                  }"
                >● {{ product.status }}</span>
              </div>
              <!-- Wishlist -->
              <button
                @click="wishlisted = !wishlisted"
                class="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-xl flex items-center justify-center shadow-sm transition-all"
              >
                <svg class="w-5 h-5 transition-colors" :class="wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-2 p-3 border-t border-gray-100">
              <button
                v-for="(thumb, i) in product.thumbnails"
                :key="i"
                @click="activeThumb = i"
                class="w-16 h-16 rounded-xl flex items-center justify-center text-3xl border-2 transition-all flex-shrink-0"
                :class="activeThumb === i
                  ? 'border-brand-green bg-green-50'
                  : 'border-gray-100 bg-gray-50 hover:border-gray-200'"
              >{{ thumb }}</button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div class="flex border-b border-gray-100">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="flex-1 py-3.5 text-sm font-semibold transition-all relative"
                :class="activeTab === tab.id
                  ? 'text-gray-950 bg-white'
                  : 'text-gray-400 hover:text-gray-600 bg-gray-50'"
              >
                {{ tab.label }}
                <div v-if="activeTab === tab.id" class="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-green rounded-t-full"></div>
              </button>
            </div>

            <div class="p-5">
              <!-- Description -->
              <div v-if="activeTab === 'description'" class="space-y-4">
                <p class="text-sm text-gray-700 leading-relaxed">{{ product.description }}</p>
                <div class="grid sm:grid-cols-2 gap-3 pt-2">
                  <div v-for="spec in product.specs" :key="spec.label" class="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
                    <div class="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 text-base">{{ spec.icon }}</div>
                    <div>
                      <div class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{{ spec.label }}</div>
                      <div class="text-sm font-semibold text-gray-900 mt-0.5">{{ spec.value }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Compatibility -->
              <div v-else-if="activeTab === 'compatibility'" class="space-y-3">
                <p class="text-sm text-gray-500">Ši dalis suderinama su šiais automobiliais:</p>
                <div class="space-y-2">
                  <div
                    v-for="car in product.compatibility"
                    :key="car.model"
                    class="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-xl"
                  >
                    <div class="flex items-center gap-2.5">
                      <span class="text-xl">{{ car.icon }}</span>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ car.model }}</div>
                        <div class="text-xs text-gray-400">{{ car.years }} · {{ car.engine }}</div>
                      </div>
                    </div>
                    <span class="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">✓ Tinka</span>
                  </div>
                </div>
              </div>

              <!-- Seller -->
              <div v-else-if="activeTab === 'seller'" class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">🏪</div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-bold text-gray-950">{{ product.seller.name }}</h3>
                      <span class="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Patvirtintas pardavėjas</span>
                    </div>
                    <div class="flex items-center gap-1 mt-1">
                      <div class="flex gap-0.5">
                        <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= Math.round(product.seller.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span class="text-sm font-bold text-gray-900">{{ product.seller.rating }}</span>
                      <span class="text-xs text-gray-400">({{ product.seller.reviews }} atsiliepimai)</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <span>{{ product.seller.flag }}</span>
                      <span>{{ product.seller.location }}</span>
                      <span class="text-gray-300">·</span>
                      <span>{{ product.seller.since }} nuo</span>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-3">
                  <div v-for="stat in product.seller.stats" :key="stat.label" class="bg-gray-50 rounded-xl p-3 text-center">
                    <div class="text-lg font-black text-gray-950">{{ stat.value }}</div>
                    <div class="text-[10px] text-gray-400 font-medium mt-0.5">{{ stat.label }}</div>
                  </div>
                </div>
                <button class="w-full py-3 text-sm font-semibold border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-all">
                  Žiūrėti visus pardavėjo skelbimus →
                </button>
              </div>

              <!-- Reviews -->
              <div v-else-if="activeTab === 'reviews'" class="space-y-4">
                <div class="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div class="text-center">
                    <div class="text-4xl font-black text-gray-950">{{ product.seller.rating }}</div>
                    <div class="flex gap-0.5 justify-center mt-1">
                      <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(product.seller.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <div class="text-xs text-gray-400 mt-1">{{ product.seller.reviews }} atsiliepimai</div>
                  </div>
                  <div class="flex-1 space-y-1.5">
                    <div v-for="bar in ratingBars" :key="bar.stars" class="flex items-center gap-2">
                      <span class="text-xs text-gray-500 w-4">{{ bar.stars }}</span>
                      <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full bg-yellow-400 rounded-full" :style="{ width: bar.pct + '%' }"></div>
                      </div>
                      <span class="text-xs text-gray-400 w-6">{{ bar.pct }}%</span>
                    </div>
                  </div>
                </div>
                <div v-for="review in product.reviews" :key="review.author" class="space-y-2 pb-4 border-b border-gray-50 last:border-0">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">{{ review.author[0] }}</div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ review.author }}</div>
                        <div class="text-xs text-gray-400">{{ review.date }}</div>
                      </div>
                    </div>
                    <div class="flex gap-0.5">
                      <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </div>
                  <p class="text-sm text-gray-700 leading-relaxed">{{ review.text }}</p>
                  <div v-if="review.tag" class="inline-block text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{{ review.tag }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info + Purchase -->
        <div class="space-y-4">

          <!-- Product info card -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 space-y-4">

            <!-- OEM + category -->
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg">{{ product.code }}</span>
              <span class="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">{{ product.category }}</span>
            </div>

            <!-- Name -->
            <h1 class="text-xl sm:text-2xl font-black text-gray-950 leading-tight">{{ product.name }}</h1>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in product.tags" :key="tag" class="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{{ tag }}</span>
            </div>

            <!-- Condition + status -->
            <div class="flex items-center gap-2 flex-wrap">
              <span
                class="flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl text-white"
                :class="{
                  'bg-green-600': product.condition === 'A',
                  'bg-yellow-500': product.condition === 'B',
                  'bg-orange-500': product.condition === 'C',
                }"
              >
                Grade {{ product.condition }}
                <span class="font-normal opacity-75">— {{ conditionLabel }}</span>
              </span>
              <span class="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-xl">● {{ product.status }}</span>
            </div>

            <!-- Price -->
            <div class="py-4 border-y border-gray-100">
              <div class="flex items-end gap-3">
                <span class="text-4xl font-black text-gray-950">{{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-lg text-gray-400 line-through mb-1">{{ product.originalPrice }}</span>
                <span v-if="product.discount" class="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg mb-1">-{{ product.discount }}%</span>
              </div>
              <p class="text-xs text-gray-400 mt-1">Kaina be pristatymo. Pristatymas nuo 4.99 €</p>
            </div>

            <!-- Delivery info -->
            <div class="space-y-2">
              <div class="flex items-center gap-2.5 text-sm">
                <div class="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                </div>
                <div>
                  <span class="font-semibold text-gray-900">Pristatymas</span>
                  <span class="text-gray-500"> · 2–5 darbo dienos</span>
                </div>
              </div>
              <div class="flex items-center gap-2.5 text-sm">
                <div class="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <span class="font-semibold text-gray-900">Saugi apmokėjimo sistema</span>
              </div>
              <div class="flex items-center gap-2.5 text-sm">
                <div class="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </div>
                <span class="font-semibold text-gray-900">30 dienų grąžinimas</span>
              </div>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-gray-700">Kiekis:</span>
              <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button @click="qty = Math.max(1, qty - 1)" class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-bold">−</button>
                <span class="w-10 text-center text-sm font-bold text-gray-900">{{ qty }}</span>
                <button @click="qty++" class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-bold">+</button>
              </div>
              <span class="text-xs text-gray-400">Sandėlyje: {{ product.stock }} vnt.</span>
            </div>

            <!-- Action buttons -->
            <div class="space-y-2.5">
              <button class="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 active:translate-y-0 text-base">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Į krepšelį
              </button>
              <button class="w-full flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-base">
                Pirkti dabar
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Seller mini card -->
          <div class="bg-white rounded-2xl border border-gray-100 p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Pardavėjas</span>
              <button @click="activeTab = 'seller'" class="text-xs font-semibold text-brand-green hover:text-brand-green-dark">Plačiau →</button>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">🏪</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="font-bold text-gray-950 text-sm">{{ product.seller.name }}</span>
                  <svg class="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex items-center gap-2 mt-0.5">
                  <div class="flex gap-0.5">
                    <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= Math.round(product.seller.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-xs font-bold text-gray-900">{{ product.seller.rating }}</span>
                  <span class="text-xs text-gray-400">· {{ product.seller.flag }} {{ product.seller.location }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Share / report -->
          <div class="flex items-center gap-2">
            <button class="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-700 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              Dalintis
            </button>
            <button class="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-700 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
              Pranešti
            </button>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div class="mt-10 sm:mt-14">
        <div class="flex items-center justify-between mb-5">
          <h2 class="text-xl font-black text-gray-950">Panašios dalys</h2>
          <a href="/catalog" class="text-sm font-semibold text-brand-green hover:text-brand-green-dark">Visi skelbimai →</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <CatalogListingCard v-for="l in relatedListings" :key="l.id" :listing="l" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '~/types/catalog'

const route = useRoute()

const wishlisted = ref(false)
const activeThumb = ref(0)
const activeTab = ref('description')
const qty = ref(1)

// Mock products database
const products: Record<string, typeof product.value> = {
  default: {
    id: 1,
    code: '11127553456',
    name: 'BMW E60 5 serija Variklio Dangtis',
    category: 'Kėbulo dalys',
    condition: 'A' as 'A',
    status: 'Sandėlyje',
    price: '85 €',
    originalPrice: '110 €',
    discount: 23,
    stock: 1,
    tags: ['BMW', 'E60', '5 serija', '2003–2010', 'M57'],
    thumbnails: ['🚗', '🔧', '⚙️', '📦'],
    description: 'Originalus BMW E60 5 serijos variklio dangtis puikioje būklėje. Dalis išimta iš 2007 m. BMW 530d E60 su 157,000 km rida. Jokių įlenkimų ar dažų defektų. Spalva: Titanium Silver (354). Tinka visoms E60 generacijoms.',
    specs: [
      { icon: '🎨', label: 'Spalva', value: 'Titanium Silver (354)' },
      { icon: '📅', label: 'Metai', value: '2007' },
      { icon: '🔢', label: 'OEM kodas', value: '41617111234' },
      { icon: '⚖️', label: 'Svoris', value: '~8 kg' },
      { icon: '📐', label: 'Matmenys', value: '160 × 130 cm' },
      { icon: '🏭', label: 'Gamintojas', value: 'BMW AG' },
    ],
    compatibility: [
      { icon: '🚗', model: 'BMW 5 serija (E60)', years: '2003–2010', engine: 'Visi varikliai' },
      { icon: '🚗', model: 'BMW 5 serija (E61 Touring)', years: '2004–2010', engine: 'Visi varikliai' },
    ],
    seller: {
      name: 'AutoParts GmbH',
      rating: 4.9,
      reviews: 312,
      flag: '🇩🇪',
      location: 'Miunchenas, Vokietija',
      since: '2018',
      stats: [
        { label: 'Skelbimai', value: '847' },
        { label: 'Parduota', value: '3.2k' },
        { label: 'Atsakymas', value: '<2h' },
      ],
    },
    reviews: [
      { author: 'Tomas V.', rating: 5, date: '2026-02-14', text: 'Dalis atkeliavo tobulos būklės, tiksliai kaip aprašyta. Greitas pristatymas į Vilnių per 4 dienas.', tag: '✓ Patvirtintas pirkimas' },
      { author: 'Andrius K.', rating: 5, date: '2026-01-28', text: 'Spalva tiksliai sutampa su originalu. Talpinti dalis tiesiog puikiai.', tag: '✓ Patvirtintas pirkimas' },
      { author: 'Marius P.', rating: 4, date: '2025-12-10', text: 'Gera būklė, tik nedidelis įbrėžimas apačioje, kurį pardavėjas iš anksto nurodė aprašyme. Viskas kaip tikėjausi.', tag: '' },
    ],
  },
}

const product = computed(() => {
  const id = route.params.id as string
  return products[id] ?? products.default
})

useHead(() => ({
  title: `${product.value.name} — dalys.lt`,
}))

const conditionLabel = computed(() => ({
  A: 'Puiki būklė',
  B: 'Gera būklė',
  C: 'Patenkinama būklė',
}[product.value.condition] ?? ''))

const tabs = [
  { id: 'description', label: 'Aprašymas' },
  { id: 'compatibility', label: 'Suderinamumas' },
  { id: 'seller', label: 'Pardavėjas' },
  { id: 'reviews', label: 'Atsiliepimai' },
]

const ratingBars = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 15 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]

const relatedListings: Listing[] = [
  { id: 3,  code: '8N0823029',   name: 'Audi A4 Kapotas',     icon: '🚗', condition: 'A', status: 'Sandėlyje', price: '240€', priceNum: 240, tags: ['Audi', 'A4', 'B6'], country: 'DE', flag: '🇩🇪', seller: 'Teile Profi', sellerRating: 4.8, category: 'Kėbulo dalys' },
  { id: 12, code: 'FO-1367415',  name: 'Ford Focus III Sparnas', icon: '🚗', condition: 'C', status: 'Sandėlyje', price: '120€', priceNum: 120, tags: ['Ford', 'Focus'], country: 'EE', flag: '🇪🇪', seller: 'Tallinn Parts', sellerRating: 4.2, category: 'Kėbulo dalys' },
  { id: 11, code: 'OP-13151777', name: 'Opel Astra H Dangtis', icon: '🔧', condition: 'A', status: 'Sandėlyje', price: '65€', priceNum: 65, tags: ['Opel', 'Astra', 'H'], country: 'PL', flag: '🇵🇱', seller: 'PL Auto', sellerRating: 4.4, category: 'Kėbulo dalys' },
  { id: 21, code: 'MB-A2049064', name: 'Mercedes GLC Sparnas', icon: '🚗', condition: 'A', status: 'Sandėlyje', price: '420€', priceNum: 420, tags: ['Mercedes', 'GLC'], country: 'LT', flag: '🇱🇹', seller: 'Premium Parts LT', sellerRating: 4.9, category: 'Kėbulo dalys' },
]
</script>
