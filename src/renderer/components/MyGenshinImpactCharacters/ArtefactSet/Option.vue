<template>
  <label
    :for="`set${$uid}`"
    :class="GenerateModifiers('artefactset-option', {
      selected: state.selectedOptions.includes(props.option.value),
    })"
  >
    <input
      :type="State.isMultiple ? 'checkbox' : 'radio'"
      name="setId"
      :id="`set${$uid}`"
      :value="props.option.value.id"
      :checked="modelValue === props.option.value"
      @click="actions.handleSelectOption(props.option.value)"
    />

    <img
      :src="props.option.value.getImage('flower')"
      alt=""
      class="artefactset-option__img"
    />
    {{ props.option.label }}
    <span v-if="props.showCount" class="artefactset-option__count">
      {{ artefactsStore.actions.getArtefactCountForSet(props.option.value.id) }}
    </span>
  </label>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  getCurrentInstance,
} from 'vue';

import { artefactsStore } from '@renderer/core/entities/artefact/store';

defineOptions({ name: 'ArtefactSetOption' });

const $uid = getCurrentInstance().uid;

const modelValue = defineModel({ type: Array });

const props = defineProps({
  option: { type: Object, required: true },
  showCount: { type: Boolean, default: false },
  allowUnselect: { type: Boolean, default: true },
});

const state = reactive({
  selectedOptions: Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value],
});

const State = computed(() => ({
  isMultiple: Array.isArray(modelValue.value),
}));

const actions = {
  handleSelectOption(optionValue) {
    if (state.selectedOptions.includes(optionValue)) {
      if (props.allowUnselect) {
        state.selectedOptions = state.selectedOptions.filter((val) => val.id !== optionValue.id);
      }
    } else {
      state.selectedOptions.push(optionValue);
    }

    modelValue.value = State.value.isMultiple ? state.selectedOptions : optionValue;
  },
};

watch(() => modelValue.value, (newVal) => {
  state.selectedOptions = Array.isArray(newVal) ? newVal : [newVal];
});
</script>

<style lang="scss" src="./Option.scss">
</style>
