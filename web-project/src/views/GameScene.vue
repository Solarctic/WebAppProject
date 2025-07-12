<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { StoryManager } from '@/composables/story-manager'
import router from '@/router'

const storyManager = new StoryManager(story)
let cheatCount = 0

<<<<<<< HEAD
// 改成响应式变量
const hasJade = ref(false)
const hasKey = ref(false)
=======
const notification = ref('')

const showNotification = (text, duration = 2000) => {
  notification.value = text
  setTimeout(() => {
    notification.value = ''
  }, duration)
}
>>>>>>> 0c834de9439ccabb1c4fb5f5cc9bc680371ab124

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

const findClosestMusic = (sceneId) => {
  const num = parseInt(sceneId.replace('scene-', ''))
  for (let i = num; i >= 0; i--) {
    const key = `scene-${i}`
    if (key in musicMap) return musicMap[key]
  }
  return null
}

const saveID = sessionStorage.getItem('save')
if (saveID) storyManager.jumpTo(saveID)

// 读取持久化的 hasJade 和 hasKey，刷新也能保持状态
const persistedHasJade = sessionStorage.getItem('hasJade')
const persistedHasKey = sessionStorage.getItem('hasKey')
if (persistedHasJade === 'true') hasJade.value = true
if (persistedHasKey === 'true') hasKey.value = true

const dialogueBoxProps = reactive({ speakerName: 'Player', text: 'Test' })
const choicesButtonsProps = reactive({ choices: [] })

let videoElement = null
let bgMusic = null
let cheatButton = null

function updateCheatButton() {
  cheatButton.textContent = `😈 Cheat (${cheatCount})`
  cheatButton.disabled = cheatCount <= 0
}

function maybeUnlockCheat() {
  const currentScene = storyManager.getCurrentEvent
  if (currentScene.id === 'scene-7') {
    cheatCount++
    updateCheatButton()
  }
}

function updateScene() {
  const currentScene = storyManager.getCurrentEvent
  if (videoElement) {
    videoElement.src = currentScene.video
    videoElement.currentTime = 0
    videoElement.play()
  }

  maybeUnlockCheat()

  const music = findClosestMusic(currentScene.id)
  const absPath = music ? location.origin + music : null

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
  if (!hasJade.value && currentScene.id === 'scene-34') {
    hasJade.value = true
    hasKey.value = true
    // 保存状态到 sessionStorage
    sessionStorage.setItem('hasJade', 'true')
    sessionStorage.setItem('hasKey', 'true')
  }

  dialogueBoxProps.speakerName = currentScene.speaker
  dialogueBoxProps.text = currentScene.text
  choicesButtonsProps.choices = currentScene.choices
}

function handleChoice(index) {
  const currentScene = storyManager.getCurrentEvent
  if (index >= currentScene.choices.length) return
  choicesButtonsProps.choices = []
  dialogueBoxProps.speakerName = 'Player'
  dialogueBoxProps.text =
    currentScene.responses && currentScene.responses[index] !== undefined
      ? currentScene.responses[index]
      : ''
  setTimeout(() => {
    const event = storyManager.makeChoice(index)
    if (event) updateScene()
  }, 3500)
}

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

onMounted(() => {
  videoElement = document.getElementById('video-container')
  bgMusic = document.getElementById('bg-music')
  cheatButton = document.getElementById('cheat-button')
  if (videoElement) videoElement.addEventListener('click', onVideoClick)

  cheatButton.addEventListener('click', () => {
    if (cheatCount <= 0) return
    cheatCount--
    updateCheatButton()
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

onBeforeUnmount(() => {
  if (videoElement) videoElement.removeEventListener('click', onVideoClick)
})

async function handleSaveClick() {
  const userData = JSON.parse(sessionStorage.getItem('authToken') || '[]')[0]
<<<<<<< HEAD
  await fetch(`http://localhost:3000/users/${userData.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ save: storyManager.currentId }),
  })
  sessionStorage.setItem('save', storyManager.currentId)
=======

  try {
    const res = await fetch(`http://localhost:3000/users/${userData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ save: storyManager.currentId }),
    })

    if (res.ok) {
      sessionStorage.setItem('save', storyManager.currentId)
      showNotification('Game has been saved')
    } else {
      showNotification('Failed to save game')
    }
  } catch (error) {
    console.error(error)
    showNotification('Error saving game')
  }
>>>>>>> 0c834de9439ccabb1c4fb5f5cc9bc680371ab124
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
<<<<<<< HEAD
  <div>
    <audio id="bg-music" loop></audio>
    <div class="flex flex-col mx-auto h-full">
=======
  <div class="">
    <audio id="bg-music" src="court.mp3" loop></audio>

    <div class="flex flex-col mx-auto h-full">

      <transition name="fade">
        <div v-if="notification"
          class="fixed top-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50">
          {{ notification }}
        </div>
      </transition>

    <!-- Main Content -->

      <!-- Header -->
>>>>>>> 0c834de9439ccabb1c4fb5f5cc9bc680371ab124
      <header class="p-3.5 text-center border-b-4 border-b-rose-500">
        <h1 class="m-0 text-4xl text-white text-shadow-[3px_3px_0] text-shadow-rose-500">
          Text Adventure
        </h1>
      </header>
      <main class="flex-1 flex flex-col p-5 overflow-hidden">
<<<<<<< HEAD
        <video
          id="video-container"
          class="w-full max-h-[50vh] rounded-md cursor-pointer"
          playsinline
          preload="auto"
        ></video>
        <div class="flex flex-row gap-4 mt-4">
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
            disabled
          >
=======
        <VideoPlayer @advance="handleVideoAdvanceClick" />



        <!-- Cheat Button -->
        <div class="flex flex-row gap-4">
          <button id="menu-button" class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded text-black font-bold"
            @click="router.push('/menu')">
            Menu
          </button>
          <!-- ToDo: Save Behaviour -->
          <button id="save-button" class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded text-black font-bold"
            @click="handleSaveClick">
            Save
          </button>

          <button id="cheat-button"
            class="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-black font-bold ml-auto" disabled>
>>>>>>> 0c834de9439ccabb1c4fb5f5cc9bc680371ab124
            😈 Cheat (0)
          </button>
        </div>

        <!-- 常驻文本区，只有触发过 scene-34 后显示 -->
        <div v-if="hasJade && hasKey" class="mt-2 flex gap-4 select-none">
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

        <DialogueBox v-bind="dialogueBoxProps" />
        <ChoicesBox class="mt-4" v-bind="choicesButtonsProps" @choiceSelected="handleChoice" />
      </main>
    </div>
  </div>
</template>
