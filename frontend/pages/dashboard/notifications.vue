<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
import { useCompanyStore } from '~~/stores'
await useCompanyStore().loadPost()
</script>
<template>
  <div>
    <h1 class="text-6xl text-white">Notifications</h1>
  </div>
</template>
