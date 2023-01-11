<template>
  <canvas
    class='canvas scale-canvas'
    ref="canvas"
    height="280"
    width='800'>
  </canvas>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref, PropType } from 'vue';
import Guitar from '../../js/helpers/Guitar';
import Keyboard from '../../js/helpers/Keyboard';
import { onMounted, watch } from 'vue';

const props = defineProps({
  scale: Array as PropType<string[]>,
  instrument: String,
})

let guitar: Guitar | null;
let keyboard: Keyboard | null;

const render = () => {
  if (!props.scale) throw new Error('Failed to render due to scale absence');
  switch (props.instrument) {
    case ('piano'):
      if (!keyboard) return;
      keyboard.renderKeyboard(props.scale);
      break;
    case ('guitar'):
      if (!guitar) return;
      guitar.renderGuitar(props.scale);
      break;
  }
}

const canvas: Ref<HTMLCanvasElement | null> = ref(null);

onMounted(() => {
  if (!canvas.value) throw new Error('Canvas element is not available');
  guitar = new Guitar(canvas.value);
  keyboard = new Keyboard(canvas.value);
  render();
})

watch(() => props.scale, () => {
  if (!guitar || !keyboard) return;
  render();
}, {
  deep: true,
});

</script>
