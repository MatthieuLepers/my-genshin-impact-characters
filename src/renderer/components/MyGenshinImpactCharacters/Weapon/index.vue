<template>
  <button
    type="button"
    :class="GenerateModifiers('weapon-card', {
      current: props.selected,
      [`gradient${props.weapon.rarity}`]: true,
      ...props.modifiers,
    })"
    @click="emit('click', $event)"
  >
    <img :src="props.weapon.image" alt="" />
    <span class="weapon-card__rank">R{{ props.weapon.rank }}</span>
    <span>{{ props.weapon.level }}</span>
  </button>
</template>

<script setup>
import Weapon from '@renderer/core/entities/weapon';

defineOptions({ name: 'Weapon' });

const emit = defineEmits(['click']);

const props = defineProps({
  weapon: { type: Weapon },
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
