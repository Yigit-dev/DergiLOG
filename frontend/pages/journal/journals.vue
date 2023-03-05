<script setup>
import { useCompanyStore } from '~~/stores';

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
useCompanyStore().loadJournal()
</script>
<template>
  <div>
    <h1 class="text-6xl text-white">Journals</h1>
  </div>
</template>
