import { Orion } from '@tailflow/laravel-orion/lib/orion'

export const useAuth = () => {
  const userStore = useUserStore()
  const router = useRouter()
  const toast = useToast()

  const login = async (email: string, password: string, remember = false) => {
    try {
      // Call your login API
      const { data, error } = await useCachedFetch('/login', {
        method: 'POST',
        body: {
          email,
          password,
          deviceName: navigator.userAgent.slice(0, 45),
        },
      })

      if (error.value) {
        toast.add({
          title: 'خطأ في تسجيل الدخول',
          description: getArErrorMessage(String(error.value)),
          color: 'error',
          icon: 'i-lucide-alert-triangle',
        })
        return { error: error.value }
      }


      toast.add({
        title: 'تم تسجيل الدخول بنجاح',
        description: 'مرحبًا بك في زميل!',
        color: 'success',
        icon: 'i-lucide-check-circle',
      })

      const token = data.value?.data.token || '';

      userStore.setToken(token)

      userStore.login(data.value?.data, token, remember)
      await router.push('/')

      return { success: true }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  const logout = async () => {
    try {
      const { error } = await useCachedFetch('/logout', { method: 'POST' })
      if (error.value) {
        toast.add({
          title: 'خطأ في تسجيل الخروج',
          description: getArErrorMessage(String(error.value)),
          color: 'error',
          icon: 'i-lucide-alert-triangle',
        })
        return
      }

      toast.add({
        title: 'تم تسجيل الخروج بنجاح',
        description: 'نأمل أن نراك مرة أخرى قريبًا!',
        color: 'success',
        icon: 'i-lucide-check-circle',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      Orion.setToken('')
      userStore.token = ''
      sessionStorage.removeItem('token')
      userStore.logout()
      await router.push('/login')
    }
  }

  const checkAuth = () => {
    return userStore.isLoggedIn
  }

  return {
    login,
    logout,
    checkAuth,
    user: computed(() => userStore.user),
    isAuthenticated: computed(() => userStore.isAuthenticated),
  }
}
