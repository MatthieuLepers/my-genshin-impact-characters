import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IWeapon, IRemoteWeapon } from '@renderer/core/entities/weapon/i';

export default class Weapon extends AbstractEntity<IWeapon> {
  declare readonly id: string;

  declare rarity: number;

  declare releasedAt: Date;

  constructor(data: IWeapon) {
    super(data, []);
  }

  static async findAll(): Promise<Array<Weapon>> {
    const weapons = await api.Weapon.findAll();
    return weapons.map((weapon: IRemoteWeapon) => new Weapon(weapon.dataValues));
  }
}
