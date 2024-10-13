import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IWeaponMaterial } from '@renderer/core/entities/weaponMaterial/i';
import { image } from '@renderer/core/utils';
import WeaponMaterialData from '@renderer/core/entities/weaponMaterial/data.json';

export default class WeaponMaterial extends AbstractI18nEntity<IWeaponMaterial> {
  declare readonly id: string;

  constructor(data: IWeaponMaterial) {
    super(data, []);
  }

  getImage(tier: number): string {
    return image(`img/weaponMaterials/${this.id}/${tier}.webp`);
  }

  static findAll(): Record<string, WeaponMaterial> {
    return Object
      .entries(WeaponMaterialData)
      .reduce((acc, [id, material]) => ({
        ...acc,
        [id]: new WeaponMaterial({
          ...material,
          id,
        }),
      }), {})
    ;
  }
}
