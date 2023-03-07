<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})
</script>
<template>
  <div>
    <header>
      <div class="grid gap-4 lg:grid-cols-2">
        <Welcome />
        <div class="grid grid-cols-3 justify-center gap-2">
          <Stats name="Total Post" :count="24" />
          <Stats name="Total Like" :count="999" />
          <Stats name="Followers" :count="5342" />
        </div>
      </div>
    </header>

    <h1 class="py-8 text-3xl text-white lg:text-5xl">Last Posts & Journal</h1>
    <div class="grid-cols grid gap-4 lg:grid-cols-2">
      <div class="grid-cols grid gap-4 lg:grid-cols-1">
        <PostCard v-for="i in 2" :key="i" />
      </div>
      <JournalCard />
    </div>
  </div>
</template>
<script>
import Stats from '~~/components/journal/Stats.vue'
import Welcome from '~~/components/journal/Welcome.vue'
import PostCard from '~~/components/journal/PostCard.vue'
import JournalCard from '~~/components/journal/JournalCard.vue'
export default {
  components: { Stats, Welcome, PostCard, JournalCard },
}
</script>
