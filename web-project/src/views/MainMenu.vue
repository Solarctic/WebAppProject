<script setup>
import { inject } from 'vue'
const switchTo = inject('switchTo')

function startOrContinue() {
  switchTo('GameScene')
}

function showLogin()  {
  switchTo('LoginForm')
}

</script>



<template>
  <div class="flex flex-col items-center justify-center gap-10 p-6">
    <h1 class="text-6xl font-extrabold text-center drop-shadow-lg absolute top-24">
      Text Adventure Game
    </h1>

    <div class="flex flex-col gap-12 w-72">
      <button
        @click="startOrContinue"
        class="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md"
      >
        Start & Continue
      </button>
      <button
        class="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md"
      >
        Load Save File
      </button>
      <button
        @click="showLogin"
        class="bg-rose-500 hover:bg-rose-600 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md"
      >
        Login/Signup
      </button>
    </div>
  </div>
</template>
