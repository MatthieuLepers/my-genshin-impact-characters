<template>
  <main class="View ArtefactListView">
    <PanelMenu
      v-model="state.currentMenu"
      :data="State.panelMenuData"
    />

    <ArtefactsTab
      v-if="state.currentMenu === 'artefacts'"
      class="Panel Panel--Artefacts"
    />

    <PresetsTab
      v-if="state.currentMenu === 'artefactPresets'"
      class="Panel Panel--Presets"
    />
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';

import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import ArtefactsTab from '@renderer/views/ArtefactList/ArtefactsTab.vue';
import PresetsTab from '@renderer/views/ArtefactList/PresetsTab.vue';

defineOptions({ name: 'ArtefactListView' });

const state = reactive({
  currentMenu: 'artefacts',
});

const State = computed(() => ({
  panelMenuData: [
    { id: 'artefacts', label: 'Artefacts' },
    { id: 'artefactPresets', label: 'Presets' },
  ],
}));
</script>

<style lang="scss" src="./index.scss">
</style>
