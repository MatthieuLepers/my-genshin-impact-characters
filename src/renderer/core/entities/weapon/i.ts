export interface IWeaponI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IDatabaseWeapon {
  readonly id: string;
  owned: boolean;
  level: number;
  rank: number;
}

export interface IWeapon extends IDatabaseWeapon {
  readonly releasedAt?: Date;
  readonly type: string;
  readonly rarity: number;
  readonly atk: number;
  readonly statName?: string;
  readonly statValue?: number;
  readonly tags?: Array<string>;
  readonly material: string;
  readonly maxRank?: number;
  readonly i18n: Array<IWeaponI18n>;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}
