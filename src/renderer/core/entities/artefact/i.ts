export interface IArtefact {
  readonly id: number;
  type: string;
  setId: string;
  statsJson: Array<IArtefactStat>;
}

export interface IArtefactStat {
  name: string;
  value: number;
  main?: boolean;
}

export interface IRemoteArtefact {
  dataValues: IArtefact;
}
