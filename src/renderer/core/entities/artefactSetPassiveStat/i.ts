export interface IArtefactSetPassiveStat {
  readonly id: number;
  readonly statType: string;
  readonly statValue: number;
}

export interface IRemoteArtefactSetPassiveStat {
  dataValues: IArtefactSetPassiveStat;
}
