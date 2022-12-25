<template>
  <div class="scale">
    <h2 class="scale__title">Current scale:</h2>
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

<style lang="scss" scoped>
.scale {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px auto 10px;
  color: #FFFFFF;
  width: 100%;

  &__title {
    font-weight: 400;
    text-align: left;
    margin-bottom: 10px;
    color: #2f3640;
  }

  .scale__table {
    border-collapse: separate;
    border-radius: 8px;
    border: 2px solid #d3d3d3;
    background-color: #2f3640;
    border-spacing: 0;
    width: 100%;

    tr:first-child td {
      border-bottom: 2px solid #d3d3d3;
    }

    &.pentatonic tr td:nth-last-of-type(-n+2) {
      display: none;
    }
  }

  td {
    width: calc(100% / 8);
    padding: 10px 0;
    text-align: center;

    &:not(:last-child) {
      border-right: 2px solid #d3d3d3;
    }
  }
}
</style>
