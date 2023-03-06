import { useAuthStore } from '~~/stores'
export default defineNuxtRouteMiddleware(async to => {
  await useFetch('/api/user/login').then(res => {
    useAuthStore().$state.refresh_token = res.data.value.refresh_token
  })
  if (to.name !== '/auth/login' && !useAuthStore().$state.refresh_token) {
    return navigateTo('/auth/login')
  }
})
