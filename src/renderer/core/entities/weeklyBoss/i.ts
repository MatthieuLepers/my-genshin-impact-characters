import type { IWeeklyBossI18n } from '@renderer/core/entities/weeklyBoss/i18n';

export interface IWeeklyBoss {
  readonly id: string;
  readonly releasedAt: Date;
  readonly i18n: Array<IWeeklyBossI18n>;
}
