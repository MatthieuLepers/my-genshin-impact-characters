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

  const bossList = computed(() => Object.keys(materialGroupedByBossId.value));

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
    materialGroupedByBossId,
    actions,
  };
};

export const materialsStore = useMaterialsStore();
