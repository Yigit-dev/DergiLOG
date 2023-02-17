<script setup>
import { useAuthStore } from '@/stores'
function onSubmit(values) {
  const authStore = useAuthStore()
  const { login, password } = values
  return authStore.login(login, password).catch(error => console.error(error))
}
</script>
<template>
  <div class="min-h-screen bg-black">
    <div class="grid grid-cols-2">
      <div class="flex min-h-screen items-center justify-center rounded-sm border-2 border-white">
        <h1 class="text-center font-poiret text-8xl text-white">DergiLOG</h1>
      </div>
      <div class="flex flex-col items-center justify-center">
        <h2 class="mb-10 text-4xl text-white">Create Account</h2>
        <form @submit.prevent="onSubmit" class="space-y-5">
          <input
            name="login"
            type="text"
            placeholder="Username or email address"
            class="text-md w-full rounded-lg border bg-inherit py-3 px-4 text-white outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            class="text-md w-full rounded-lg border bg-inherit py-3 px-4 text-white outline-none"
          />
          <div class="mt-6 text-center">
            <button
              type="submit"
              class="w-48 rounded-lg border border-white bg-inherit py-3 font-semibold text-white transition duration-300 hover:border-black hover:bg-white hover:text-black"
            >
              Sign Up
            </button>
            <p class="mt-4 text-sm text-white">
              Already Have An Account?
              <span class="cursor-pointer underline"> <NuxtLink to="/login">Login</NuxtLink></span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      appAxios.post('/user/login', {
        username: 'yigitcakmak',
        email: 'yigitcakmakx@gmail.com',
        password: '123456',
      })
    },
  },
}
</script>
