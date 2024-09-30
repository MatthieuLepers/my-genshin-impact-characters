export interface IMaterialI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IRemoteMaterialI18n {
  readonly dataValues: IMaterialI18n;
}
