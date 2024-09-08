<template>
  <aside
    v-if="artefactsStore.state.current"
    :class="GenerateModifiers('ArtefactCard', { edit: state.edit })"
  >
    <div>
      <div class="ArtefactCardHeader">
        {{ t(`App.Artefact.type.${artefactsStore.state.current.type}`) }}
        <img :src="image(`img/artefacts/${artefactsStore.state.current.setId}/${artefactsStore.state.current.type}.webp`)" alt="" />
        <div class="ArtefactCardMainStat" v-if="!state.edit">
          {{ t(`App.Artefact.display.${artefactsStore.state.current.statsJson[0].name}`) }}
          <span>{{ artefactsStore.state.current.statsJson[0].value }}{{ artefactsStore.state.current.statsJson[0].name.endsWith('%') ? '%' : '' }}</span>
        </div>
        <FormAffixInput
          v-else
          v-model="form.statsJson[0]"
          class="ArtefactCardMainStat"
        />
      </div>
      <span
        v-show="!state.edit"
        class="ArtefactCardLevel"
      >
        +{{ artefactsStore.state.current.level }}
      </span>
      <span>{{ artefactsStore.state.current.rollAmount }} / 5 rolls</span>
      <ul :class="GenerateModifiers('ArtefactCardSubStatList', { edit: state.edit })">
        <li v-for="(stat, i) in artefactsStore.state.current.statsJson.slice(1)" :key="i">
          <ArtefactSubStat
            v-if="!state.edit"
            v-model="state.expandedSubStat"
            :stat="stat"
            :level="artefactsStore.state.current.level"
          />
          <FormAffixInput
            v-else
            v-model="form.statsJson[1 + i]"
          />
        </li>
      </ul>
    </div>

    <div
      v-if="props.showEdit || props.showDelete || props.showExport || props.showSelect"
      class="ArtefactCardButtons"
    >
      <MaterialButton
        v-if="!state.edit && props.showEdit"
        type="button"
        icon="icon-edit"
        :modifiers="{ secondary: true }"
        @click="actions.handleEdit"
      >
        {{ t('App.Artefact.List.editBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-else-if="props.showEdit"
        type="button"
        icon="icon-check"
        :modifiers="{ success: true }"
        @click="actions.handleUpdate"
      >
        {{ t('App.Artefact.List.saveBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-if="!state.edit && props.showDelete"
        type="button"
        icon="icon-delete"
        :modifiers="{ danger: true }"
        @click="modalStore.actions.show('artefactDestroyModal')"
      >
        {{ t('App.Artefact.List.deleteBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-if="!state.edit && props.showExport"
        type="button"
        icon="icon-export"
        :modifiers="{ cancel: true }"
        @click="actions.handleClickExport"
      >
        {{ t('App.Artefact.List.exportBtnLabel') }}
      </MaterialButton>
      <MaterialButton
        v-if="!state.edit && props.showSelect"
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
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import FormAffixInput from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/FormAffixInput.vue';
import ArtefactSubStat from '@renderer/components/MyGenshinImpactCharacters/ArtefactSubStat.vue';

import { image } from '@renderer/core/utils';
import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { artefactsStore } from '@renderer/core/entities/artefact/store';

const { t } = useI18n();
const emit = defineEmits(['select']);

const props = defineProps({
  showExport: { type: Boolean, default: true },
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: true },
  showSelect: { type: Boolean, default: false },
});

const form = reactive({
  setId: null,
  type: null,
  statsJson: [],
});

const state = reactive({
  edit: false,
  expandedSubStat: null,
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
  async handleUpdate() {
    await artefactsStore.actions.update({ ...artefactsStore.state.current, ...form });
    state.edit = false;
  },
  async handleDelete() {
    await artefactsStore.actions.destroy();
  },
  handleEdit() {
    state.edit = true;
    const { setId, type, statsJson } = artefactsStore.state.current;
    form.setId = setId;
    form.type = type;
    form.statsJson = statsJson.map((s) => ({ ...s }));
  },
};
</script>

<style lang="scss" src="./ArtefactCard.scss">
</style>
