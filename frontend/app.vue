<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import { useAuthStore } from './stores'
import Cookies from 'js-cookie'
onMounted(() => {
  useAuthStore().$state.token = Cookies.get('token')
})
</script>
