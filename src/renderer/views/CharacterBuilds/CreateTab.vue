<template>
  <div class="CreateTab">
    <img
      :src="image(`img/characters/${charactersStore.state.characters[form.characterName].imageName}_gacha_card.png`)"
      alt=""
    />
    <div class="Build">
      <MaterialFormSelect
        v-model="v$.characterName.$model"
        class="BuildCharacterSelect"
        variant="box"
        :label="t('App.CharacterBuild.Create.characterSelect')"
        :options="State.validCharacterList"
        :valid="!v$.characterName.$invalid"
      />

      <MaterialForm class="BuildArtefactPreset" @submit.prevent="actions.handleSubmit">
        <ArtefactPreset :preset="form.artefactPreset">
          <template #legend>
            <MaterialFormSelect
              v-model="v$.artefactPreset.$model"
              class="BuildPresetSelect"
              variant="box"
              :label="t('App.CharacterBuild.Create.artefactPresetSelect')"
              :options="State.validPresetList"
              :valid="!v$.artefactPreset.$invalid"
              :searchable="true"
            >
              <template #option="{ option }">
                <div class="Option Option--ArtefactPreset">
                  {{ option.label }}
                  <ul>
                    <li>
                      <img :src="image(`img/artefacts/${option.obj.flower.setId}/flower.webp`)" alt="" />
                    </li>
                    <li>
                      <img :src="image(`img/artefacts/${option.obj.feather.setId}/feather.webp`)" alt="" />
                    </li>
                    <li>
                      <img :src="image(`img/artefacts/${option.obj.sands.setId}/sands.webp`)" alt="" />
                    </li>
                    <li>
                      <img :src="image(`img/artefacts/${option.obj.goblet.setId}/goblet.webp`)" alt="" />
                    </li>
                    <li>
                      <img :src="image(`img/artefacts/${option.obj.circlet.setId}/circlet.webp`)" alt="" />
                    </li>
                  </ul>
                </div>
              </template>
            </MaterialFormSelect>
          </template>
        </ArtefactPreset>
        <MaterialFormFieldSet>
          <template #legend>
            <MaterialFormSelect
              v-model="v$.weaponId.$model"
              class="BuildWeaponSelect"
              variant="box"
              :label="t('App.CharacterBuild.Create.weaponSelect')"
              :options="State.validWeaponList"
              :valid="!v$.weaponId.$invalid"
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
          <div class="BuildWeapon">
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

        <MaterialFormInput
          v-model="v$.name.$model"
          class="BuildName"
          variant="box"
          :label="t('App.CharacterBuild.Create.name')"
          :valid="!v$.name.$invalid"
          :required="true"
        />

        <MaterialFormFieldLine :size="3" class="BuildButtons">
          <template #field2>
            <MaterialButton
              icon="icon-check"
              type="submit"
              :disabled="v$.$invalid"
            >
              {{ t('App.CharacterBuild.Create.saveBtnLabel') }}
            </MaterialButton>
          </template>
        </MaterialFormFieldLine>
      </MaterialForm>

      <ArtefactDetails
        class="BuildArtefactCard"
        :showExport="false"
        :showEdit="false"
        :showDelete="false"
      />
    </div>
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
import ArtefactDetails from '@renderer/components/MyGenshinImpactCharacters/Artefact/Details.vue';
import ArtefactPreset from '@renderer/components/MyGenshinImpactCharacters/ArtefactPreset/index.vue';

import { image } from '@renderer/core/utils';
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
  artefactPreset: null,
  weaponId: null,
});
const rules = {
  name: {
    required,
    minLength: minLength(1),
  },
  characterName: { required },
  artefactPreset: { required },
  weaponId: { required },
};
const v$ = useVuelidate(rules, form);

const State = computed(() => {
  const validPresetList = Object
    .values(artefactPresetsStore.state.sets)
    .map((preset) => ({ value: preset, label: preset.name, obj: preset }))
  ;
  const validWeaponList = Object
    .values(weaponsStore.state.weapons)
    .filter((weapon) => ((weapon.rarity <= 2 && weapon.level === 70) || (weapon.rarity >= 3 && [80, 90].includes(weapon.level)))
      && weapon.type === charactersStore.state.characters[form.characterName ?? 'Amber'].weaponType)
    .sort((a, b) => b.rarity - a.rarity
      || new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
      || t(`Data.Weapons.${b.name}.name`).localeCompare(t(`Data.Weapons.${a.name}.name`)))
    .map((weapon) => ({ value: weapon.id, label: t(`Data.Weapons.${weapon.name}.name`), obj: weapon }))
  ;
  const validCharacterList = Object
    .values(charactersStore.state.characters)
    .filter((character) => character.owned && character.level === 90)
    .sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime())
    .map((character) => ({ value: character.name, label: character.name, obj: character }))
  ;

  return {
    validPresetList,
    validWeaponList,
    validCharacterList,
  };
});

const actions = {
  async handleSubmit() {
    const { name, characterName, artefactPreset, weaponId } = form;
    const { flowerId, featherId, sandsId, gobletId, circletId } = artefactPreset;
    const data = {
      name,
      characterId: charactersStore.state.characters[characterName].id,
      flowerId,
      featherId,
      sandsId,
      gobletId,
      circletId,
      weaponId,
    };
    const success = await characterBuildsStore.actions.create(data);
    if (success) {
      notificationStore.actions.success(t('App.CharacterBuild.Create.successNotification', [name]));
    } else {
      notificationStore.actions.error(t('App.CharacterBuild.Create.errorNotification'));
    }
  },
};

watch(() => form.characterName, () => {
  form.weaponId = State.value.validWeaponList[0].value;
});

watch(() => form.artefactPreset, (newVal) => {
  artefactsStore.state.current = newVal.flower;
});

onBeforeMount(() => {
  form.characterName = State.value.validCharacterList[0].value;
  artefactPresetsStore.state.current = State.value.validPresetList[0].obj;
  artefactsStore.state.current = artefactPresetsStore.state.current.flower;
  form.artefactPreset = artefactPresetsStore.state.current;
  form.weaponId = State.value.validWeaponList[0].value;
});
</script>

<style lang="scss" src="./CreateTab.scss">
</style>
