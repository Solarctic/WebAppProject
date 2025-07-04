<script setup>
import ChoiceButton from './ChoiceButton.vue'

const emit = defineEmits(['choiceSelected']);
const props = defineProps({
  choices: Array
});

function onChoiceSelected(index) {
  emit('choiceSelected', index);
}
</script>

<template>
  <div id="choices-container" class="grid grid-cols-2 gap-4">
    <ChoiceButton
      v-for="(choice, index) in props.choices"
      :key="index"
      :text="choice"
      :index="index"
       @onClicked="onChoiceSelected"
    />
  </div>
</template>
