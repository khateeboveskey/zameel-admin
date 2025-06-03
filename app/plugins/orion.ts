import { Orion } from "@tailflow/laravel-orion/lib/orion";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  Orion.init(config.public.baseApiUrl);
  Orion.setToken(useUserStore().token || '');
})