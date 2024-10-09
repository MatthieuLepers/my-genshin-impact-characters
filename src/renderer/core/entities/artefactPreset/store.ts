import { reactive } from 'vue';

import ArtefactPreset from '@renderer/core/entities/artefactPreset';
import type { IArtefactPreset } from '@renderer/core/entities/artefactPreset/i';

interface IState {
  sets: Record<string, ArtefactPreset>;
  current: ArtefactPreset | null;
}

const useArtefactPresetsStore = () => {
  const state = reactive<IState>({
    sets: {},
    current: null,
  });

  const actions = {
    async load() {
      const objList = await ArtefactPreset.findAll();
      state.sets = objList.reduce((acc, obj) => ({
        ...acc,
        [obj.id]: obj,
      }), {});
      [state.current] = objList;
    },
    async create(data: IArtefactPreset): Promise<ArtefactPreset> {
      const set = await ArtefactPreset.create(data);
      state.sets[set.id] = set;
      state.current = set;

      return set;
    },
    async update(data: IArtefactPreset): Promise<ArtefactPreset | null> {
      if (state.current) {
        state.current.flowerId = data.flowerId;
        state.current.featherId = data.featherId;
        state.current.sandsId = data.sandsId;
        state.current.gobletId = data.gobletId;
        state.current.circletId = data.circletId;
        await state.current.save();
      }
      return state.current;
    },
    async destroy() {
      if (state.current) {
        const success = await state.current.destroy();
        if (success) {
          delete state.sets[state.current.id];
          [state.current] = Object.values(state.sets);
        }
      }
    },
  };

  return {
    state,
    actions,
  };
};

export const artefactPresetsStore = useArtefactPresetsStore();
