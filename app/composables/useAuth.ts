import { Orion } from '@tailflow/laravel-orion/lib/orion';

type LoginResponse = {
  data: {
    token: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export function useAuth() {
  const toast = useToast();

  // #region Login
  const login = async (email: string, password: string, remember: boolean) => {
    const deviceName = navigator.userAgent.slice(0, 45);

    const { data, error } = await useCachedFetch<LoginResponse>('/login', {
      method: 'POST',
      body: {
        email,
        password,
        deviceName,
      },
    });

    if (error.value) {
      toast.add({
        title: 'خطأ في تسجيل الدخول',
        description: getArErrorMessage(String(error.value)),
        color: 'error',
        icon: 'i-lucide-alert-triangle',
      });
      return;
    }

    toast.add({
      title: 'تم تسجيل الدخول بنجاح',
      description: 'مرحبًا بك في زميل!',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });

    Orion.setToken(data.value?.data.token || '');

    if (remember) {
      localStorage.setItem('token', data.value?.data.token || '');
    } else {
      sessionStorage.setItem('token', data.value?.data.token || '');
    }

    return { data, error }
  }

  // #region Logout
  const logout = async () => {
    const { data, error } = await useCachedFetch('/logout', {
      method: 'POST',
    });

    if (error.value) {
      toast.add({
        title: 'خطأ في تسجيل الخروج',
        description: getArErrorMessage(String(error.value)),
        color: 'error',
        icon: 'i-lucide-alert-triangle',
      });
      return;
    }

    toast.add({
      title: 'تم تسجيل الخروج بنجاح',
      description: 'نأمل أن نراك مرة أخرى قريبًا!',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });

    Orion.setToken('');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    return { data, error }
  }

  return {
    login,
    logout,
  }
}
