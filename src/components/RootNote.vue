<template>
  <button :class="['select-root__item', { 'active': isRootNote() }]" @click="emit('rootnote-update', note)">
    {{ note.toUpperCase() }}
  </button>
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

<style lang="scss" scoped>
.select-root__item {
  width: calc((100% - 25px) / 6);
  height: 40px;
  background-color: #2f3640;
  border: 2px solid #2f3640;
  border-radius: 8px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: 2px solid #FFFFFF;
  }

  &.active {
    border: 2px solid #2f3640;
    background-color: #FFFFFF;
    color: #2f3640;
  }

  &:hover {
    cursor: pointer;
  }
}

</style>
