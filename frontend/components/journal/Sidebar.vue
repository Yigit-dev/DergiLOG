<script setup>
import { useAuthStore } from '~/stores/auth.store'
</script>
<template>
  <nav>
    <Logo size="text-5xl" />
    <NuxtLink to="/journal/dashboard" class="navigation" active-class="activeClass">
      <Icon name="ph:house-fill" size="32" />
      <span>Home</span>
    </NuxtLink>
    <NuxtLink to="/journal/notifications" class="navigation" active-class="activeClass">
      <Icon name="ion:notifications" size="32" />
      <span>Notifications</span>
    </NuxtLink>
    <NuxtLink to="/journal/journals" class="navigation" active-class="activeClass">
      <Icon name="ion:journal" size="32" />
      <span>Journals</span>
    </NuxtLink>
    <NuxtLink to="/journal/posts" class="navigation" active-class="activeClass">
      <Icon name="mingcute:grid-2-fill" size="32" />
      <span>Posts</span>
    </NuxtLink>

    <NuxtLink to="/journal/members" class="navigation" active-class="activeClass">
      <Icon name="mdi:account-multiple" size="32" />
      <span>Members</span>
    </NuxtLink>

    <div class="mt-8 mb-4">
      <button class="create hidden md:block">CREATE</button>
      <button class="create md:hidden"><Icon name="material-symbols:add-circle" size="32" /></button>
    </div>

    <NuxtLink to="/journal/profile" class="navigation" active-class="!bg-neutral-900 hover:!text-inherit">
      <Avatar />
      <div class="hidden md:block">
        <span class="text-sm">Yigit Cakmak</span>
        <span class="text-xs">@yigitcakmak</span>
      </div>
    </NuxtLink>
    <div class="navigation mt-auto" @click="() => useAuthStore().logout()">
      <Icon name="ion:exit-outline" size="32" />
      <span>Exit</span>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/common/Logo.vue'
import Avatar from '@/components/common/Avatar.vue'

export default {
  name: 'Sidebar',
  components: { Logo, Avatar },
}
</script>

<style scoped>
nav {
  @apply justify-center border-r-[1px] border-white p-2 text-white md:p-8;
}
.navigation {
  @apply mt-8 mb-4 flex items-center justify-center rounded-2xl bg-transparent py-2 px-1 transition duration-200 hover:bg-white hover:text-black md:justify-start;
}
.navigation span {
  @apply ml-2 hidden md:block;
}
button.create {
  @apply w-full rounded-2xl border-2 border-white px-1 py-2 transition duration-200 hover:border-pink-600 hover:text-pink-600;
}
.activeClass {
  @apply !bg-neutral-900 hover:!text-inherit;
}
</style>
