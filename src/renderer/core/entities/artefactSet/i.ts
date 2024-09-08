export interface IArtefactSet {
  readonly id: string;
  releasedAt: Date;
}

export interface IRemoteArtefactSet {
  dataValues: IArtefactSet;
}
