<template>
  <button
    type="button"
    :class="GenerateModifiers('ArtefactSubStat', { expanded: props.stat.name === modelValue })"
    @click="modelValue = (modelValue === props.stat.name ? null : props.stat.name)"
  >
    {{ t(`App.Artefact.display.${props.stat.name}`) }}+{{ props.stat.value }}{{ props.stat.name.endsWith('%') ? '%' : '' }}

    <div class="ArtefactSubStatInfos" v-show="props.stat.name === modelValue">
      <meter
        class="ArtefactSubStatBar"
        :min="State.minRoll"
        :max="State.maxRoll"
        :value="props.stat.value"
      /> {{ ((props.stat.value - State.minRoll) / (State.maxRoll - State.minRoll) * 100).toFixed(1) }}%
      <br />
      {{ State.rollAmount }} roll{{ State.rollAmount > 1 ? 's' : '' }}<br />
      (Min: {{ State.minRoll }}{{ props.stat.name.endsWith('%') ? '%' : '' }}, Max: {{ State.maxRoll }}{{ props.stat.name.endsWith('%') ? '%' : '' }})
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';

const { t } = useI18n();

const modelValue = defineModel({ type: String, default: null });

const props = defineProps({
  level: { type: Number, required: true },
  stat: { type: Object, required: true },
});

const State = computed(() => {
  const ranges = [...Array(5).keys()]
    .map((i) => ({
      min: Math.floor((StatRangeEnum.sub[props.stat.name].min + i * StatRangeEnum.sub[props.stat.name].min) * 10) / 10,
      max: Math.floor((StatRangeEnum.sub[props.stat.name].maxRoll + i * StatRangeEnum.sub[props.stat.name].maxRoll) * 10) / 10,
    }))
  ;

  const rollAmount = ranges.findIndex((range) => range.min <= props.stat.value && range.max >= props.stat.value);

  return {
    rollAmount,
    minRoll: Math.floor(ranges[rollAmount].min * 10) / 10,
    maxRoll: Math.floor(ranges[rollAmount].max * 10) / 10,
  };
});
</script>

<style lang="scss" src="./ArtefactSubStat.scss">
</style>
