import Cookies from 'js-cookie'

export default defineNuxtRouteMiddleware(to => {
  const token = Cookies.get('token')
  if (to.name !== 'login' && !token) {
    return navigateTo('/login')
  }
})
