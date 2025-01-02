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
    .filter((material) => !!material.bossId)
    .reduce((acc, material) => ({
      ...acc,
      [material.bossId]: [...(acc[material.bossId] ?? []), material],
    }), {}));

  const specialMaterialList = computed(() => Object
    .values(state.materials)
    .filter((material) => !material.bossId)
    .reduce((acc, material) => ({
      ...acc,
      [material.id]: material,
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
    specialMaterialList,
    actions,
  };
};

export const materialsStore = useMaterialsStore();
