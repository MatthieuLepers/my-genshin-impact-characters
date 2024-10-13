<template>
  <main class="View WeaponListView">
    <PanelMenu
      v-model="state.currentView"
      class="WeaponListViewPanelMenu"
      :data="panelMenuViews"
      :modifiers="{ solo: true }"
    />
    <WeaponType
      v-if="state.currentView === 'types'"
      @owned="actions.handleToggleOwned"
    />
    <template v-else>
      <WeaponFilters />

      <WeaponMaterial
        v-for="materialId in weaponMaterialsStore.materialOrder"
        :key="materialId"
        :material="weaponMaterialsStore.state.materials[materialId]"
        @owned="actions.handleToggleOwned"
      />
    </template>
  </main>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import WeaponMaterial from '@renderer/components/MyGenshinImpactCharacters/WeaponMaterial.vue';
import WeaponType from '@renderer/components/MyGenshinImpactCharacters/WeaponType.vue';
import WeaponFilters from '@renderer/components/MyGenshinImpactCharacters/Weapon/Filters.vue';

import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { weaponMaterialsStore } from '@renderer/core/entities/weaponMaterial/store';

defineOptions({ name: 'WeaponListView' });

const state = reactive({
  currentView: 'types',
});

const panelMenuViews = [
  { id: 'types', label: 'Lister par types' },
  { id: 'materials', label: 'Lister par matériaux' },
];

const actions = {
  async handleToggleOwned(obj) {
    if (!obj.owned) {
      obj.level = 1;
      obj.rank = 1;
    }
    await obj.save();
  },
};

watch(() => state.currentView, (newVal) => {
  weaponsStore.state.filters.type = newVal === 'types' ? 'bow' : null;
});

onBeforeRouteLeave(() => {
  weaponsStore.state.filters.search = '';
});
</script>

<style lang="scss" src="./index.scss">
</style>
