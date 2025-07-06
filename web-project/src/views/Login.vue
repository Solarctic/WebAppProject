<template>
  <div class="flex flex-col items-center justify-center h-full bg- bg-opacity-80">
    <h1 class="text-6xl font-extrabold text-center drop-shadow-lg absolute top-24">Login</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-64">
      <input
        v-model="username"
        placeholder="Username"
        class="px-4 py-2 rounded text-black bg-white"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="px-4 py-2 rounded text-black bg-white"
      />
      <button
        type="submit"
        class="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded text-white"
      >
        Login
      </button>
      <p v-if="errorMessage" class="text-red-400 text-sm text-center">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const switchTo = inject('switchTo')
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  const res = await fetch(`http://localhost:3000/users?name=${username.value}&password=${password.value}`)
  const data = await res.json()

  if (data.length > 0) {
    errorMessage.value = ''
    switchTo('MainMenu') // ✅ go to MainMenu after login
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>
