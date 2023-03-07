<script setup>
import { useProfileStore } from '~~/stores'

if (useProfileStore().$state.profile._id === undefined) {
  await useFetch('/api/user/login').then(async res => {
    let profileId = res.data.value.user_id
    await useProfileStore().loadFromDatabase(profileId)
  })
}
const profile = useProfileStore().$state.profile
</script>
<template>
  <div class="flex flex-col justify-between rounded-2xl bg-gray-200 md:flex-row md:pr-10">
    <div class="p-3 md:p-8">
      <h2 class="text-4xl font-bold text-black">{{ profile.name }}</h2>
      <p class="text-md mb-2 text-black md:mb-0">It’s good to see you again.</p>
    </div>
    <div class="-mt-4">
      <icon-welcome />
    </div>
  </div>
</template>
<script>
import IconWelcome from '@/components/icons/IconWelcome.vue'
export default {
  components: { IconWelcome },
  name: 'Welcome',
}
</script>
<style scoped></style>
