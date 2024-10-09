<template>
  <MaterialForm :class="GenerateModifiers('AffixSelectorPanel', { visible: props.visible })">
    <h2 class="AffixSelectorPanelTitle">
      {{ t('App.ArtefactTransmuter.title') }} <span v-if="State.minorOnly">({{ form.minorAffixes.length }}/4)</span>
    </h2>
    <PanelMenu
      v-model="state.main"
      :data="State.panelMenuData"
      :displayNavIf="!State.minorOnly"
    >
      <template #[state.main]>
        <ul :class="{ minorOnly: State.minorOnly }">
          <li v-for="affix in State.affixList" :key="affix">
            <label :for="affix" :class="GenerateModifiers('AffixSelectorPanelCheckbox', {
              checked: (state.main && affix === form.mainAffix) || (!state.main && form.minorAffixes.includes(affix)),
              disabled: !state.main && affix === form.mainAffix,
            })">
              <input
                :type="state.main ? 'radio' : 'checkbox'"
                :id="affix"
                :value="affix"
                :disabled="!state.main && affix === form.mainAffix"
                :checked="(state.main && affix === form.mainAffix) || (!state.main && form.minorAffixes.includes(affix))"
                name="affix"
                @click="($event) => $event.target.checked ? actions.setStat(affix) : actions.removeAffix(affix)"
              />
              <span v-icon:[formatAffix(affix)] /> {{ t(`App.Artefact.stats.${affix}.long`) }}
            </label>
          </li>
        </ul>
        <MaterialFormFieldLine :size="2">
          <template #field0>
            <MaterialButton
              :icon="(form.mainAffix && state.main) || form.minorAffixes.length > 0 ? 'icon-reload' : 'icon-close'"
              :modifiers="{ danger: true }"
              @click="(form.mainAffix && state.main) || form.minorAffixes.length > 0 ? actions.reset(true) : emit('close')"
            >
              {{ t((form.mainAffix && state.main) || form.minorAffixes.length > 0 ? 'App.ArtefactTransmuter.resetBtnLabel' : 'App.ArtefactTransmuter.resetCloseBtnLabel') }}
            </MaterialButton>
          </template>
          <template #field1>
            <MaterialButton
              v-if="form.mainAffix && form.minorAffixes.length === 4"
              icon="icon-check"
              :modifiers="{ success: true }"
              @click="actions.confirm()"
            >
              {{ t('App.ArtefactTransmuter.confirmBtnLabel') }}
            </MaterialButton>
          </template>
        </MaterialFormFieldLine>
      </template>
    </PanelMenu>
  </MaterialForm>
</template>

<script setup>
import {
  reactive,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import PanelMenu from '@renderer/components/MyGenshinImpactCharacters/PanelMenu.vue';

import { getMin } from '@renderer/core/entities/artefact/StatUtils';
import ArtefactMainStatData from '@renderer/core/datas/ArtefactMainStat.json';

const { t } = useI18n();

const emit = defineEmits(['close']);
const formatAffix = (affix) => affix.replace('%', '').toLowerCase();

const modelValue = defineModel({ type: Array, default: () => [] });

const props = defineProps({
  type: { type: String, default: 'flower' },
  main: { type: Boolean, default: false },
  visible: { type: Boolean, default: false },
});

const form = reactive({
  mainAffix: null,
  minorAffixes: [],
});

const state = reactive({
  main: props.main,
});

const State = computed(() => {
  const affixList = [];

  if (props.type === 'flower') {
    affixList.push(...(state.main ? ['HP'] : ['HP%', 'Atk', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%']));
  } else if (props.type === 'feather') {
    affixList.push(...(state.main ? ['Atk'] : ['HP', 'HP%', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%']));
  } else if (props.type === 'sands') {
    affixList.push(...(state.main ? ['HP%', 'Atk%', 'Def%', 'EM', 'ER%'] : ['HP', 'HP%', 'Atk', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%']));
  } else if (props.type === 'goblet') {
    affixList.push(...(state.main ? ['HP%', 'Atk%', 'Def%', 'EM', 'PhysicalDmg%', 'PyroDmg%', 'CryoDmg%', 'ElectroDmg%', 'HydroDmg%', 'GeoDmg%', 'AnemoDmg%', 'DendroDmg%'] : ['HP', 'HP%', 'Atk', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%']));
  } else if (props.type === 'circlet') {
    affixList.push(...(state.main ? ['HP%', 'Atk%', 'Def%', 'EM', 'CritRate%', 'CritDmg%', 'Heal%'] : ['HP', 'HP%', 'Atk', 'Atk%', 'Def', 'Def%', 'EM', 'ER%', 'CritRate%', 'CritDmg%']));
  }

  return {
    affixList,
    minorOnly: ['flower', 'feather'].includes(props.type),
    panelMenuData: [
      { id: true, label: `${t('App.ArtefactTransmuter.mainAffix')} (${form.mainAffix ? 1 : 0}/1)` },
      { id: false, label: `${t('App.ArtefactTransmuter.minorAffixes')} (${form.minorAffixes.length}/4)` },
    ],
  };
});

const actions = {
  reset(force = false) {
    form.mainAffix = (!force && modelValue.value.find((affix) => affix.main)?.name) || (props.type === 'flower' && 'HP') || (props.type === 'feather' && 'Atk') || null;
    form.minorAffixes = (!force && modelValue.value.reduce((acc, val) => (val.main ? acc : [...acc, val.name]), [])) || [];
    state.main = !State.value.minorOnly;
  },
  confirm() {
    modelValue.value = [
      {
        name: form.mainAffix,
        value: ArtefactMainStatData[form.mainAffix][20],
        main: true,
      },
      ...form.minorAffixes.map((affix) => ({
        name: affix,
        value: getMin(affix),
      })),
    ];
    emit('close');
  },
  setStat(affix) {
    if (state.main) {
      form.mainAffix = affix;
    } else if (form.minorAffixes.length < 4) {
      form.minorAffixes.push(affix);
    }
  },
  removeAffix(affix) {
    if (!state.main) {
      form.minorAffixes = form.minorAffixes.filter((a) => a !== affix);
    }
  },
};

watch(() => props.type, () => {
  actions.reset();
});

watch(() => props.visible, () => {
  actions.reset();
});

watch(() => props.main, (newVal) => {
  state.main = newVal;
});

onMounted(() => {
  actions.reset(true);
});
</script>

<style lang="scss" src="./AffixSelectorPanel.scss">
</style>
