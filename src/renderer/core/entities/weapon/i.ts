import { IWeaponI18n } from '@renderer/core/entities/weapon/i18n';

export interface IDatabaseWeapon {
  readonly id: string;
  owned: boolean;
  level: number;
  rank: number;
}

export interface IWeapon extends IDatabaseWeapon {
  readonly releasedAt: Date;
  readonly type: string;
  readonly rarity: number;
  readonly atk: number;
  readonly statName: string;
  readonly statValue: number;
  readonly tags: Array<string>;
  readonly i18n: Array<IWeaponI18n>;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}
