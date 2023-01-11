<template>
  <div
    :class="['hint', { active: isActive }]"
    @click.stop="toggleHint"
    ref="hint"
  >
    ?
    <div class="hint__bubble">
      {{ hintText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

defineProps({
  hintText: String
})

const hint: Ref<HTMLDivElement | null> = ref(null);
const isActive = ref(false);

const closeHint = (e:any) => {
  if (hint.value && !hint.value.contains(e.target)) {
    toggleHint();
  }
}

const toggleHint = () => {
  isActive.value = !isActive.value;
  if (!isActive.value) {
    document.removeEventListener('click', closeHint);
    return;
  }
  document.addEventListener('click', closeHint);
}

</script>

<style lang="scss">
.hint {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #2F3640;
  border: 1px solid #EFEFEF;
  color: #EFEFEF;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  position: relative;
  transition: .2s;

  &:hover {
    background-color: #717985;
  }

  &__bubble {
    display: none;
    position: absolute;
    left: 50%;
    top: calc(100% + 10px);
    transform: translateX(-50%);
    width: 150px;
    z-index: 10;
    background: #EFEFEF;
    border: 1px solid #2F3640;
    color: #2F3640;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 1px 4px 21px 0 rgb(0 0 0 / 85%);

    &::after {
      content: '';
      width: 12px;
      height: 12px;
      transform: translate(-50%, -50%) rotate(45deg);
      background: #EFEFEF;
      border-left: 1px solid #2F3640;
      border-top: 1px solid #2F3640;
      position: absolute;
      left: 50%;
      top: -1px;
    }
  }

  &.active {
    .hint__bubble {
      display: block;

    }
  }
}

</style>
