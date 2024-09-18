<template>
  <div class="ArtefactSubStat">
    <span class="ArtefactSubStatValue">
      <span v-icon:[formatAffix(props.stat.name)] />
      {{ t(`App.Artefact.stats.${props.stat.name}.short`) }}+{{ actions.getText()(props.stat.value) }}{{ props.stat.name.endsWith('%') ? '%' : '' }}
    </span>
    <AffixRolls
      :stat="props.stat"
      :getText="actions.getText()"
      variant="bar"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import AffixRolls from '@renderer/components/MyGenshinImpactCharacters/AffixRolls.vue';

const { t } = useI18n();
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  level: { type: Number, required: true },
  stat: { type: Object, required: true },
});

const actions = {
  getText() {
    return props.stat.name.endsWith('%')
      ? (val) => Math.round(val * 10) / 10
      : Math.round
    ;
  },
};
</script>

<style lang="scss" src="./ArtefactSubStat.scss">
</style>
