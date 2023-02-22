<template>
  <div class="flex min-h-screen w-full justify-start bg-black">
    <Sidebar />
    <main class="min-h-screen w-full overflow-x-hidden bg-inherit">
      <slot />
    </main>
  </div>
</template>
<script>
import Sidebar from '@/components/journal/Sidebar.vue'

export default {
  name: 'DashboardLayout',
  components: { Sidebar },
}
</script>
