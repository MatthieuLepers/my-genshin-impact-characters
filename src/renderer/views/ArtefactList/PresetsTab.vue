<template>
  <div class="PresetsTab">
    <ul class="PresetsTabList">
      <li class="PresetsTabListItem">
        <MaterialForm>
          <MaterialFormFieldSet>
            <template #legend>
              <MaterialFormInput
                v-model="form.name"
                :placeholder="t('App.Artefact.PresetList.formPlaceholder')"
              />
              <div class="PresetsTabButtons">
                <MaterialButton
                  v-if="form.flower || form.feather || form.sands || form.goblet || form.circlet"
                  icon="icon-reload"
                  :modifiers="{ danger: true }"
                  :title="t('App.Artefact.PresetList.formResetBtnLabel')"
                  @click="actions.handleResetForm"
                />
                <MaterialButton
                  v-if="form.flower && form.feather && form.sands && form.goblet && form.circlet"
                  icon="icon-edit"
                  :modifiers="{ secondary: true }"
                  :title="t('App.Artefact.PresetList.formEditBtnLabel')"
                  @click="state.showArtefactSelectorPanel = true"
                />
                <MaterialButton
                  :disabled="form.name.length === 0 || !form.flower || !form.feather || !form.sands || !form.goblet || !form.circlet"
                  icon="icon-check"
                  :modifiers="{ success: true }"
                  :title="t('App.Artefact.PresetList.formCreateBtnLabel')"
                  @click="actions.handleClickCreate"
                />
              </div>
            </template>
            <MaterialFormFieldLine :size="5">
              <template
                v-for="(type, i) in ['flower', 'feather', 'sands', 'goblet', 'circlet']"
                v-slot:[`field${i}`]
                :key="type"
              >
                <button
                  v-if="!form[type]"
                  type="button"
                  class="ArtefactButton"
                  @click="actions.handleChooseArtefactType(type)"
                >
                  <img :src="image(`img/ui/${type}.png`)" alt="" />
                  <span>{{ t('App.Artefact.PresetList.formChooseBtnLabel') }}</span>
                </button>
                <Artefact
                  v-else
                  :artefact="form[type]"
                  :selected="artefactsStore.state.current.id === form[type].id"
                  @click="artefactsStore.state.current = form[type]"
                />
              </template>
            </MaterialFormFieldLine>
          </MaterialFormFieldSet>
        </MaterialForm>
      </li>
      <li
        class="PresetsTabListItem"
        v-for="(set, i) in Object.values(artefactPresetsStore.state.sets)"
        :key="i"
      >
        <ArtefactPreset
          :preset="set"
          :showDelete="true"
          :showEdit="true"
          :showSave="true"
          @edit="actions.handleClickEdit"
        />
      </li>
    </ul>

    <ArtefactCard
      class="PresetsTabCard"
      v-if="State.displayCard"
      :showExport="false"
      :showEdit="false"
      :showDelete="false"
    />

    <ArtefactSelectorPanel
      v-model="state.showArtefactSelectorPanel"
      :formData="State.form"
      @submit="actions.handleSubmit"
    />
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormFieldSet from '@renderer/components/Materials/Form/FieldSet.vue';
import ArtefactCard from '@renderer/components/MyGenshinImpactCharacters/ArtefactCard.vue';
import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact.vue';
import ArtefactSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/ArtefactSelectorPanel.vue';
import ArtefactPreset from '@renderer/components/MyGenshinImpactCharacters/ArtefactPreset.vue';

import { image } from '@renderer/core/utils';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';

const { t } = useI18n();

const form = reactive({
  name: '',
  flower: null,
  feather: null,
  sands: null,
  goblet: null,
  circlet: null,
});

const state = reactive({
  showArtefactSelectorPanel: false,
  edit: false,
});

const State = computed(() => ({
  displayCard: (artefactPresetsStore.state.current && artefactsStore.state.current)
    || ((form.flower || form.feather || form.sands || form.goblet || form.circlet) && artefactsStore.state.current),
  form: state.edit ? artefactPresetsStore.state.current : form,
}));

const actions = {
  handleChooseArtefactType(type) {
    artefactsStore.state.filters.type = [type];
    state.showArtefactSelectorPanel = true;
  },
  handleSubmit(formData) {
    if (!state.edit) {
      form.flower = formData.flower;
      form.feather = formData.feather;
      form.sands = formData.sands;
      form.goblet = formData.goblet;
      form.circlet = formData.circlet;
    } else {
      artefactPresetsStore.state.current.flowerId = formData.flower.id;
      artefactPresetsStore.state.current.featherId = formData.feather.id;
      artefactPresetsStore.state.current.sandsId = formData.sands.id;
      artefactPresetsStore.state.current.gobletId = formData.goblet.id;
      artefactPresetsStore.state.current.circletId = formData.circlet.id;
      state.edit = false;
    }
  },
  handleResetForm() {
    form.name = '';
    form.flower = null;
    form.feather = null;
    form.sands = null;
    form.goblet = null;
    form.circlet = null;
  },
  async handleClickCreate() {
    const { name, flower, feather, sands, goblet, circlet } = form;
    await artefactPresetsStore.actions.create({
      name,
      flowerId: flower.id,
      featherId: feather.id,
      sandsId: sands.id,
      gobletId: goblet.id,
      circletId: circlet.id,
    });
    actions.handleResetForm();
  },
  handleClickEdit() {
    state.edit = true;
    state.showArtefactSelectorPanel = true;
  },
};

onBeforeMount(() => {
  artefactsStore.state.filters.type = ['flower'];
  artefactsStore.state.current = artefactPresetsStore.state.current?.flower ?? artefactsStore.artefactList.value[0];
});
</script>

<style lang="scss" src="./PresetsTab.scss">
</style>
