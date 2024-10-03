<template>
  <ul class="character-build-stats">
    <li
      v-for="stat in State.stats"
      :key="stat.statType"
      class="character-build-stats__item"
    >
      <span :class="`icon-${formatAffix(stat.statType)}`">
        {{ t(`App.Artefact.stats.${stat.statType}.display`) }}
      </span>
      <span :class="GenerateModifiers('character-build-stats__value', { changed: State.isChanged })">
        {{ State.isChanged ? stat.oldValue : stat.statValue }}{{ stat.statType.endsWith('%') ? '%' : '' }}
        <span
          v-if="State.isChanged && stat.statValue - stat.oldValue !== 0"
          :class="{
            negative: stat.statValue - stat.oldValue < 0,
            positive: stat.statValue - stat.oldValue > 0,
          }"
        >
          {{ stat.statValue - stat.oldValue > 0 ? '+' : '' }}{{ Math.round((stat.statValue - stat.oldValue) * 10) / 10 }}{{ stat.statType.endsWith('%') ? '%' : '' }}
        </span>
      </span>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CharacterBuild from '@renderer/core/entities/characterBuild';

defineOptions({ name: 'CharacterBuildStats' });

const { t } = useI18n();
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  build: { type: CharacterBuild, required: true },
  old: { type: [Object, CharacterBuild], default: null },
});

const State = computed(() => {
  const stats = Object
    .entries(props.build.stats)
    .reduce((acc, [key, val]) => (val > 0 || props.old?.stats?.[key] > 0 ? [
      ...acc,
      {
        statType: key,
        oldValue: props.old?.stats?.[key] ?? 0,
        statValue: props.build?.stats?.[key] ?? 0,
      },
    ] : acc), [])
  ;
  const isChanged = props.old.characterId
    && (props.build.flowerId !== props.old.flowerId
      || props.build.featherId !== props.old.featherId
      || props.build.sandsId !== props.old.sandsId
      || props.build.gobletId !== props.old.gobletId
      || props.build.circletId !== props.old.circletId
    )
  ;
  return {
    stats,
    isChanged,
  };
});
</script>

<style lang="scss" src="./Stats.scss">
</style>
