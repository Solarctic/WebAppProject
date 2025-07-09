<script setup>
import router from '@/router'

const logout = () => {
  sessionStorage.removeItem('authToken') // or use clear() if needed
  router.push('/')
}

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-10 p-6">
    <h1 class="text-6xl font-extrabold text-center drop-shadow-lg absolute top-24">
      Text Adventure Game
    </h1>

    <div class="flex flex-col gap-12 w-72">
      <button
        @click="router.push('/game')"
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
        @click="logout"
        class="bg-gray-600 hover:bg-gray-700 transition-colors duration-300 rounded-lg py-4 text-xl font-semibold shadow-md"
      >
      Log Out
    </button>

    </div>
  </div>
</template>
