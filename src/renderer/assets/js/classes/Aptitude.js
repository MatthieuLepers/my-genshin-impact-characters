import AppStore from '@/assets/js/stores/AppStore';

export default class Aptitude {
  /**
   * @constructor
   * @param {String} type
   * @param {Object} data
   */
  constructor(type, data, character) {
    this.type = type;
    this.$data = data;
    this.character = character;

    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.$data[key],
        set: (val) => { this.$data[key] = val; },
      });
    });
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
    const totalMaterial = this.getMaterialForLevel(this.level) + AppStore.data.materials[this.material];
    this.level = level;
    const diffMaterial = totalMaterial - (this.getMaterialForLevel(level) + AppStore.data.materials[this.material]);
    AppStore.data.materials[this.material] = Math.max(0, AppStore.data.materials[this.material] + diffMaterial);
  }

  /**
   * @return {Number}
   */
  get realLevel() {
    return Math.max(1, this.level - this.getBonusValue());
  }

  /**
   * @return {Number}
   */
  get spentMora() {
    return [0, 12.5, 17.5, 25, 30, 37.5, 120, 260, 450, 700].slice(0, this.realLevel - 1).reduce((acc, val) => acc + val, 0) * 1000;
  }

  /**
   * @return {Number}
   */
  getBonusValue() {
    let bonus = 0;
    if (this.constellationIncrease >= 0 && this.constellationIncrease <= this.character.constellations) {
      bonus += this.constellationIncreaseBonus || 3;
    }
    if (this.phaseIncrease >= 0 && this.phaseIncrease <= this.character.phase) {
      bonus += this.phaseIncreaseBonus;
    }
    return bonus;
  }

  /**
   * @return {Number}
   */
  getMaxLevel() {
    return 10 + this.getBonusValue();
  }

  /**
   * @return {Number}
   */
  getMinLevel() {
    return 1 + this.getBonusValue();
  }

  /**
   * @param {Number} level
   * @return {Number}
   */
  getMaterialForLevel(level) {
    return [0, 0, 0, 0, 0, 0, 1, 1, 2, 2]
      .slice(0, level)
      .reduce((acc, val) => acc + val, 0)
    ;
  }

  /**
   * @return {Boolean}
   */
  isCrowned() {
    return this.realLevel === 10;
  }
}
