<template>
  <ul class="character-build-stats">
    <li
      v-for="stat in State.stats"
      :key="stat.statType"
      class="character-build-stats__item"
    >
      {{ t(`App.Artefact.stats.${stat.statType}.display`) }}
      <span>{{ stat.statValue }}{{ stat.statType.endsWith('%') ? '%' : '' }}</span>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'CharacterBuildStats' });

const { t } = useI18n();

const props = defineProps({
  build: { type: Object, required: true },
});

const State = computed(() => ({
  stats: Object
    .entries(props.build.stats)
    .reduce((acc, [key, val]) => (val > 0 ? [...acc, { statType: key, statValue: val }] : acc), []),
}));
</script>

<style lang="scss" src="./Stats.scss">
</style>
