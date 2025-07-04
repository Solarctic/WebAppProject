<script setup>
// Components
import VideoPlayer from '@/components/VideoPlayer.vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'
import { story } from '@/stores/story-data'
import { onMounted, ref, useTemplateRef } from 'vue'

// Include the script
onMounted(() => {
// Get DOM elements
const storyElement = document.getElementById("dialogue-text");
const videoElement = document.getElementById("video-container");
const bgMusic = document.getElementById("bg-music");
const choices = document.querySelectorAll(".choice-btn");
const speakerName = document.getElementById("speaker-name");

// Refs
let currentSceneIndex = ref(0);
let typewriterInterval;

// Clear typewriter effect
function clearTypewriter() {
  if (typewriterInterval) {
    clearInterval(typewriterInterval);
  }
}
// Typewriter effect for dialogue
function typeText(text, speed = 30) {
  clearTypewriter();
  storyElement.textContent = "";

  let i = 0;
  typewriterInterval = setInterval(() => {
    if (i < text.length) {
      storyElement.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typewriterInterval);
    }
  }, speed);
}

// Update the scene with current story data
function updateScene() {
  // Get a index of the story
  const currentScene = story[currentSceneIndex.value];

  // Update video
  // ToDo: Move to start game button or soemthing due to autoplay is disabled for first scene
  videoElement.src = currentScene.video;
  // Reset to zero
  videoElement.currentTime = 0;
  videoElement.play();

  // Update speaker and text
  speakerName.textContent = currentScene.speaker;
  typeText(currentScene.text);

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

    // Dialogue typing
    clearTypewriter();
    typeText(currentScene.responses[index]);
    speakerName.textContent = "Player";

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
        <DialogueBox></DialogueBox>

        <ChoicesBox></ChoicesBox>
      </main>
    </div>
  </div>
</template>
