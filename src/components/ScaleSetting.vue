<template>
  <div class="select-root select-wrapper">
    <h2 class="select-root__title">Choose the root note:</h2>

    <div class="select-root__items">
      <RootNote
        v-for="note in notes()"
        :note="note"
        :root="scale.root"
        @rootnote-update="emit('rootnote-update', note)"
      />
    </div>

    <div class="select-root alter">
      <button
        :class="['select-root__alter', {'active': scale.isSharp}]"
        @click="isSharpUpdate(true)"
      >
        Sharp
      </button>
      <button
        :class="['select-root__alter', {'active': !scale.isSharp}]"
        @click="isSharpUpdate(false)"
      >
        Flat
      </button>
    </div>
  </div>

  <div class="settings">
    <ui-custom-select :options='scales' @select="scaleUpdated"/>
    <ui-custom-select :options='instruments' @select="instrumentUpdated"/>
  </div>

</template>

<script setup>
import RootNote from './RootNote';
import UiCustomSelect from './ui/UiCustomSelect.vue';
import scales from './../js/data/scales';
import instruments from './../js/data/instruments';

const props = defineProps({
  scale: Object
})

const emit = defineEmits([
  'rootnote-update',
  'is-sharp-update',
  'scale-type-update',
  'instrument-update',
]);

const notes = () => {
  return props.scale.getNotes();
}

const isSharpUpdate = (isSharp) => {
  emit('is-sharp-update', isSharp);
}

const scaleUpdated = (scaleType) => {
  emit('scale-type-update', scaleType.value);
}

const instrumentUpdated = (instrument) => {
  emit('instrument-update', instrument);
}
</script>
