<template>
  <div class="CreateTab">
    <img
      :src="image(`img/characters/${charactersStore.state.characters[form.characterName].imageName}_gacha_card.png`)"
      alt=""
    />
    <MaterialForm
      class="Build"
      @submit.prevent="actions.handleSubmit"
    >
      <MaterialFormSelect
        v-model="v$.characterName.$model"
        class="BuildCharacterSelect"
        variant="box"
        :label="t('App.CharacterBuild.Create.characterSelect')"
        :options="State.validCharacterList"
        :valid="!v$.characterName.$invalid"
      />

      <div class="BuildForm">
        <MaterialFormFieldSet class="BuildWeaponFieldSet">
          <template #legend>
            <MaterialFormSelect
              v-model="form.weaponId"
              class="BuildWeaponSelect"
              variant="box"
              :label="t('App.CharacterBuild.Create.weaponSelect')"
              :options="State.validWeaponList"
              :searchable="true"
            >
              <template #option="{ option }">
                <div class="Option Option--Weapon">
                  <img :src="image(`img/weapons/${option.obj.name}.webp`)" alt="" />
                  <div>
                    {{ option.label }}<br />
                    {{ [...Array(option.obj.rarity).keys()].reduce((acc) => `${acc}★`, '') }}
                  </div>
                </div>
              </template>
            </MaterialFormSelect>
          </template>
          <div class="BuildWeapon" v-if="form.weaponId">
            <div>
              <img class="BuildWeaponImg" :src="image(`img/weapons/${weaponsStore.state.weapons[form.weaponId].name}.webp`)" alt="" />
            </div>
            <div class="BuildWeaponInfos">
              <span>{{ t(`Data.Weapons.${weaponsStore.state.weapons[form.weaponId].name}.name`) }}</span>
              <span>{{ t('App.Weapons.level') }}: {{ weaponsStore.state.weapons[form.weaponId].level }}</span>
              <span class="icon-atk">{{ t('App.Artefact.stats.Atk.short') }}: {{ Math.round(weaponsStore.state.weapons[form.weaponId].currentAtk) }}</span>
              <span :class="`icon-${formatAffix(weaponsStore.state.weapons[form.weaponId].statName)}`">{{ t(`App.Artefact.stats.${weaponsStore.state.weapons[form.weaponId].statName}.short`) }}: {{ weaponsStore.state.weapons[form.weaponId].currentSubStat.toFixed(1) }}{{ weaponsStore.state.weapons[form.weaponId].statName.endsWith('%') ? '%' : '' }}</span>
            </div>
          </div>
        </MaterialFormFieldSet>

        <div class="BuildArtefacts">
          <ArtefactButton
            v-for="type in ['flower', 'feather', 'sands', 'goblet', 'circlet']"
            :key="type"
            :type="type"
            :artefact="form[type]"
            @click="actions.handleClickArtefactButton(type)"
          />
        </div>

        <MaterialFormInput
          v-model="v$.name.$model"
          class="BuildName"
          variant="box"
          :label="t('App.CharacterBuild.Create.name')"
          :valid="!v$.name.$invalid"
          :required="true"
        />
      </div>

      <div class="BuildStats">
        <CharacterBuildStats :build="State.build" />

        <MaterialFormFieldLine class="BuildButtons">
          <MaterialButton
            icon="icon-check"
            type="submit"
            :disabled="v$.$invalid"
            :modifiers="{ success: true }"
          >
            {{ t('App.CharacterBuild.Create.saveBtnLabel') }}
          </MaterialButton>
        </MaterialFormFieldLine>
      </div>
    </MaterialForm>

    <ArtefactSelectorPanel
      v-model="state.artefactSelectorPanelVisible"
      :formData="form"
      @submit="actions.handleSetArtefacts"
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
import MaterialFormFieldSet from '@renderer/components/Materials/Form/FieldSet.vue';
import MaterialFormSelect from '@renderer/components/Materials/Form/Select.vue';
import MaterialFormInput from '@renderer/components/Materials/Form/Input.vue';
import ArtefactSelectorPanel from '@renderer/components/MyGenshinImpactCharacters/Artefact/SelectorPanel.vue';
import ArtefactButton from '@renderer/components/MyGenshinImpactCharacters/Artefact/Button.vue';
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
const formatAffix = (affix) => affix.toLowerCase().replace('%', '');

const form = reactive({
  name: '',
  characterName: null,
  flower: null,
  feather: null,
  sands: null,
  goblet: null,
  circlet: null,
  weaponId: null,
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
});

const State = computed(() => {
  const validPresetList = Object
    .values(artefactPresetsStore.state.sets)
    .map((preset) => ({ value: preset, label: preset.name, obj: preset }))
  ;
  const validWeaponList = weaponsStore.weaponList.value
    .filter((weapon) => ((weapon.rarity <= 2 && weapon.level === 70) || (weapon.rarity >= 3 && [80, 90].includes(weapon.level))))
    .map((weapon) => ({ value: weapon.id, label: t(`Data.Weapons.${weapon.name}.name`), obj: weapon }))
  ;
  const validCharacterList = Object
    .values(charactersStore.state.characters)
    .filter((character) => character.owned && character.level === 90)
    .sort((a, b) => b.releasedAt.getTime() - a.releasedAt.getTime())
    .map((character) => ({ value: character.name, label: character.name, obj: character }))
  ;
  const build = new CharacterBuild({
    name: form.name,
    characterId: charactersStore.state.characters[form.characterName]?.id ?? null,
    flowerId: form.flower?.id ?? null,
    featherId: form.feather?.id ?? null,
    sandsId: form.sands?.id ?? null,
    gobletId: form.goblet?.id ?? null,
    circletId: form.circlet?.id ?? null,
    weaponId: form.weaponId,
  });

  return {
    validPresetList,
    validWeaponList,
    validCharacterList,
    build,
  };
});

const actions = {
  async handleSubmit() {
    const { name, characterName, flower, feather, sands, goblet, circlet, weaponId } = form;
    const data = {
      name,
      characterId: charactersStore.state.characters[characterName].id,
      flowerId: flower?.id ?? null,
      featherId: feather?.id ?? null,
      sandsId: sands?.id ?? null,
      gobletId: goblet?.id ?? null,
      circletId: circlet?.id ?? null,
      weaponId,
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
};

watch(() => form.characterName, () => {
  weaponsStore.state.filters.type = charactersStore.state.characters[form.characterName].weaponType;
  form.weaponId = State.value.validWeaponList[0].value;
});

onBeforeMount(() => {
  form.characterName = State.value.validCharacterList[0].value;
  form.name = form.characterName;
  weaponsStore.state.filters.type = charactersStore.state.characters[form.characterName].weaponType;
});
</script>

<style lang="scss" src="./CreateTab.scss">
</style>
