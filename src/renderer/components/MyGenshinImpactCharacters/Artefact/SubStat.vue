<template>
  <div class="artefact-sub-stat">
    <span :class="GenerateModifiers('artefact-sub-stat__value', { [State.statColor]: !!State.statColor })">
      <span :class="`icon-${formatAffix(props.stat.name)}`" />
      {{ t(`App.Artefact.stats.${props.stat.name}.short`) }}+{{ props.stat.value.toFixed(+props.stat.name.endsWith('%')) }}{{ props.stat.name.endsWith('%') ? '%' : '' }}
    </span>
    <AffixRolls
      :stat="props.stat"
      variant="bar"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import AffixRolls from '@renderer/components/MyGenshinImpactCharacters/Artefact/AffixRolls.vue';

import { getRollsFromValue } from '@renderer/core/entities/artefact/StatUtils';

defineOptions({ name: 'ArtefactSubStat' });

const { t } = useI18n();
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  level: { type: Number, required: true },
  stat: { type: Object, required: true },
});

const State = computed(() => {
  const rolls = getRollsFromValue(props.stat.name, props.stat.value);

  return {
    statColor: [null, 'base', 'common', 'uncommon', 'rare', 'epic'][rolls.length - 1],
  };
});
</script>

<style lang="scss" src="./SubStat.scss">
</style>
