<template>
  <div class="View MainView">
    <AppTitleBar />
    <main>
      <TopCharacters @clickCharacter="handleClickCharacter" />
      <div
        v-for="boss in Object.keys($t(`Data.WeaklyBosses`))"
        :key="boss"
      >
        <h3 class="BossTitle">
          <span>[{{ totalInvestedBossMaterial(boss) }}/{{ totalBossMaterial(boss) }}]</span> {{ $t(`Data.WeaklyBosses.${boss}.name`) }}
        </h3>
        <BossMaterial
          v-for="material in Object.keys($t(`Data.WeaklyBosses.${boss}.materials`))"
          :key="`${boss}${material}`"
          :boss="boss"
          :material="material"
          :characters="characters[material]"
          @addCharacter="(form) => handleAddCharacter(boss, form)"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import AppTitleBar from '@/components/AppTitleBar/index';
import BossMaterial from '@/components/MyGenshinImpactCharacters/BossMaterial';
import TopCharacters from '@/components/MyGenshinImpactCharacters/TopCharacters';
import AppStore from '@/js/stores/AppStore';

export default {
  name: 'MainView',
  components: { AppTitleBar, BossMaterial, TopCharacters },
  data() {
    return {
      characters: {},
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
