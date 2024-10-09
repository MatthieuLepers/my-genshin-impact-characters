import { reactive, computed } from 'vue';

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

  const sortedByCharacterReleaseDateBuildList = computed(() => Object
    .values(state.builds)
    .sort((a, b) => b.character.releasedAt!.getTime() - a.character.releasedAt!.getTime()));

  const actions = {
    async load() {
      const objList = await CharacterBuild.findAll();
      state.builds = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: obj,
      }), {});
    },
    async create(data: ICharacterBuild): Promise<CharacterBuild> {
      const build = await CharacterBuild.create(data);
      state.builds[build.id] = build;
      state.current = build;

      return build;
    },
    async update(data: ICharacterBuild): Promise<CharacterBuild | null> {
      if (state.current) {
        state.current.name = data.name;
        state.current.characterId = data.characterId;
        state.current.flowerId = data.flowerId;
        state.current.featherId = data.featherId;
        state.current.sandsId = data.sandsId;
        state.current.gobletId = data.gobletId;
        state.current.circletId = data.circletId;
        state.current.weaponId = data.weaponId;
        await state.current.save();
      }
      return state.current;
    },
    async destroy() {
      if (state.current) {
        const success = await state.current.destroy();
        if (success) {
          delete state.builds[state.current.id];
          state.current = null;
        }
      }
    },
  };

  return {
    state,
    sortedByCharacterReleaseDateBuildList,
    actions,
  };
};

export const characterBuildsStore = useCharacterBuildsStore();
