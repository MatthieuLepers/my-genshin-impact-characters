import { reactive } from 'vue';

import CharacterBuild from '@renderer/core/entities/characterBuild';
import type { ICharacterBuild } from '@renderer/core/entities/characterBuild/i';

interface IState {
  builds: Record<number, CharacterBuild>;
  current: CharacterBuild | null;
}

const useCharacterBuildsStore = () => {
  const state = reactive<IState>({
    builds: {},
    current: null,
  });

  const actions = {
    async load() {
      const objList = await CharacterBuild.findAll();
      state.builds = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: obj,
      }), {});
    },
    async create(data: ICharacterBuild) {
      const build = await CharacterBuild.create(data);
      state.builds[build.id] = build;
      state.current = build;

      return build;
    },
  };

  return {
    state,
    actions,
  };
};

export const characterBuildsStore = useCharacterBuildsStore();
