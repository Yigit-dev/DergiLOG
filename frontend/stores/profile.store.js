import { defineStore } from 'pinia'

export const useProfileStore = defineStore('Profile', {
  state: () => ({
    profile: {}
  }),
  actions: {
    async load(profileId){
        await $fetch(`http://localhost:3000/profile/${profileId}`, {
            method: 'GET',
            headers: {
              'x-api-key': useRuntimeConfig().API_KEY,
            },
        }).then(res => this.profile = res.data)
    },
    async clearProfile(){
        this.profile = {}
    }
  },
})
