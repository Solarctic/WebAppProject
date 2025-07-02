<script setup>
// Components
import VideoPlayer from '@/components/VideoPlayer.vue'
import DialogueBox from '@/components/DialogueBox.vue'
import ChoicesBox from '@/components/ChoicesBox.vue'

import { onMounted } from 'vue'

// Include the script
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'app.js'
  document.body.appendChild(script)
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
