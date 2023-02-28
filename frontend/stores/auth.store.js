import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    token: Cookies.get('token'),
  }),
  actions: {
    async login(login, password) {
      await $fetch('http://localhost:3000/user/login', {
        method: 'POST',
        body: { login, password },
        headers: {
          'x-api-key': useRuntimeConfig().API_KEY,
        },
      })
        .then(response => {
          this.token = response.data.password
          Cookies.set('token', response.data.password)
          useRouter().push('/journal/dashboard')
        })
        .catch(error => {
          throw error
        })
    },
    logout() {
      this.token = null
      Cookies.remove('token')
      useRouter().push('/auth/login')
    },
  },
})
