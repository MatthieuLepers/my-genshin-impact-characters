import { reactive } from 'vue';

import ArtefactSet from '@renderer/core/entities/artefactSet';

interface IState {
  sets: Record<string, ArtefactSet>;
}

const useArtefactSetsStore = () => {
  const state = reactive<IState>({
    sets: ArtefactSet.findAll(),
  });

  return {
    state,
  };
};

export const artefactSetsStore = useArtefactSetsStore();
