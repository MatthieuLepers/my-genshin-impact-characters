import { reactive, computed } from 'vue';

import Material from '@renderer/core/entities/material';

interface IState {
  materials: Record<string, Material>;
}

const useMaterialsStore = () => {
  const state = reactive<IState>({
    materials: {},
  });

  const materialGroupedByBossId = computed(() => Object
    .values(state.materials)
    .reduce((acc, material) => ({
      ...acc,
      [material.bossId]: [...(acc[material.bossId] ?? []), material],
    }), {}));

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
    materialGroupedByBossId,
    actions,
  };
};

export const materialsStore = useMaterialsStore();
