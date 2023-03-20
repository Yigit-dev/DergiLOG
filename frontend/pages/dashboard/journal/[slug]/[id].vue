<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
import { useCompanyStore } from '~~/stores'
await useCompanyStore().getJournal(useRoute().params.id)
</script>
<template>
  <div>
    <h1 class="text-5xl capitalize text-white">{{ useCompanyStore().$state.journal.journal_name }}</h1>
    <p class="mt-5 text-xl text-white">{{ useCompanyStore().$state.journal }}</p>
  </div>
</template>
