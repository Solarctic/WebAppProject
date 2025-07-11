<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { onMounted, reactive } from 'vue'
import { StoryManager } from '@/composables/story-manager'
import router from '@/router'

// Game State
const storyManager = new StoryManager(story)
let cheatCount = 0
let hasJade = false
let hasKey = false

// Background music change points
const musicMap = {
  'scene-0': '/Prologue.mp3',
  'scene-8': '/court.mp3',
  'scene-17': '/Suspense.mp3',
  'scene-35': '/Lobby.mp3',
}

// ToDo: Jump to?

const dialogueBoxProps = reactive({
  speakerName: 'Player',
  text: 'Test',
})
const choicesButtonsProps = reactive({
  choices: [],
})

// Get DOM elements references
let videoElement = null
let bgMusic = null
let cheatButton = null
// -- Special buttons --
let specialBtn1 = null
let specialBtn2 = null

// -- Cheat Button --
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

// Update scene function accessible everywhere
function updateScene() {
  const currentScene = storyManager.getCurrentEvent
  if (videoElement) {
    // ToDo: Console throwing errors about video
    videoElement.src = currentScene.video
    videoElement.currentTime = 0
    videoElement.play()
  }

  maybeUnlockCheat()

  // 🎵 切换背景音乐
  if (musicMap[currentScene.id]) {
    bgMusic.pause()
    bgMusic.src = musicMap[currentScene.id]
    bgMusic.currentTime = 0
    bgMusic.play()
  }

  // 🎯 evidence.mp4 获得两个特殊按钮
  if (currentScene.id === 'scene-34') {
    if (!hasJade) {
      specialBtn1.style.display = 'inline-block'
      hasJade = true
    }
    if (!hasKey) {
      specialBtn2.style.display = 'inline-block'
      hasKey = true
    }
  }

  dialogueBoxProps.speakerName = currentScene.speaker
  dialogueBoxProps.text = currentScene.text

  choicesButtonsProps.choices = currentScene.choices
}

// Handle choice selection
function handleChoice(index) {
  const currentScene = storyManager.getCurrentEvent
  if (index >= currentScene.responses.length) {
    return
  }

  choicesButtonsProps.choices = []
  dialogueBoxProps.speakerName = 'Player'
  dialogueBoxProps.text = currentScene.responses[index]

  setTimeout(() => {
    const event = storyManager.makeChoice(index)
    if (event) {
      updateScene()
    }
  }, 3500)
}

function handleVideoAdvanceClick() {
  const currentScene = storyManager.getCurrentEvent

  if (currentScene.choices.length == 0) {
    const event = storyManager.makeChoice(0)
    if (event) {
      updateScene()
    }
  }
}

onMounted(() => {
  videoElement = document.getElementById('video-container')
  bgMusic = document.getElementById('bg-music')
  cheatButton = document.getElementById('cheat-button')

  // -- speical buttons --
  specialBtn1 = document.createElement('button')
  specialBtn1.textContent = 'The Imperial Jade with blood'
  specialBtn1.className =
    'bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-bold ml-2'
  specialBtn1.style.display = 'none'

  specialBtn2 = document.createElement('button')
  specialBtn2.textContent = 'Testimony: Key'
  specialBtn2.className =
    'bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold ml-2'
  specialBtn2.style.display = 'none'

  cheatButton.after(specialBtn1, specialBtn2)

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

  if (bgMusic) {
    bgMusic.play()
  }

  updateScene()
})
</script>

<template>
  <div class="">
    <audio id="bg-music" src="court.mp3" loop></audio>

    <!-- Main Content -->
    <div class="flex flex-col mx-auto h-full">
      <!-- Header -->
      <header class="p-3.5 text-center border-b-4 border-b-rose-500">
        <h1 class="m-0 text-4xl text-white text-shadow-[3px_3px_0] text-shadow-rose-500">
          Text Adventure
        </h1>
      </header>

      <!-- The Main Layout -->
      <main class="flex-1 flex flex-col p-5 overflow-hidden">
        <VideoPlayer @advance="handleVideoAdvanceClick" />

        <!-- Cheat Button -->
        <div class="flex flex-row gap-4">
          <button
            id="menu-button"
            class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded text-black font-bold"
            @click="router.push('/menu')"
          >
            Menu
          </button>
          <!-- ToDo: Save Behaviour -->
          <button
            id="save-button"
            class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded text-black font-bold"
          >
            Save
          </button>

          <button
            id="cheat-button"
            class="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded text-black font-bold ml-auto"
            disabled
          >
            😈 Cheat (0)
          </button>
        </div>

        <DialogueBox v-bind="dialogueBoxProps" />

        <ChoicesBox class="mt-4" v-bind="choicesButtonsProps" @choiceSelected="handleChoice" />
      </main>
    </div>
  </div>
</template>
