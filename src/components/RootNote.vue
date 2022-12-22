<template>
  <div :class="['select-root__item', { 'active': isRootNote() }]" @click="emit('rootnote-update', note)">
    {{ note.toUpperCase() }}
  </div>
</template>

<script setup>
const props = defineProps({
  note: String,
  root: String,
})

const emit = defineEmits(['rootnote-update']);
const isRootNote = () => {
  return props.note.toLowerCase() === props.root.toLowerCase();
}

</script>
