export interface ICharacterBuild {
  readonly id: number;
  name: string;
  characterId: number;
  flowerId: number;
  featherId: number;
  sandsId: number;
  gobletId: number;
  circletId: number;
  weaponId: number;
}

export interface IRemoteCharacterBuild {
  dataValues: ICharacterBuild;
}
