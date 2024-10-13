<template>
  <PanelMenu
    v-model="state.currentMenu"
    class="WeaponType"
    :data="panelMenuData"
  >
    <template #button="{ item }">
      {{ item.label }} ({{ actions.countOwned(item.id) }}/{{ State.weaponList[item.id]?.length ?? 0 }})
    </template>
    <template #[state.currentMenu]>
      <WeaponFilters class="WeaponTypeFilters" />

      <WeaponDataTable
        class="WeaponTypeDataTable"
        :data="weaponsStore.actions.applyFilter(State.weaponList[state.currentMenu])"
        @owned="(obj) => emit('owned', obj)"
      />
    </template>
  </PanelMenu>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import WeaponFilters from '@renderer/components/MyGenshinImpactCharacters/Weapon/Filters.vue';
import WeaponDataTable from '@renderer/components/MyGenshinImpactCharacters/Weapon/DataTable.vue';

import { weaponsStore } from '@renderer/core/entities/weapon/store';

defineOptions({ name: '' });

const { t, tm } = useI18n();
const panelMenuData = Object
  .keys(tm('App.Weapons.type'))
  .map((weaponType) => ({
    id: weaponType,
    label: t(`App.Weapons.type.${weaponType}`, 2),
  }))
;

const emit = defineEmits(['owned']);

const state = reactive({
  currentMenu: 'bow',
});

const State = computed(() => ({
  weaponList: weaponsStore.groupedByTypeWeaponList.value,
}));

const actions = {
  countOwned(type) {
    return (State.value.weaponList[type] ?? [])
      .filter(({ owned }) => owned)
      .length
    ;
  },
};
</script>

<style lang="scss" src="./WeaponType.scss">
</style>
