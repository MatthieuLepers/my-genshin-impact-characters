<template>
  <ul class="AllWeaponsTab">
    <template v-for="group in Object.keys(State.weaponList).reverse()">
      <li
        class="AllWeaponsTabItem"
        v-for="weapon in State.weaponList[group]"
        :key="`${weapon.name}${group}`"
      >
        <label :for="`weapon${weapon.id}`">
          <input
            :id="`weapon${weapon.id}`"
            type="checkbox"
            @input="($event) => weapon.owned = $event.target.checked"
          />
          <img :src="image(`img/weapons/${weapon.name}.webp`)" alt="" />
          <span>{{ t(`Data.Weapons.${weapon.name}.name`) }}</span>
        </label>
      </li>
    </template>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { image } from '@renderer/core/utils';
import { weaponsStore } from '@renderer/core/entities/weapon/store';

const { t } = useI18n();

const State = computed(() => ({
  weaponList: weaponsStore.weaponList.value.reduce((acc, val) => ({
    ...acc,
    [val.rarity]: [
      ...(acc[val.rarity] ?? []),
      val,
    ],
  }), {}),
}));
</script>

<style lang="scss" src="./AllWeaponsTab.scss">
</style>
