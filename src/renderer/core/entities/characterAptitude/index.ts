import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import Character from '@renderer/core/entities/character';
import { ICharacterAptitude } from '@renderer/core/entities/characterAptitude/i';
import { materialsStore } from '@renderer/core/entities/material/store';

export default class CharacterAptitude extends AbstractEntity<ICharacterAptitude> {
  declare readonly id: number;

  declare type: string;

  declare level: number;

  declare phaseIncrease: number;

  declare phaseIncreaseBonus: number;

  declare constellationIncrease: number;

  declare constellationIncreaseBonus: number;

  declare materialId: string;

  constructor(
    data: ICharacterAptitude,
    public character: Character,
  ) {
    super(data, []);
  }

  get smartLevel(): number {
    return Math.max(this.getMinLevel(), this.level);
  }

  set smartLevel(level: number) {
    const oldRealLevelMaterialCost = this.getMaterialForLevel(this.realLevel);
    this.level = level;
    const newRealLevelMaterialCost = this.getMaterialForLevel(this.realLevel);

    const diffMaterial = oldRealLevelMaterialCost - newRealLevelMaterialCost;
    materialsStore.state.materials[this.materialId].inInventory = Math.max(0, materialsStore.state.materials[this.materialId].inInventory + diffMaterial);
  }

  get realLevel(): number {
    return Math.max(1, this.level - this.getBonusValue());
  }

  get spentMora(): number {
    return [0, 12.5, 17.5, 25, 30, 37.5, 120, 260, 450, 700].slice(0, this.realLevel - 1).reduce((acc, val) => acc + val, 0) * 1000;
  }

  getBonusValue(): number {
    let bonus = 0;
    if (this.constellationIncrease > 0 && this.constellationIncrease <= this.character.constellation) {
      bonus += this.constellationIncreaseBonus;
    }
    if (this.phaseIncrease >= 0 && this.phaseIncrease <= this.character.phase) {
      bonus += this.phaseIncreaseBonus;
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

  async save(): Promise<CharacterAptitude> {
    const { type, level, phaseIncrease, phaseIncreaseBonus, constellationIncrease, constellationIncreaseBonus } = this.data;
    if (this.id) {
      await api.CharacterAptitude.update(this.id, JSON.stringify({ type, level, phaseIncrease, phaseIncreaseBonus, constellationIncrease, constellationIncreaseBonus }));
      return this;
    }
    throw new Error('Character aptitude not found');
  }
}
