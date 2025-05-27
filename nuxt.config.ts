import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  srcDir: 'app/',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  fonts: {
    families: [
      { name: 'Alexandria', provider: 'google' },
    ]
  },
  svgo: {
    componentPrefix: 'Icon',
  },
  modules: ['@nuxt/ui-pro', '@nuxt/fonts', 'nuxt-svgo']
})