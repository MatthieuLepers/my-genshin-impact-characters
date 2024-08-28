import { reactive } from 'vue';

import Weapon from '@renderer/core/entities/weapon';

interface IState {
  weapons: Record<string, Weapon>;
}

const useWeaponsStore = () => {
  const state = reactive<IState>({
    weapons: {},
  });

  const actions = {
    async load() {
      const objList = await Weapon.findAll();
      state.weapons = objList.reduce((acc, obj) => ({
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

export const weaponsStore = useWeaponsStore();
