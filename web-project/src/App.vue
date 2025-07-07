<template>
  <body class="m-0 p-0 h-screen w-screen bg-indigo-600 text-white">
    <audio id="bg-music" src="court.mp3" loop></audio>

    <div class="flex flex-col mx-auto h-full border-x-8 border-x-rose-500 relative">
      <header class="p-3.5 text-center border-b-4 border-b-rose-500">
        <h1 class="m-0 text-4xl text-white text-shadow-[3px_3px_0] text-shadow-rose-500">
          Text Adventure
        </h1>
      </header>

      <!-- Start screen overlay -->
      <div
        v-if="!gameStarted"
        class="absolute inset-0 z-50 bg-indigo-800 flex items-center justify-center"
      >
        <button
          @click="handleStartGame"
          class="bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded text-white text-2xl"
        >
          Start Game
        </button>
      </div>

      <!-- Main game content -->
      <main v-show="gameStarted" class="flex-1 flex flex-col p-5 overflow-hidden">
        <video
          id="video-container"
          class="flex-1 min-h-0 m-4 bg-black rounded-[15px] flex justify-center items-center"
        ></video>

        <div
          id="dialogue-box"
          class="relative border-4 border-red-600 rounded-md p-5 mb-5 min-h-[150px]"
        >
          <div
            id="speaker-name"
            class="absolute -top-4 left-5 bg-red-600 text-white px-4 py-1 rounded-full font-bold"
          >
            Phoenix Wright
          </div>
          <div id="dialogue-text" class="text-lg leading-relaxed"></div>
        </div>

        <div id="choices-container" class="grid grid-cols-2 gap-4">
          <button class="choice-btn"></button>
          <button class="choice-btn"></button>
          <button class="choice-btn"></button>
          <button class="choice-btn"></button>
        </div>
      </main>

      <footer class="p-[10px] text-center border-t-4 border-t-rose-500 text-sm">
        © 2025 Text Adventure
      </footer>
    </div>
  </body>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const gameStarted = ref(false)

// 点击按钮后调用，显示游戏界面并调用 app.js 的 startGame
function handleStartGame() {
  gameStarted.value = true
  nextTick(() => {
    if (window.startGame) {
      window.startGame()
    }
  })
}

// 加载外部脚本
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'app.js'
  document.body.appendChild(script)
})
</script>
