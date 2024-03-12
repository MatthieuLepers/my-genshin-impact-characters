import Aptitude, { type IRawAptitude } from '@renderer/core/classes/Aptitude';

const PHASES = [
  (level: number): boolean => level > 0 && level <= 20,
  (level: number): boolean => level > 20 && level <= 40,
  (level: number): boolean => level > 40 && level <= 50,
  (level: number): boolean => level > 50 && level <= 60,
  (level: number): boolean => level > 60 && level <= 70,
  (level: number): boolean => level > 70 && level <= 80,
  (level: number): boolean => level > 80 && level <= 90,
];

export interface IRawCharacter {
  releasedAt?: string,
  element: string,
  level: number,
  phase: number,
  constellations: number,
  aptitudes: {
    normalAttack: IRawAptitude,
    elementalSkill: IRawAptitude,
    elementalBurst: IRawAptitude,
  },
}

export default class Character {
  declare releasedAt?: string;

  declare level: number;

  declare phase: number;

  declare constellations: number;

  constructor(
    public name: string,
    public $data: IRawCharacter,
    public owned = false,
  ) {
    this.defineAccessors();
  }

  defineAccessors() {
    Object.keys(this.$data).forEach((key) => {
      if (!['aptitudes', 'element'].includes(key)) {
        Object.defineProperty(this, key, {
          get: () => this.$data[key],
          set: (val) => { this.$data[key] = val; },
        });
      }
    });
  }

  get element(): string {
    return `${this.$data.element.charAt(0).toUpperCase()}${this.$data.element.substring(1).toLowerCase()}`;
  }

  get aptitudes(): Record<string, Aptitude> {
    return Object.entries(this.$data.aptitudes)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: new Aptitude(key, value, this) }), {})
    ;
  }

  get nameStr(): string {
    return this.name.indexOf('_') >= 0 ? this.name.replace(/^([^_]+)_(.+)$/, '$1 ($2)') : this.name;
  }

  get materials(): Array<string> {
    return Object.values(this.aptitudes)
      .map((aptitude) => aptitude.material)
      .filter((val, index, arr) => arr.indexOf(val) === index)
    ;
  }

  get smartLevel(): number {
    return this.level;
  }

  set smartLevel(level: number) {
    this.level = level;
    this.phase = PHASES.map((fn) => fn(this.level)).indexOf(true);
  }

  get smartConstellation(): number {
    return this.constellations;
  }

  set smartConstellation(constellations: number) {
    const oldRealLevels = Object
      .values(this.aptitudes)
      .map((aptitude) => aptitude.realLevel)
    ;
    this.constellations = constellations;
    Object
      .values(this.aptitudes)
      .forEach((aptitude, i) => {
        aptitude.level = oldRealLevels[i] + aptitude.getBonusValue();
      })
    ;
  }

  get spentMora(): number {
    return [20, 40, 60, 80, 100, 120].slice(0, Math.max(0, this.phase - 1)).reduce((acc, val) => acc + val, 0) * 1000
      + Object.values(this.aptitudes).reduce((acc, aptitude) => acc + aptitude.spentMora, 0)
    ;
  }

  get imageName(): string {
    return this.name.toLowerCase().split(' ').join('_');
  }

  getMaxMaterial(materialName: string): number {
    return !this.owned
      ? 0
      : Object.values(this.aptitudes)
        .filter((aptitude) => aptitude.material === materialName)
        .reduce((acc, aptitude) => acc + aptitude.getMaterialForLevel(10), 0)
    ;
  }

  getInvestedMaterials(materialName: string): number {
    return !this.owned
      ? 0
      : Object.values(this.aptitudes)
        .filter((aptitude) => aptitude.material === materialName)
        .reduce((acc, aptitude) => acc + aptitude.getMaterialForLevel(aptitude.realLevel), 0)
    ;
  }

  isReleased(): boolean {
    return !!this.releasedAt && Date.now() >= new Date(this.releasedAt).getTime();
  }
}
