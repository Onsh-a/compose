<template>
  <div :class="['nav', {'active': isMenuActive}]">
    <div class="burger" @click="toggleBurger">
      <div class="burger-line"></div>
      <div class="burger-line"></div>
      <div class="burger-line"></div>
    </div>
    <ul class="nav-menu">
      <li class="nav-menu__item">
        Main
      </li>
      <li class="nav-menu__item">
        Chord Applicatures
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuActive = ref(false);

const toggleBurger = () => {
  isMenuActive.value = !isMenuActive.value;
}

</script>

<style lang="scss" scoped>

.nav {
  height: calc(100% - 10px);
  margin: 5px;
  width: 30px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;

  .burger {
    width: 100%;
    height: 100%;
    position: relative;

    &-line {
      width: 65%;
      height: 3px;
      background-color: #2f3640;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: .2s;
      border-radius: 8px;

      &:nth-child(1) {
        top: calc(50% - 6px);
      }

      &:nth-child(3) {
        top: calc(50% + 6px);
      }
    }
  }

  &-menu {
    position: absolute;
    left: 0;
    list-style-type: none;
    display: none;
    top: calc(100% + 5px);
    background-color: #2f3640;
    color: #FFFFFF;
    min-width: 180px;
    box-shadow: 1px 4px 21px 0 rgb(0 0 0 / 85%);
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    z-index: 2;

    &__item {
      cursor: pointer;
      padding: 10px;
      transition: .2s;

      &:hover {
        background-color: #FFFFFF;
        color: #2f3640;
      }
    }
  }

  &.active {
    .nav-menu {
      display: block;
    }

    .burger {
      &-line {
        width: 80%;

        &:nth-child(2) {
          display: none;
        }

        &:nth-child(1) {
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &:nth-child(3) {
          top: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
  }
}
</style>
