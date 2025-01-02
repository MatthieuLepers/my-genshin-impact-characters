<template>
  <div class="View MainView">
    <main>
      <Filters class="MainViewFilters" />
      <TopCharacters
        @clickCharacter="actions.handleClickCharacter"
        :key="filteredCharacterStore.filters.elements.length"
      />
      <div
        v-for="boss in Object.values(weeklyBossesStore.state.bosses)"
        :key="boss.id"
      >
        <h3 class="BossTitle" v-if="actions.filteredCharacters(boss.id).length">
          <span>[{{ actions.totalInvestedBossMaterial(boss.id) }}/{{ actions.totalBossMaterial(boss.id) }}]</span> {{ boss.getI18n('name') }}
        </h3>
        <BossMaterial
          v-for="material in materialsStore.materialGroupedByBossId.value[boss.id]"
          :key="material.id"
          :material="material"
          :characters="state.characters[material.id]"
        />
      </div>
      <div>
        <h3 class="BossTitle" v-if="actions.filteredCharacters().length">
          <span>[{{ actions.totalInvestedBossMaterial() }}/{{ actions.totalBossMaterial() }}]</span> {{ t('App.BossMaterial.specials') }}
        </h3>
        <BossMaterial
          v-for="material in materialsStore.specialMaterialList.value"
          :key="material.id"
          :material="material"
          :characters="state.characters[material.id]"
        />
      </div>

      <MaterialModal
        name="newlyReleasedCharactersModal"
        :modifiers="{ m: true }"
        :title="t('App.Main.newlyReleasedCharactersModal.title', charactersStore.newlyReleasedCharacters.value.length)"
        :acceptLabel="t('App.Main.newlyReleasedCharactersModal.okLabel')"
        :refuseLabel="t('App.Main.newlyReleasedCharactersModal.cancelLabel')"
        @accept="router.push({ name: 'CharacterList' })"
      >
        <ul class="CharacterList">
          <li
            v-for="(character, i) in charactersStore.newlyReleasedCharacters.value"
            :key="i"
            class="CharacterListItem"
          >
            <CharacterCard :character="character" />
          </li>
        </ul>
      </MaterialModal>
    </main>
  </div>
</template>

<script setup>
import {
  reactive,
  onBeforeMount,
  onMounted,
  nextTick,
} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import MaterialModal from '@renderer/components/Materials/Modal/index.vue';
import BossMaterial from '@renderer/components/MyGenshinImpactCharacters/BossMaterial.vue';
import TopCharacters from '@renderer/components/MyGenshinImpactCharacters/TopCharacters.vue';
import Filters from '@renderer/components/MyGenshinImpactCharacters/Filters.vue';
import CharacterCard from '@renderer/components/MyGenshinImpactCharacters/CharacterCard.vue';

import { modalStore } from '@renderer/components/Materials/Modal/Store';
import { charactersStore } from '@renderer/core/entities/character/store';
import { materialsStore } from '@renderer/core/entities/material/store';
import { filteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';
import { weeklyBossesStore } from '@/renderer/core/entities/weeklyBoss/store';

defineOptions({ name: 'MainView' });

const router = useRouter();
const { t } = useI18n();

const state = reactive({
  characters: {},
  newlyReleasedCharactersModalOpen: false,
});

const actions = {
  totalBossMaterial(bossId = null) {
    const materials = !bossId
      ? Object.values(materialsStore.specialMaterialList.value)
      : materialsStore.materialGroupedByBossId.value[bossId]
    ;
    return materials
      .reduce((acc, material) => acc + actions.getMaxMaterial(material.id), 0)
    ;
  },
  getMaxMaterial(materialId) {
    return (state.characters[materialId] ?? []).reduce((acc, character) => acc + character.getMaxMaterial(materialId), 0);
  },
  totalInvestedBossMaterial(bossId = null) {
    const materials = !bossId
      ? Object.values(materialsStore.specialMaterialList.value)
      : materialsStore.materialGroupedByBossId.value[bossId]
    ;
    return materials
      .reduce((acc, material) => acc + actions.getOwnedAndInvestedMaterials(material.id), 0)
    ;
  },
  getOwnedAndInvestedMaterials(materialId) {
    if (!state.characters[materialId]?.length) return 0;
    return (state.characters[materialId] ?? [])
      .reduce((acc, character) => acc + character.getInvestedMaterials(materialId), materialsStore.state.materials[materialId].inInventory)
    ;
  },
  handleClickCharacter(character) {
    const bossMaterialElement = document.getElementById(character.name).closest('.BossMaterial');
    if (!bossMaterialElement.querySelector('.DataTable--Open')) {
      bossMaterialElement.querySelector('.BossMaterialTitle').click();
    }
    nextTick(() => {
      bossMaterialElement.scrollIntoView();
    });
  },
  filteredCharacters(bossId = null) {
    const materials = !bossId
      ? Object.values(materialsStore.specialMaterialList.value)
      : materialsStore.materialGroupedByBossId.value[bossId]
    ;
    const result = Object.keys(state.characters)
      .filter((materialId) => materials.some(({ id }) => id === materialId))
      .reduce((acc, materialId) => [
        ...acc,
        ...filteredCharacterStore.actions.applyFilters(Object.values(state.characters[materialId])),
      ], [])
    ;
    return result;
  },
};

onBeforeMount(() => {
  state.characters = Object.values(charactersStore.state.characters)
    .filter((character) => character.owned)
    .reduce((acc, character) => {
      character.materials.forEach((material) => {
        acc[material] = [...(acc[material] ?? []), character];
      });
      return acc;
    }, {})
  ;
});

onMounted(() => {
  if (charactersStore.newlyReleasedCharacters.value.length && !charactersStore.state.newlyModalOpened) {
    modalStore.actions.show('newlyReleasedCharactersModal');
    charactersStore.state.newlyModalOpened = true;
  }
});
</script>

<style lang="scss" src="./index.scss">
</style>
