<template>
  <div class="container">
    <div class="tuner-settings">
      <h4 class="tuner-settings__title">Choose tuning:</h4>
      <ui-custom-select
        class="tuner-settings__tuning"
        :value="activeTuning"
        :options='tuningOptions'
        @select="activeTuningUpdate"
      />
      <button @click="turnMicOn" class="tuner-btn">Turn on the mic</button>
      <button @click="turnMicOff" class="tuner-btn">Turn off the mic</button>
    </div>
    <TunerElement
      :note="note"
      :frequency="freq"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue'
import UiCustomSelect from '../components/ui/UiCustomSelect.vue';
import TunerElement from '../components/TunerElement.vue';
import Tuner from './../js/helpers/Tuner';
import tunings from './../js/data/tunings';
// @ts-ignore
import ml5 from './../js/lib/ml5.min';

const tuningOptions = computed(() => {
  return Object.keys(tunings);
})

const activeTuning = ref(tuningOptions.value[0]);
const freq: Ref<number | null> = ref(null);
const note: Ref<string | null> = ref(null);
const activeTuningUpdate = (updatedTuning: string) => {
  tuner.setActiveTuning(updatedTuning);
  activeTuning.value = updatedTuning;
}

const tuner = new Tuner();
// const modelPath = '/model';
const modelPath = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let audioContext: AudioContext | null;
let stream: MediaStream | null;
let pitch: any;

const turnMicOn = async () => {
  audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  startPitch(stream, audioContext);
}

const startPitch = (stream: MediaStream, audioContext: AudioContext) => {
  pitch = ml5.pitchDetection(modelPath, audioContext , stream, modelLoaded);
}

const modelLoaded = () => {
  setInterval(getPitch, 400);
}

const getPitch = () => {
  pitch.getPitch((err: Event, frequency: number) => {
    if (!frequency) {
      freq.value = null;
      note.value = null;
      return;
    }
    freq.value = +frequency.toFixed(3);
    note.value = tuner.getStringByFrequency(freq.value);
  })
}

const turnMicOff = () => {
  if (!stream) return;
  stream.getAudioTracks().forEach(track => track.stop());
}

</script>
<style lang="scss">
.tuner-title {
  margin-bottom: 10px;
}

.tuner-btn {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 20px 0;
  border: none;
  line-height: 32px;
  cursor: pointer;
}

.tuner-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  &__title {
    grid-column: 1 / 3;
  }

  &__tuning {
    grid-column: 1 / 3;
    text-transform: capitalize;
  }
}
</style>
