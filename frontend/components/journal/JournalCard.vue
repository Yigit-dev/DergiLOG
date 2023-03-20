<template>
  <NuxtLink :to="{ path: `/dashboard/journal/${data.journal_name}/${data._id}` }">
    <div class="JournalCard">
      <img :src="data.cover" alt="" />
      <div class="image-filter"></div>
      <div class="content">
        <h1>{{ data.journal_name }}</h1>
        <p>
          <!-- TODO: {{data.description}} -->
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
<script>
export default {
  name: 'JournalCard',
  props: {
    data: { type: [Array, Object], required: true },
  },
}
</script>
<style scoped>
.JournalCard {
  @apply relative rounded-2xl shadow-md shadow-pink-900 transition duration-200 hover:shadow-lg hover:shadow-pink-800;
}
.JournalCard img {
  @apply h-full min-h-[400px] rounded-2xl bg-cover;
}
.JournalCard .image-filter {
  @apply absolute top-0 left-0 h-full w-full rounded-2xl bg-black opacity-40;
}
.JournalCard .content {
  @apply absolute bottom-4 left-4 w-11/12 text-white;
}
.JournalCard .content h1 {
  @apply text-3xl font-bold;
}
</style>
