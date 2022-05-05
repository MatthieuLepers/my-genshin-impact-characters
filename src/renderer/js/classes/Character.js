import Aptitude from './Aptitude';

const PHASES = [
  (level) => level > 0 && level <= 20,
  (level) => level > 20 && level <= 40,
  (level) => level > 40 && level <= 50,
  (level) => level > 50 && level <= 60,
  (level) => level > 60 && level <= 70,
  (level) => level > 70 && level <= 80,
  (level) => level > 80 && level <= 90,
];

export default class Character {
  /**
   * @constructor
   * @param {String} name
   * @param {Object} data
   */
  constructor(name, data) {
    this.name = name;
    this.$data = data;

    this.defineAccessors();
  }

  defineAccessors() {
    Object.keys(this.$data).forEach((key) => {
      if (key !== 'aptitudes') {
        Object.defineProperty(this, key, {
          get: () => this.$data[key],
          set: (val) => { this.$data[key] = val; },
        });
      }
    });
  }

  /**
   * @return {Aptitude[]}
   */
  get aptitudes() {
    return Object.entries(this.$data.aptitudes)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: new Aptitude(key, value, this) }), {})
    ;
  }

  /**
   * @return {String}
   */
  get nameStr() {
    return this.name.indexOf('_') >= 0 ? this.name.replace(/^([^_]+)_(.+)$/, '$1 ($2)') : this.name;
  }

  /**
   * @return {String[]}
   */
  get materials() {
    return Object.values(this.aptitudes)
      .map((aptitude) => aptitude.material)
      .filter((val, index, arr) => arr.indexOf(val) === index)
    ;
  }

  /**
   * @return {Number}
   */
  get smartLevel() {
    return this.level;
  }

  /**
   * @param {Number} level
   */
  set smartLevel(level) {
    this.level = level;
    this.phase = PHASES.map((fn) => fn(this.level)).indexOf(true);
  }

  /**
   * @return {Number}
   */
  get spentMora() {
    return [20, 40, 60, 80, 100, 120].slice(0, Math.max(0, this.phase - 1)).reduce((acc, val) => acc + val, 0) * 1000
      + Object.values(this.aptitudes).reduce((acc, aptitude) => acc + aptitude.spentMora, 0)
    ;
  }

  /**
   * @return {String}
   */
  get imageName() {
    return this.name.toLowerCase().split(' ').join('_');
  }

  /**
   * @param {String} materialName
   * @return {Number}
   */
  getMaxMaterial(materialName) {
    return Object.values(this.aptitudes)
      .filter((aptitude) => aptitude.material === materialName)
      .reduce((acc, aptitude) => acc + aptitude.getMaterialForLevel(10), 0)
    ;
  }

  /**
   * @param {String} materialName
   * @return {Number}
   */
  getInvestedMaterials(materialName) {
    return Object.values(this.aptitudes)
      .filter((aptitude) => aptitude.material === materialName)
      .reduce((acc, aptitude) => acc + aptitude.getMaterialForLevel(aptitude.realLevel), 0)
    ;
  }
}
