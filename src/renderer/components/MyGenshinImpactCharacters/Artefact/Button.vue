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
  <Artefact
    v-else
    :artefact="props.artefact"
    @click="emit('click', $event)"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact/index.vue';

defineOptions({ name: 'ArtefactButton' });

const { t } = useI18n();
const emit = defineEmits(['click']);

const props = defineProps({
  type: { type: String, required: true },
  artefact: { type: Object, default: null },
});
</script>

<style lang="scss" src="./Button.scss">
</style>
