<template>
  <div class="m-auto hidden rounded-2xl border border-white p-2 md:block">
    <div class="font-poiret text-white" :class="size">DergiLOG</div>
  </div>
  <div class="m-auto block w-fit flex-shrink-0 rounded-2xl border-2 border-white p-2 md:hidden">
    <div class="font-poiret text-2xl text-white">DL.</div>
  </div>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    size: {
      type: String,
      default: 'text-9xl',
    },
  },
}
</script>
