import { defineStore } from 'pinia'
import { useProfileStore } from './profile.store'

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    profileId: "",
    refresh_token: "",
    access_token: ""
  }),
  actions: {
    async loggedIn(){
      useFetch('/api/user/login').then(res => {
        this.refresh_token = res.data.value.refresh_token
        this.access_token =  res.data.value.access_token  
        if(this.refresh_token){
          useRouter().push('/journal')
        }
      })
    },
    async login(login, password) {
      await $fetch('/proxy/user/login', {
        method: 'POST',
        body: { login, password },
        headers: {
          'x-api-key': useRuntimeConfig().API_KEY,
        }
      }).then(response => {
        this.$state.profileId = response.data._id 
        useProfileStore().load(response.data._id)
        this.loggedIn()
      })
      .catch(error => {
        throw error
      })
    },
    async logout() {
      await $fetch('/proxy/user/logout', {
        method: 'POST',
        headers: {
          'x-api-key': useRuntimeConfig().API_KEY,
        }
      })
      useProfileStore().clearProfile()
      useRouter().push('/auth/login')
    },
  },
})
