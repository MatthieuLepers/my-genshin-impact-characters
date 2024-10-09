<template>
  <MaterialFormFieldSet class="artefact-preset">
    <template #legend>
      <slot name="legend">
        <MaterialFormInput
          v-model="props.preset.name"
          :placeholder="t('App.Artefact.PresetList.placeholder')"
        />
        <div class="artefact-preset__buttons" v-if="props.showDelete || props.showEdit || props.showSave">
          <MaterialButton
            v-if="props.showDelete"
            icon="icon-delete"
            :modifiers="{ danger: true }"
            :title="t('App.Artefact.PresetList.formDeleteBtnLabel')"
            @click="actions.handleClickDelete"
          />
          <MaterialButton
            v-if="props.showEdit"
            icon="icon-edit"
            :modifiers="{ secondary: true }"
            :title="t('App.Artefact.PresetList.formEditBtnLabel')"
            @click="actions.handleClickEdit"
          />
          <MaterialButton
            v-if="props.showSave"
            :disabled="props.preset.name.length === 0 || !props.preset.flower || !props.preset.feather || !props.preset.sands || !props.preset.goblet || !props.preset.circlet"
            icon="icon-check"
            :modifiers="{ success: true }"
            :title="t('App.Artefact.PresetList.formSaveBtnLabel')"
            @click="actions.handleClickSave"
          />
        </div>
      </slot>
    </template>
    <MaterialFormFieldLine :size="5">
      <template
        v-for="(type, i) in ['flower', 'feather', 'sands', 'goblet', 'circlet']"
        v-slot:[`field${i}`]
        :key="type"
      >
        <Artefact
          v-if="props.preset[type]"
          :artefact="props.preset[type]"
          :selected="artefactsStore.state.current.id === props.preset[`${type}Id`]"
          @click="artefactsStore.state.current = props.preset[type]"
        />
      </template>
    </MaterialFormFieldLine>
  </MaterialFormFieldSet>

  <MaterialModal
    name="presetDestroyModal"
    :title="t('App.Artefact.PresetList.modal.title')"
    :refuseLabel="t('App.Artefact.PresetList.modal.refuseLabel')"
    :acceptLabel="t('App.Artefact.PresetList.modal.acceptLabel')"
    @confirm="actions.handleConfirmDelete"
  >
    {{ t('App.Artefact.PresetList.modal.content') }}
  </MaterialModal>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormFieldSet from '@renderer/components/Materials/Form/FieldSet.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact/index.vue';

import ArtefactPreset from '@renderer/core/entities/artefactPreset';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';

defineOptions({ name: 'ArtefactPreset' });

const { t } = useI18n();
const emit = defineEmits(['delete', 'edit', 'save']);

const props = defineProps({
  preset: { type: ArtefactPreset },
  showDelete: { type: Boolean, default: false },
  showEdit: { type: Boolean, default: false },
  showSave: { type: Boolean, default: false },
});

const actions = {
  handleClickEdit() {
    artefactPresetsStore.state.current = props.preset;
    artefactsStore.state.current = props.preset.flower;
    emit('edit');
  },
  handleClickDelete() {
    artefactPresetsStore.state.current = props.preset;
    modalStore.actions.show('presetDestroyModal');
  },
  async handleConfirmDelete() {
    await artefactPresetsStore.actions.destroy();
    emit('delete');
  },
  async handleClickSave() {
    notificationStore.actions.success(t('App.Artefact.PresetList.saved'));
    await props.preset.save();
    emit('save');
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
