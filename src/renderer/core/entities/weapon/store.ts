import { reactive, computed } from 'vue';

import i18n from '@renderer/plugins/i18n';
import Weapon from '@renderer/core/entities/weapon';

interface IWeaponFilters {
  search: string;
  type: string;
}

interface IState {
  weapons: Record<string, Weapon>;
  filters: IWeaponFilters;
}

const TYPE_ORDER = ['bow', 'catalyser', 'polearm', 'claymore', 'sword'];

const useWeaponsStore = () => {
  const state = reactive<IState>({
    weapons: {},
    filters: {
      search: '',
      type: 'bow',
    },
  });

  const groupedByTypeWeaponList = computed(() => Object
    .values(state.weapons)
    .reduce((acc, val) => ({
      ...acc,
      [val.type]: [
        ...(acc?.[val.type] ?? []),
        val,
      ],
    }), {}))
  ;

  const weaponList = computed(() => groupedByTypeWeaponList.value[state.filters.type]
    .filter((weapon) => !state.filters.search.length
      || (
        i18n.global.t(`Data.Weapons.${weapon.name}.name`).toLowerCase().includes(state.filters.search.toLowerCase())
        || (weapon?.tags ?? []).some((tag) => (i18n.global.te(`App.Weapons.tags.${tag}`) ? i18n.global.t(`App.Weapons.tags.${tag}`) : tag).toLowerCase().includes(state.filters.search.toLowerCase()) || tag.toLowerCase().includes(state.filters.search.toLowerCase()))))
    .sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)
      || b.rarity - a.rarity
      || b.releasedAt.getTime() - a.releasedAt.getTime()
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
    groupedByTypeWeaponList,
    ownedList,
    actions,
  };
};

export const weaponsStore = useWeaponsStore();
