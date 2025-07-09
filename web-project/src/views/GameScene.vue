<script setup>
import VideoPlayer from '@/components/VideoPlayer.vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { onMounted, reactive } from 'vue'
import { StoryManager } from '@/composables/story-manager'

const storyManager = new StoryManager(story)

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

// Update scene function accessible everywhere
function updateScene() {
  const currentScene = storyManager.getCurrentEvent
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
        <VideoPlayer @advance="handleVideoAdvanceClick" />
        <DialogueBox v-bind="dialogueBoxProps" />
        <ChoicesBox v-bind="choicesButtonsProps" @choiceSelected="handleChoice" />
      </main>
    </div>
  </div>
</template>
