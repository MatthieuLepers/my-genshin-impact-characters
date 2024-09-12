import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IWeapon, IRemoteWeapon } from '@renderer/core/entities/weapon/i';

const WEAPON_STAT_TYPES = {
  5: {
    type49: [[49, 145, 20], [176, 286, 20], [317, 374, 10], [406, 464, 10], [495, 555, 10], [586, 648, 10], [679, 741, 10]],
    type48: [[48, 133, 20], [164, 261, 20], [292, 341, 10], [373, 423, 10], [455, 506, 10], [537, 590, 10], [621, 674, 10]],
    type46: [[46, 122, 20], [153, 235, 20], [266, 308, 10], [340, 382, 10], [414, 457, 10], [488, 532, 10], [563, 608, 10]],
    type44: [[44.34, 110.17, 20], [141.27, 209.82, 20], [240.92, 275.46, 10], [306.66, 341.46, 10], [372.56, 407.81, 10], [438.91, 474.55, 10], [505.65, 541.83, 10]],
  },
  4: {
    type45: [[45, 128, 20], [154, 247, 20], [273, 321, 10], [347, 395, 10], [421, 470, 10], [496, 545, 10], [571, 620, 10]],
    type44: [[44, 119, 20], [144, 226, 20], [252, 293, 10], [319, 361, 10], [387, 429, 10], [455, 497, 10], [523, 565]],
    type42: [[42.4, 108.93, 20], [134.83, 204.83, 20], [230.83, 265.86, 10], [291.76, 326.78, 10], [352.68, 387.66, 10], [413.66, 448.68, 10], [474.58, 509.61, 10]],
    type41: [[41, 99, 20], [125, 184, 20], [210, 238, 10], [264, 293, 10], [319, 347, 10], [373, 401, 10], [427, 454, 10]],
    type39: [[39, 94, 20], [120, 176, 20], [202, 229, 10], [255, 282, 10], [308, 335, 10], [361, 388, 10], [414, 440, 10]],
  },
  3: {
    type40: [[39.88, 101.96, 20], [121.46, 187.21, 20], [206.61, 239.47, 10], [258.97, 291.75, 10], [311.15, 343.89, 10], [363.39, 396.08, 10], [415.48, 448.22, 10]],
    type39: [[39, 94, 20], [113, 169, 20], [189, 216, 10], [263, 282, 10], [282, 309, 10], [329, 355, 10], [375, 401, 10]],
    type38: [[38, 86, 20], [105, 151, 20], [171, 193, 10], [212, 234, 10], [253, 274, 10], [294, 314, 10], [334, 354, 10]],
  },
  2: {
    type33: [[32.93, 79.69, 20], [91.39, 139.01, 20], [150.61, 173.92, 10], [185.62, 208.67, 10], [220.37, 243.23, 10]],
  },
  1: {
    type23: [[23.25, 56.25, 20], [67.95, 101.57, 20], [113.17, 129.62, 10], [141.32, 157.59, 10], [169.29, 185.43, 10]],
  },
};

const getIndexFromLevel = (level: number): number => {
  if (level <= 20) return 0;
  return (level > 20 && level <= 40)
    ? 1
    : Math.ceil((level - 30) / 10)
  ;
};

export default class Weapon extends AbstractEntity<IWeapon> {
  declare readonly id: number;

  declare readonly name: string;

  declare readonly releasedAt: Date;

  declare readonly type: string;

  declare owned: boolean;

  declare level: number;

  declare rank: number;

  declare readonly rarity: number;

  declare readonly atk: number;

  // LVL90 subStat value = stateValue * 4.594
  declare readonly statName: string;

  declare readonly statValue: number;

  declare readonly tags: Array<string>;

  constructor(data: IWeapon) {
    super(data, []);
  }

  get maxLevel(): number {
    return (this.rarity <= 2 && 70) || 90;
  }

  get currentAtk(): number {
    const weaponStatType = WEAPON_STAT_TYPES[this.rarity][`type${Math.round(this.atk)}`];
    const levelOffsets = weaponStatType.map(([min, max, range]) => Math.ceil(((max - min) / range) * 100) / 100);
    const result = this.level === 1
      ? this.atk
      : [...Array(this.level).keys()].reduce((acc, i) => acc + levelOffsets[getIndexFromLevel(i)], this.atk)
    ;
    const ascenssionOffset = getIndexFromLevel(this.level) * (weaponStatType[1][0] - weaponStatType[0][1]);

    return Math.round((result + ascenssionOffset) * 100) / 100;
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
