<script setup>
// Components
import VideoPlayer from '@/components/VideoPlayer.vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { onMounted, ref, reactive } from 'vue'

// Dialogue Box
const dialogueBoxProps = reactive({
  speakerName: "Player",
  text: "Test",
});

// Include the script
onMounted(() => {
// Get DOM elements
const videoElement = document.getElementById("video-container");
const bgMusic = document.getElementById("bg-music");
const choices = document.querySelectorAll(".choice-btn");

// Refs
let currentSceneIndex = ref(0);

// Update the scene with current story data
function updateScene() {
  // Get a index of the story
  const currentScene = story[currentSceneIndex.value];

  // Update video
  videoElement.src = currentScene.video;
  // Reset to zero
  videoElement.currentTime = 0;
  videoElement.play();

  // Update speaker and text
  dialogueBoxProps.speakerName = currentScene.speaker;
  dialogueBoxProps.text = currentScene.text;

  // Update choices
  choices.forEach((choice, index) => {
    if (index < currentScene.choices.length) {
      choice.textContent = currentScene.choices[index];
      choice.style.display = "block";
      choice.disabled = false;
    } else {
      // Hide it
      choice.style.display = "none";
    }
  });
}

// Start Function
function startGame() {
  bgMusic.play();

  // Hide all choices
  choices.forEach((choice) => {
    choice.style.display = "none";
  });

  updateScene();
}

// Handle choice selection
choices.forEach((choice, index) => {
  choice.addEventListener("click", () => {
    const currentScene = story[currentSceneIndex.value];
    if (index >= currentScene.responses.length) return;

    // Disable all choices during response
    choices.forEach((btn) => {
      btn.disabled = true;
    });

    // Dialogue
    dialogueBoxProps.speakerName = "Player";
    dialogueBoxProps.text = currentScene.responses[index];

    // ToDo: Use Dialogue's even callback to advance the story
    // Set a timer before move to next scene
    setTimeout(() => {
      if (currentSceneIndex.value < story.length - 1) {
        currentSceneIndex.value++;
        updateScene();
      }
    }, 3500);
  });
});

  startGame();
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
        <VideoPlayer></VideoPlayer>
        <DialogueBox v-bind="dialogueBoxProps"></DialogueBox>

        <ChoicesBox></ChoicesBox>
      </main>
    </div>
  </div>
</template>
