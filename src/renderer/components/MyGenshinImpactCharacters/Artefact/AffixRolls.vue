<template>
  <ol class="artefact-affix-rolls">
    <li
      v-for="(roll, i) in State.rolls"
      :key="i"
      :class="GenerateModifiers('artefact-affix-rolls__item', {
        [props.variant]: true,
        [getRollType(props.stat.name, roll)]: true,
      })"
    >
      <span v-if="variant === 'default'">
        {{ round(props.stat.name, roll).toFixed(+props.stat.name.endsWith('%')) }}
      </span>
      <span
        v-else
        :title="round(props.stat.name, roll).toFixed(+props.stat.name.endsWith('%'))"
        :style="{ height: `${(roll / State.maxRoll) * 100}%` }"
      />
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue';

import ArtefactSubStatData from '@renderer/core/datas/ArtefactSubStat.json';
import { getRollsFromValue, getRollType, round } from '@renderer/core/entities/artefact/StatUtils';

defineOptions({ name: 'ArtefactAffixRolls' });

const props = defineProps({
  stat: { type: Object, required: true },
  variant: { type: String, default: 'default' },
});

const State = computed(() => {
  const rolls = getRollsFromValue(props.stat.name, props.stat.value).reverse();
  const [,,, maxRoll] = ArtefactSubStatData[props.stat.name].rolls;

  return {
    rolls,
    maxRoll,
  };
});
</script>

<style lang="scss" src="./AffixRolls.scss">
</style>
