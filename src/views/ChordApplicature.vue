<template>
  <section class="container applicature">
    <h2 class="applicature-title">Chord Applicature</h2>

    <div class="applicature-root">
      <h4 class="applicature-root__title">Choose root:</h4>
      <div class="applicature-root__notes">
        <RootNote
          v-for="note in notes"
          @rootnote-update="rootUpdate"
          :note="note"
          :root="root"
        />
      </div>
    </div>

    <div class="applicature-type">
      <h4 class="applicature-type__title">Choose chord type:</h4>
      <div class="applicature-type__types">
        <button
          :class="['applicature-type__type', { 'active': currentChordType === chordType }]"
          v-for="chordType in chordTypes"
          @click="chordTypeUpdate(chordType)"
        >
          {{ chordType }}
        </button>
      </div>
    </div>
    <ui-canvas class="applicature-chord" instrument="piano" :scale="currentChordNotes" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import RootNote from '../components/RootNote.vue';
import UiCanvas from './../components/ui/UiCanvas.vue';
import Chord from '../js/helpers/Chord.js';

const DEFAULT_ROOT = 'C';
const DEFAULT_TYPE = 'major';
const chord = new Chord();
const chordTypes = chord.getPatterns();
const notes = ref(chord.getNotes());
const root = ref(DEFAULT_ROOT);
const currentChordType = ref(DEFAULT_TYPE);
const currentChordNotes = computed(() => {
  return chord.calcChord(`${root.value}${currentChordType.value}`);
})

const rootUpdate = (rootNote) => {
  root.value = rootNote;
}

const chordTypeUpdate = (type) => {
  currentChordType.value = type;
}

</script>

<style scoped lang="scss">
.applicature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  font-family: Nunito, sans-serif;
  color: #2f3640;
}

.applicature-title {
  text-align: center;
  margin: 0 auto 15px;
  font-size: 22px;
  display: block;
  grid-column: 1 / 3;
}

.applicature-root {
  grid-column: 1 / 2;

  &__title {
    text-align: center;
    margin-bottom: 10px;
  }

  &__notes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;

    button {
      width: 100%;
    }
  }
}

.applicature-type {
  grid-column: 2 / 3;
  display: flex;
  flex-direction: column;

  &__types {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    flex: 1;
  }

  &__title {
    text-align: center;
    margin-bottom: 10px;
  }

  &__type {
    width: 100%;
    height: 100%;
    color: #FFFFFF;
    background-color: #2F3640;
    border: 2px solid #2F3640;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    text-transform: capitalize;

    &.active {
      color: #2F3640;
      background-color: #FFFFFF;
      border: 2px solid #2F3640;
    }
  }
}

.applicature-chord {
  grid-column: 1 / 3;
}
</style>


