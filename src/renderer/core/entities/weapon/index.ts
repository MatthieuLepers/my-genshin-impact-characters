import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { IWeapon, IRemoteWeapon } from '@renderer/core/entities/weapon/i';

export default class Weapon extends AbstractEntity<IWeapon> {
  declare readonly id: number;

  declare readonly name: string;

  declare readonly releasedAt: Date;

  declare readonly type: string;

  declare owned: boolean;

  declare level: number;

  declare rank: number;

  declare readonly rarity: number;

  // LVL90 atk value = atk
  /**
   * https://genshin-impact.fandom.com/wiki/Weapon/Base_Attack_Scaling
   *
   * 5 star LVL90
   * 49 => 741 => 15.1224, ascension delta: 31
   * [[49,145,20],[176,286,20],[317,374,10],[406,464,10],[495,555,10],[586,648,10],[679,741,10]]
   *
   * 48 => 674 => 14.0416
   * [[48,133,20],[164,261,20],[292,341,10],[373,423,10],[455,506,10],[537,590,10],[621,674,10]]
   *
   * 46 => 608 => 13.2173
   * [[46,122,20],[153,235,20],[266,308,10],[340,382,10],[414,457,10],[488,532,10],[563,608,10]]
   *
   * 44 => 542 => 12.3181
   * [[44,110,20],[141,210,20],[241,275,10],[307,341,10],[373,408,10],[439,475,10],[506,542,10]]
   *
   * 4 star LVL90
   * 45 => 620 => 13.7777
   * [[45,128,20],[154,247,20],[273,321,10],[347,395,10],[421,470,10],[496,545,10],[571,620,10]]
   *
   * 44 => 565 => 12.8409
   * [[44,119,20],[144,226,20],[252,293,10],[319,361,10],[387,429,10],[455,497,10],[523,565]]
   *
   * 42 => 510 => 12.1428
   * [[42,109,20],[135,205,20],[231,266,10],[292,327,10],[353,388,10],[414,449,10],[475,510,10]]
   *
   * 41 => 454 => 11.0731
   * [[41,99,20],[125,184,20],[210,238,10],[264,293,10],[319,347,10],[373,401,10],[427,454,10]]
   *
   * 39 => 440 => 11.2820
   * [[39,94,20],[120,176,20],[202,229,10],[255,282,10],[308,335,10],[361,388,10],[414,440,10]]
   *
   * 3 star LVL90
   * 40 => 448 => 11.2
   * [[40,102,20],[121,187,20],[207,239,10],[259,292,10],[311,344,10],[363,396,10],[415,448,10]]
   *
   * 39 => 401 => 10.2820
   * [[39,94,20],[113,169,20],[189,216,10],[263,282,10],[282,309,10],[329,355,10],[375,401,10]]
   *
   * 38 => 354 =>  9.3157
   * [[38,86,20],[105,151,20],[171,193,10],[212,234,10],[253,274,10],[294,314,10],[334,354,10]]
   *
   * 2 star LVL70
   * 33 => 243 => 7.3636
   * [[33,80,20],[91,139,20],[151,174,10],[186,209,10],[220,243,10]]
   *
   * 1 star LVL70
   * 23 => 185 => 8.0434
   * [[23,56,20],[68,102,20],[113,130,10],[141,158,10],[169,185,10]]
   */
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
