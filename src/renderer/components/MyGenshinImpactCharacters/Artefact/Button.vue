<template>
  <button
    type="button"
    class="artefact-button"
    @click="emit('click', $event)"
  >
    <span v-icon:[props.type] />
    <span>{{ t('App.Artefact.PresetList.formChooseBtnLabel') }}</span>
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'ArtefactButton' });

const { t } = useI18n();
const emit = defineEmits(['click']);

const props = defineProps({
  type: { type: String, required: true },
});
</script>

<style lang="scss" src="./Button.scss">
</style>
