export interface ICharacterStat {
  readonly id: number;
  readonly level: number;
  readonly hp: number;
  readonly atk: number;
  readonly def: number;
  readonly bonusType: string;
  readonly bonusValue: number;
}

export interface IRemoteCharacterStat {
  dataValues: ICharacterStat;
}
