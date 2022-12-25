<template>
  <div :class="['ui-select', {'active': isActive }]" ref="select">
    <div class="ui-select__selected" @click="toggleAcitve">
      {{ currentValue ? currentValue : options[0] }}
    </div>
    <div class="ui-select__options">
      <template v-for="option in options">
        <ui-custom-select-option :option="option" @option-selected="updateSelect" />
      </template>
    </div>
  </div>
</template>

<script setup>
import UiCustomSelectOption from './UiCustomSelectOption.vue';
import { ref } from 'vue';

const props = defineProps({
  options: Array,
  value: Object,
})

const emit = defineEmits(['select']);

const currentValue = ref(props.value ? props.value : props.options[0].name);
const isActive = ref(false);
const select = ref(null);

const closeSelect = (e) => {
  if (!select.value.contains(e.target)) {
    isActive.value = false;
  }
}

const toggleAcitve = () => {
  isActive.value = !isActive.value;
  if (!isActive.value) {
    document.removeEventListener('click', closeSelect);
    return;
  }
  document.addEventListener('click', closeSelect);
}

const updateSelect = (selected) => {
  isActive.value = false;
  currentValue.value = selected.name;
  emit('select', selected);
}

</script>

<style lang="scss">
.ui-select {
  border-radius: 8px;
  border: 0;
  position: relative;
  box-sizing: border-box;
  width: 100%;

  &.active {
    .ui-select__options {
      max-height: 240px;
      opacity: 1;
      overflow-y: scroll;
      outline: none;
      z-index: 1;
      box-shadow: 1px 4px 21px 0 rgb(0 0 0 / 85%);
    }

    .ui-select__selected {
      border-radius: 8px 8px 0 0;
    }
  }

  &__selected {
    background: #2f3640;
    border-radius: 8px;
    color: #f5f6fa;
    position: relative;
    padding: 10px 15px;
    cursor: pointer;
    order: 0;
    z-index: 2;

    &::after {
      content: '';
      background-image: url('/src/assets/images/arw.svg');
      background-size: contain;
      background-repeat: no-repeat;
      position: absolute;
      width: 20px;
      height: 20px;
      transform: translateY(-50%);
      right: 10px;
      top: 50%;
      transition: all 0.4s;
    }
  }

  &__options {
    box-sizing: border-box;
    background: #2f3640;
    color: #f5f6fa;
    max-height: 0;
    width: 100%;
    opacity: 0;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    order: 1;
    position: absolute;
    top: 100%;
  }
}
</style>

