import { reactive, computed } from 'vue';

import Character from '@renderer/core/entities/character';

interface IState {
  characters: Record<string, Character>;
  newlyModalOpened: boolean;
}

const useCharactersStore = () => {
  const state = reactive<IState>({
    characters: {},
    newlyModalOpened: false,
  });

  const newlyReleasedCharacters = computed(() => Object
    .values(state.characters)
    .filter((character) => character.isReleased() && character.releasedAt!.getTime() + 864000000 >= Date.now() && !character.owned))
  ;

  const actions = {
    async load() {
      const characterList = await Character.findAll();
      state.characters = characterList.reduce((acc, character) => ({
        ...acc,
        [character.name]: character,
      }), {});
    },
  };

  return {
    state,
    newlyReleasedCharacters,
    actions,
  };
};

export const charactersStore = useCharactersStore();
