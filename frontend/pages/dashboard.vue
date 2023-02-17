<script setup>
import { useAuthStore } from '../stores'
definePageMeta({
  middleware: ['auth'],
})
</script>
<template>
  <div>
    <h1 class="text-6xl">THE DASHBOARd</h1>
    <button @click="useAuthStore().logout()" class="text-white">logout</button>
  </div>
</template>
