<template>
  <section class="tuner">
    <div class="tuner-inner">
      <div class="tuner-note">
        {{note ? `${note} - `: 'Not detected'}}
        {{ tunerTarget ? tunerTarget : '' }}
      </div>
      <div class="tuner-arrow" :style="{'transform': `rotate(${tunerArrowAngle}deg)`}"></div>
      <div class="tuner__big-note">{{ note ? note : '' }}</div>
      <div class="tuner__big-freq">{{ frequency ? Math.round(frequency) : '' }}</div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Tuner from '../js/helpers/Tuner';
import { computed } from "vue";

const props = defineProps({
  note: String,
  frequency: Number,
})

const tuner = new Tuner();
const tunerArrowAngle = computed(() => {
  if (!tunerTarget.value || !props.frequency) return null;
  return tuner.getTunerArrowAngle(tunerTarget.value, props.frequency);
});

const tunerTarget = computed(() => {
  if (!props.note && !props.note) return null;
  return tuner.getFrequencyByNote(props.note);
});

</script>

<style lang="scss">
.tuner {
  background-color: #2f3640;
  border-radius: 8px;
  padding: 20px;

  &-inner {
    background: #EFEFEF;
    border-radius: 8px;
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
  }

  &-note {
    display: block;
    margin: 5px auto 10px;
    text-align: center;
  }

  &-arrow {
    margin: 0 auto 10px;
    width: 2px;
    flex: 1;
    transform-origin: bottom;
    background-color: #2f3640;
    transition: .1s;
  }

  &__big-note,
  &__big-freq {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: 9%;
    font-size: 102px;
    font-weight: 700;
    color: #2f3640;
    opacity: .4;
  }

  &__big-note {
    left: unset;
    right: 9%;
  }

}
</style>
