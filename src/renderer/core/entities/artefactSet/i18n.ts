export interface IArtefactSetI18n {
  readonly locale: string;
  readonly name: string;
}

export interface IRemoteArtefactSetI18n {
  readonly dataValues: IArtefactSetI18n;
}
