import { reactive, computed } from 'vue';

import i18n from '@renderer/plugins/i18n';
import Weapon from '@renderer/core/entities/weapon';

interface IWeaponFilters {
  search: string;
  type: string;
}

interface IState {
  weapons: Record<string, Weapon>;
  current: Weapon | null;
  filters: IWeaponFilters;
}

const TYPE_ORDER = ['bow', 'catalyser', 'polearm', 'claymore', 'sword'];

const useWeaponsStore = () => {
  const state = reactive<IState>({
    weapons: {},
    current: null,
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
    .filter((weapon: Weapon) => !state.filters.search.length
      || (
        weapon.getI18n('name').toLowerCase().includes(state.filters.search.toLowerCase())
        || (weapon?.tags ?? []).some((tag) => (i18n.global.te(`App.Weapons.tags.${tag}`) ? i18n.global.t(`App.Weapons.tags.${tag}`) : tag).toLowerCase().includes(state.filters.search.toLowerCase()) || tag.toLowerCase().includes(state.filters.search.toLowerCase()))))
    .sort((a: Weapon, b: Weapon) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)
      || b.rarity - a.rarity
      || b.releasedAt!.getTime() - a.releasedAt!.getTime()
      || b.getI18n('name').localeCompare(a.getI18n('name'))));

  const ownedList = computed(() => weaponList.value.filter((weapon: Weapon) => weapon.owned));

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
