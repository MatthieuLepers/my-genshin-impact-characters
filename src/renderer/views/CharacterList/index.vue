<template>
  <main class="View CharacterListView">
    <h1 class="CharacterListViewTitle">
      {{ $t('App.selectOwnedCharacters') }}
    </h1>
    <Filters
      :ownerFilter="false"
      :simple="false"
    />
    <ul class="CharacterList">
      <li
        v-for="character in State.filteredCharacters"
        :key="character.name"
        class="CharacterListItem"
      >
        <button
          :title="character.name"
          :class="GenerateModifiers('CharacterListItemButton', { Owned: character.owned })"
          @click="actions.handleToggleOwned(character)"
        >
          <CharacterCard :character="character" />
        </button>
      </li>
    </ul>
    <aside class="FixedMenu"></aside>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

import Filters from '@renderer/components/MyGenshinImpactCharacters/Filters.vue';
import CharacterCard from '@renderer/components/MyGenshinImpactCharacters/CharacterCard.vue';

import AppStore from '@renderer/core/stores/AppStore';
import { useFilteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';

defineOptions({ name: 'CharacterListView' });

const state = reactive({
  characters: AppStore.data.characters,
});

const State = computed(() => ({
  filteredCharacters: useFilteredCharacterStore.actions
    .applyFilters(Object.values(state.characters))
    .filter((character) => !character.name.startsWith('Traveler')),
}));

onBeforeRouteLeave((to, from, next) => {
  useFilteredCharacterStore.actions.reset();
  next();
});

const actions = {
  handleToggleOwned(character) {
    character.owned = !character.owned;
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
