<template>
  <div :class="GenerateModifiers('FormAffixInput', {
    editable: props.allowEdit,
    invalid: modelValue.value < StatRangeEnum[modelValue.main ? 'main' : 'sub'][modelValue.name].min || modelValue.value > StatRangeEnum[modelValue.main ? 'main' : 'sub'][modelValue.name].max,
  })">
    <label :for="`affix${$uid}`">
      {{ t(`App.Artefact.stats.${modelValue.name}`) }}
    </label>
    <input
      v-model="modelValue.value"
      type="number"
      :min="StatRangeEnum[modelValue.main ? 'main' : 'sub'][modelValue.name].min"
      :max="StatRangeEnum[modelValue.main ? 'main' : 'sub'][modelValue.name].max"
      :step="0.1"
      :id="`affix${$uid}`"
      @click.stop
      @wheel.stop
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

import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';

const { t } = useI18n();
const $uid = getCurrentInstance().uid;
const emit = defineEmits(['click']);

const modelValue = defineModel({ type: Object });

const props = defineProps({
  allowEdit: { type: Boolean, default: false },
});
</script>

<style lang="scss" src="./FormAffixInput.scss">
</style>
