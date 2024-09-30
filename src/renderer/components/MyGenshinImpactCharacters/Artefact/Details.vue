<template>
  <aside
    v-if="artefactsStore.state.current"
    class="artefact-details"
  >
    <div>
      <div class="artefact-details__header">
        <span :class="`icon-${artefactsStore.state.current.type}`">
          {{ t(`App.Artefact.type.${artefactsStore.state.current.type}`) }}
        </span>
        <img :src="artefactsStore.state.current.image" alt="" />
        <div class="artefact-details__main-stat">
          <span :class="`icon-${formatAffix(artefactsStore.state.current.statsJson[0].name)}`">
            {{ t(`App.Artefact.stats.${artefactsStore.state.current.statsJson[0].name}.short`) }}
          </span>
          <span class="artefact-details__main-stat__value">
            {{ artefactsStore.state.current.statsJson[0].value }}{{ artefactsStore.state.current.statsJson[0].name.endsWith('%') ? '%' : '' }}
          </span>
        </div>
      </div>
      <span
        class="artefact-details__level"
      >
        +{{ artefactsStore.state.current.level }}
      </span>
      <ul class="artefact-details__sub-stat-list">
        <li v-for="(stat, i) in artefactsStore.state.current.statsJson.slice(1)" :key="i">
          <ArtefactSubStat :stat="stat" />
        </li>
      </ul>
    </div>

    <div
      v-if="props.showEdit || props.showDelete || props.showExport || props.showSelect"
      class="artefact-details__buttons"
    >
      <MaterialButton
        v-if="props.showEdit"
        type="button"
        icon="icon-edit"
        :modifiers="{ secondary: true }"
        @click="emit('edit')"
      >
        {{ t('App.Artefact.List.editBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-if="props.showDelete"
        type="button"
        icon="icon-delete"
        :modifiers="{ danger: true }"
        @click="modalStore.actions.show('artefactDestroyModal')"
      >
        {{ t('App.Artefact.List.deleteBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-if="props.showExport"
        type="button"
        icon="icon-export"
        :modifiers="{ cancel: true }"
        @click="actions.handleClickExport"
      >
        {{ t('App.Artefact.List.exportBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-if="props.showSelect"
        type="button"
        icon="icon-check"
        :modifiers="{ success: true }"
        @click="emit('select')"
      >
        {{ t('App.Artefact.List.selectBtnLabel') }}
      </MaterialButton>
    </div>

    <MaterialModal
      v-if="props.showDelete"
      name="artefactDestroyModal"
      :title="t('App.Artefact.List.modal.title')"
      :acceptLabel="t('App.Artefact.List.modal.acceptLabel')"
      :refuseLabel="t('App.Artefact.List.modal.refuseLabel')"
      @accept="actions.handleDelete"
    >
      {{ t('App.Artefact.List.modal.content') }}
    </MaterialModal>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import ArtefactSubStat from '@renderer/components/MyGenshinImpactCharacters/Artefact/SubStat.vue';

import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { artefactsStore } from '@renderer/core/entities/artefact/store';

defineOptions({ name: 'ArtefactDetails' });

const { t } = useI18n();
const emit = defineEmits(['select', 'edit']);
const formatAffix = (val) => val.toLowerCase().replace('%', '');

const props = defineProps({
  showExport: { type: Boolean, default: true },
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: true },
  showSelect: { type: Boolean, default: false },
});

const actions = {
  async handleClickExport() {
    const dialogOptions = {
      title: t('Electron.Dialog.saveFile.title'),
      buttonLabel: t('Electron.Dialog.saveFile.buttonLabel'),
      defaultPath: `${api.homedir}/Desktop/${t(`App.Artefact.type.${artefactsStore.state.current.type}`)}.json`,
      filters: [
        {
          name: t('Electron.Dialog.filters.json'),
          extensions: ['json'],
        },
      ],
      properties: [],
    };
    await artefactsStore.actions.requestExport(dialogOptions);
  },
  async handleDelete() {
    await artefactsStore.actions.destroy();
  },
};
</script>

<style lang="scss" src="./Details.scss">
</style>
