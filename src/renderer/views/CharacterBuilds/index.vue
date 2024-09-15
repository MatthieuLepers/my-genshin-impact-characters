<template>
  <div class="View CharacterBuildsView">
    <PanelMenu
      v-model="state.currentMenu"
      :displayIf="Object.values(characterBuildsStore.state.builds).length > 0"
      :data="State.panelMenuData"
    />

    <CreateTab v-if="state.currentMenu === 'create'" />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';
import CreateTab from '@renderer/views/CharacterBuilds/CreateTab.vue';

import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';

const { t } = useI18n();

const state = reactive({
  currentMenu: 'create',
});

const State = computed(() => ({
  panelMenuData: [
    { id: 'create', label: t('App.CharacterBuild.createBuild') },
    { id: 'list', label: t('App.CharacterBuild.myBuilds') },
  ],
}));
</script>

<style lang="scss" src="./index.scss">
</style>
