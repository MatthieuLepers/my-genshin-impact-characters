<template>
  <MaterialModal
    name="buildFormModal"
    class="Build"
    :showClose="false"
    @accept="emit('submit', { ...form })"
    @close="emit('close')"
  >
    <div class="BuildContainer">
      <img
        class="BuildImgTheme"
        :src="charactersStore.state.characters[form.characterName].getImage('theme')"
        alt=""
      />

      <div class="BuildImgSection">
        <MaterialFormFieldLine>
          <MaterialFormSelect
            v-model="v$.characterName.$model"
            variant="box"
            :label="t('App.CharacterBuild.characterSelect')"
            :options="State.validCharacterList"
            :valid="!v$.characterName.$invalid"
          >
            <template #option="{ option }">
              <img
                class="BuildOptionImg"
                :src="option.obj.getImage('side_icon')"
                alt=""
              />
              {{ option.value }}
            </template>
          </MaterialFormSelect>
        </MaterialFormFieldLine>
        <img
          class="BuildImg"
          :src="charactersStore.state.characters[form.characterName].getImage('icon')"
          alt=""
        />
      </div>

      <div class="BuildInfosSection">
        <MaterialFormFieldLine>
          <MaterialFormInput
            v-model="v$.name.$model"
            variant="box"
            :label="t('App.CharacterBuild.name')"
            :valid="!v$.name.$invalid"
            :required="true"
          />
        </MaterialFormFieldLine>

        <CharacterBuildStats
          class="BuildStats"
          :build="State.build"
          :old="props.formData"
        />
      </div>
    </div>

    <div class="BuildEquipmentSection">
      <WeaponButton
        class="BuildEquipment"
        :type="State.character.weaponType"
        :weapon="form.weapon"
        @click="state.weaponSelectorPanelVisible = true"
      />
      <ArtefactButton
        v-for="type in ['flower', 'feather', 'sands', 'goblet', 'circlet']"
        :key="type"
        class="BuildEquipment"
        :type="type"
        :artefact="form[type]"
        @click="actions.handleClickArtefactButton(type)"
      />
    </div>

    <template #footer="{ accept, close }">
      <MaterialFormFieldLine :size="2" class="BuildButtonSection">
        <template #field0>
          <MaterialButton
            icon="icon-close"
            type="button"
            :class="GenerateModifiers('m-modal__btn', { refuse: true })"
            :modifiers="{ danger: true }"
            @click="close"
          >
            {{ t('App.CharacterBuild.cancelBtnLabel') }}
          </MaterialButton>
        </template>
        <template #field1>
          <MaterialButton
            icon="icon-check"
            type="button"
            :disabled="v$.$invalid"
            :class="GenerateModifiers('m-modal__btn', { accept: true })"
            :modifiers="{ secondary: true }"
            @click="accept"
          >
            {{ t('App.CharacterBuild.saveBtnLabel') }}
          </MaterialButton>
        </template>
      </MaterialFormFieldLine>
    </template>
  </MaterialModal>

  <ArtefactSelectorPanel
    v-model="state.artefactSelectorPanelVisible"
    :formData="form"
    @submit="actions.handleSetArtefacts"
  />

  <WeaponSelectorPanel
    v-model="state.weaponSelectorPanelVisible"
    :formData="form"
    :type="weaponsStore.state.filters.type"
    @submit="actions.handleSetWeapon"
  />
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
import { required, minLength } from '@vuelidate/validators';

import MaterialButton from '@renderer/components/Materials/Button/index.vue';
import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormSelect from '@renderer/components/Materials/Form/Select.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import ArtefactButton from '@renderer/components/MyGenshinImpactCharacters/Artefact/Button.vue';
import ArtefactSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/Artefact/SelectorPanel.vue';
import WeaponButton from '@renderer/components/MyGenshinImpactCharacters/Weapon/Button.vue';
import WeaponSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/Weapon/SelectorPanel.vue';
import CharacterBuildStats from '@renderer/components/MyGenshinImpactCharacters/CharacterBuild/Stats.vue';

import CharacterBuild from '@renderer/core/entities/characterBuild';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { artefactsStore } from '@renderer/core/entities/artefact/store';

const { t } = useI18n();
const emit = defineEmits(['submit', 'close']);

const props = defineProps({
  formData: { type: Object, default: () => ({}) },
});

const form = reactive({
  name: '',
  characterName: null,
  flower: null,
  feather: null,
  sands: null,
  goblet: null,
  circlet: null,
  weapon: null,
});
const rules = {
  name: {
    required,
    minLength: minLength(1),
  },
  characterName: { required },
  weapon: { required },
};
const v$ = useVuelidate(rules, form);

const state = reactive({
  artefactSelectorPanelVisible: false,
  weaponSelectorPanelVisible: false,
});

const State = computed(() => {
  const validPresetList = Object
    .values(artefactPresetsStore.state.sets)
    .map((preset) => ({ value: preset, label: preset.name, obj: preset }))
  ;
  const validWeaponList = weaponsStore.weaponList.value
    .filter((weapon) => ((weapon.rarity <= 2 && weapon.level === 70) || (weapon.rarity >= 3 && [80, 90].includes(weapon.level))))
    .map((weapon) => ({ value: weapon, label: weapon.getI18n('name') }))
  ;
  const validCharacterList = Object
    .values(charactersStore.state.characters)
    .filter((character) => character.owned && character.level === 90)
    .sort((a, b) => b.releasedAt.getTime() - a.releasedAt.getTime())
    .map((character) => ({ value: character.name, label: character.name, obj: character }))
  ;
  const character = charactersStore.state.characters[form.characterName];
  const build = new CharacterBuild({
    name: form.name,
    characterId: character?.id ?? null,
    flowerId: form.flower?.id ?? null,
    featherId: form.feather?.id ?? null,
    sandsId: form.sands?.id ?? null,
    gobletId: form.goblet?.id ?? null,
    circletId: form.circlet?.id ?? null,
    weaponId: form.weapon?.id ?? null,
  });

  return {
    validPresetList,
    validWeaponList,
    validCharacterList,
    character,
    build,
  };
});

const actions = {
  resetForm() {
    form.characterName = State.value.validCharacterList[0].value;
    weaponsStore.state.filters.type = State.value.character.weaponType;
  },
  handleClickArtefactButton(type) {
    artefactsStore.state.filters.type = [type];
    state.artefactSelectorPanelVisible = true;
  },
  handleSetArtefacts(data) {
    form.flower = data.flower ?? null;
    form.feather = data.feather ?? null;
    form.sands = data.sands ?? null;
    form.goblet = data.goblet ?? null;
    form.circlet = data.circlet ?? null;
  },
  handleSetWeapon(data) {
    form.weapon = data.weapon ?? null;
  },
};

watch(() => form.characterName, () => {
  weaponsStore.state.filters.type = State.value.character.weaponType;
  weaponsStore.state.current = form.weapon;
});

watch(() => props.formData, (newVal) => {
  form.name = newVal.name;
  form.characterName = newVal.character?.name ?? State.value.validCharacterList[0].value;
  form.flower = newVal?.flower ?? null;
  form.feather = newVal?.feather ?? null;
  form.sands = newVal?.sands ?? null;
  form.goblet = newVal?.goblet ?? null;
  form.circlet = newVal?.circlet ?? null;
  form.weapon = newVal?.weapon ?? null;
});

onBeforeMount(() => {
  form.characterName = State.value.validCharacterList[0].value;
  form.name = form.characterName;
  weaponsStore.state.filters.type = State.value.character.weaponType;
});
</script>

<style lang="scss" src="./CharacterBuildFormModal.scss">
</style>
