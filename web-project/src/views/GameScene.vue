<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { onMounted, ref, reactive } from 'vue'

const currentSceneIndex = ref(0)
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

// Update scene function accessible everywhere
function updateScene() {
  const currentScene = story[currentSceneIndex.value]
  if (videoElement) {
    videoElement.src = currentScene.video
    videoElement.currentTime = 0
    videoElement.play()
  }

  dialogueBoxProps.speakerName = currentScene.speaker
  dialogueBoxProps.text = currentScene.text

  choicesButtonsProps.choices = currentScene.choices
}

// Handle choice selection
function handleChoice(index) {
  const currentScene = story[currentSceneIndex.value]
  if (index >= currentScene.responses.length) {
    return
  }

  choicesButtonsProps.choices = []
  dialogueBoxProps.speakerName = 'Player'
  dialogueBoxProps.text = currentScene.responses[index]

  setTimeout(() => {
    if (currentSceneIndex.value < story.length - 1) {
      currentSceneIndex.value++
      updateScene()
    }
  }, 3500)
}

onMounted(() => {
  videoElement = document.getElementById('video-container')
  bgMusic = document.getElementById('bg-music')

  if (bgMusic) {
    bgMusic.play()
  }

  updateScene()
})
</script>

<template>
  <div class="">
    <audio id="bg-music" src="court.mp3" loop></audio>

    <!-- Overlay Here? -->
    <!-- ToDo: Save/Load Function, Go to Main Menu, Or Sign out -->

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
        <VideoPlayer />
        <DialogueBox v-bind="dialogueBoxProps"></DialogueBox>
        <ChoicesBox v-bind="choicesButtonsProps" @choiceSelected="handleChoice" />
      </main>
    </div>
  </div>
</template>
