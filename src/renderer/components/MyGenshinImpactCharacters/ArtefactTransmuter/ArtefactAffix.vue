<template>
  <div class="ArtefactAffix">
    <button class="ArtefactAffixButton" type="button" v-if="!modelValue" @click="emit('click', $event)">
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

const { t } = useI18n();
const emit = defineEmits(['click']);

const modelValue = defineModel({ type: Object });

const props = defineProps({
  type: { type: String, default: null },
});
</script>

<style lang="scss" src="./ArtefactAffix.scss">
</style>
