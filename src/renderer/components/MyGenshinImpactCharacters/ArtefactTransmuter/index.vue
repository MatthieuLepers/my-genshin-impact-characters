<template>
  <section class="artefact-transmuter">
    <MaterialForm class="artefact-transmuter__form" @submit.prevent="actions.handleSubmit">
      <ul class="artefact-transmuter__sets">
        <li
          v-for="option in State.setList"
          :key="option.value"
          class="artefact-transmuter__sets-item"
        >
          <ArtefactSetOption v-model="v$.setId.$model" :option="option" />
        </li>
      </ul>
      <div class="artefact-transmuter__editor">
        <PanelMenu
          v-model="v$.type.$model"
          class="artefact-transmuter__type-selector"
          :data="State.panelMenuData"
        >
          <template #button="{ item }">
            <span v-icon:[item.id] />
          </template>
          <template #[form.type]>
            <div class="artefact-transmuter__preview">
              <div class="artefact-infos">
                <span :class="`icon-${form.type}`">
                  {{ t(`App.Artefact.type.${form.type}`) }}
                </span>
                <span>★★★★★</span>
              </div>
              <img
                class="artefact-preview"
                :src="image(`img/artefacts/${form.setId}/${form.type}.webp`)"
                :alt="t(`Data.ArtefactSets.${form.setId}.name`)"
              />
            </div>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[0]"
                :getText="actions.getText(form.statsJson[0])"
                :type="form.type"
                @click="actions.handleClickAffix(true)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[1]"
                :getText="actions.getText(form.statsJson[1])"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[2]"
                :getText="actions.getText(form.statsJson[2])"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[3]"
                :getText="actions.getText(form.statsJson[3])"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[4]"
                :getText="actions.getText(form.statsJson[4])"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
          </template>
        </PanelMenu>

        <MaterialFormFieldLine :size="3" class="artefact-transmuter__submit-area">
          <template #field1 v-if="props.allowClose">
            <MaterialButton
              type="button"
              icon="icon-close"
              :modifiers="{ danger: true }"
              @click="emit('close')"
            >
              {{ t('App.ArtefactTransmuter.closeBtnLabel') }}
            </MaterialButton>
          </template>
          <template #field2>
            <MaterialButton
              type="submit"
              icon="icon-check"
              :disabled="v$.$invalid"
              :modifiers="{ success: true }"
            >
              {{ t('App.ArtefactTransmuter.saveBtnLabel') }}
            </MaterialButton>
          </template>
        </MaterialFormFieldLine>
      </div>
    </MaterialForm>

    <AffixSelectorPanel
      v-model="v$.statsJson.$model"
      :type="form.type"
      :main="state.main"
      :visible="state.affixPanelVisible"
      @close="state.affixPanelVisible = false"
    />
  </section>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  onBeforeMount,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import ArtefactSetOption from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/ArtefactSetOption.vue';
import ArtefactAffix from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/ArtefactAffix.vue';
import AffixSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/AffixSelectorPanel.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { image } from '@renderer/core/utils';
import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';
import StatRangeEnum from '@renderer/core/entities/artefact/StatRangeEnum';

defineOptions({ name: 'ArtefactTransmuter' });

const { t } = useI18n();
const emit = defineEmits(['submit', 'close']);

const props = defineProps({
  formData: { type: Object, default: () => ({}) },
  allowClose: { type: Boolean, default: true },
});

const form = reactive({
  setId: props.formData.setId ?? null,
  type: props.formData.type ?? 'flower',
  statsJson: props.formData.statsJson ?? [
    { name: 'HP', value: StatRangeEnum.main.HP.max, main: true },
  ],
});
const rules = {
  setId: { required },
  type: {
    valid: (val) => ['flower', 'feather', 'sands', 'goblet', 'circlet'].includes(val),
  },
  statsJson: {
    valid: (val) => val.length === 5,
  },
};
const v$ = useVuelidate(rules, form, { $scope: 'artefactTransmuter' });

const state = reactive({
  affixPanelVisible: false,
  currentMenu: 'flower',
  main: false,
});

const State = computed(() => ({
  setList: Object
    .values(artefactSetsStore.state.sets)
    .sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime() || t(`Data.ArtefactSets.${a.id}.name`).localeCompare(t(`Data.ArtefactSets.${b.id}.name`)))
    .map((set) => ({
      value: set.id,
      label: t(`Data.ArtefactSets.${set.id}.name`),
    })),
  panelMenuData: [
    { id: 'flower' },
    { id: 'feather' },
    { id: 'sands' },
    { id: 'goblet' },
    { id: 'circlet' },
  ],
}));

const actions = {
  handleSubmit() {
    emit('submit', { ...form });
    form.setId = State.value.setList[0].value;
    form.type = 'flower';
    form.statsJson = [
      {
        name: 'HP',
        value: StatRangeEnum.main.HP.max,
        main: true,
      },
    ];
  },
  handleClickAffix(isMain) {
    state.affixPanelVisible = true;
    state.main = isMain;
  },
  getText(stat) {
    return stat?.name?.endsWith('%')
      ? (val) => Math.round(val * 10) / 10
      : Math.round
    ;
  },
};

watch(() => form.type, () => {
  if (['flower', 'feather'].includes(form.type) && !State.value.isEditMode) {
    const data = {
      flower: 'HP',
      feather: 'Atk',
    };
    form.statsJson = [
      {
        name: data[form.type],
        value: StatRangeEnum.main[data[form.type]].max,
        main: true,
      },
    ];
  } else {
    form.statsJson = [];
  }
});

watch(() => props.formData, (newVal) => {
  form.setId = newVal.setId ?? null;
  form.type = newVal.type ?? 'flower';
  form.statsJson = newVal.statsJson ?? [
    { name: 'HP', value: StatRangeEnum.main.HP.max, main: true },
  ];
});

onBeforeMount(() => {
  form.setId = props.formData.setId ?? State.value.setList[0].value;
  form.statsJson = props.formData.statsJson ?? [
    {
      name: 'HP',
      value: StatRangeEnum.main.HP.max,
      main: true,
    },
  ];
});
</script>

<style lang="scss" src="./index.scss">
</style>
