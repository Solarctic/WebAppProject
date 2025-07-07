<script setup>
// props data
const props = defineProps({
  text: String,
  index: Number,
})
// emits system
const emit = defineEmits(['onClicked']);

function handleClick() {
  emit('onClicked', props.index)
}
</script>

<template>
  <button
    @click="handleClick"
    class="border-3 border-red-600 text-white px-4 py-3 text-lg cursor-pointer transition-all duration-300 hover:bg-red-600 hover:-translate-y-1"
  >
    {{ props.text }}
  </button>
</template>
