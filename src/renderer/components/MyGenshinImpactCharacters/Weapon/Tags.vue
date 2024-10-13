<template>
  <ul class="WeaponTags">
    <li
      v-for="(tag, i) in props.weapon.tags"
      :key="i"
      :class="GenerateModifiers('WeaponTagsItem', {
        selected: weaponsStore.state.filters.search.length > 0 && ((te(`App.Weapons.tags.${tag}`) ? t(`App.Weapons.tags.${tag}`) : tag).toLowerCase().includes(weaponsStore.state.filters.search.toLowerCase()) || tag.toLowerCase().includes(weaponsStore.state.filters.search.toLowerCase())),
      })"
    >
      {{ te(`App.Weapons.tags.${tag}`) ? t(`App.Weapons.tags.${tag}`) : tag }}
    </li>
  </ul>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import Weapon from '@renderer/core/entities/weapon';

import { weaponsStore } from '@renderer/core/entities/weapon/store';

defineOptions({ name: 'WeaponTags' });

const { t, te } = useI18n();

const props = defineProps({
  weapon: { type: Weapon, required: true },
});
</script>

<style lang="scss" src="./Tags.scss">
</style>
