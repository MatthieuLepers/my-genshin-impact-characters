<template>
  <MaterialModal
    name="artefactSetModal"
    :title="t('App.ArtefactFilters.modal.title')"
    :refuseLabel="t('App.ArtefactFilters.modal.refuseLabel')"
    :acceptLabel="t('App.ArtefactFilters.modal.acceptLabel')"
    @accept="actions.handleAccept"
    @refuse="actions.handleRefuse"
  >
    <ul>
      <li v-for="(option, i) in State.setList" :key="i">
        <ArtefactSetOption
          v-model="state.selectedSets"
          :option="option"
          :showCount="true"
        />
      </li>
    </ul>
  </MaterialModal>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import ArtefactSetOption from '@renderer/components/MyGenshinImpactCharacters/ArtefactSet/Option.vue';

import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';

const { t } = useI18n();

const modelValue = defineModel({ type: Array });

const state = reactive({
  selectedSets: [],
});

const State = computed(() => ({
  setList: Object
    .values(artefactSetsStore.state.sets)
    .sort((a, b) => b.rarity - a.rarity || b.releasedAt.getTime() - a.releasedAt.getTime() || a.getI18n('name').localeCompare(b.getI18n('name')))
    .map((set) => ({
      value: set,
      label: set.getI18n('name'),
    })),
}));

const actions = {
  handleAccept() {
    modelValue.value = state.selectedSets;
  },
  handleRefuse() {
    state.selectedSets = [];
  },
};
</script>

<style lang="scss" src="./SelectorModal.scss">
</style>
