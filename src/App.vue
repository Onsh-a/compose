<template>
  <Navigation/>
  <section class="container">
    <ScaleSetting
      :scale="scale"
      @rootnote-update="setRoot"
      @is-sharp-update="setIsSharp"
      @scale-type-update="setScaleType"
      @instrument-update="setInstrument"
    />
  </section>
  <section class="container">
    <ScaleTable :scale="scale.getScale()"/>
  </section>
  <section class="container">
    <ui-canvas
      :scale="scale.getScale()"
      :root="scale.root"
      :instrument="instrument"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from './components/Navigation';
import ScaleTable from './components/ScaleTable.vue'
import ScaleSetting from './components/ScaleSetting';
import Scale from './js/helpers/Scale';
import UiCanvas from './components/ui/UiCanvas.vue';

const DEFAULT_ROOT = 'C';
const DEFAULT_SCALE = 'major';
const DEFAULT_INSTRUMENT = 'guitar';

const scale = ref(new Scale(DEFAULT_ROOT, DEFAULT_SCALE));
const instrument = ref(DEFAULT_INSTRUMENT);
const setRoot = (root) => {
  scale.value.setRoot(root);
}
const setIsSharp = (isSharp) => {
  scale.value.setIsSharp(isSharp);
}
const setScaleType = (scaleType) => {
  scale.value.setScaleType(scaleType);
}

const setInstrument = (updatedInstrument) => {
  console.log(updatedInstrument.value);
  instrument.value = updatedInstrument.value;
}

</script>
