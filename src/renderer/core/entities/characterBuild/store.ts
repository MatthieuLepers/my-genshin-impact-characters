import { reactive } from 'vue';

import CharacterBuild from '@renderer/core/entities/characterBuild';

interface IState {
  builds: Array<CharacterBuild>;
}

const useCharacterBuildsStore = () => {
  const state = reactive<IState>({
    builds: [],
  });

  const actions = {
    async load() {
      const objList = await CharacterBuild.findAll();
      state.builds = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: obj,
      }), []);
    },
  };

  return {
    state,
    actions,
  };
};

export const characterBuildsStore = useCharacterBuildsStore();
