import { defineStore } from 'pinia'
import { useAuthStore } from './auth.store'
import { useProfileStore } from './profile.store'

export const useCompanyStore = defineStore('Company', {
  state: () => ({
    company: {},
    dashboard: [],
    posts: [],
    journals: [],
    members: [],
    post: {},
    journal: {},
  }),
  actions: {
    async loadCompany() {
      const auth = useAuthStore()
      await auth.loggedIn()
      await useProfileStore().loadFromDatabase(auth.$state.profileId)
      this.company = await useProfileStore().$state.profile.company_info
    },
    async dashboardData() {
      await this.loadCompany()
      $fetch(`http://localhost:3000/company/${this.company._id}/LastPostsAndJournal`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useAuthStore().$state.access_token}`,
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => (this.dashboard = res.data))
    },
    async loadPost() {
      await this.loadCompany()
      $fetch(`http://localhost:3000/company/${this.company.company_name}/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useAuthStore().$state.access_token}`,
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => (this.posts = res.data))
    },
    async loadJournal() {
      await this.loadCompany()
      await $fetch(`http://localhost:3000/company/${this.company.company_name}/journals`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useAuthStore().$state.access_token}`,
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => (this.journals = res.data))
    },
    async getPost(postId) {
      await this.loadCompany()
      $fetch(`http://localhost:3000/company/${this.company.company_name}/posts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useAuthStore().$state.access_token}`,
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => (this.post = res.data.filter(post => post._id === postId)[0]))
    },
    async getJournal(journalId) {
      await this.loadCompany()
      $fetch(`http://localhost:3000/company/${this.company.company_name}/journals`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${useAuthStore().$state.access_token}`,
          'x-api-key': useRuntimeConfig().API_KEY,
        },
        credentials: 'include',
      }).then(res => (this.journal = res.data.filter(post => post._id === journalId)[0]))
    },
  },
})
