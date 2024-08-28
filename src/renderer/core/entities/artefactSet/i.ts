export interface IArtefactSet {
  readonly id: string;
  rarity: number;
  releasedAt: Date;
}

export interface IRemoteArtefactSet {
  dataValues: IArtefactSet;
}
