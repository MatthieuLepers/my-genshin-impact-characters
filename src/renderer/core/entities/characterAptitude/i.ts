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
