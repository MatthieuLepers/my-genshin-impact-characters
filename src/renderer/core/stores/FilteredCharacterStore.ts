import { reactive } from 'vue';

import type Character from '@renderer/core/entities/character';

const FILTERING_FUNCTIONS = {
  elements: (elements: string) => (character: Character) => (elements.length ? elements.includes(character.element) : true),
};

const ELEMENTS_ORDER = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

const SORTING_FUNCTIONS = {
  releasedAt: (releasedAt: string) => (a: Character, b: Character) => (releasedAt === 'asc' ? a.releasedAt!.getTime() - b.releasedAt!.getTime() : b.releasedAt!.getTime() - a.releasedAt!.getTime() || a.name.localeCompare(b.name)),
  element: () => (a: Character, b: Character) => ELEMENTS_ORDER.indexOf(a.element) - ELEMENTS_ORDER.indexOf(b.element),
};

const useFilteredCharacterStore = () => {
  const filters = reactive({
    elements: [],
  });

  const sortBy = reactive({
    text: 'releasedAt:desc',
  });

  const actions = {
    applyFilters(characterList: Array<Character>): Array<Character> {
      const [field, sort] = sortBy.text.split(':');
      return characterList
        .filter((character) => character.isReleased() && Object.keys(filters).reduce((acc, key) => acc && FILTERING_FUNCTIONS[key](filters[key])(character), true))
        .sort((a, b) => SORTING_FUNCTIONS[field](sort)(a, b))
      ;
    },
    reset() {
      filters.elements = [];
      sortBy.text = 'releasedAt:desc';
    },
  };

  return {
    filters,
    sortBy,
    actions,
  };
};

export const filteredCharacterStore = useFilteredCharacterStore();
