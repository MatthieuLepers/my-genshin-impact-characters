import { reactive } from 'vue';

import WeaponMaterial from '@renderer/core/entities/weaponMaterial';
import WeaponMaterialData from '@renderer/core/entities/weaponMaterial/data.json';

interface IState {
  materials: Record<string, WeaponMaterial>;
}

const useWeaponMaterialsStore = () => {
  const state = reactive<IState>({
    materials: WeaponMaterial.findAll(),
  });

  const materialOrder = Object.keys(WeaponMaterialData);

  return {
    state,
    materialOrder,
  };
};

export const weaponMaterialsStore = useWeaponMaterialsStore();
