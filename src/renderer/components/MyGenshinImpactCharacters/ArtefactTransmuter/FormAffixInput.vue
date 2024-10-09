<template>
  <div :class="GenerateModifiers('FormAffixInput', {
    editable: props.allowEdit,
  })">
    <label :for="`affix${$uid}`">
      <span v-icon:[formatAffix(modelValue.name)] /> {{ t(`App.Artefact.stats.${modelValue.name}.long`) }}
    </label>
    <span class="FormAffixInputValue">
      {{ modelValue.value.toFixed(+modelValue.name.endsWith('%')) }}{{ modelValue.name.endsWith('%') ? '%' : '' }}
    </span>
    <ArtefactAffixRolls
      v-if="!modelValue.main"
      :stat="modelValue"
    />
    <Slider
      v-if="!modelValue.main"
      v-model="modelValue"
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
import ArtefactAffixRolls from '@renderer/components/MyGenshinImpactCharacters/Artefact/AffixRolls.vue';

const { t } = useI18n();
const $uid = getCurrentInstance().uid;
const emit = defineEmits(['click']);
const formatAffix = (affix) => affix.replace('%', '').toLowerCase();

const modelValue = defineModel({ type: Object });

const props = defineProps({
  allowEdit: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./FormAffixInput.scss">
</style>
