<template>
  <div class="View CharacterBuildsView">
    <img
      :src="image(`img/characters/${charactersStore.state.characters[form.characterName].imageName}_gacha_card.png`)"
      alt=""
      style="height: 100%;width: auto;"
    />
    <div class="Build">
      <MaterialFormSelect
        v-model="form.characterName"
        label="Character"
        class="BuildCharacterSelect"
        variant="box"
        :options="State.validCharacterList"
        :valid="!!form.characterName"
      />

      <div class="BuildArtefactPreset">
        <MaterialFormSelect
          v-model="form.presetId"
          label="Artefact preset"
          class="BuildPresetSelect"
          variant="box"
          :options="State.validPresetList"
          :valid="!!form.presetId"
        />
        <ArtefactPreset
          :preset="artefactPresetsStore.state.sets[form.presetId]"
        />
        <MaterialFormSelect
          v-model="form.weaponId"
          label="Weapon"
          class="BuildWeaponSelect"
          variant="box"
          :options="State.validWeaponList"
          :valid="!!form.weaponId"
        />
      </div>

      <ArtefactCard
        class="BuildArtefactCard"
        :showExport="false"
        :showEdit="false"
        :showDelete="false"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

import MaterialFormSelect from '@renderer/components/Materials/Form/Select.vue';
import ArtefactCard from '@renderer/components/MyGenshinImpactCharacters/ArtefactCard.vue';
import ArtefactPreset from '@renderer/components/MyGenshinImpactCharacters/ArtefactPreset.vue';

import { image } from '@renderer/core/utils';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
import { artefactsStore } from '@/renderer/core/entities/artefact/store';

const { t } = useI18n();

const form = reactive({
  name: '',
  characterName: null,
  presetId: null,
  weaponId: null,
});

const State = computed(() => {
  const validPresetList = Object
    .values(artefactPresetsStore.state.sets)
    .map((preset) => ({ value: preset.id, label: preset.name, obj: preset }))
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

onBeforeMount(() => {
  form.characterName = State.value.validCharacterList[0].value;
  artefactPresetsStore.state.current = State.value.validPresetList[0].obj;
  artefactsStore.state.current = artefactPresetsStore.state.current.flower;
  form.presetId = artefactPresetsStore.state.current.id;
});
</script>

<style lang="scss" src="./index.scss">
</style>
