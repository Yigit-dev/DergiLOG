import { defineStore } from 'pinia'
import { useProfileStore } from './profile.store'

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    profileId: '',
    refresh_token: '',
    access_token: '',
  }),
  actions: {
    async loggedIn() {
      await useFetch('/api/user/login').then(res => {
        this.refresh_token = res.data.value.refresh_token
        this.access_token = res.data.value.access_token
        this.profileId = res.data.value.user_id
      })
    },

    async login(login, password) {
      await $fetch('http://localhost:3000/user/login', {
        method: 'POST',
        body: { login, password },
        headers: {
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => {
        useProfileStore().load(res.data)
      })
      this.loggedIn().then(() => {
        if (this.refresh_token) {
          useRouter().push('/dashboard')
        }
      })
    },

    async loggedOut() {
      await useFetch('/api/user/logout').then(res => {
        console.log(res)
      })
    },

    async logout() {
      await $fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        headers: {
          'x-api-key': useRuntimeConfig().API_KEY,
        },
      }).then(res => {
        this.loggedOut()
      })
      useProfileStore().clearProfile()
      useRouter().push('/auth/login')
    },
  },
})
