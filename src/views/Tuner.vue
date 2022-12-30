<template>
  <div class="container">
    <h2 class="tuner-title">Tuner:</h2>
    <button @click="turnMicOn" class="tuner-btn">Turn on the mic</button>
    <button @click="turnMicOff" class="tuner-btn">Turn off the mic</button>
    <div>Frequency: {{ freq ? `${freq} hz` : 'No pitch detected' }}</div>
    <div>Note: {{ note ? note : 'No note detected'}}</div>

    <div class="tuner">
      <div class="tuner-note">
        {{note ? `${note} - `: 'Not detected'}}
        {{ tunerTarget ? tunerTarget : '' }}
      </div>
      <div class="tuner-plate"></div>
      <div class="tuner-arrow" :style="{'transform': `rotate(${tunerArrowAngle}deg)`}"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import Tuner from './../js/helpers/Tuner';
import ml5 from './../js/lib/ml5.min';

const freq = ref(null);
const note = ref(null);
// const modelPath = '/model';
const modelPath = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
const tuner = new Tuner();

const tunerArrowAngle = computed(() => {
  if (!tunerTarget.value && !freq.value) {
    return 0;
  }
  let position;
  if (freq.value <= tunerTarget.value) {

    position = ((tunerTarget.value - freq.value) / freq.value) * 100 * -4
    return position <= -90 ? -90: position;
  }
  position = ((freq.value - tunerTarget.value) / freq.value) * 100 * 4;
  return position >= 90 ? 90: position;
});

const tunerTarget = computed(() => {
  return tuner.getFrequencyByNote(note.value);
});

let audioContext;
let stream;
let pitch;

const turnMicOn = async () => {
  audioContext = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  startPitch(stream, audioContext);
}

const startPitch = (stream, audioContext) => {
  pitch = ml5.pitchDetection(modelPath, audioContext , stream, modelLoaded);
}

const modelLoaded = () => {
  setInterval(getPitch, 1000);
}

const getPitch = () => {
  pitch.getPitch(function(err, frequency) {
    if (!frequency) {
      freq.value = null;
      note.value = null;
      return;
    }
    freq.value = frequency.toFixed(3);
    note.value = tuner.getStringByFrequency(freq.value);
  })
}

const turnMicOff = () => {
  stream.getAudioTracks().forEach(track => track.stop());
}

</script>
<style lang="scss">
.tuner-title {
  margin-bottom: 10px;
}

.tuner-btn {
  width: 200px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: none;
  line-height: 32px;
  cursor: pointer;
}

.tuner {
  background: antiquewhite;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 20px;

  &-note {
    display: block;
    margin: 5px auto 10px;
    text-align: center;
  }

  &-arrow {
    margin: 0 auto;
    width: 2px;
    flex: 1;
    transform-origin: bottom;
    background-color: #2f3640;
    transition: .1s;
  }
}
</style>
