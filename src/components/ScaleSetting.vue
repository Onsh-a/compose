<template>
  <div class="select-root select-wrapper">
    <h2 class="select-root__title">Choose the root note:</h2>

    <div class="select-root__items">
      <RootNote
        v-for="note in notes()"
        :note="note"
        :class="{ active: note === scale.root }"
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

<script setup lang="ts">
import RootNote from './RootNote.vue';
import scaleInterface  from '../js/helpers/Scale';
import UiCustomSelect from './ui/UiCustomSelect.vue';
import { scales, scaleType } from '../js/data/scales';
import instruments from './../js/data/instruments';

const props = defineProps({
  scale: scaleInterface
})

const emit = defineEmits([
  'rootnote-update',
  'is-sharp-update',
  'scale-type-update',
  'instrument-update',
]);

const notes = () => {
  return props.scale ? props.scale.getNotes() : [];
}

const isSharpUpdate = (isSharp: boolean) => {
  emit('is-sharp-update', isSharp);
}

const scaleUpdated = (scaleType: scaleType) => {
  emit('scale-type-update', scaleType.value);
}

const instrumentUpdated = (instrument: string) => {
  emit('instrument-update', instrument);
}
</script>
