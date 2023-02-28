<template>
  <div
    class="flex h-full w-full min-w-max flex-col items-center justify-center rounded-2xl p-2 text-center text-white transition duration-300 hover:border-4 bg-transparent border-2"
  >
    <p class="text-2xl font-extrabold md:text-5xl">{{ count }}</p>
    <p class="font-medium">{{ name }}</p>
  </div>
</template>
<script>
export default {
  name: 'Stats',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
    }
  },
}
</script>
