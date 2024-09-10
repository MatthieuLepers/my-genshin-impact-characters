import { reactive, computed } from 'vue';

import i18n from '@renderer/plugins/i18n';
import Weapon from '@renderer/core/entities/weapon';

interface IState {
  weapons: Record<string, Weapon>;
}

const TYPE_ORDER = ['bow', 'catalyser', 'polearm', 'claymore', 'sword'];

const useWeaponsStore = () => {
  const state = reactive<IState>({
    weapons: {},
  });

  const weaponList = computed(() => Object
    .values(state.weapons)
    .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)
      || b.level - a.level
      || b.rarity - a.rarity
      || new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
      || i18n.global.t(`Data.Weapons.${b.name}.name`).localeCompare(i18n.global.t(`Data.Weapons.${a.name}.name`))));

  const ownedList = computed(() => weaponList.value.filter((weapon) => weapon.owned));

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
    weaponList,
    ownedList,
    actions,
  };
};

export const weaponsStore = useWeaponsStore();
