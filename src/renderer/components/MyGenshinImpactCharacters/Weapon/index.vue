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
    <img :src="image(`img/weapons/${props.weapon.name}.webp`)" alt="" />
    <span class="weapon-card__rank">R{{ props.weapon.rank }}</span>
    <span>{{ props.weapon.level }}</span>
  </button>
</template>

<script setup>
import { image } from '@renderer/core/utils';
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
