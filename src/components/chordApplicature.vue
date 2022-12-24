<template>
  <div class="chord-app">
    <h3 class="chord-app__label">Enter the chord:</h3>
    <input class="chord-app__input" type="text" v-model="chord">
    <div class="chord-app__error"></div>
  </div>
  <ui-canvas />
</template>

<script setup>
import { ref } from 'vue';
import UiCanvas from './ui/UiCanvas.vue';

const chord = ref('');

</script>

<style lang="scss">

.chord-app {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &__label {
    color: #2f3640;
    margin-right: 15px;
  }

  &__input {
    border-radius: 8px;
    padding: 10px;
  }
}
</style>
