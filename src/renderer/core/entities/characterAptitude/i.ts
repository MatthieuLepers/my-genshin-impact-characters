export interface ICharacterAptitude {
  readonly id: number;
  type: string;
  level: number;
  phaseIncrease: number;
  phaseIncreaseBonus: number;
  constellationIncrease: number;
  constellationIncreaseBonus: number;
}

export interface IRemoteCharacterAptitude {
  dataValues: ICharacterAptitude;
}
