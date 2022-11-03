const FILTERING_FUNCTIONS = {
  elements: (elements) => (character) => (elements.length ? elements.includes(character.element) : true),
  name: (name) => (character) => (name.length ? character.name.toLowerCase().includes(name.toLowerCase()) : true),
};

const ELEMENTS_ORDER = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

const SORTING_FUNCTIONS = {
  releasedAt: (releasedAt) => (a, b) => (releasedAt === 'asc' ? new Date(a.$data.releasedAt) - new Date(b.$data.releasedAt) : new Date(b.$data.releasedAt) - new Date(a.$data.releasedAt) || a.name.localeCompare(b.name)),
  name: (name) => (a, b) => (name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)),
  element: () => (a, b) => ELEMENTS_ORDER.indexOf(a.element) - ELEMENTS_ORDER.indexOf(b.element),
};

class FilteredCharacterStore {
  /**
   * @constructor
   */
  constructor() {
    this.filters = {
      elements: [],
      name: '',
    };
    this.sortBy = 'releasedAt:desc';
  }

  /**
   * @param {Character[]} characterList
   * @return {Character[]}
   */
  applyFilters(characterList) {
    const [field, sort] = this.sortBy.split(':');
    return characterList
      .filter((character) => character.isReleased() && Object.keys(this.filters).reduce((acc, key) => acc && FILTERING_FUNCTIONS[key](this.filters[key])(character), true))
      .sort((a, b) => SORTING_FUNCTIONS[field](sort)(a, b))
    ;
  }

  reset() {
    this.filters.elements = [];
    this.filters.name = '';
    this.sortBy = 'releasedAt:asc';
  }
}

export default new FilteredCharacterStore();
