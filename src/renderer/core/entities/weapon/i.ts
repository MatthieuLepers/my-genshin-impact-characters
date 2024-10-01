import { IRemoteWeaponI18n } from '@renderer/core/entities/weapon/i18n';

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
  readonly i18n: Array<IRemoteWeaponI18n>;
}

export interface IRemoteWeapon {
  dataValues: IWeapon;
}
