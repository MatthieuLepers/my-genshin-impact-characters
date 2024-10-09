<template>
  <VueSlider
    v-model="modelValue.value"
    :marks="State.marks"
    :min="0"
    :max="Math.ceil(State.max)"
    :interval="0.1"
    :included="true"
    :hideLabel="true"
    :railStyle="{ height: '6px' }"
    :adsorb="true"
    :duration="0"
    class="m-slider"
  >
    <template #tooltip="{ value }">
      <div class="m-slider__tooltip">
        {{ value.toFixed(+modelValue.name.endsWith('%')) }}
      </div>
    </template>
    <template #mark="{ active, pos }">
      <span
        :style="{ left: `calc(${pos}% - 2px)` }"
        :class="GenerateModifiers('m-slider__mark', { active })"
      />
    </template>
    <template #process="{ end }">
      <div
        class="m-slider__track"
        :style="{ width: `${end}%` }"
      />
    </template>
  </VueSlider>
</template>

<script setup>
// https://vue-3-slider-component.netlify.app/?path=/docs/props-marks--docs
// https://mui.com/material-ui/react-slider/
import { computed } from 'vue';
import VueSlider from 'vue-3-slider-component';

import ArtefactSubStatData from '@renderer/core/datas/ArtefactSubStat.json';

defineOptions({ name: 'Slider' });

const modelValue = defineModel({ type: Object });

const State = computed(() => {
  const marks = Object
    .keys(ArtefactSubStatData[modelValue.value.name].permutations)
    .map((val) => parseFloat(val))
  ;
  const max = parseFloat(marks[marks.length - 1]);

  return {
    marks,
    max,
  };
});
</script>

<style lang="scss" src="./index.scss">
</style>
