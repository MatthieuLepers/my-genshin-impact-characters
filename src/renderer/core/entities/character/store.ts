import { reactive } from 'vue';

import Character from '@renderer/core/entities/character';

interface IState {
  characters: Record<string, Character>;
}

const useCharactersStore = () => {
  const state = reactive<IState>({
    characters: {},
  });

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
    actions,
  };
};

export const charactersStore = useCharactersStore();
