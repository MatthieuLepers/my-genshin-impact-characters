<template>
  <main class="View CharacterListView">
    <h1 class="CharacterListViewTitle">
      {{ t('App.selectOwnedCharacters') }}
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
import { computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';

import Filters from '@renderer/components/MyGenshinImpactCharacters/Filters.vue';
import CharacterCard from '@renderer/components/MyGenshinImpactCharacters/CharacterCard.vue';

import { charactersStore } from '@renderer/core/entities/character/store';
import { filteredCharacterStore } from '@renderer/core/stores/FilteredCharacterStore';

defineOptions({ name: 'CharacterListView' });

const { t } = useI18n();

const State = computed(() => ({
  filteredCharacters: filteredCharacterStore.actions
    .applyFilters(Object.values(charactersStore.state.characters))
    .filter((character) => !character.name.startsWith('Traveler')),
}));

onBeforeRouteLeave((to, from, next) => {
  filteredCharacterStore.actions.reset();
  next();
});

const actions = {
  async handleToggleOwned(character) {
    character.owned = !character.owned;
    await character.save();
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
