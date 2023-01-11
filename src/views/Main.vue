<template>
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
      :instrument="instrument"
    />
  </section>
</template>

 <script setup>
 import { ref, reactive } from 'vue';
 import ScaleTable from './../components/ScaleTable.vue'
 import ScaleSetting from './../components/ScaleSetting';
 import Scale from './../js/helpers/Scale';
 import UiCanvas from './../components/ui/UiCanvas.vue';

 const DEFAULT_ROOT = 'C';
 const DEFAULT_SCALE = 'major';
 const DEFAULT_INSTRUMENT = 'guitar';

 const scale = reactive(new Scale(DEFAULT_ROOT, DEFAULT_SCALE));
 const instrument = ref(DEFAULT_INSTRUMENT);
 const setRoot = (root) => {
   scale.setRoot(root);
 }
 const setIsSharp = (isSharp) => {
   scale.setIsSharp(isSharp);
 }
 const setScaleType = (scaleType) => {
   scale.setScaleType(scaleType);
 }
 const setInstrument = (updatedInstrument) => {
   instrument.value = updatedInstrument.value;
 }
</script>

