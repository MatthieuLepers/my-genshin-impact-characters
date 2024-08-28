export interface IWeapon {
  readonly id: number;
  name: string;
  releasedAt: Date;
  type: string;
  owned: boolean;
  level: number;
  rarity: number;
  atk: number;
  statName: string;
  statValue: number;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}
