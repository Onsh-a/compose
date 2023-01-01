<template>
  <div class="option" @click="$emit('option-selected', option)">
    <input type="radio" class="radio" :id="option.value ? option.value : option" name="category"/>
    <label :for="option.value ? option.value : option">{{ option.name ? option.name : option }}</label>
  </div>
</template>

<script setup>
defineProps({
  option: Object | String | Number,
});

defineEmits([
  'option-selected'
]);
</script>

<style lang="scss">
.option {
  padding: 10px 15px;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background-color: #FFFFFF;
    color: #2f3640;
  }

  label {
    cursor: pointer;
  }

  .radio {
    display: none;
  }
}

</style>

