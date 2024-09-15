export interface ICharacterPassiveStat {
  readonly id: number;
  readonly statType: string;
  readonly statValue: number;
}

export interface IRemoteCharacterPassiveStat {
  dataValues: ICharacterPassiveStat;
}
