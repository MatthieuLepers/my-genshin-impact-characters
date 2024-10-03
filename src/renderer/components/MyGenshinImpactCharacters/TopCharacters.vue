<template>
  <ul
    class="TopCharacters"
    @mousewheel="actions.handleMouseWheel"
    ref="el"
  >
    <li
      v-for="character in State.characters"
      :key="character.name"
      @click="actions.handleClick(character)"
    >
      <img
        :src="character.getImage('gacha_card')"
        :title="`${character.nameStr}, ${character.spentMora / 1000}k`"
        v-if="!character.name.startsWith('Traveler')"
      />
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue';

import { charactersStore } from '@renderer/core/entities/character/store';
import { filteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';

const el = ref(null);

const emit = defineEmits(['clickCharacter']);

const State = computed(() => ({
  characters: filteredCharacterStore.actions
    .applyFilters(Object.values(charactersStore.state.characters))
    .filter((character) => character.owned)
    .sort((a, b) => b.spentMora - a.spentMora || a.name.localeCompare(b.name)),
}));

const actions = {
  handleMouseWheel(e) {
    e.preventDefault();
    el.value.scrollLeft += e.deltaY;
  },
  handleClick(character) {
    emit('clickCharacter', character);
  },
};
</script>

<style lang="scss" src="./TopCharacters.scss">
</style>
