<template>
  <button
    type="button"
    :class="GenerateModifiers('artefact-card', {
      current: props.selected,
      gradient5: true,
      ...props.modifiers,
    })"
    @click="emit('click', $event)"
  >
    <img :src="image(`img/artefacts/${props.artefact.setId}/${props.artefact.type}.webp`)" alt="" />
    <span :class="['artefact-card__main', `icon-${formatAffix(props.artefact.mainStat.name)}`]" />
    <span>+{{ props.artefact.level }}</span>
  </button>
</template>

<script setup>
import { image } from '@renderer/core/utils';
import Artefact from '@renderer/core/entities/artefact';

defineOptions({ name: 'Artefact' });

const emit = defineEmits(['click']);
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  artefact: { type: Artefact },
  selected: { type: Boolean, default: false },
  /**
   * Valid modifiers:
   * - checked
   * - tiny
   */
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./index.scss">
</style>
