<template>
  <div class="PostCard">
    <div class="p-4">
      <div class="content">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ad esse quis similique minus harum, ducimus
          voluptatibus nisi voluptates laborum, soluta sunt quae provident corporis voluptatum ex cumque sapiente dicta.
        </p>
      </div>
      <div class="actions">
        <div class="action">
          <Icon name="flat-color-icons:like" size="24" />
          <span>23223</span>
        </div>
        <div class="action">
          <Icon name="ion:stats-chart" size="24" />
          <span>213123</span>
        </div>
        <div class="action">
          <Icon name="ic:round-keyboard-arrow-right" size="24" />
        </div>
      </div>
    </div>
    <div class="PostCardImage">
      <img src="../../assets/post-cover2.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostCard',
  props: {
    card: { type: 'Array', required: true },
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
