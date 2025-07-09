<script setup>
import { ref, provide } from 'vue'
import MainMenu from './views/MainMenu.vue'
import GameScene from './views/GameScene.vue'
import LoginForm from './views/LoginScene.vue'

// List of Scene
const views = {
  MainMenu,
  GameScene,
  LoginForm
}

// Hold the scene variable
const currentView = ref(views.LoginForm)

// Switch the Scene
function switchTo(viewName) {
  if (views[viewName]) {
    currentView.value = views[viewName]
  } else {
    console.error('Unknown view:', viewName)
  }
}

provide('switchTo', switchTo)
</script>

<!-- Allows us to switch the view without pinging the backend server -->
<template>
  <div class="flex flex-col h-screen bg-indigo-600 text-white">
    <component :is="currentView" class="flex-1 overflow-auto" />

    <footer class="p-[10px] text-center border-t-4 border-t-rose-500 text-sm">
      © 2025 Text Adventure
    </footer>
  </div>
</template>