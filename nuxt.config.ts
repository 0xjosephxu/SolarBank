// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    accessToken: '1fbbcdad-03a1-4b7c-bbe8-6be100f2f274',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/test-utils',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    'pinia-plugin-persistedstate/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  ui: {
    prefix: 'N',
  },
  //   tailwindcss: {
  //     exposeConfig: true,
  //     viewer: true,
  //   },
  plugins: ['./plugins/vue-data-ui.client.ts'],
  fonts: {
    families: [
      {
        name: 'Bai Jamjuree',
        provider: 'google',
        global: true,
      },
    ],
  },
});
