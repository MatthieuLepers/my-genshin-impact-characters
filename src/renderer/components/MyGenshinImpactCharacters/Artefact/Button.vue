<template>
  <button
    v-if="!props.artefact"
    type="button"
    class="artefact-button"
    @click="emit('click', $event)"
  >
    <span v-icon:[props.type] />
    <span>{{ t('App.Artefact.PresetList.formChooseBtnLabel') }}</span>
  </button>
  <div v-else class="artefact-button__card">
    <Artefact
      :artefact="props.artefact"
      :modifiers="props.modifiers"
      @click="emit('click', $event)"
    />
    <ToolTip class="artefact-button__tooltip">
      <ul class="artefact-button__tooltip__sub-stat">
        <li>
          <span class="artefact-sub-stat__value">
            <span :class="`icon-${formatAffix(props.artefact.statsJson[0].name)}`" />
            {{ t(`App.Artefact.stats.${props.artefact.statsJson[0].name}.short`) }}
            {{ props.artefact.statsJson[0].value }}{{ props.artefact.statsJson[0].name.endsWith('%') ? '%' : '' }}
          </span>
        </li>
        <li v-for="(stat, i) in props.artefact.statsJson.slice(1)" :key="i">
          <ArtefactSubStat :stat="stat" />
        </li>
      </ul>
    </ToolTip>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact/index.vue';
import ArtefactSubStat from '@renderer/components/MyGenshinImpactCharacters/Artefact/SubStat.vue';
import ToolTip from '@renderer/components/MyGenshinImpactCharacters/ToolTip.vue';

import ArtefactEntity from '@renderer/core/entities/artefact';

defineOptions({ name: 'ArtefactButton' });

const { t } = useI18n();
const emit = defineEmits(['click']);
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  type: { type: String, required: true },
  artefact: { type: ArtefactEntity, default: null },
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./Button.scss">
</style>
