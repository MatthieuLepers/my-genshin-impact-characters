export interface ICharacterAptitude {
  type: string;
  level: number;
  phaseIncrease: number;
  phaseIncreaseBonus: number;
  constellationIncrease: number;
  constellationIncreaseBonus: number;
  materialId: string;
  materialCost: Array<number>;
}

export interface ICharacterAptitudeJson {
  readonly type: string;
  readonly phaseIncrease?: number;
  readonly phaseIncreaseBonus?: number;
  readonly constellationIncrease?: number;
  readonly constellationIncreaseBonus?: number;
  readonly materialId: string;
  readonly materialCost?: Array<number>;
}
