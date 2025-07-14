import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginScene.vue'
import MainMenu from '@/views/MainMenu.vue'
import GameScene from '@/views/GameScene.vue'
import GameSave from '@/views/GameSave.vue'

// Simple Auth System
function authGuard() {
  if (sessionStorage.getItem('authToken')) {
    return true
  }

  return { path: '/' }
}

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/menu',
      component: MainMenu,
      beforeEnter: authGuard,
    },
    {
      path: '/game',
      component: GameScene,
      beforeEnter: [
        authGuard,
        (to, from) => {
          if (from.path === '/save') {
            return true
          }

          return { path: '/menu' }
        },
      ],
    },
    {
      path: '/',
      component: LoginForm,
    },
    {
      path: '/save',
      component: GameSave,
      beforeEnter: [
        authGuard,
        (to, from) => {
          if (from.path === '/menu') {
            return true
          }

          return { path: '/menu' }
        },
      ],
    },
  ],
})
