<template>
  <main class="View WeaponListView">
    <PanelMenu
      v-model="state.currentMenu"
      :data="State.panelMenuData"
    />

    <AllWeaponsTab v-if="state.currentMenu === 'all'" />
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import AllWeaponsTab from '@renderer/views/WeaponList/AllWeaponsTab.vue';

defineOptions({ name: 'WeaponListView' });

const { t } = useI18n();

const state = reactive({
  currentMenu: 'all',
});

const State = computed(() => ({
  panelMenuData: [
    { id: 'owned', label: 'My weapons' },
    { id: 'all', label: 'All weapons' },
  ],
}));
</script>

<style lang="scss" src="./index.scss">
</style>
