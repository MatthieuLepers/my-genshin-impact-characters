<template>
  <div class="ArtefactAffix" @wheel.stop="actions.handleWheel">
    <button
      v-if="!modelValue"
      class="ArtefactAffixButton"
      type="button"
      @click="emit('click', $event)"
    >
      {{ t('App.ArtefactTransmuter.selectAffixBtnLabel') }}
    </button>
    <FormAffixInput
      v-else
      v-model="modelValue"
      :allowEdit="!modelValue.main || (modelValue.main && !['flower', 'feather'].includes(props.type))"
      @click="emit('click', $event)"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import FormAffixInput from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/FormAffixInput.vue';

import ArtefactSubStatData from '@renderer/core/datas/ArtefactSubStat.json';

const { t } = useI18n();
const emit = defineEmits(['click']);

const modelValue = defineModel({ type: Object });

const props = defineProps({
  type: { type: String, default: null },
});

const actions = {
  handleWheel(e) {
    const delta = e.deltaY < 0 ? -1 : 1;
    const values = Object
      .keys(ArtefactSubStatData[modelValue.value.name].permutations)
      .map((value) => parseFloat(value))
      .sort((a, b) => a - b)
    ;
    const index = values.indexOf(modelValue.value.value);
    const newIndex = Math.min(values.length - 1, Math.max(0, index + delta));
    modelValue.value.value = values[newIndex];
  },
};
</script>

<style lang="scss" src="./ArtefactAffix.scss">
</style>
