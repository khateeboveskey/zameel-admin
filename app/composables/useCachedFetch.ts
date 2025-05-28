export const useCachedFetch = <T = unknown>(url: string, opts: any = {}) => {
  const config = useRuntimeConfig()
  const nuxt = useNuxtApp()

  const result = useFetch<T>(url, {
    ...opts,
    baseURL: config.public.baseApiUrl + '/' + config.public.apiPrefix,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token') || ''}`,
      ...(opts as any).headers
    },
    key: url,
    getCachedData: (key) => {
      if (nuxt.isHydrating && nuxt.payload.data[key]) {
        return nuxt.payload.data[key]
      }

      if (nuxt.static.data[key]) {
        return nuxt.static.data[key]
      }

      return null
    }
  })

  if (result.error?.value) {
    throw createError(result.error?.value)
  }

  return result
}
