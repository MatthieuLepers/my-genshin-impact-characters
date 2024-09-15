export interface IWeapon {
  readonly id: number;
  readonly name: string;
  readonly releasedAt: Date;
  readonly type: string;
  owned: boolean;
  level: number;
  rank: number;
  readonly rarity: number;
  readonly atk: number;
  readonly statName: string;
  readonly statValue: number;
  readonly tags: Array<string>;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}
