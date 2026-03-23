<template>
  <div class="flex h-screen overflow-hidden" style="background:#F8FAFC; font-family:'Plus Jakarta Sans',sans-serif;">

    <!-- Sidebar -->
    <aside class="w-56 flex-shrink-0 flex flex-col" style="background:#fff; border-right:1px solid #E2E8F0;">

      <!-- Logo -->
      <div class="h-14 flex items-center px-5" style="border-bottom:1px solid #E2E8F0;">
        <NuxtLink to="/portal" class="flex items-center gap-2 cursor-pointer">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#14A34A;">
            <svg class="w-4 h-4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span class="text-sm font-bold tracking-tight" style="color:#0F172A;">recar<span style="color:#14A34A;">buy</span></span>
        </NuxtLink>
      </div>

      <!-- Company -->
      <div class="px-3 py-2.5" style="border-bottom:1px solid #E2E8F0;">
        <div class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg" style="background:#F8FAFC; border:1px solid #E2E8F0;">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs" style="background:#EFF6FF; color:#3B82F6;">D</div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold truncate" style="color:#0F172A;">UAB Draudimas LT</p>
            <p class="text-[11px] truncate" style="color:#94A3B8;">Draudimo kompanija</p>
          </div>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        <p class="text-[10px] font-semibold uppercase tracking-wider px-2.5 mb-1.5" style="color:#94A3B8;">Pagrindinis</p>

        <NuxtLink to="/buyer" class="nav-item" :class="$route.path === '/buyer' ? 'nav-active' : ''">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>Suvestinė</span>
        </NuxtLink>

        <NuxtLink to="/buyer/queries" class="nav-item" :class="$route.path.startsWith('/buyer/queries') ? 'nav-active' : ''">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span>Užklausos</span>
          <span class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style="background:#14A34A; color:#fff;">5</span>
        </NuxtLink>

        <NuxtLink to="/buyer/orders" class="nav-item" :class="$route.path.startsWith('/buyer/orders') ? 'nav-active' : ''">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span>Užsakymai</span>
        </NuxtLink>

        <p class="text-[10px] font-semibold uppercase tracking-wider px-2.5 mb-1.5 mt-4" style="color:#94A3B8;">Kita</p>

        <NuxtLink to="/buyer/settings" class="nav-item" :class="$route.path.startsWith('/buyer/settings') ? 'nav-active' : ''">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>Nustatymai</span>
        </NuxtLink>
      </nav>

      <!-- User -->
      <div class="px-3 py-3" style="border-top:1px solid #E2E8F0;">
        <button class="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-50 text-left">
          <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style="background:#EFF6FF; color:#3B82F6;">EK</div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold truncate" style="color:#0F172A;">Elena Kazlauskienė</p>
            <p class="text-[11px] truncate" style="color:#94A3B8;">Žalos vadybininkė</p>
          </div>
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-14 flex items-center px-6 gap-4 flex-shrink-0" style="background:#fff; border-bottom:1px solid #E2E8F0;">
        <div class="flex-1 max-w-xs">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Ieškoti..." class="w-full pl-9 pr-10 py-2 text-sm rounded-lg focus:outline-none" style="background:#F8FAFC; border:1px solid #E2E8F0; color:#0F172A; font-family:inherit;">
            <kbd class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded font-mono" style="color:#94A3B8; background:#F1F5F9; border:1px solid #E2E8F0;">⌘K</kbd>
          </div>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <button class="relative w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150 hover:bg-slate-50">
            <svg class="w-4 h-4" style="color:#475569;" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style="background:#EF4444;"></span>
          </button>
          <div class="w-px h-5" style="background:#E2E8F0;"></div>
          <button class="flex items-center gap-2 cursor-pointer transition-colors duration-150 hover:opacity-80">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style="background:#EFF6FF; color:#3B82F6;">EK</div>
            <span class="text-sm font-medium hidden sm:block" style="color:#0F172A;">Elena K.</span>
            <svg class="w-3.5 h-3.5" style="color:#94A3B8;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto"><slot /></main>
    </div>
  </div>
</template>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
  width: 100%;
  text-decoration: none;
}
.nav-item:hover { background: #F8FAFC; color: #0F172A; }
.nav-active { background: #F0FDF4 !important; color: #14A34A !important; font-weight: 600; }
</style>
