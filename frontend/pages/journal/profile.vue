<script setup>
import { useProfileStore } from '~~/stores/profile.store';
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard',
})

const user = useProfileStore()
user.load()
</script>
<template>
  <div>
    <h1 class="text-6xl text-white">Profile</h1>
  </div>
</template>
