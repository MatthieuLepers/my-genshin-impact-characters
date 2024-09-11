export interface IWeapon {
  readonly id: number;
  name: string;
  releasedAt: Date;
  type: string;
  owned: boolean;
  level: number;
  rank: number;
  rarity: number;
  atk: number;
  statName: string;
  statValue: number;
  tags: Array<string>;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}
