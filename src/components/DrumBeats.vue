<template>
  <div :class="['beats', { 'active': isActive }]">
    <div class="beats-line" :style="animationDuration"></div>
    <div class="track" v-for="(track, trackName) in beatMatrix">
      <div :class="['beat', { 'active': beat }]" v-for="(beat, index) in track" @click="beatUpdate([trackName, index])"></div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  beatMatrix: Object,
  animationDuration: Number,
  isActive: Boolean,
})

const emits = defineEmits(['beat-updated']);

const animationDuration = computed(() => {
  return { 'animation-duration': `${props.animationDuration}ms` }
})

const beatUpdate = (beat: [string, number]) => {
  emits('beat-updated', beat);
}
</script>

<style lang="scss">

.beats {
  margin-top: 20px;
  padding-top: 20px;
  position: relative;
  border-top: 2px solid #2F3640;

  &.active .beats-line {
    left: 0;
    top: 50%;
    animation-name: slide;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &-line {
    transform: translateY(-50%);
    position: absolute;
    left: 0;
    top: 50%;
    width: 7px;
    height: 100%;
    background-color: green;
    opacity: .6;
  }
}

.track {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.beat {
  height: 50px;
  background-color: #2F3640;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  &.active {
    background-color: #cf915c;
  }
}

@keyframes slide {
  from {
    left: 0;
    transform: translate(0, -50%);
  }

  to {
    left: 100%;
    transform: translate(-100%, -50%);
  }
}

</style>

