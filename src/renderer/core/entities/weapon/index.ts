import AbstractI18nEntity from '@renderer/core/entities/AbstractI18nEntity';
import type { IWeapon, IRemoteWeapon } from '@renderer/core/entities/weapon/i';
import { image } from '@renderer/core/utils';
import WeaponData from '@renderer/core/entities/weapon/data.json';

const WEAPON_STAT_TYPES = {
  type549: [15.070818070818072, 13.177045177045176],
  type548: [14.184476230542701, 12.407446360959193],
  type546: [13.236177622986506, 11.585328689595125],
  type544: [12.219891745602165, 10.702525935949481],
  type445: [13.757044597293099, 12.086532061238074],
  type444: [12.91516121655614, 11.358792590898698],
  type442: [12.019103773584906, 10.582075471698113],
  type441: [11.063063063063064, 9.755539323106891],
  type439: [11.362674238513163, 10.007227671657201],
  type340: [11.239217652958876, 9.931795386158475],
  type339: [10.358544140423335, 9.1708828084667],
  type338: [9.422494017548525, 8.360808295666047],
  type233: [7.386273914363802],
  type123: [7.975483870967742],
};

export default class Weapon extends AbstractI18nEntity<IWeapon> {
  declare readonly id: string;

  declare owned: boolean;

  declare level: number;

  declare rank: number;

  declare readonly releasedAt?: Date;

  declare readonly type: string;

  declare readonly rarity: number;

  declare readonly atk: number;

  declare readonly statName?: string;

  declare readonly statValue?: number;

  declare readonly tags: Array<string>;

  declare readonly material: string;

  declare readonly maxRank: number;

  constructor(data: IWeapon) {
    super(data, []);
  }

  get maxLevel(): number {
    return this.rarity <= 2 ? 70 : 90;
  }

  get currentAtk(): number {
    if ((this.rarity >= 3 && this.level !== 80 && this.level !== 90) || (this.rarity < 3 && this.level !== 70)) {
      throw new Error('Cannot get currentAtk for this level!');
    }
    const weaponStatType = WEAPON_STAT_TYPES[`type${this.rarity}${Math.round(this.atk)}`];
    if (this.rarity <= 2) {
      return this.atk * weaponStatType[0];
    }
    return this.atk * weaponStatType[this.level === 90 ? 0 : 1];
  }

  get currentSubStat(): number {
    if (this.rarity < 3 || (this.level !== 80 && this.level !== 90)) {
      throw new Error('Cannot get currentSubStat for this level!');
    }
    return this.level === 90
      ? this.statValue * 4.59375
      : this.statValue * 4.190277777777778
    ;
  }

  get image(): string {
    return image(`img/weapons/${this.id}.webp`);
  }

  get stats(): Record<string, number> {
    return {
      Atk: this.currentAtk,
      [this.statName]: this.currentSubStat ?? 0,
    };
  }

  getStat(statName: string): number {
    return this.stats[statName] ?? 0;
  }

  static async findAll(): Promise<Array<Weapon>> {
    const weapons = await api.Weapon.findAll();
    return weapons.map((weapon: IRemoteWeapon) => {
      const data = WeaponData[weapon.dataValues.id];
      return new Weapon({
        ...weapon.dataValues,
        ...data,
        releasedAt: data?.releasedAt ? new Date(data.releasedAt) : undefined,
        tags: data?.tags ?? [],
        maxRank: data?.maxRank ?? 5,
      });
    });
  }

  async save(): Promise<Weapon> {
    const { owned, level, rank } = this.data;
    if (this.id) {
      await api.Weapon.update(this.id, JSON.stringify({ owned, level, rank }));
    }
    return this;
  }
}
