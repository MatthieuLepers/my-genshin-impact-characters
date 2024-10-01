<template>
  <div class="CreateTab">
    <div class="CreateTabImg">
      <img
        :src="image(`img/characters/${charactersStore.state.characters[form.characterName].imageName}/gacha_card.webp`)"
        alt=""
      />
      <CharacterBuildStats
        class="BuildStats"
        :build="State.build"
      />
    </div>
    <MaterialForm
      class="Build"
      @submit.prevent="actions.handleSubmit"
    >
      <MaterialFormFieldLine :size="2">
        <template #field0>
          <MaterialFormSelect
            v-model="v$.characterName.$model"
            variant="box"
            :label="t('App.CharacterBuild.Create.characterSelect')"
            :options="State.validCharacterList"
            :valid="!v$.characterName.$invalid"
          />
        </template>
        <template #field1>
          <MaterialFormInput
            v-model="v$.name.$model"
            variant="box"
            :label="t('App.CharacterBuild.Create.name')"
            :valid="!v$.name.$invalid"
            :required="true"
          />
        </template>
      </MaterialFormFieldLine>

      <div class="BuildEquipments">
        <WeaponButton
          :type="State.character.weaponType"
          :weapon="form.weapon"
          @click="state.weaponSelectorPanelVisible = true"
        />
        <ArtefactButton
          v-for="type in ['flower', 'feather', 'sands', 'goblet', 'circlet']"
          :key="type"
          :type="type"
          :artefact="form[type]"
          @click="actions.handleClickArtefactButton(type)"
        />
      </div>

      <MaterialFormFieldLine :size="4" class="BuildButtons">
        <template #field3>
          <MaterialButton
            icon="icon-check"
            type="submit"
            :disabled="v$.$invalid"
            :modifiers="{ success: true }"
          >
            {{ t('App.CharacterBuild.Create.saveBtnLabel') }}
          </MaterialButton>
        </template>
      </MaterialFormFieldLine>
    </MaterialForm>

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
  </div>
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
import MaterialForm from '@renderer/components/Materials/Form/index.vue';
import MaterialFormFieldLine from '@renderer/components/Materials/Form/FieldLine.vue';
import MaterialFormSelect from '@renderer/components/Materials/Form/Select.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import ArtefactButton from '@renderer/components/MyGenshinImpactCharacters/Artefact/Button.vue';
import ArtefactSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/Artefact/SelectorPanel.vue';
import WeaponButton from '@renderer/components/MyGenshinImpactCharacters/Weapon/Button.vue';
import WeaponSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/Weapon/SelectorPanel.vue';
import CharacterBuildStats from '@renderer/components/MyGenshinImpactCharacters/CharacterBuild/Stats.vue';

import { image } from '@renderer/core/utils';
import CharacterBuild from '@renderer/core/entities/characterBuild';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
import { artefactsStore } from '@renderer/core/entities/artefact/store';
import { notificationStore } from '@renderer/components/Materials/Notification/Store';

const { t } = useI18n();

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
  async handleSubmit() {
    const { name, flower, feather, sands, goblet, circlet, weapon } = form;
    const data = {
      name,
      characterId: State.value.character.id,
      flowerId: flower?.id ?? null,
      featherId: feather?.id ?? null,
      sandsId: sands?.id ?? null,
      gobletId: goblet?.id ?? null,
      circletId: circlet?.id ?? null,
      weaponId: weapon?.id ?? null,
    };
    const success = await characterBuildsStore.actions.create(data);
    if (success) {
      notificationStore.actions.success(t('App.CharacterBuild.Create.successNotification', [name]));
    } else {
      notificationStore.actions.error(t('App.CharacterBuild.Create.errorNotification'));
    }
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

watch(() => form.characterName, (newVal) => {
  weaponsStore.state.filters.type = State.value.character.weaponType;
  form.weapon = State.value.validWeaponList[0].value;
  weaponsStore.state.current = form.weapon;
  form.name = newVal;
});

onBeforeMount(() => {
  form.characterName = State.value.validCharacterList[0].value;
  form.name = form.characterName;
  weaponsStore.state.filters.type = State.value.character.weaponType;
});
</script>

<style lang="scss" src="./CreateTab.scss">
</style>
