<template>
  <main class="View ArtefactListView">
    <PanelMenu
      v-model="state.currentMenu"
      :data="State.panelMenuData"
      :displayNavIf="Object.values(artefactsStore.state.artefacts).length > 0"
    >
      <template #artefacts>
        <ArtefactsTab class="Panel Panel--Artefacts" />
      </template>
      <template #artefactPresets>
        <PresetsTab class="Panel Panel--Presets" />
      </template>
    </PanelMenu>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';

import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import ArtefactsTab from '@renderer/views/ArtefactList/ArtefactsTab.vue';
import PresetsTab from '@renderer/views/ArtefactList/PresetsTab.vue';

import { artefactsStore } from '@renderer/core/entities/artefact/store';

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
