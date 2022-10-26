<template>
  <div class="View MainView">
    <main>
      <Filters />
      <TopCharacters @clickCharacter="handleClickCharacter" :key="filters.elements.length" />
      <div
        v-for="boss in Object.keys($t(`Data.WeaklyBosses`))"
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
          :filters="filters"
          @addCharacter="(form) => handleAddCharacter(boss, form)"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import BossMaterial from '@/components/MyGenshinImpactCharacters/BossMaterial';
import TopCharacters from '@/components/MyGenshinImpactCharacters/TopCharacters';
import Filters from '@/components/MyGenshinImpactCharacters/Filters';
import AppStore from '@/js/stores/AppStore';

export default {
  name: 'MainView',
  components: { BossMaterial, Filters, TopCharacters },
  data() {
    return {
      characters: {},
      filters: AppStore.filters,
    };
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
      return (this.characters[materialName] || []).reduce((acc, character) => acc + character.getInvestedMaterials(materialName), AppStore.data.materials[materialName]);
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
        .filter((key) => materials.includes(key))
        .reduce((acc, key) => [...acc, ...this.characters[key].filter((character) => !this.filters.elements.length || this.filters.elements.includes(character.element))], [])
      ;
    },
  },
  mounted() {
    this.characters = Object.values(AppStore.data.characters)
      .reduce((acc, character) => {
        character.materials.forEach((material) => {
          acc[material] = [...(acc[material] || []), character];
        });
        return acc;
      }, {})
    ;
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
