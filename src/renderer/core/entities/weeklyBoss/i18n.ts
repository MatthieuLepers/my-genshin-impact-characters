export interface IWeeklyBossI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IRemoteWeeklyBossI18n {
  readonly dataValues: IWeeklyBossI18n;
}
