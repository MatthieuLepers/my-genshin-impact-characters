import { reactive, computed } from 'vue';

import Material from '@renderer/core/entities/material';

interface IState {
  materials: Record<string, Material>;
}

const useMaterialsStore = () => {
  const state = reactive<IState>({
    materials: {},
  });

  const bossList = computed(() => Object
    .values(state.materials)
    .map((material) => material.bossId)
    .filter((bossId, i, arr) => arr.indexOf(bossId) === i));

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
    bossList,
    actions,
  };
};

export const materialsStore = useMaterialsStore();
