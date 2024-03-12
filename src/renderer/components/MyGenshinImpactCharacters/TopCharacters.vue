<template>
  <ul
    class="TopCharacters"
    @mousewheel="actions.handleMouseWheel"
    ref="el"
  >
    <li
      v-for="character in State.characters"
      :key="character.name"
      @click="actions.handleclick(character)"
    >
      <img
        :src="image(`img/characters/${character.imageName}_gacha_card.png`)"
        :title="`${character.nameStr}, ${character.spentMora / 1000}k`"
        v-if="!character.name.startsWith('Traveler')"
      />
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue';

import AppStore from '@renderer/core/stores/AppStore';
import { useFilteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';
import { image } from '@renderer/core/utils';

const el = ref(null);

const emit = defineEmits(['clickCharacter']);

const State = computed(() => ({
  characters: useFilteredCharacterStore.actions
    .applyFilters(Object.values(AppStore.data.characters))
    .filter((character) => character.owned)
    .sort((a, b) => b.spentMora - a.spentMora || a.name.localeCompare(b.name)),
}));

const actions = {
  handleMouseWheel(e) {
    e.preventDefault();
    el.value.scrollLeft += e.deltaY;
  },
  handleclick(character) {
    emit('clickCharacter', character);
  },
};
</script>

<style lang="scss" src="./TopCharacters.scss">
</style>
