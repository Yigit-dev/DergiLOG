<template>
  <img v-if="image" :src="image" :width="size" :height="size" class="flex-shrink-0 rounded-full" alt="avatar" />
  <Icon v-else name="ph:user-circle-fill" size="32" />
</template>
<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'Avatar',
  props: {
    image: {
      type: String,
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  components: { Icon },
}
</script>
