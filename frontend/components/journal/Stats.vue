<template>
  <div
    class="flex h-full w-full min-w-max flex-col items-center justify-center rounded-2xl bg-gray-200 p-2 text-center text-black"
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
    },
  },
}
</script>
