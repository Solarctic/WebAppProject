<script setup>
import { ref } from 'vue';
import router from '@/router';

const statusMessage = ref('')

// Get current logged-in user from session
const userData = JSON.parse(sessionStorage.getItem('authToken') || '[]')[0]

const saveGame = async () => {
  if (!userData) {
    statusMessage.value = 'Not logged in.'
    showNotification(statusMessage.value)
    return
  }

  try {
    const updatedSave = "Your game progress here..." // Replace with real game state

    const res = await fetch(`http://localhost:3000/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ save: updatedSave }),
    })

    if (res.ok) {
      statusMessage.value = 'Game saved!'
      showNotification(statusMessage.value)
    } else {
      statusMessage.value = 'Failed to save game.'
      showNotification(statusMessage.value)
    }
  } catch (err) {
    console.error(err)
    statusMessage.value = 'Error saving game.'
    showNotification(statusMessage.value)
  }
}

const loadGame = async () => {
  if (!userData) {
    statusMessage.value = 'Not logged in.'
    showNotification(statusMessage.value)
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/users/${userData.id}`)
    const data = await res.json()
    
    statusMessage.value = `Loaded game: ${data.save || 'No save found.'}`
    showNotification(statusMessage.value)

    // You could emit or return this data to load it in your game engine
    return data.save
  } catch (err) {
    console.error(err)
    statusMessage.value = 'Error loading game.'
    showNotification(statusMessage.value)
  }
}

const message = ref('')
const showNotification = (text, duration = 2000) => {
  message.value = text
  setTimeout(() => {
    message.value = ''
  }, duration)
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
  <div class="flex items-center justify-center h-screen relative">
    <!-- Notification Popup -->
    <transition name="fade">
      <div
        v-if="message"
        class="absolute top-6 bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50"
      >
        {{ message }}
      </div>
    </transition>

    <h1 class="text-6xl font-extrabold text-center drop-shadow-lg absolute top-24">
      Save File
    </h1>

    <div class="flex flex-col gap-12 w-72 items-center">
      <button
        @click="router.push('/game')"
        class="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md w-full"
      >
        New Game
      </button>

      <button
        @click="loadGame"
        class="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md w-full"
      >
        Load Game
      </button>

      <button
        @click="router.push('/menu')"
        class="bg-gray-600 hover:bg-gray-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md w-full"
      >
        Back to Main Menu
      </button>
    </div>
  </div>
</template>


