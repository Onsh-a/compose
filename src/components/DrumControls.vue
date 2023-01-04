<template>
  <div class="drum-controls">
    <label for="bpm">BPM</label>
    <input
      type="number"
      id="bpm"
      class="drum-controls__bpm"
      :value="bpm"
      @input="$emit('update:bpm', $event.target.value)"
    >
    <label for="beats">beats</label>
    <input
      type="number"
      id="beats"
      class="drum-controls__beats"
      :value="beats"
      @input="$emit('update:beats', $event.target.value)"
    >
    <button @click="play" class="drum-controls__button">play</button>
    <button @click="stop" class="drum-controls__button">stop</button>
  </div>
</template>
<script setup lang="ts">
defineProps({
  beats: Number,
  bpm: Number,
})
const emit = defineEmits(['play-pressed', 'stop-pressed', 'update:bpm']);
const play = () => emit('play-pressed');
const stop = () => emit('stop-pressed');
</script>
<style lang="scss">

.drum-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  &__bpm,
  &__beats {
    height: 40px;
    padding: 0 8px;
    border-radius: 8px;
    border: 2px solid #2f3640;
  }

  label[for=bpm] {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  &__bpm {
    grid-row: 2/3;
    grid-column: 1/2;
  }

  label[for=beats] {
    grid-row: 1/2;
    grid-column: 2/3;
  }

  &__beats {
    grid-row: 2/3;
    grid-column: 2/3;
  }

  &__button {
    height: 40px;
    color: #EFEFEF;
    background-color: #2f3640;
    border: 2px solid #2f3640;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    transition: .2s;

    &:hover {
      color: #2f3640;
      background-color: #EFEFEF;
    }
  }
}

</style>
