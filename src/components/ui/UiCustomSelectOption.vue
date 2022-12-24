<template>
  <div class="option" @click="$emit('option-selected', option)">
    <input type="radio" class="radio" :id="option.value" name="category"/>
    <label :for="option.value">{{ option.name }}</label>
  </div>
</template>

<script setup>
defineProps({
  option: Object,
});

defineEmits([
  'option-selected'
]);
</script>

<style lang="scss">
.option {
  padding: 10px 15px;
  cursor: pointer;

  label {
    cursor: pointer;
  }

  .radio {
    display: none;
  }
}

</style>

