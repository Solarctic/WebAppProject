import './assets/tailwind.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// I don't think we really need this
// app.use(createPinia())
app.use(router)

app.mount('#app')
