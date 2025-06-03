export const useCachedFetch = <T = unknown>(url: string, opts: any = {}) => {
  const config = useRuntimeConfig()
  const user = useUserStore()

  const method = (opts.method || 'GET').toUpperCase()
  const queryString = new URLSearchParams(opts.query || {}).toString()
  const key = `${method}:${queryString ? `${url}?${queryString}` : url}`

  const result = useFetch<T>(url, {
    key,
    timeout: 5000,
    baseURL: `${config.public.baseApiUrl}/${config.public.apiPrefix}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${user.token || ''}`,
      ...(opts.headers || {})
    },
    lazy: true,
    getCachedData: (k) => {
      const nuxtData = useNuxtData<T>(k)
      if (nuxtData?.data?.value) {
        console.log('Got ' + url + ' from cache.');
      }
      return nuxtData?.data?.value || null
    },
    ...opts,
  })

  if (result.error?.value) {
    throw createError(result.error.value)
  }

  return result
}
