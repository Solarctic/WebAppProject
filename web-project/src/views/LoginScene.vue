<script setup>
import router from '@/router'
import { ref } from 'vue'

// For signup/login form
const username = ref('')
const password = ref('')

// Sign Up or Login in mode
const mode = ref('login')

// Notification
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
    const res = await fetch(
      `http://localhost:3000/users?name=${username.value}&password=${password.value}`,
    )
    const data = await res.json()

    if (data.length > 0) {
      sessionStorage.setItem('authToken', JSON.stringify(data))
      showNotification(`Welcome, ${data[0].name}!`)
      setTimeout(() => {
        router.push('/game')
      }, 1500)
    } else {
      showNotification('Invalid username or password')
    }
  } catch (err) {
    showNotification('Server error')
    console.error(err)
  }
}


// ToDo: Include the data to the session (ideally use token rather than entire info)
    // sessionStorage.setItem("authToken", JSON.stringify(data));
const handleSignup = async () => {
  if (!username.value || !password.value) {
    showNotification('Please enter both username and password')
    return
  }

  try {
    //Check if username already exists
    const checkRes = await fetch(
      `http://localhost:3000/users?name=${username.value}`
    )
    const existingUsers = await checkRes.json()

    if (existingUsers.length > 0) {
      showNotification('Username already taken')
      return
    }

    //Create new user
    const createRes = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username.value,
        password: password.value,
        save: "", //check
      }),
    })

    const newUser = await createRes.json()
    console.log("Created user:", newUser)

    //Store user in session (note: use a real token system in production)
    sessionStorage.setItem('authToken', JSON.stringify([newUser]))

    showNotification(`Welcome, ${newUser.name}!`)
    setTimeout(() => {
      router.push('/game')
    }, 1500)
  } catch (err) {
    showNotification('Server error')
    console.error(err)
  }
}


if (sessionStorage.getItem('authToken')) {
  router.push('/menu')
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

<template>
  <div class="flex flex-col items-center justify-center h-full relative">
    <!-- Notification Popup -->
    <transition name="fade">
      <div
        v-if="notification"
        class="absolute top-6 bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50"
      >
        {{ notification }}
      </div>
    </transition>

    <!-- Form -->
    <div class="flex flex-col justify-center items-center mx-auto">
      <form
        @submit.prevent="mode === 'login' ? handleLogin() : handleSignup()"
        class="flex flex-col gap-4 w-64"
      >
        <h1 class="text-4xl font-bold text-center mb-4">
          {{ mode === 'login' ? 'Login' : 'Sign up' }}
        </h1>
        <input
          v-model="username"
          placeholder="Username"
          class="px-4 py-2 rounded text-black bg-white"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="px-4 py-2 rounded text-black bg-white mb-5"
        />
        <button type="submit" class="bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded text-white">
          {{ mode === 'login' ? 'Login' : 'Sign up' }}
        </button>
      </form>

      <p class="mt-4 text-center">
        {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
        <span
          @click="mode = mode === 'login' ? 'signup' : 'login'"
          class="text-rose-600 font-medium cursor-pointer hover:underline"
        >
          {{ mode === 'login' ? 'Sign up' : 'Log in' }}
        </span>
      </p>
    </div>
  </div>
</template>
