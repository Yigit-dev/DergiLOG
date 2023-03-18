<script setup>
import { useAuthStore } from '@/stores'

const onSubmit = data => {
  const authStore = useAuthStore()
  const { login, password } = Object.fromEntries(new FormData(data.target))
  return authStore.login(login, password).catch(error => console.error(error))
}
</script>
<template>
  <div class="min-h-screen bg-black">
    <div class="flex flex-row flex-wrap items-center justify-center">
      <div class="basis-full lg:basis-1/2">
        <div class="flex items-center justify-center rounded-sm border-2 border-white lg:min-h-screen">
          <h1 class="text-center font-poiret text-4xl text-white sm:p-5 lg:text-8xl">DergiLOG</h1>
        </div>
      </div>
      <div class="basis-full sm:mt-20 lg:basis-1/2">
        <div class="flex flex-col items-center justify-center">
          <h2 class="mb-10 text-4xl text-white">Sign In</h2>
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
                Login
              </button>
              <NuxtLink to="/dashboard">dashobard</NuxtLink>
              <p class="mt-4 text-sm text-white">
                Don't have an account?
                <span class="cursor-pointer underline"><NuxtLink to="/signup">Create Account</NuxtLink></span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
