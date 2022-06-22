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
    };
  }

  /**
   * @return {Character[]}
   */
  get characterSortedBySpentMora() {
    return Object.values(this.data.characters)
      .filter((character) => !character.beta && $makeFilters.call(this, character))
      .sort((a, b) => b.spentMora - a.spentMora || a.name.localeCompare(b.name))
    ;
  }

  /**
   * @return {Object}
   */
  load() {
    const { materials, characters } = ipcRenderer.sendSync('load-data');
    const characterList = Object.entries(characters)
      .reduce((acc, [key, value]) => {
        if (key === 'Traveler') {
          const travelerTypeList = Object.keys(value.aptitudes);
          return {
            ...acc,
            ...travelerTypeList.reduce((ac, type) => ({ ...ac, [`Traveler_${type}`]: new Traveler(type, value) }), {}),
          };
        }
        return { ...acc, [key]: new Character(key, value) };
      }, {})
    ;
    const materialList = Object.entries(materials)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    ;

    return {
      materials: materialList,
      characters: characterList,
    };
  }

  /**
   * @return {Boolean}
   */
  save() {
    const characters = Object.entries(this.data.characters)
      .reduce((acc, [key, character]) => {
        if (character.name.startsWith('Traveler')) {
          return { ...acc, Traveler: character.$data };
        }
        return { ...acc, [key]: character.$data };
      }, {})
    ;
    return ipcRenderer.sendSync('save-data', {
      materials: this.data.materials,
      characters,
    });
  }
}

export default new AppStore();
