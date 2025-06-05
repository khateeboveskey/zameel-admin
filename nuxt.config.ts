import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.BASE_API_URL || 'https://api.zameel.app',
      apiPrefix: process.env.API_PREFIX || '/api',
    },
  },
  srcDir: 'app/',
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    families: [{ name: 'Alexandria', provider: 'google' }],
  },
  svgo: {
    componentPrefix: 'Icon',
  },
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/fonts',
    'nuxt-svgo',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
})
