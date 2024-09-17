<template>
  <div class="ArtefactsTab">
    <div v-if="!state.showArtefactTransmuter" class="ArtefactsTabContainer">
      <ul class="ArtefactsTabList">
        <li
          v-for="(artefact, i) in artefactsStore.artefactList.value"
          :key="i"
          class="ArtefactsTabListItem"
        >
          <Artefact
            :artefact="artefact"
            :selected="artefact.id === artefactsStore.state.current.id"
            @click="artefactsStore.state.current = artefact"
          />
        </li>
      </ul>

      <div class="ArtefactsTabButtons">
        <button
          type="button"
          :class="GenerateModifiers('ArtefactsTabButton', { secondary: true })"
          :title="t('App.Artefact.List.addNew')"
          @click="state.showArtefactTransmuter = true"
        >
          <span v-icon:plus />
        </button>

        <button
          type="button"
          class="ArtefactsTabButton"
          :title="t('App.Artefact.List.filterBtnTitle')"
          @click="state.showArtefactFilters = true"
        >
          <span v-icon:filter />
        </button>

        <button
          type="button"
          class="ArtefactsTabButton"
          :title="t('App.Artefact.List.importBtnTitle')"
          @click="actions.handleClickImport"
        >
          <span v-icon:import />
        </button>

        <button
          type="button"
          class="ArtefactsTabButton"
          :title="t('App.Artefact.List.exportBtnTitle')"
          @click="actions.handleClickExportMultiple"
        >
          <span v-icon:export />
        </button>
      </div>

      <ArtefactCard v-if="artefactsStore.state.current" />

      <ArtefactFilters
        :filters="props.filters"
        :visible="state.showArtefactFilters"
        @confirm="actions.handleApplyFilters"
        @close="state.showArtefactFilters = false"
      />
    </div>

    <ArtefactTransmuter
      v-else
      class="ArtefactListTransmuter"
      :allowClose="artefactsStore.artefactList.value.length > 0"
      @close="state.showArtefactTransmuter = false"
      @submit="actions.handleCreate"
    />
  </div>
</template>

<script setup>
import { reactive, onBeforeMount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import ArtefactTransmuter from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/index.vue';
import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact.vue';
import ArtefactFilters from '@renderer/components/MyGenshinImpactCharacters/ArtefactFilters.vue';
import ArtefactCard from '@renderer/components/MyGenshinImpactCharacters/ArtefactCard.vue';

import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';

const { t } = useI18n();

const props = defineProps({
  filters: { type: Object, default: () => ({}) },
});

const state = reactive({
  showArtefactFilters: false,
  showArtefactTransmuter: false,
});

const actions = {
  async handleClickImport() {
    const dialogOptions = {
      title: t('Electron.Dialog.openFile.title'),
      buttonLabel: t('Electron.Dialog.openFile.buttonLabel'),
      defaultPath: `${api.homedir}/Desktop/`,
      filters: [
        {
          name: t('Electron.Dialog.filters.json'),
          extensions: ['json'],
        },
      ],
      properties: ['openFile'],
    };
    const success = await artefactsStore.actions.requestImport(dialogOptions);
    if (success) {
      notificationStore.actions.success(t('App.Artefact.List.importSuccess'));
    } else {
      notificationStore.actions.error(t('App.Artefact.List.importFailed'));
    }
  },
  async handleClickExportMultiple() {
    const dialogOptions = {
      title: t('Electron.Dialog.saveFile.title'),
      buttonLabel: t('Electron.Dialog.saveFile.buttonLabel'),
      defaultPath: `${api.homedir}/Desktop/all-artefacts.json`,
      filters: [
        {
          name: t('Electron.Dialog.filters.json'),
          extensions: ['json'],
        },
      ],
      properties: [],
    };
    await artefactsStore.actions.requestExportMultiple(dialogOptions);
  },
  handleApplyFilters(data) {
    artefactsStore.state.filters.setId = [...data.setId];
    artefactsStore.state.filters.mainStat = [...data.mainStat];
    artefactsStore.state.filters.subStat = [...data.subStat];
  },
  async handleCreate(data) {
    await artefactsStore.actions.create(data);
    state.showArtefactTransmuter = false;
  },
};

onBeforeMount(() => {
  artefactsStore.actions.resetFilters();
  [artefactsStore.state.current] = artefactsStore.artefactList.value;
});

onMounted(() => {
  if (!artefactsStore.artefactList.value.length) {
    state.showArtefactTransmuter = true;
  }
});
</script>

<style lang="scss" src="./ArtefactsTab.scss">
</style>
