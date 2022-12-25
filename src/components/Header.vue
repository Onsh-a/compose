<template>
  <header>
    <div class="container">
      <Navigation />
      <h1 class="title">compose.io</h1>
    </div>
  </header>
</template>

<script setup>
import Navigation from './Navigation.vue';

</script>

<style lang="scss" scoped>
header {
  background-color: #2f3640;
  margin-bottom: 50px;
  height: 40px;
  z-index: 3;

  .container {
    display: flex;
    flex-direction: row;
    height: 100%;

    .title {
      color: #FFFFFF;
      font-family: 'Nunito', sans-serif;
      font-size: 22px;
      font-weight: 400;
      text-align: center;
      margin: 10px 0 10px auto;
    }
  }
}

</style>
