<template>
  <section class="artefact-transmuter">
    <MaterialForm class="artefact-transmuter__form" @submit.prevent="actions.handleSubmit">
      <ul class="artefact-transmuter__sets">
        <li
          v-for="option in State.setList"
          :key="option.value"
          class="artefact-transmuter__sets-item"
        >
          <ArtefactSetOption
            v-model="v$.set.$model"
            :option="option"
            :allowUnselect="false"
          />
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
                :src="form.set.getImage(form.type)"
                :alt="form.set.getI18n('name')"
              />
            </div>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[0]"
                :type="form.type"
                @click="actions.handleClickAffix(true)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[1]"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[2]"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[3]"
                @click="actions.handleClickAffix(false)"
              />
            </MaterialFormFieldLine>
            <MaterialFormFieldLine>
              <ArtefactAffix
                v-model="v$.statsJson.$model[4]"
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
          <template #field1 v-else-if="props.showImport">
            <MaterialButton
              type="button"
              icon="icon-import"
              :modifiers="{ secondary: true }"
              @click="emit('import')"
            >
              {{ t('App.Artefact.List.importBtnTitle') }}
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
import ArtefactSetOption from '@renderer/components/MyGenshinImpactCharacters/ArtefactSet/Option.vue';
import ArtefactAffix from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/ArtefactAffix.vue';
import AffixSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/ArtefactTransmuter/AffixSelectorPanel.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';
import ArtefactMainStatData from '@renderer/core/datas/ArtefactMainStat.json';

defineOptions({ name: 'ArtefactTransmuter' });

const { t } = useI18n();
const emit = defineEmits(['submit', 'close', 'import']);

const props = defineProps({
  formData: { type: Object, default: () => ({}) },
  allowClose: { type: Boolean, default: true },
  showImport: { type: Boolean, default: false },
});

const form = reactive({
  set: props.formData.set ?? null,
  type: props.formData.type ?? 'flower',
  statsJson: props.formData.statsJson?.slice()?.map((stat) => ({ ...stat })) ?? [
    { name: 'HP', value: ArtefactMainStatData.HP[20], main: true },
  ],
});
const rules = {
  set: { required },
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
    .sort((a, b) => b.releasedAt.getTime() - a.releasedAt.getTime() || a.getI18n('name').localeCompare(b.getI18n('name')))
    .map((set) => ({
      value: set,
      label: set.getI18n('name'),
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
    emit('submit', { ...form, setId: form.set.id });
    actions.resetStats();
  },
  handleClickAffix(isMain) {
    state.affixPanelVisible = true;
    state.main = isMain;
  },
  resetStats() {
    if (['flower', 'feather'].includes(form.type) && !State.value.isEditMode) {
      const data = {
        flower: 'HP',
        feather: 'Atk',
      };
      form.statsJson = [
        {
          name: data[form.type],
          value: ArtefactMainStatData[data[form.type]][20],
          main: true,
        },
      ];
    } else {
      form.statsJson = [];
    }
  },
};

watch(() => form.type, () => {
  actions.resetStats();
});

watch(() => props.formData, (newVal) => {
  if (newVal.set) {
    form.set = newVal.set;
    form.type = newVal.type;
    form.statsJson = newVal.statsJson;
  }
});

onBeforeMount(() => {
  form.set = props.formData.set ?? State.value.setList[0].value;
  form.statsJson = props.formData.statsJson?.slice()?.map((stat) => ({ ...stat })) ?? [
    {
      name: 'HP',
      value: ArtefactMainStatData.HP[20],
      main: true,
    },
  ];
});
</script>

<style lang="scss" src="./index.scss">
</style>
