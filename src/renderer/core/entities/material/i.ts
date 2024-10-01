import type { IRemoteMaterialI18n } from '@renderer/core/entities/material/i18n';

export interface IMaterial {
  readonly id: string;
  inInventory: number;
  readonly bossId: string;
  readonly i18n: Array<IRemoteMaterialI18n>;
}

export interface IRemoteMaterial {
  readonly dataValues: IMaterial;
}
