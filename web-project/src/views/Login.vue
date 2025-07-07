<template>
  <div class="flex flex-col items-center justify-center h-full relative">
    <!-- 🔔 Notification Popup -->
    <transition name="fade">
      <div
        v-if="notification"
        class="absolute top-6 bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50"
      >
        {{ notification }}
      </div>
    </transition>

    <!-- 🔐 Login Form -->
    <h1 class="text-6xl font-extrabold text-center drop-shadow-lg absolute top-24">Login</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-64 mt-32">
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
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const switchTo = inject('switchTo')

const username = ref('')
const password = ref('')
const notification = ref('')

// Show temporary popup
const showNotification = (message, duration = 2000) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, duration)
}

const handleLogin = async () => {
  if (!username.value || !password.value) {
    showNotification('Please enter both username and password')
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/users?name=${username.value}&password=${password.value}`)
    const data = await res.json()

    if (data.length > 0) {
      showNotification(`Welcome, ${data[0].name}!`)
      setTimeout(() => {
        switchTo('MainMenu')
      }, 1500)
    } else {
      showNotification('Invalid username or password')
    }
  } catch (err) {
    showNotification('Server error')
    console.error(err)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
