<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  const res = await fetch(`http://localhost:3000/users?name=${username.value}&password=${password.value}`)
  const data = await res.json()

  if (data.length > 0) {
    alert(`Welcome, ${data[0].name}!`)
    errorMessage.value = ''
    // You could also save user info to localStorage or pinia here
  } else {
    errorMessage.value = 'Invalid credentials'
  }
}
</script>
