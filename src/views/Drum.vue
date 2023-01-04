<template>
  <div class="container">
    <h2 class="title">Drum Machine</h2>
    <DrumControls
      v-model:bpm.number.lazy="bpm"
      v-model:beats.number.lazy="beats"
      @play-pressed="play"
      @stop-pressed="stop"
    />
    <DrumBeats
      :beatMatrix="beatMatrix"
      :animationDuration="timeToComplete"
      :isActive="isActive"
      @beat-updated="updateBeat"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import DrumControls from '../components/DrumControls.vue';
import DrumBeats from '../components/DrumBeats.vue';

const snare = new Audio('/sounds/snare.wav');
const kick = new Audio('/sounds/kick.wav');
const otherSound = new Audio('/sounds/kick.wav');

const sounds: { [index: string]: HTMLAudioElement } = {
  'track1': snare,
  'track2': kick,
  'track3': otherSound,
}

const isActive = ref(false);

const bpm = ref(100);
const beats = ref(4);
const beatMatrix: Ref<{ [index: string]: boolean[] }> = ref( {
  'track1': [false, false, false, false],
  'track2': [false, false, false, false],
  'track3': [false, false, false, false],
})

let interval1: ReturnType<typeof setInterval>;

const getIntervalByBpm = (bpm: number, bar: number = 4) => {
  const minute = 60000;
  return minute / bpm;
}

const updateBeat = (update: [string, number]): void => {
  const [trackName, beatIndex] = update;
  beatMatrix.value[trackName][beatIndex] = !beatMatrix.value[trackName][beatIndex];
}

const timeToComplete = computed(() => {
  return beats.value * getIntervalByBpm(bpm.value);
})

let currentBeat = 0;
const play = () => {
  isActive.value = true;
  interval1 = setInterval(() => {
    for (const track in beatMatrix.value) {
      if (beatMatrix.value[track][currentBeat]) {
        sounds[track].play();
      }
    }
    currentBeat++;
    if (currentBeat === 4) {
      console.log('renewed');
      currentBeat = 0;
    }
  }, getIntervalByBpm(bpm.value))
}

const stop = () => {
  isActive.value = false;
  currentBeat = 0;
  clearInterval(interval1);
}

</script>
<style scoped lang="scss">

.title {
  text-align: left;
  margin: 0 0 20px 0;
}

</style>
