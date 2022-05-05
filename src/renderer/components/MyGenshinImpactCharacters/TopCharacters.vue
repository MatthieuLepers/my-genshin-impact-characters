<template>
  <ul class="TopCharacters" @mousewheel="handleMouseWheel">
    <li v-for="character in characters" :key="character.name">
      <img
        :src="`static/img/characters/${character.imageName}_gacha_card.png`"
        :title="`${character.nameStr}, ${character.spentMora / 1000}k`"
        v-if="!character.name.startsWith('Traveler')"
      />
    </li>
  </ul>
</template>

<script>
import AppStore from '@/js/stores/AppStore';

export default {
  name: 'TopCharacters',
  data() {
    return {
      characters: AppStore.getCharacterSortedBySpentMora(),
    };
  },
  methods: {
    handleMouseWheel(e) {
      e.preventDefault();
      this.$el.scrollLeft += e.deltaY;
    },
  },
};
</script>

<style lang="scss" src="./TopCharacters.scss">
</style>
