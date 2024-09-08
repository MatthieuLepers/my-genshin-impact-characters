import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IWeapon, IRemoteWeapon } from '@renderer/core/entities/weapon/i';

export default class Weapon extends AbstractEntity<IWeapon> {
  declare readonly id: number;

  declare readonly name: string;

  declare readonly releasedAt: Date;

  declare readonly type: string;

  declare owned: boolean;

  declare level: number;

  declare readonly rarity: number;

  declare readonly atk: number;

  declare readonly statName: string;

  declare readonly statValue: number;

  constructor(data: IWeapon) {
    super(data, []);
  }

  static async findAll(): Promise<Array<Weapon>> {
    const weapons = await api.Weapon.findAll();
    return weapons.map((weapon: IRemoteWeapon) => new Weapon(weapon.dataValues));
  }

  async save(): Promise<Weapon> {
    const { owned, level } = this.data;
    if (this.id) {
      await api.Weapon.update(this.id, JSON.stringify({ owned, level }));
    }
    return this;
  }
}
