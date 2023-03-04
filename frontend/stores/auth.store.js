import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { useProfileStore } from './profile.store'

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    id: Cookies.get("id"),
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
          this.id = response.data._id
          this.token = response.data.password
          
          Cookies.set('id', response.data._id)
          Cookies.set('token', response.data.password)
          
          useProfileStore().load(response.data._id)
          
          useRouter().push('/journal')
        })
        .catch(error => {
          throw error
        })
    },
    logout() {
      this.token = null
      this.id = ""
      Cookies.remove('token')
      useProfileStore().clearProfile()
      useRouter().push('/auth/login')
    },
  },
})
