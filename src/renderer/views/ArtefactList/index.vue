<template>
  <main class="View ArtefactListView ArtefactsTab">
    <div
      v-if="!state.showArtefactTransmuter && !state.edit"
      class="ArtefactsTabContainer"
    >
      <ul class="ArtefactsTabList">
        <li
          v-for="(artefact, i) in artefactsStore.artefactList.value"
          :key="i"
          class="ArtefactsTabListItem"
        >
          <Artefact
            :artefact="artefact"
            :selected="artefact.id === artefactsStore.state.current.id"
            :modifiers="{ tiny: true }"
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

      <ArtefactDetails
        v-if="artefactsStore.state.current"
        @edit="actions.handleEdit"
      />

      <ArtefactFilters
        :filters="props.filters"
        :visible="state.showArtefactFilters"
        @confirm="actions.handleApplyFilters"
        @close="state.showArtefactFilters = false"
      />
    </div>

    <ArtefactTransmuter
      v-else-if="state.showArtefactTransmuter || state.edit"
      class="ArtefactListTransmuter"
      :formData="state.edit ? artefactsStore.state.current : {}"
      :allowClose="artefactsStore.artefactList.value.length > 0"
      :showImport="!artefactsStore.artefactList.value.length"
      @close="actions.handleClose"
      @import="actions.handleClickImport"
      @submit="actions.handleSubmit"
    />
  </main>
</template>

<script setup>
import { reactive, onBeforeMount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact/index.vue';
import ArtefactFilters from '@renderer/components/MyGenshinImpactCharacters/Artefact/Filters.vue';
import ArtefactDetails from '@renderer/components/MyGenshinImpactCharacters/Artefact/Details.vue';
import ArtefactTransmuter from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/index.vue';

import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';

defineOptions({ name: 'ArtefactListView' });

const { t } = useI18n();

const props = defineProps({
  filters: { type: Object, default: () => ({}) },
});

const state = reactive({
  showArtefactFilters: false,
  showArtefactTransmuter: false,
  edit: false,
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
      state.showArtefactTransmuter = false;
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
    artefactsStore.state.filters.set = [...data.set];
    artefactsStore.state.filters.mainStat = [...data.mainStat];
    artefactsStore.state.filters.subStat = [...data.subStat];
  },
  async handleSubmit(data) {
    if (state.edit) {
      artefactsStore.state.current.setId = data.set.id;
      artefactsStore.state.current.type = data.type;
      artefactsStore.state.current.statsJson = data.statsJson;
      await artefactsStore.state.current.save();
      state.edit = false;
    } else {
      await artefactsStore.actions.create(data);
    }
    notificationStore.actions.success('Saved');
  },
  handleEdit() {
    state.showArtefactTransmuter = true;
    state.edit = true;
  },
  handleClose() {
    state.showArtefactTransmuter = false;
    state.edit = false;
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

<style lang="scss" src="./index.scss">
</style>
