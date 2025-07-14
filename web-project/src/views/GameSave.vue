<script setup>
import { ref, computed } from 'vue'
import router from '@/router'
import { userData, saveData, saveState, loadState } from '@/composables/save-manager'
const statusMessage = ref('')

const hasSave = computed(() => saveData.sceneID != null)

async function saveGame() {
  if (!userData) {
    statusMessage.value = 'Not logged in.'
    showNotification(statusMessage.value)
    return
  }

  try {
    const result = await saveState()
    if (result.ok) {
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

function loadGame() {
  if (!userData) {
    statusMessage.value = 'Not logged in.'
    showNotification(statusMessage.value)
    return
  }

  try {
    return loadState()
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

function handleNewGameClick() {
  saveData.sceneID = 'scene-0'
  saveData.hasJade = false
  saveData.hasKey = false
  saveGame().then(() => router.push('/game'))
}

function handleLoadGameClick() {
  if (loadGame()) {
    if (saveData.sceneID !== '') {
      setTimeout(() => {
        router.push('/game')
      }, 1500)
    }
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

<template>
  <div class="flex items-center justify-center">
    <!-- Notification Popup -->
    <transition name="fade">
      <div
        v-if="message"
        class="absolute top-6 bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50"
      >
        {{ message }}
      </div>
    </transition>
    <h1 class="text-6xl font-extrabold text-center drop-shadow-lg absolute top-24">Save File</h1>

    <div class="flex flex-col gap-12 w-72 items-center">
      <button
        type="button"
        @click="handleNewGameClick"
        class="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md w-full"
      >
        New Game
      </button>

      <button
        @click="handleLoadGameClick"
        class="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-rose-400"
        :disabled="!hasSave"
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
