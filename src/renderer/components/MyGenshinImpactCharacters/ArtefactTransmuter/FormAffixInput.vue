<template>
  <div :class="GenerateModifiers('FormAffixInput', {
    editable: props.allowEdit,
  })">
    <label :for="`affix${$uid}`">
      {{ t(`App.Artefact.stats.${modelValue.name}`) }}
    </label>
    {{ Math.round(modelValue.value * 100) / 100 }}
    <Slider
      v-if="!modelValue.main"
      v-model="modelValue.value"
      v-model:rolls="state.rolls"
      :baseStat="State.maxRoll"
    />
    <span>{{ state.rolls.join(', ') }}</span>
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
import { reactive, computed, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';

import Slider from '@renderer/components/Slider/index.vue';

import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';

const { t } = useI18n();
const $uid = getCurrentInstance().uid;
const emit = defineEmits(['click']);

const modelValue = defineModel({ type: Object });

const props = defineProps({
  allowEdit: { type: Boolean, default: false },
});

const state = reactive({
  rolls: [],
});

const State = computed(() => ({
  maxRoll: StatRangeEnum[modelValue.value.main ? 'main' : 'sub'][modelValue.value.name].maxRoll,
}));
</script>

<style lang="scss" src="./FormAffixInput.scss">
</style>
