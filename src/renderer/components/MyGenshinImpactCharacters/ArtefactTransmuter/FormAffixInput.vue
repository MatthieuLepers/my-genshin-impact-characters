<template>
  <div :class="GenerateModifiers('FormAffixInput', {
    editable: props.allowEdit,
  })">
    <label :for="`affix${$uid}`">
      <span v-icon:[formatAffix(modelValue.name)] /> {{ t(`App.Artefact.stats.${modelValue.name}.long`) }}
    </label>
    <span class="FormAffixInputValue">
      {{ props.getText(modelValue.value) }}{{ modelValue.name.endsWith('%') ? '%' : '' }}
    </span>
    <AffixRolls
      v-if="!modelValue.main"
      :stat="modelValue"
      :getText="props.getText"
    />
    <Slider
      v-if="!modelValue.main"
      v-model="modelValue.value"
      :baseStat="StatRangeEnum[modelValue.main ? 'main' : 'sub'][modelValue.name].maxRoll"
      :getTooltipText="props.getText"
    />
    <button
      v-if="props.allowEdit"
      type="button"
      :title="t('App.ArtefactTransmuter.changeAffix')"
      @click="emit('click', $event)"
    >
      <span v-icon:edit />
    </button>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';

import Slider from '@renderer/components/Slider/index.vue';
import AffixRolls from '@renderer/components/MyGenshinImpactCharacters/AffixRolls.vue';

import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';

const { t } = useI18n();
const $uid = getCurrentInstance().uid;
const emit = defineEmits(['click']);
const formatAffix = (affix) => affix.replace('%', '').toLowerCase();

const modelValue = defineModel({ type: Object });

const props = defineProps({
  allowEdit: { type: Boolean, default: false },
  getText: { type: Function, default: Math.round },
});
</script>

<style lang="scss" src="./FormAffixInput.scss">
</style>
