import Character, { type IRawCharacter } from '@renderer/core/classes/Character';
import Aptitude, { type IRawAptitude } from '@renderer/core/classes/Aptitude';

export default class Traveler extends Character {
  constructor(
    public type: string,
    data: IRawCharacter,
  ) {
    super(`Traveler_${type}`, data, true);
  }

  defineAccessors() {
    Object.keys(this.$data).forEach((key) => {
      if (!['aptitudes', 'constellations', 'releasedAt'].includes(key)) {
        Object.defineProperty(this, key, {
          get: () => this.$data[key],
          set: (val) => { this.$data[key] = val; },
        });
      }
    });
  }

  get element(): string {
    return `${this.type.substring(0, 1).toUpperCase()}${this.type.substring(1).toLowerCase()}`;
  }

  get aptitudes(): Record<string, Aptitude> {
    return Object.entries(this.$data.aptitudes[this.type])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: new Aptitude(key, value as IRawAptitude, this) }), {})
    ;
  }

  // @ts-ignore
  get constellations(): number {
    return this.$data.constellations[this.type];
  }

  set constellations(val: number) {
    this.$data.constellations[this.type] = val;
  }

  // @ts-ignore
  get releasedAt(): string | undefined {
    return this.$data.releasedAt?.[this.type];
  }
}
