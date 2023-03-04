import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('CompanyStore', {
  state: () => ({
    company: {},
    posts: [],
    journals: [],
    members: []
  }),
  actions: {},
})
