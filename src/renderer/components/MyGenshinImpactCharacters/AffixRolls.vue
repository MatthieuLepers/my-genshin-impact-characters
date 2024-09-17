<template>
  <ol class="AffixRolls">
    <li
      v-for="(roll, i) in State.rolls"
      :key="i"
      :class="GenerateModifiers('AffixRollsItem', {
        [props.variant]: true,
        [actions.getRollType(roll)]: true,
      })"
    >
      <span v-if="variant === 'default'">{{ props.getText(roll) }}</span>
      <span v-else :title="props.getText(roll)" :style="{ height: `${(roll / State.maxRoll) * 100}%` }" />
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue';

import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';
import { getRollsFromValue } from '@renderer/core/datas/SubStatUtils';

const props = defineProps({
  stat: { type: Object, required: true },
  getText: { type: Function, default: Math.round },
  variant: { type: String, default: 'default' },
});

const State = computed(() => {
  const { maxRoll } = StatRangeEnum.sub[props.stat.name];
  const rolls = getRollsFromValue(maxRoll, props.stat.value);

  return {
    rolls,
    maxRoll,
  };
});

const actions = {
  getRollType(rollValue) {
    const { maxRoll } = StatRangeEnum.sub[props.stat.name];
    return (maxRoll * 0.7 === rollValue && 'common')
      || (maxRoll * 0.8 === rollValue && 'uncommon')
      || (maxRoll * 0.9 === rollValue && 'rare')
      || (maxRoll === rollValue && 'epic')
    ;
  },
};
</script>

<style lang="scss" src="./AffixRolls.scss">
</style>
