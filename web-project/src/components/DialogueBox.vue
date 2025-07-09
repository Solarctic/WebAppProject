<script setup>
import { watch, ref } from 'vue'

const props = defineProps({
  speakerName: String,
  text: String,
})

const displayText = ref('')
const show = ref(true)

let interval = null
const speed = 30

watch(
  () => props.text,
  (newText) => {
    clearInterval(interval)
    displayText.value = ''

    if (props.text === '') {
      show.value = false
    } else {
      show.value = true
      let i = 0

      interval = setInterval(() => {
        if (i < newText.length) {
          displayText.value += newText.charAt(i)
          i++
        } else {
          clearInterval(interval)
        }
      }, speed)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="show"
    id="dialogue-box"
    class="relative border-4 border-red-600 rounded-md p-5 mb-5 min-h-[150px]"
  >
    <div
      id="speaker-name"
      class="absolute -top-4 left-5 bg-red-600 text-white px-4 py-1 rounded-full font-bold"
    >
      {{ speakerName }}
    </div>
    <div id="dialogue-text" class="text-lg leading-relaxed whitespace-pre-wrap">
      {{ displayText }}
    </div>
  </div>
</template>
