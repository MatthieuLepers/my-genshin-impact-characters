<template>
  <div class="View MainView">
    <main>
      <Filters :store="FilteredCharacterStore" class="MainViewFilters" />
      <TopCharacters
        @clickCharacter="handleClickCharacter"
        :key="FilteredCharacterStore.filters.elements.length"
        :store="FilteredCharacterStore"
      />
      <div
        v-for="boss in Object.keys($t('Data.WeaklyBosses'))"
        :key="boss"
      >
        <h3 class="BossTitle" v-if="filteredCharacters(boss).length">
          <span>[{{ totalInvestedBossMaterial(boss) }}/{{ totalBossMaterial(boss) }}]</span> {{ $t(`Data.WeaklyBosses.${boss}.name`) }}
        </h3>
        <BossMaterial
          v-for="material in Object.keys($t(`Data.WeaklyBosses.${boss}.materials`))"
          :key="`${boss}${material}`"
          :boss="boss"
          :material="material"
          :characters="characters[material]"
          :filters="FilteredCharacterStore.filters"
        />
      </div>

      <Modal
        name="newlyReleasedCharactersModal"
        size="m"
        :title="$tc('App.Main.newlyReleasedCharactersModal.title', newlyReleasedCharacters.length)"
        :okCancel="true"
        :okLabel="$t('App.Main.newlyReleasedCharactersModal.okLabel')"
        :cancelLabel="$t('App.Main.newlyReleasedCharactersModal.cancelLabel')"
        @close="handleCloseModal"
        @confirm="$router.push({ name: 'CharacterList' })"
      >
        <ul class="CharacterList">
          <li
            v-for="(character, i) in newlyReleasedCharacters"
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

<script>
import Vue from 'vue';

import Modal from '@/components/Materials/Modal/index';
import BossMaterial from '@/components/MyGenshinImpactCharacters/BossMaterial';
import TopCharacters from '@/components/MyGenshinImpactCharacters/TopCharacters';
import Filters from '@/components/MyGenshinImpactCharacters/Filters';
import CharacterCard from '@/components/MyGenshinImpactCharacters/CharacterCard';

import ModalStore from '@/components/Materials/Modal/Store';
import AppStore from '@/assets/js/stores/AppStore';
import FilteredCharacterStore from '@/assets/js/stores/FilteredCharacterStore';

export default {
  name: 'MainView',
  components: { Modal, BossMaterial, Filters, TopCharacters, CharacterCard },
  data() {
    return {
      characters: {},
      FilteredCharacterStore,
      newlyReleasedCharactersModalOpen: false,
    };
  },
  computed: {
    newlyReleasedCharacters() {
      return AppStore.newlyReleasedCharacters;
    },
  },
  methods: {
    totalBossMaterial(boss) {
      return Object
        .keys(this.$t(`Data.WeaklyBosses.${boss}.materials`))
        .reduce((acc, material) => acc + this.getMaxMaterial(material), 0)
      ;
    },
    getMaxMaterial(materialName) {
      return (this.characters[materialName] || []).reduce((acc, character) => acc + character.getMaxMaterial(materialName), 0);
    },
    totalInvestedBossMaterial(boss) {
      return Object
        .keys(this.$t(`Data.WeaklyBosses.${boss}.materials`))
        .reduce((acc, material) => acc + this.getOwnedAndInvestedMaterials(material), 0)
      ;
    },
    getOwnedAndInvestedMaterials(materialName) {
      if (!this.characters[materialName]?.length) return 0;
      return (this.characters[materialName] || [])
        .reduce((acc, character) => acc + character.getInvestedMaterials(materialName), AppStore.data.materials[materialName])
      ;
    },
    handleClickCharacter(character) {
      this.selectedCharacter = character;
      const bossMaterialElement = document.getElementById(character.name).closest('.BossMaterial');
      if (!bossMaterialElement.querySelector('.DataTable--Open')) {
        bossMaterialElement.querySelector('.BossMaterialTitle').click();
      }
      Vue.nextTick(() => {
        bossMaterialElement.scrollIntoView();
      });
    },
    filteredCharacters(boss) {
      const materials = Object.keys(this.$t(`Data.WeaklyBosses.${boss}.materials`));
      return Object.keys(this.characters)
        .filter((material) => materials.includes(material))
        .reduce((acc, material) => [
          ...acc,
          ...FilteredCharacterStore.applyFilters(Object.values(this.characters[material])),
        ], [])
      ;
    },
    handleCloseModal() {
      this.newlyReleasedCharacters.forEach((character) => {
        character.removeBetaTag();
      });
    },
  },
  mounted() {
    this.characters = Object.values(AppStore.data.characters)
      .filter((character) => character.owned)
      .reduce((acc, character) => {
        character.materials.forEach((material) => {
          acc[material] = [...(acc[material] || []), character];
        });
        return acc;
      }, {})
    ;

    if (!Object.values(this.characters).length) {
      this.$router.push({ name: 'CharacterList' });
    } else if (this.newlyReleasedCharacters.length && !AppStore.newlyModalOpened) {
      ModalStore.showModal('newlyReleasedCharactersModal');
      AppStore.newlyModalOpened = true;
    }
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
