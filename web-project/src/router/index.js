import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginScene.vue'
import MainMenu from '../views/MainMenu.vue'
import GameScene from '../views/GameScene.vue'

const routes = [
  { path: '/', component: LoginForm },
  { path: '/menu', component: MainMenu },
  { path: '/game', component: GameScene }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

