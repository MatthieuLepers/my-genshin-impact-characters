import Character from './Character';
import Aptitude from './Aptitude';

export default class Traveler extends Character {
  /**
   * @constructor
   * @param {String} type
   * @param {Object} data
   */
  constructor(type, data) {
    super(`Traveler_${type}`, data, true);
    this.type = type;
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

  /**
   * @return {String}
   */
  get element() {
    return `${this.type.substring(0, 1).toUpperCase()}${this.type.substring(1).toLowerCase()}`;
  }

  /**
   * @return {Aptitude[]}
   */
  get aptitudes() {
    return Object.entries(this.$data.aptitudes[this.type])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: new Aptitude(key, value, this) }), {})
    ;
  }

  /**
   * @return {Number}
   */
  get constellations() {
    return this.$data.constellations[this.type];
  }

  /**
   * @return {Number}
   */
  set constellations(val) {
    this.$data.constellations[this.type] = val;
  }

  /**
   * @return {String|null}
   */
  get releasedAt() {
    return this.$data.releasedAt?.[this.type] ?? null;
  }
}
