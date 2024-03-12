import AppStore from '@renderer/core/stores/AppStore';
import type Character from '@renderer/core/classes/Character';

export interface IRawAptitude {
  level: number,
  phaseIncrease?: number,
  phaseIncreaseBonus?: number,
  constellationIncrease?: number,
  constellationIncreaseBonus?: number,
  material: string,
}

export default class Aptitude {
  declare level: number;

  declare phaseIncrease?: number;

  declare phaseIncreaseBonus?: number;

  declare constellationIncrease?: number;

  declare constellationIncreaseBonus?: number;

  declare material: string;

  constructor(
    public type: string,
    public $data: IRawAptitude,
    public character: Character,
  ) {
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: (val) => { this.$data[key] = val; },
      });
    });
  }

  get smartLevel(): number {
    return Math.max(this.getMinLevel(), this.level);
  }

  set smartLevel(level: number) {
    const oldRealLevelMaterialCost = this.getMaterialForLevel(this.realLevel);
    this.level = level;
    const newRealLevelMaterialCost = this.getMaterialForLevel(this.realLevel);

    const diffMaterial = oldRealLevelMaterialCost - newRealLevelMaterialCost;
    AppStore.data.materials[this.material] = Math.max(0, AppStore.data.materials[this.material] + diffMaterial);
  }

  get realLevel(): number {
    return Math.max(1, this.level - this.getBonusValue());
  }

  get spentMora(): number {
    return [0, 12.5, 17.5, 25, 30, 37.5, 120, 260, 450, 700].slice(0, this.realLevel - 1).reduce((acc, val) => acc + val, 0) * 1000;
  }

  getBonusValue(): number {
    let bonus = 0;
    if (this.constellationIncrease! >= 0 && this.constellationIncrease! <= this.character.constellations) {
      bonus += this.constellationIncreaseBonus || 3;
    }
    if (this.phaseIncrease! >= 0 && this.phaseIncrease! <= this.character.phase) {
      bonus += this.phaseIncreaseBonus || 1;
    }
    return bonus;
  }

  getMaxLevel(): number {
    return 10 + this.getBonusValue();
  }

  getMinLevel(): number {
    return 1 + this.getBonusValue();
  }

  getMaterialForLevel(level: number): number {
    return [0, 0, 0, 0, 0, 0, 1, 1, 2, 2]
      .slice(0, level)
      .reduce((acc, val) => acc + val, 0)
    ;
  }

  isCrowned(): boolean {
    return this.realLevel === 10;
  }
}
