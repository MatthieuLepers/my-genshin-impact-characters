export interface IWeeklyBossI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IWeeklyBoss {
  readonly id: string;
  readonly releasedAt: Date;
  readonly i18n: Array<IWeeklyBossI18n>;
}
