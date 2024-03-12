import Character from '@renderer/core/classes/Character';
import Traveler from '@renderer/core/classes/Traveler';

class AppStore {
  /**
   * @constructor
   */
  constructor() {
    this.data = this.load();
    this.newlyModalOpened = false;
  }

  /**
   * @return {Object}
   */
  load() {
    const { locale, materials, ownedCharacters, characters } = api.sendSync('loadData');
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
    return api.sendSync('saveData', {
      locale,
      materials: this.data.materials,
      ownedCharacters,
      characters,
    });
  }

  /**
   * @return {Character[]}
   */
  get newlyReleasedCharacters() {
    return Object
      .values(this.data.characters)
      .filter((character) => character.isReleased() && new Date(character.releasedAt).getTime() + 864000000 >= Date.now() && !character.owned)
    ;
  }
}

export default new AppStore();
