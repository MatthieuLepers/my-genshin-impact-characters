<template>
  <aside :class="GenerateModifiers('artefact-filters', { visible: props.visible })">
    <h2>{{ t('App.ArtefactFilters.title') }}</h2>

    <MaterialForm class="artefact-filters__form">
      <MaterialFormFieldSet legend="Artefact set">
        <div class="frame-box frame-box--selected" v-for="(set, i) in form.set" :key="i">
          <img
            :src="set.getImage('flower')"
            alt=""
            class="artefactset-option__img"
          />
          {{ set.getI18n('name') }}
          <span>{{ artefactsStore.actions.getArtefactCountForSet(set.id) }}</span>
        </div>
        <button
          class="frame-box frame-box__selector"
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
            v-for="(stat, i) in State.validMainStats"
            :key="i"
            :class="GenerateModifiers('frame-box', {
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
            v-for="(stat, i) in State.validSubStats"
            :key="i"
            :class="GenerateModifiers('frame-box', {
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
          {{ !form.set.length && !form.mainStat.length && !form.subStat.length ? t('App.ArtefactFilters.resetCloseBtnLabel') : t('App.ArtefactFilters.resetBtnLabel') }}
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

    <ArtefactSetSelectorModal v-model="form.set" />
  </aside>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormFieldSet from '@renderer/components/Materials/Form/FieldSet.vue';
import ArtefactSetSelectorModal from '@renderer/components/MyGenshinImpactCharacters/ArtefactSet/SelectorModal.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { modalStore } from '@renderer/components/Materials/Modal/Store';

defineOptions({ name: 'ArtefactFilters' });

const { t } = useI18n();
const emit = defineEmits(['confirm', 'close']);

const props = defineProps({
  filters: { type: Object, default: () => ({}) },
  visible: { type: Boolean, default: false },
});

const form = reactive({
  type: [...(props.filters.type ?? [])],
  set: [...(props.filters.set ?? [])],
  mainStat: [...(props.filters.mainStat ?? [])],
  subStat: [...(props.filters.subStat ?? [])],
});

const state = reactive({
  currentPanel: 'mainStat',
});

const State = computed(() => {
  const validMainStats = ['HP', 'HP%', 'Atk', 'Atk%', 'Def%', 'EM', 'CritRate%', 'CritDmg%', 'Heal%', 'PyroDmg%', 'HydroDmg%', 'CryoDmg%', 'ElectroDmg%', 'AnemoDmg%', 'DendroDmg%', 'GeoDmg%', 'PhysicalDmg%'];
  const validSubStats = ['HP', 'HP%', 'Atk', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%'];
  const panelMenuData = [
    { id: 'mainStat', label: 'Main stat' },
    { id: 'subStat', label: 'Sub stat' },
  ];

  return {
    panelMenuData,
    validMainStats,
    validSubStats,
  };
});

const actions = {
  handleReset() {
    if (!form.set.length && !form.mainStat.length && !form.subStat.length) {
      emit('close');
    } else {
      form.set = [...(props.filters.set ?? [])];
      form.mainStat = [...(props.filters.mainStat ?? [])];
      form.subStat = [...(props.filters.subStat ?? [])];
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

watch(() => props.filters, (newVal) => {
  form.type = [...newVal.type ?? []];
  form.set = [...newVal.set ?? []];
  form.mainStat = [...(newVal.mainStat ?? [])];
  form.subStat = [...(newVal.subStat ?? [])];
}, { deep: true });
</script>

<style lang="scss" src="./Filters.scss">
</style>
