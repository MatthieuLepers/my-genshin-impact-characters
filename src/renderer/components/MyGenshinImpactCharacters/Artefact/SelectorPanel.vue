<template>

<MaterialForm
  :class="GenerateModifiers('artefact-selector-panel', { open: modelValue })"
  @submit.prevent="actions.handleSubmit"
>
    <div class="artefact-selector-panel__container">
      <PanelMenu
        v-model="artefactsStore.state.filters.type[0]"
        :data="State.panelMenuData"
      >
        <template #button="{ item }">
          <span v-icon:[item.id] />
        </template>
        <template #[artefactsStore.state.filters.type[0]]>
          <div class="artefact-selector-panel__container-sub">
            <ul class="artefact-selector-panel__list">
              <li
                v-for="(artefact, i) in artefactsStore.artefactList.value"
                :key="i"
                class="artefact-selector-panel__list-item"
              >
                <Artefact
                  :artefact="artefact"
                  :selected="artefactsStore.state.current?.id === artefact.id"
                  :modifiers="{ checked: form[artefactsStore.state.filters.type] === artefact }"
                  @click="artefactsStore.state.current = artefact"
                  @dblclick="form[artefactsStore.state.filters.type] = artefact"
                />
              </li>
            </ul>

            <MaterialFormFieldLine :size="4">
              <template #field2>
                <MaterialButton
                  icon="icon-close"
                  :modifiers="{ danger: true }"
                  @click="modelValue = false"
                >
                  {{ t('App.Artefact.PresetList.closeBtnLabel') }}
                </MaterialButton>
              </template>
              <template #field3>
                <MaterialButton
                  type="submit"
                  icon="icon-check"
                  :modifiers="{ success: true }"
                  @click="modelValue = false"
                >
                  {{ t('App.Artefact.PresetList.confirmBtnLabel') }}
                </MaterialButton>
              </template>
            </MaterialFormFieldLine>
          </div>
        </template>
      </PanelMenu>
    </div>

    <ArtefactDetails
      :showEdit="false"
      :showDelete="false"
      :showExport="false"
      :showSelect="form[artefactsStore.state.filters.type] !== artefactsStore.state.current"
      @select="actions.handleSelectArtfact"
    />
  </MaterialForm>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import Artefact from '@renderer/components/MyGenshinImpactCharacters/Artefact/index.vue';
import ArtefactDetails from '@renderer/components/MyGenshinImpactCharacters/Artefact/Details.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { artefactsStore } from '@renderer/core/entities/artefact/store';

defineOptions({ name: 'ArtefactSelectorPanel' });

const { t } = useI18n();
const emit = defineEmits(['submit']);

const modelValue = defineModel({ type: Boolean, default: false });

const props = defineProps({
  formData: { type: Object, default: () => ({}) },
});

const form = reactive({
  flower: props.formData.flower ?? null,
  feather: props.formData.feather ?? null,
  sands: props.formData.sands ?? null,
  goblet: props.formData.goblet ?? null,
  circlet: props.formData.circlet ?? null,
});

const State = computed(() => ({
  panelMenuData: [
    { id: 'flower' },
    { id: 'feather' },
    { id: 'sands' },
    { id: 'goblet' },
    { id: 'circlet' },
  ],
}));

const actions = {
  handleChooseArtefactType(type) {
    artefactsStore.state.filters.type = [type];
    modelValue.value = true;
  },
  handleSelectArtfact() {
    form[artefactsStore.state.filters.type] = artefactsStore.state.current;
  },
  handleSubmit() {
    emit('submit', { ...form });
    form.flower = null;
    form.feather = null;
    form.sands = null;
    form.goblet = null;
    form.circlet = null;
  },
};

watch(() => artefactsStore.state.filters.type[0], () => {
  if (!form[artefactsStore.state.filters.type]) {
    [artefactsStore.state.current] = artefactsStore.artefactList.value;
  } else {
    artefactsStore.state.current = form[artefactsStore.state.filters.type];
  }
  if (!form.flower) form.flower = props.formData.flower;
  if (!form.feather) form.feather = props.formData.feather;
  if (!form.sands) form.sands = props.formData.sands;
  if (!form.goblet) form.goblet = props.formData.goblet;
  if (!form.circlet) form.circlet = props.formData.circlet;
});

watch(() => props.formData, (newVal) => {
  form.flower = newVal.flower;
  form.feather = newVal.feather;
  form.sands = newVal.sands;
  form.goblet = newVal.goblet;
  form.circlet = newVal.circlet;
});
</script>

<style lang="scss" src="./SelectorPanel.scss">
</style>
