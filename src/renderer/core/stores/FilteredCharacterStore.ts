import { reactive } from 'vue';

import type Character from '@renderer/core/classes/Character';

const FILTERING_FUNCTIONS = {
  elements: (elements: string) => (character: Character) => (elements.length ? elements.includes(character.element) : true),
  name: (name: string) => (character: Character) => (name.length ? character.name.toLowerCase().includes(name.toLowerCase()) : true),
};

const ELEMENTS_ORDER = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

const SORTING_FUNCTIONS = {
  // @ts-ignore
  releasedAt: (releasedAt: string) => (a: Character, b: Character) => (releasedAt === 'asc' ? new Date(a.$data.releasedAt) - new Date(b.$data.releasedAt) : new Date(b.$data.releasedAt) - new Date(a.$data.releasedAt) || a.name.localeCompare(b.name)),
  name: (name: string) => (a: Character, b: Character) => (name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)),
  element: () => (a: Character, b: Character) => ELEMENTS_ORDER.indexOf(a.element) - ELEMENTS_ORDER.indexOf(b.element),
};

const filteredCharacterStore = () => {
  const filters = reactive({
    elements: [],
    name: '',
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
      filters.name = '';
      sortBy.text = 'releasedAt:desc';
    },
  };

  return {
    filters,
    sortBy,
    actions,
  };
};

export const useFilteredCharacterStore = filteredCharacterStore();
