import Character from '@renderer/core/classes/Character';
import { reactive, computed } from 'vue';

import Traveler from '@renderer/core/classes/Traveler';

const appStore = () => {
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

  const state = reactive({
    locale,
    characters: characterList,
    materials: materialList,
    newlyModalOpened: false,
  });

  const newlyReleasedCharacters = computed(() => Object
    .values(state.characters)
    .filter((character) => character.isReleased() && new Date(character.releasedAt).getTime() + 864000000 >= Date.now() && !character.owned));

  const save = (localeName = 'fr-FR') => {
    const charactersList = Object.entries(state.characters)
      .reduce((acc, [key, character]) => {
        if (character.name.startsWith('Traveler')) {
          return { ...acc, Traveler: character.$data };
        }
        return { ...acc, [key]: character.$data };
      }, {})
    ;
    const ownedCharactersList = Object.values(state.characters)
      .filter((character) => !character.name.startsWith('Traveler') && character.owned)
      .map((character) => character.name)
    ;
    return api.sendSync('saveData', JSON.stringify({
      locale: localeName,
      materials: state.materials,
      ownedCharacters: ownedCharactersList,
      characters: charactersList,
    }, null, 2));
  };

  return {
    state,
    newlyReleasedCharacters,
    save,
  };
};

export const useAppStore = appStore();
