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
    <h1 class="text-6xl text-white">POST</h1>
    <div class="grid-cols grid grid-cols-1 gap-4 py-8 lg:grid-cols-2">
      <PostCard v-for="post in useCompanyStore().$state.posts" :key="post._id" :data="post" />
    </div>
  </div>
</template>
<script>
import PostCard from '@/components/journal/PostCard.vue'
export default {
  name: 'Post',
  components: { PostCard },
}
</script>
