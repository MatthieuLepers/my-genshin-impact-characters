export interface ICharacterBuild {
  readonly id: number;
  name: string;
  characterId: number;
  artefactPresetId: number;
  weaponId: number;
}

export interface IRemoteCharacterBuild {
  dataValues: ICharacterBuild;
}
