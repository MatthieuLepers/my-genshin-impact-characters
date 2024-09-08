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
            <img :src="image(`img/ui/${item.id}.png`)" :alt="item.id" />
          </template>
        </PanelMenu>

        <div class="artefact-transmuter__preview">
          <div class="artefact-infos">
            {{ t(`App.Artefact.type.${form.type}`) }}
            <span>★★★★★</span>
          </div>
          <img
            class="artefact-preview"
            :src="image(`img/artefacts/${form.setId}/${form.type}.webp`)"
            :alt="t(`Data.ArtefactSets.${form.setId}.name`)"
          />
        </div>
        <MaterialFormFieldLine :size="2">
          <template #field0>
            <ArtefactAffix
              v-model="v$.statsJson.$model[0]"
              :type="form.type"
              @click="state.affixPanelVisible = true"
            />
          </template>
        </MaterialFormFieldLine>
        <MaterialFormFieldLine :size="2">
          <template #field0>
            <ArtefactAffix
              v-model="v$.statsJson.$model[1]"
              @click="state.affixPanelVisible = true"
            />
          </template>
          <template #field1>
            <ArtefactAffix
              v-model="v$.statsJson.$model[2]"
              @click="state.affixPanelVisible = true"
            />
          </template>
        </MaterialFormFieldLine>
        <MaterialFormFieldLine :size="2">
          <template #field0>
            <ArtefactAffix
              v-model="v$.statsJson.$model[3]"
              @click="state.affixPanelVisible = true"
            />
          </template>
          <template #field1>
            <ArtefactAffix
              v-model="v$.statsJson.$model[4]"
              @click="state.affixPanelVisible = true"
            />
          </template>
        </MaterialFormFieldLine>

        <MaterialFormFieldLine :size="3" class="artefact-transmuter__submit-area">
          <template #field1>
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
              {{ t('App.ArtefactTransmuter.createBtnLabel') }}
            </MaterialButton>
          </template>>
        </MaterialFormFieldLine>
      </div>
    </MaterialForm>

    <AffixSelectorPanel
      v-model="v$.statsJson.$model"
      :type="form.type"
      :visible="state.affixPanelVisible"
      @update:modelValue="state.affixPanelVisible = false"
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

const form = reactive({
  setId: null,
  type: 'flower',
  statsJson: [
    { name: 'HP', value: 717, main: true },
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
});

const State = computed(() => ({
  setList: Object
    .values(artefactSetsStore.state.sets)
    .sort((a, b) => b.rarity - a.rarity || new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime() || t(`Data.ArtefactSets.${a.id}.name`).localeCompare(t(`Data.ArtefactSets.${b.id}.name`)))
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
      { name: 'HP', value: 717, main: true },
    ];
  },
};

watch(() => form.setId, () => {
  form.type = 'flower';
});

watch(() => form.type, () => {
  if (['flower', 'feather'].includes(form.type) && !State.value.isEditMode) {
    const data = {
      flower: 'HP',
      feather: 'Atk',
    };
    form.statsJson = [
      {
        name: data[form.type],
        value: StatRangeEnum.main[data[form.type]].min,
        main: true,
      },
    ];
  } else {
    form.statsJson = [];
  }
});

onBeforeMount(() => {
  form.setId = State.value.setList[0].value;
  form.statsJson = [
    {
      name: 'HP',
      value: StatRangeEnum.main.HP.min,
      main: true,
    },
  ];
});
</script>

<style lang="scss" src="./index.scss">
</style>
