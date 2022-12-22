<template>
  <canvas
    class='canvas scale-canvas'
    ref="canvas"
    height="280"
    width='800'>
  </canvas>
</template>

<script setup>
import Guitar from '../../js/helpers/Guitar.js';
import Keyboard from '../../js/helpers/Keyboard.js';
import { getCurrentInstance, onMounted, watch } from 'vue';

const props = defineProps({
  scale: Array,
  instrument: String,
})

let guitar;
let keyboard;

const render = () => {
  switch (props.instrument) {
    case ('piano'):
      keyboard.renderKeyboard(props.scale);
      break;
    case ('guitar'):
      guitar.renderGuitar(props.scale);
      break;
  }
}

onMounted(() => {
  const canvas = getCurrentInstance().refs.canvas;
  guitar = new Guitar(canvas);
  keyboard = new Keyboard(canvas);
  render();
})

watch(() => props.scale, () => {
  if (!guitar || !keyboard) return;
  render();
}, {
  deep: true,
});

</script>
