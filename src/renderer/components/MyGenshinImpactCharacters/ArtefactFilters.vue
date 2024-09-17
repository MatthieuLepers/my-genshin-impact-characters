<template>
  <aside :class="GenerateModifiers('ArtefactFilters', { visible: props.visible })">
    <h2>{{ t('App.ArtefactFilters.title') }}</h2>

    <MaterialForm class="ArtefactFiltersForm">
      <MaterialFormFieldSet legend="Artefact set">
        <div class="FrameBox FrameBox--selected" v-for="(id, i) in form.setId" :key="i">
          <img
            :src="image(`img/artefacts/${id}/flower.webp`)"
            alt=""
            class="artefactset-option__img"
          />
          {{ t(`Data.ArtefactSets.${id}.name`) }}
          <span>{{ artefactsStore.actions.getArtefactCountForSet(id) }}</span>
        </div>
        <button
          class="FrameBox FrameBoxSelector"
          type="button"
          @click="modalStore.actions.show('artefactSetModal')"
        >+</button>
      </MaterialFormFieldSet>

      <MaterialFormFieldSet>
        <template #legend>
          <PanelMenu
            v-model="state.currentPanel"
            :data="State.panelMenuData"
          />
        </template>
        <div v-if="state.currentPanel === 'mainStat'">
          <div
            v-for="(stat, i) in Object.keys(tm('App.Artefact.stats'))"
            :key="i"
            :class="GenerateModifiers('FrameBox', {
              checked: form.mainStat.includes(stat),
              button: true,
            })"
            @click="actions.handleClickMainStat($event, stat)"
          >
            <input
              type="checkbox"
              name="mainStat"
              :value="stat"
              :checked="form.mainStat.includes(stat)"
              :id="`mainStat${i}`"
            />
            <label :for="`mainStat${i}`">
              {{ t(`App.Artefact.stats.${stat}.long`) }}
            </label>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(stat, i) in ['HP', 'HP%', 'Atk', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%']"
            :key="i"
            :class="GenerateModifiers('FrameBox', {
              checked: form.subStat.includes(stat),
              button: true,
            })"
            @click="actions.handleClickSubStat($event, stat)"
          >
            <input
              type="checkbox"
              name="subStat"
              :value="stat"
              :checked="form.subStat.includes(stat)"
              :id="`subStat${i}`"
            />
            <label :for="`subStat${i}`">
              {{ t(`App.Artefact.stats.${stat}.long`) }}
            </label>
          </div>
        </div>
      </MaterialFormFieldSet>
    </MaterialForm>

    <MaterialFormFieldLine :size="2">
      <template #field0>
        <MaterialButton
          icon="icon-reload"
          :modifiers="{ danger: true }"
          @click="actions.handleReset"
        >
          {{ !form.setId.length && !form.mainStat.length && !form.subStat.length ? t('App.ArtefactFilters.resetCloseBtnLabel') : t('App.ArtefactFilters.resetBtnLabel') }}
        </MaterialButton>
      </template>
      <template #field1>
        <MaterialButton
          icon="icon-check"
          :modifiers="{ secondary: true }"
          @click="actions.handleClickConfirm"
        >
          {{ t('App.ArtefactFilters.confirmBtnLabel') }}
        </MaterialButton>
      </template>
    </MaterialFormFieldLine>

    <ArtefactSetSelectorModal v-model="form.setId" />
  </aside>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormFieldSet from '@renderer/components/Materials/Form/FieldSet.vue';
import ArtefactSetSelectorModal from '@renderer/components/MyGenshinImpactCharacters/ArtefactSetSelectorModal.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { image } from '@renderer/core/utils';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';

const { t, tm } = useI18n();
const emit = defineEmits(['confirm', 'close']);

const props = defineProps({
  filters: { type: Object, default: () => ({}) },
  visible: { type: Boolean, default: false },
});

const form = reactive({
  type: props.filters.type ?? [],
  setId: props.filters.setId ?? [],
  mainStat: props.filters.mainStat ?? [],
  subStat: props.filters.subStat ?? [],
});

const state = reactive({
  currentPanel: 'mainStat',
});

const State = computed(() => ({
  panelMenuData: [
    { id: 'mainStat', label: 'Main stat' },
    { id: 'subStat', label: 'Sub stat' },
  ],
}));

const actions = {
  handleReset() {
    if (!form.setId.length && !form.mainStat.length && !form.subStat.length) {
      emit('close');
    } else {
      form.setId = props.filters.setId ?? [];
      form.mainStat = props.filters.mainStat ?? [];
      form.subStat = props.filters.subStat ?? [];
      emit('confirm', { ...form });
    }
  },
  handleClickConfirm() {
    emit('confirm', { ...form });
    emit('close');
  },
  handleClickMainStat(e, stat) {
    const target = e.target.querySelector('input');
    if (target.checked) {
      form.mainStat = form.mainStat.filter((s) => s !== stat);
    } else {
      form.mainStat.push(stat);
    }
  },
  handleClickSubStat(e, stat) {
    const target = e.target.querySelector('input');
    if (target.checked) {
      form.subStat = form.subStat.filter((s) => s !== stat);
    } else {
      form.subStat.push(stat);
    }
  },
};
</script>

<style lang="scss" src="./ArtefactFilters.scss">
</style>
