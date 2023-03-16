import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('CompanyStore', {
  state: () => ({
    company: {},
    posts: [],
    journals: [],
    members: [],
  }),
  actions: {
    async loadJournal() {
      await useFetch('/api/user/login').then(async res => {
        let profileId = res.data.value.user_id
        await $fetch(`http://localhost:3000/profile/${profileId}`, {
          method: 'GET',
          headers: {
            'x-api-key': useRuntimeConfig().API_KEY,
          },
        }).then(res => {
          console.log(res.data.company_info)
          this.company = res.data.company_info
        })
      })
      await $fetch(`http://localhost:3000/company/${this.company.company_name}/journals`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDAzOTdkYTRmMDhkOTliYTFlMzk1ZGMiLCJuYW1lIjoiS3ViaWxheSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODk5MDcyNCwiZXhwIjoxNjc4OTkxNjI0fQ.8a9LcUy7qD_FBAYAFdtLO3lD1g4vmcbkEUbYHS64_mg`,
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => console.log(res))
    },
  },
})
