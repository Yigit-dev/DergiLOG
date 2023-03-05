import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('CompanyStore', {
  state: () => ({
    company: {},
    posts: [],
    journals: [],
    members: []
  }),
  actions: {
    async loadJournal(){
      await $fetch(`http://localhost:3000/company/trt/journals`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDAzOTdkYTRmMDhkOTliYTFlMzk1ZGMiLCJuYW1lIjoiS3ViaWxheSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3Nzk2NTc5OCwiZXhwIjoxNjc3OTY2Njk4fQ.x1ZIgPNCuH80ElqrR2o27VwoWmFwB74A8Yw1QqX83Qw`,
              'x-api-key': useRuntimeConfig().API_KEY,
            },
        }).then(res => this.journals = res.data)
    }
  },
})
