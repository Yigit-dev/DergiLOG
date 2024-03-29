// https://v3.nuxtjs.org/api/configuration/nuxt.config
import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-icon', '@nuxt/devtools'],
  css: ['~/assets/styles/main.css'],
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
    },
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [Icons({ autoInstall: true })],
  },
})
