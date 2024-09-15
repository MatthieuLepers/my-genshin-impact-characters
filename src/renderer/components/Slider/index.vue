<template>
  <VueSlider
    v-model="modelValue"
    v-model:rolls="rollsValue"
    :marks="State.marks"
    :min="0"
    :max="State.max"
    :interval="0.1"
    :included="true"
    :hideLabel="true"
    :railStyle="{ height: '6px' }"
    :adsorb="true"
    class="m-slider"
  >
    <template #tooltip="{ value }">
      <div class="m-slider__tooltip">
        {{ Math.round(value) }}
      </div>
    </template>
    <template v-slot:mark="{ active, pos }">
      <span
        :style="{ left: `${pos}%` }"
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
import { computed, watch } from 'vue';
import VueSlider from 'vue-3-slider-component';

import { rolls, getRollsFromValue } from '@renderer/core/datas/SubStatUtils';

defineOptions({ name: 'Slider' });

const modelValue = defineModel({ type: Number });
const rollsValue = defineModel('rolls', { type: Array });

const props = defineProps({
  baseStat: { type: Number, required: true },
});

const State = computed(() => {
  const marks = rolls(props.baseStat);
  const [min] = marks;
  const max = marks[marks.length - 1];

  return {
    marks,
    min,
    max,
  };
});

watch(() => modelValue.value, (newVal) => {
  rollsValue.value = getRollsFromValue(props.baseStat, newVal);
});
</script>

<style lang="scss" src="./index.scss">
</style>
