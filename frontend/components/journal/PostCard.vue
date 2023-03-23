<template>
  <div class="PostCard">
    <div class="p-4">
      <div class="content">
        <h2>{{ data.title }}</h2>
        <p>{{ data.description }}</p>
      </div>
      <div class="actions">
        <div class="action">
          <Icon name="flat-color-icons:like" size="24" />
          <span>{{ data.likes.length }}</span>
        </div>
        <NuxtLink :to="{ path: `/dashboard/post/${data.slug}/${data._id}` }">
          <div class="action">
            <Icon name="ic:round-keyboard-arrow-right" size="24" />
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="PostCardImage">
      <img :src="data.cover" :alt="data.title" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostCard',
  props: {
    data: { type: [Array, Object], required: true },
  },
}
</script>
<style scoped>
.PostCard {
  @apply grid rounded-2xl border border-pink-600 bg-transparent text-white shadow-md shadow-pink-900 transition duration-200 hover:shadow-lg hover:shadow-pink-800 lg:grid-cols-2;
}
.PostCard .content {
  @apply my-3;
}
.PostCard .content h2 {
  @apply text-xl font-bold;
}
.PostCard .actions {
  @apply flex items-center justify-between;
}
.PostCard .actions .action {
  @apply flex items-center;
}
.PostCard .actions .action span {
  @apply ml-2 text-sm;
}
.PostCardImage {
  @apply order-first lg:order-none;
}
.PostCardImage img {
  @apply h-full w-full rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none;
}
</style>
