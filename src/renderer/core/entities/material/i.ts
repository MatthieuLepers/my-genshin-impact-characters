export interface IMaterialI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IDatabaseMaterial {
  readonly id: string;
  inInventory: number;
}

export interface IMaterial extends IDatabaseMaterial {
  readonly bossId: string;
  readonly releasedAt?: Date;
  readonly i18n: Array<IMaterialI18n>;
}

export interface IRemoteMaterial {
  readonly dataValues: IDatabaseMaterial;
}
