export interface IArtefactPreset {
  readonly id: number;
  flowerId: number;
  featherId: number;
  sandsId: number;
  gobletId: number;
  circletId: number;
}

export interface IRemoteArtefactPreset {
  dataValues: IArtefactPreset;
}
