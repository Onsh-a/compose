<template>
  <div class="scale">
    <div class="scale__title">Current scale</div>
    <table class="scale__table">
      <tbody>
      <tr class="scale__steps">
        <td>Step:</td>
        <td v-for="(_, index) in scale">
          {{ romanize(index + 1) }}
        </td>
      </tr>
      <tr class="scale__notes">
        <td>Note:</td>
        <td v-for="note in scale">
          {{ note }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import romanize from './../js/helpers/romanizeNumbers';

defineProps({
  scale: Array,
})
</script>
