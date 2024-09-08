<template>
  <button
    type="button"
    :class="GenerateModifiers('Artefact', {
      current: props.selected,
      ...props.modifiers,
    })"
    @click="emit('click', $event)"
  >
    <img :src="image(`img/artefacts/${props.artefact.setId}/${props.artefact.type}.webp`)" alt="" />
    <span>+{{ props.artefact.level }}</span>
  </button>
</template>

<script setup>
import { image } from '@renderer/core/utils';
import Artefact from '@renderer/core/entities/artefact';

const emit = defineEmits(['click']);

const props = defineProps({
  artefact: { type: Artefact },
  selected: { type: Boolean, default: false },
  /**
   * Valid modifiers:
   * - checked
   */
  modifiers: { type: Object, default: () => ({}) },
});
</script>

<style lang="scss" src="./Artefact.scss">
</style>
