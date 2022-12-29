<template>
  <div class="container">
    <h2 class="tuner-title">Tuner:</h2>
    <button @click="turnMicOn" class="tuner-btn">Включить микрофон</button>
    <button @click="turnMicOff" class="tuner-btn">Выключить микрофон</button>
    <div>Frequency: {{ freq }} HZ</div>
    <div>Note: {{ note }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Tuner from './../js/helpers/Tuner';
import ml5 from './../js/lib/ml5.min';

const freq = ref('No pitch detected');
const note = ref('No note detected');
const modelPath = '/model'
const tuner = new Tuner();

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
  setInterval(getPitch, 500);
}

const getPitch = () => {
  pitch.getPitch(function(err, frequency) {
    if (!frequency) {
      freq.value = 'No pitch detected';
      note.value = 'No note detected';
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
<style>
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
</style>
