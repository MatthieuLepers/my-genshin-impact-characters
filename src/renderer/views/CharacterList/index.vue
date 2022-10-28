<template>
  <main class="View CharacterListView">
    <h1 class="CharacterListViewTitle">
      {{ $t('App.selectOwnedCharacters') }}
    </h1>
    <Filters
      :ownerFilter="false"
      :store="FilteredCharacterStore"
      :simple="false"
    />
    <ul class="CharacterList">
      <li
        v-for="character in filteredCharacters"
        :key="character.name"
        class="CharacterListItem"
      >
        <button
          :title="character.name"
          :class="GenerateModifiers('CharacterListItemButton', { Owned: character.owned })"
          @click="handleToggleOwned(character)"
        >
          <CharacterCard :character="character" />
        </button>
      </li>
    </ul>
    <aside class="FixedMenu"></aside>
  </main>
</template>

<script>
import Filters from '@/components/MyGenshinImpactCharacters/Filters';
import AppStore from '@/assets/js/stores/AppStore';
import FilteredCharacterStore from '@/assets/js/stores/FilteredCharacterStore';
import CharacterCard from '@/components/MyGenshinImpactCharacters/CharacterCard';

export default {
  name: 'CharacterListView',
  components: { Filters, CharacterCard },
  data() {
    return {
      characters: AppStore.data.characters,
      FilteredCharacterStore,
    };
  },
  beforeRouteLeave(to, from, next) {
    FilteredCharacterStore.reset();
    next();
  },
  methods: {
    handleToggleOwned(character) {
      character.owned = !character.owned;
    },
  },
  computed: {
    filteredCharacters() {
      return FilteredCharacterStore
        .applyFilters(Object.values(this.characters))
        .filter((character) => !character.beta && !character.name.startsWith('Traveler'))
      ;
    },
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
