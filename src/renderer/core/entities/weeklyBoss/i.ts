import type { IRemoteWeeklyBossI18n } from '@renderer/core/entities/weeklyBoss/i18n';

export interface IWeeklyBoss {
  readonly id: string;
  readonly i18n: Array<IRemoteWeeklyBossI18n>;
}

export interface IRemoteWeeklyBoss {
  readonly dataValues: IWeeklyBoss;
}
