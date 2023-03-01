import Cookies from 'js-cookie'

export default defineNuxtRouteMiddleware(to => {
  const token = Cookies.get('token')
  if (to.name !== '/auth/login' && !token) {
    return navigateTo('/auth/login')
  }
})
