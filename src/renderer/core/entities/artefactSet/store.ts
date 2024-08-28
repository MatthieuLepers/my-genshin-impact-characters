import { reactive } from 'vue';

import ArtefactSet from '@renderer/core/entities/artefactSet';

interface IState {
  sets: Record<string, ArtefactSet>;
}

const useArtefactSetsStore = () => {
  const state = reactive<IState>({
    sets: {},
  });

  const actions = {
    async load() {
      const objList = await ArtefactSet.findAll();
      state.sets = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: obj,
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const artefactSetsStore = useArtefactSetsStore();
