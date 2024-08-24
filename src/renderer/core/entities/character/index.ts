import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { ICharacter, IRemoteCharacter } from '@renderer/core/entities/character/i';
import CharacterAptitude from '@renderer/core/entities/characterAptitude';
import { IRemoteCharacterAptitude } from '@renderer/core/entities/characterAptitude/i';

const PHASES = [
  (level: number): boolean => level > 0 && level <= 20,
  (level: number): boolean => level > 20 && level <= 40,
  (level: number): boolean => level > 40 && level <= 50,
  (level: number): boolean => level > 50 && level <= 60,
  (level: number): boolean => level > 60 && level <= 70,
  (level: number): boolean => level > 70 && level <= 80,
  (level: number): boolean => level > 80 && level <= 90,
];

export default class Character extends AbstractEntity<ICharacter> {
  declare readonly id: number;

  declare name: string;

  declare releasedAt?: Date;

  declare level: number;

  declare phase: number;

  declare constellation: number;

  declare owned: boolean;

  constructor(data: ICharacter) {
    super(data, ['aptitudes', 'element']);
  }

  get element(): string {
    return `${this.data.element.charAt(0).toUpperCase()}${this.data.element.substring(1).toLowerCase()}`;
  }

  get aptitudes(): Record<string, CharacterAptitude> {
    return (this.data?.aptitudes ?? [])
      .reduce((acc, aptitude: IRemoteCharacterAptitude) => {
        const obj = new CharacterAptitude(aptitude.dataValues, this);

        return { ...acc, [obj.type]: obj };
      }, {})
    ;
  }

  get nameStr(): string {
    return this.name.indexOf('_') >= 0 ? this.name.replace(/^([^_]+)_(.+)$/, '$1 ($2)') : this.name;
  }

  get materials(): Array<string> {
    return Object.values(this.aptitudes)
      .map((aptitude) => aptitude.materialId)
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
    return this.constellation;
  }

  set smartConstellation(constellation: number) {
    const oldRealLevels = Object.values(this.aptitudes)
      .map((aptitude) => aptitude.realLevel)
    ;
    this.constellation = constellation;
    Object.values(this.aptitudes).forEach((aptitude, i) => {
      aptitude.level = oldRealLevels[i] + aptitude.getBonusValue();
    });
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
        .filter((aptitude) => aptitude.materialId === materialName)
        .reduce((acc, aptitude) => acc + aptitude.getMaterialForLevel(10), 0)
    ;
  }

  getInvestedMaterials(materialName: string): number {
    return !this.owned
      ? 0
      : Object.values(this.aptitudes)
        .filter((aptitude) => aptitude.materialId === materialName)
        .reduce((acc, aptitude) => acc + aptitude.getMaterialForLevel(aptitude.realLevel), 0)
    ;
  }

  isReleased(): boolean {
    return !!this.releasedAt && Date.now() >= new Date(this.releasedAt).getTime();
  }

  async save(): Promise<Character> {
    const { name, releasedAt, element, level, phase, constellation, owned } = this.data;
    if (this.id) {
      await api.Character.update(this.id, JSON.stringify({ name, releasedAt, element, level, phase, constellation, owned }));
      return this;
    }
    throw new Error('Character not found');
  }

  static async findAll(): Promise<Array<Character>> {
    const characters = await api.Character.findAll();
    return characters.map((character: IRemoteCharacter) => new Character(character.dataValues));
  }
}
