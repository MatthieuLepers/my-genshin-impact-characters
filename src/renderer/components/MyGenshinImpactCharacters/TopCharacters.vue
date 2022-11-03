<template>
  <ul class="TopCharacters" @mousewheel="handleMouseWheel">
    <li
      v-for="character in characters"
      :key="character.name"
      @click="handleclick(character)"
    >
      <img
        :src="`static/img/characters/${character.imageName}_gacha_card.png`"
        :title="`${character.nameStr}, ${character.spentMora / 1000}k`"
        v-if="!character.name.startsWith('Traveler')"
      />
    </li>
  </ul>
</template>

<script>
import AppStore from '@/assets/js/stores/AppStore';

export default {
  name: 'TopCharacters',
  props: {
    store: { type: Object, required: true },
  },
  methods: {
    handleMouseWheel(e) {
      e.preventDefault();
      this.$el.scrollLeft += e.deltaY;
    },
    handleclick(character) {
      this.$emit('clickCharacter', character);
    },
  },
  computed: {
    characters() {
      return this.store
        .applyFilters(Object.values(AppStore.data.characters))
        .filter((character) => character.owned)
        .sort((a, b) => b.spentMora - a.spentMora || a.name.localeCompare(b.name))
      ;
    },
  },
};
</script>

<style lang="scss" src="./TopCharacters.scss">
</style>
