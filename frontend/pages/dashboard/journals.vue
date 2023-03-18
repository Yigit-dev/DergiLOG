<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
await useCompanyStore().loadJournal()
</script>
<template>
  <div>
    <h1 class="text-6xl text-white">Journals</h1>
    <div class="grid-cols grid grid-cols-1 gap-4 py-8 lg:grid-cols-2">
      <JournalCard v-for="journal in useCompanyStore().$state.journals" :key="journal._id" :data="journal" />
    </div>
  </div>
</template>
<script>
import { useCompanyStore } from '~~/stores'
import JournalCard from '@/components/journal/JournalCard.vue'
export default {
  name: 'Journal',
  components: { JournalCard },
  async created() {
    await useCompanyStore().loadJournal()
  },
}
</script>
