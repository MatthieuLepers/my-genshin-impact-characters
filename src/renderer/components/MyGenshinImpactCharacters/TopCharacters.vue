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
  data() {
    return {
      characters: AppStore.characterSortedBySpentMora,
    };
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
};
</script>

<style lang="scss" src="./TopCharacters.scss">
</style>
