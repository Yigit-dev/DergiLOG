// https://v3.nuxtjs.org/api/configuration/nuxt.config
import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-icon', '@nuxtjs-alt/proxy'],
  css: ['~/assets/styles/main.css'],
  proxy: {
    enableProxy: true,
    fetch: true,
    proxies: {
      '/proxy': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy/, '')
      }
    }
  },
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      Icons({ autoInstall: true })
    ]
  }
})
