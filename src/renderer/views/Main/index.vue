<template>
  <div class="View MainView">
    <main>
      <Filters class="MainViewFilters" />
      <TopCharacters
        @clickCharacter="actions.handleClickCharacter"
        :key="useFilteredCharacterStore.filters.elements.length"
      />
      <div
        v-for="boss in Object.keys(tm('Data.WeaklyBosses'))"
        :key="boss"
      >
        <h3 class="BossTitle" v-if="actions.filteredCharacters(boss).length">
          <span>[{{ actions.totalInvestedBossMaterial(boss) }}/{{ actions.totalBossMaterial(boss) }}]</span> {{ t(`Data.WeaklyBosses.${boss}.name`) }}
        </h3>
        <BossMaterial
          v-for="material in Object.keys(tm(`Data.WeaklyBosses.${boss}.materials`))"
          :key="`${boss}${material}`"
          :boss="boss"
          :material="material"
          :characters="state.characters[material]"
        />
      </div>

      <Modal
        name="newlyReleasedCharactersModal"
        size="m"
        :title="t('App.Main.newlyReleasedCharactersModal.title', State.newlyReleasedCharacters.length)"
        :okCancel="true"
        :okLabel="t('App.Main.newlyReleasedCharactersModal.okLabel')"
        :cancelLabel="t('App.Main.newlyReleasedCharactersModal.cancelLabel')"
        @confirm="router.push({ name: 'CharacterList' })"
      >
        <ul class="CharacterList">
          <li
            v-for="(character, i) in State.newlyReleasedCharacters"
            :key="i"
            class="CharacterListItem"
          >
            <CharacterCard :character="character" />
          </li>
        </ul>
      </Modal>
    </main>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  onBeforeMount,
  nextTick,
} from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import Modal from '@renderer/components/Materials/Modal/index.vue';
import BossMaterial from '@renderer/components/MyGenshinImpactCharacters/BossMaterial.vue';
import TopCharacters from '@renderer/components/MyGenshinImpactCharacters/TopCharacters.vue';
import Filters from '@renderer/components/MyGenshinImpactCharacters/Filters.vue';
import CharacterCard from '@renderer/components/MyGenshinImpactCharacters/CharacterCard.vue';

import { modalStore } from '@renderer/components/Materials/Modal/Store';
import AppStore from '@renderer/core/stores/AppStore';
import { useFilteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';

defineOptions({ name: 'MainView' });

const router = useRouter();
const { t, tm } = useI18n();

const state = reactive({
  characters: {},
  newlyReleasedCharactersModalOpen: false,
});

const State = computed(() => ({
  newlyReleasedCharacters() {
    return AppStore.newlyReleasedCharacters;
  },
}));

const actions = {
  totalBossMaterial(boss) {
    return Object
      .keys(tm(`Data.WeaklyBosses.${boss}.materials`))
      .reduce((acc, material) => acc + actions.getMaxMaterial(material), 0)
    ;
  },
  getMaxMaterial(materialName) {
    return (state.characters[materialName] || []).reduce((acc, character) => acc + character.getMaxMaterial(materialName), 0);
  },
  totalInvestedBossMaterial(boss) {
    return Object
      .keys(tm(`Data.WeaklyBosses.${boss}.materials`))
      .reduce((acc, material) => acc + actions.getOwnedAndInvestedMaterials(material), 0)
    ;
  },
  getOwnedAndInvestedMaterials(materialName) {
    if (!state.characters[materialName]?.length) return 0;
    return (state.characters[materialName] || [])
      .reduce((acc, character) => acc + character.getInvestedMaterials(materialName), AppStore.data.materials[materialName])
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
  filteredCharacters(boss) {
    const materials = Object.keys(tm(`Data.WeaklyBosses.${boss}.materials`));
    return Object.keys(state.characters)
      .filter((material) => materials.includes(material))
      .reduce((acc, material) => [
        ...acc,
        ...useFilteredCharacterStore.actions.applyFilters(Object.values(state.characters[material])),
      ], [])
    ;
  },
};

onBeforeMount(() => {
  state.characters = Object.values(AppStore.data.characters)
    .filter((character) => character.owned)
    .reduce((acc, character) => {
      character.materials.forEach((material) => {
        acc[material] = [...(acc[material] || []), character];
      });
      return acc;
    }, {})
  ;

  if (!Object.values(state.characters).length) {
    router.push({ name: 'CharacterList' });
  } else if (State.value.newlyReleasedCharacters.length && !AppStore.newlyModalOpened) {
    modalStore.actions.show('newlyReleasedCharactersModal');
    AppStore.newlyModalOpened = true;
  }
});
</script>

<style lang="scss" src="./index.scss">
</style>
