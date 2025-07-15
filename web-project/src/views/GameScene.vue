<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { StoryManager } from '@/composables/story-manager'
import router from '@/router'

import { saveState, saveData } from '@/composables/save-manager'

// Variables
const notification = ref('')
// DOM elements
let videoElement = null
let bgMusic = null
let cheatButton = null
// Props
const dialogueBoxProps = reactive({ speakerName: 'Player', text: 'Test' })
const choicesButtonsProps = reactive({ choices: [] })
// Story Manager (for controlling events)
const storyManager = new StoryManager(story)
// If saveData exists then load the scene
if (saveData.sceneID) storyManager.jumpTo(saveData.sceneID)
// Music
const musicMap = {
  'scene-0': '/Prologue.mp3',
  'scene-8': '/court.mp3',
  'scene-17': '/investigation.mp3',
  'scene-35': '/Lobby.mp3',
  'scene-42': '/logic.mp3',
  'scene-56': '/exam.mp3',
  'scene-77': '/zhansha.mp3',
  'scene-106': '/tellthetruth.mp3',
}

// Notification fn
const showNotification = (text, duration = 2000) => {
  notification.value = text
  setTimeout(() => {
    notification.value = ''
  }, duration)
}

// Get a music fn
const findClosestMusic = (sceneId) => {
  const num = parseInt(sceneId.replace('scene-', ''))
  for (let i = num; i >= 0; i--) {
    const key = `scene-${i}`
    if (key in musicMap) return musicMap[key]
  }
  return null
}

// May unlock the cheat button
function maybeUnlockCheat() {
  const currentScene = storyManager.getCurrentEvent
  if (currentScene.id === 'scene-7') {
    saveData.cheatCount++
  }
}

// Main function
function updateScene() {
  const currentScene = storyManager.getCurrentEvent
  // Load the video
  if (videoElement) {
    videoElement.src = currentScene.video
    videoElement.currentTime = 0
    videoElement.play()
  }

  // Check if you may get cheat button
  maybeUnlockCheat()

  // Load Music
  const music = findClosestMusic(currentScene.id)
  const absPath = music ? location.origin + music : null

  // Play Music
  if (music === null) {
    bgMusic.pause()
    bgMusic.removeAttribute('src')
    bgMusic.load()
  } else if (absPath && bgMusic.src !== absPath) {
    bgMusic.pause()
    bgMusic.src = music
    bgMusic.currentTime = 0
    bgMusic.play()
  }

  // 经过 scene-34 后永久显示文本
  if (!saveData.hasJade && currentScene.id === 'scene-34') {
    saveData.hasJade = true
    saveData.hasKey = true
  }

  // Set the props
  dialogueBoxProps.speakerName = currentScene.speaker
  dialogueBoxProps.text = currentScene.text
  choicesButtonsProps.choices = currentScene.choices
}

// Each button has their own binding choice
function handleChoice(index) {
  // Get the current event
  const currentScene = storyManager.getCurrentEvent
  if (index >= currentScene.choices.length) return

  // Clear choices and set the dialogue props
  choicesButtonsProps.choices = []
  dialogueBoxProps.speakerName = 'Player'
  dialogueBoxProps.text =
    currentScene.responses && currentScene.responses[index] !== undefined
      ? currentScene.responses[index]
      : ''

  // Move to next scene once 3 secs ends
  setTimeout(() => {
    const event = storyManager.makeChoice(index)
    if (event) updateScene()
  }, 3000)
}

// Allows you to advance the video
function onVideoClick() {
  if (!videoElement) return
  const currentScene = storyManager.getCurrentEvent
  const nearEnd = videoElement.currentTime >= videoElement.duration - 0.1

  if (currentScene.id === 'scene-76') {
    if (!nearEnd) {
      videoElement.currentTime = videoElement.duration - 0.05
      videoElement.pause()
    }
    return
  }

  if (!nearEnd) {
    videoElement.currentTime = videoElement.duration - 0.05
    videoElement.pause()
  } else {
    if (currentScene.choices.length > 0) return
    const event = storyManager.makeChoice(0)
    if (event) updateScene()
  }
}

// Startup
onMounted(() => {
  // Get the DOM elements
  videoElement = document.getElementById('video-container')
  bgMusic = document.getElementById('bg-music')
  cheatButton = document.getElementById('cheat-button')
  videoElement.addEventListener('click', onVideoClick)

  // Add the event listener for the cheat button
  cheatButton.addEventListener('click', () => {
    if (saveData.cheatCount <= 0) return
    saveData.cheatCount--
    setTimeout(() => {
      const currentScene = storyManager.getCurrentEvent
      if (currentScene.id === 'scene-6') {
        storyManager.jumpTo('scene-8')
      } else {
        storyManager.skipThisEvent()
      }
      updateScene()
    }, 1000)
  })

  updateScene()
})

// Unload the page
onBeforeUnmount(() => {
  if (videoElement) videoElement.removeEventListener('click', onVideoClick)
})

// Save the game
async function handleSaveClick() {
  try {
    saveData.sceneID = storyManager.currentId

    if (await saveState()) {
      showNotification('Game has been saved')
    } else {
      showNotification('Failed to save game')
    }
  } catch (error) {
    console.error(error)
    showNotification('Error saving game')
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
  <div>
    <audio id="bg-music" loop></audio>
    <div class="flex flex-col mx-auto h-full">
      <!-- Notification -->
      <transition name="fade">
        <div
          v-if="notification"
          class="fixed top-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50"
        >
          {{ notification }}
        </div>
      </transition>
      <!-- Title -->
      <header class="p-3.5 text-center border-b-4 border-b-rose-500">
        <h1 class="m-0 text-4xl text-white text-shadow-[3px_3px_0] text-shadow-rose-500">
          Text Adventure
        </h1>
      </header>
      <!-- Main Layout -->
      <main class="flex-1 flex flex-col p-5 overflow-hidden items-center">
        <video
          id="video-container"
          class="w-fit p-4 max-h-[50vh] rounded-md flex-1 bg-black cursor-pointer"
          playsinline
          preload="auto"
        ></video>
        <!-- Helper buttons -->
        <div class="flex flex-row gap-4 mt-4 w-full">
          <button
            id="menu-button"
            class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded text-black font-bold"
            @click="router.push('/menu')"
          >
            Menu
          </button>
          <button
            id="save-button"
            class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded text-black font-bold"
            @click="handleSaveClick"
          >
            Save
          </button>
          <button
            id="cheat-button"
            class="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-black font-bold ml-auto"
            :disabled="saveData.cheatCount <= 0"
          >
            {{ `😈 Cheat (${saveData.cheatCount})` }}
          </button>
        </div>

        <!-- 常驻文本区，只有触发过 scene-34 后显示 -->
        <div v-if="saveData.hasJade && saveData.hasKey" class="mt-2 flex gap-4 select-none">
          <span
            class="px-3 py-1 rounded font-bold text-white bg-green-600"
            style="user-select: none"
            >The Imperial Jade with blood: Only Li's fingerprint detected.</span
          >
          <span
            class="px-3 py-1 rounded font-bold text-white bg-yellow-600"
            style="user-select: none"
            >Key Record: Only Li and professor Huang has the key.</span
          >
        </div>

        <!-- Dialogue Box -->
        <DialogueBox v-bind="dialogueBoxProps" />
        <!-- ChoicesBox -->
        <ChoicesBox class="mt-4" v-bind="choicesButtonsProps" @choiceSelected="handleChoice" />
      </main>
    </div>
  </div>
</template>
