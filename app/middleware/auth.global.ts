const DEMO_PASSWORD = 'dalys2026'
const COOKIE_NAME   = 'demo_access'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return

  const access = useCookie(COOKIE_NAME, { maxAge: 60 * 60 * 24 * 7 }) // 7 days

  if (!access.value || access.value !== DEMO_PASSWORD) {
    return navigateTo('/login')
  }
})
