export interface IWeaponI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IRemoteWeaponI18n {
  readonly dataValues: IWeaponI18n;
}
