export default defineNuxtRouteMiddleware(to => {
  const { isAuthenticated } = useAuth()

  if (to.path === '/login' || to.path === '/register') {
    if (isAuthenticated.value) {
      return navigateTo('/')
    }
    return
  }

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
