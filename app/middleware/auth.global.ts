export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login' || to.path === '/register') {
    return;
  }

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }
})