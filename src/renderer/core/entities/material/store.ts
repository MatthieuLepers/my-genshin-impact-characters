import { reactive } from 'vue';

import Material from '@renderer/core/entities/material';

interface IState {
  materials: Record<string, Material>;
}

const useMaterialsStore = () => {
  const state = reactive<IState>({
    materials: {},
  });

  const actions = {
    async load() {
      const materialList = await Material.findAll();
      state.materials = materialList.reduce((acc, material) => ({
        ...acc,
        [material.id]: material,
      }), {});
    },
  };

  return {
    state,
    actions,
  };
};

export const materialsStore = useMaterialsStore();
