import { ipcRenderer } from 'electron';
import Character from '../classes/Character';
import Traveler from '../classes/Traveler';

function $makeFilters(character) {
  if (this.filters.elements.length) {
    return this.filters.elements.includes(character.element);
  }
  return true;
}

class AppStore {
  /**
   * @constructor
   */
  constructor() {
    this.data = this.load();
    this.filters = {
      elements: [],
      name: '',
      sort: 'asc',
    };
  }

  /**
   * @return {Character[]}
   */
  get characterSortedBySpentMora() {
    return Object.values(this.data.characters)
      .filter((character) => !character.beta && character.owned && $makeFilters.call(this, character))
      .sort((a, b) => b.spentMora - a.spentMora || a.name.localeCompare(b.name))
    ;
  }

  /**
   * @return {Object}
   */
  load() {
    const { locale, materials, ownedCharacters, characters } = ipcRenderer.sendSync('load-data');
    const characterList = Object.entries(characters)
      .reduce((acc, [key, value]) => {
        if (key === 'Traveler') {
          const travelerTypeList = Object.keys(value.aptitudes);
          return {
            ...acc,
            ...travelerTypeList.reduce((ac, type) => ({ ...ac, [`Traveler_${type}`]: new Traveler(type, value) }), {}),
          };
        }
        return { ...acc, [key]: new Character(key, value, ownedCharacters.includes(key)) };
      }, {})
    ;
    const materialList = Object.entries(materials)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    ;

    return {
      locale,
      materials: materialList,
      characters: characterList,
    };
  }

  /**
   * @param {String} locale
   * @return {Boolean}
   */
  save(locale = 'fr-FR') {
    const characters = Object.entries(this.data.characters)
      .reduce((acc, [key, character]) => {
        if (character.name.startsWith('Traveler')) {
          return { ...acc, Traveler: character.$data };
        }
        return { ...acc, [key]: character.$data };
      }, {})
    ;
    const ownedCharacters = Object.values(this.data.characters)
      .filter((character) => !character.name.startsWith('Traveler') && character.owned)
      .map((character) => character.name)
    ;
    return ipcRenderer.sendSync('save-data', {
      locale,
      materials: this.data.materials,
      ownedCharacters,
      characters,
    });
  }
}

export default new AppStore();
