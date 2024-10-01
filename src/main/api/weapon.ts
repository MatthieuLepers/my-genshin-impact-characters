import { Identifier } from 'sequelize';

import { Weapon, WeaponI18n } from '@/main/database/models';
import type { IWeapon } from '@renderer/core/entities/weapon/i';

export async function findAll(): Promise<Array<Weapon>> {
  return Weapon.findAll({
    include: [
      { model: WeaponI18n },
    ],
  });
}

export async function update(identifier: Identifier, body: string): Promise<Weapon | null> {
  const obj = await Weapon.findByPk(identifier);
  if (obj) {
    const values: Partial<IWeapon> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}
