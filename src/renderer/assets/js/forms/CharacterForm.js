import Form from './Form';
import Validator from './Validator';

export default class CharacterForm extends Form {
  /**
   * @constructor
   */
  constructor() {
    super({
      name: {
        value: '',
        validator: Validator.validateNotEmpty,
      },
      level: {
        value: 1,
        validator: (val) => val >= 1 && val <= 90,
      },
      phase: {
        value: 0,
        validator: (val) => val >= 0 && val <= 6,
      },
      constellation: {
        value: 0,
        validator: (val) => val >= 0 && val <= 6,
      },
      aptitudes: {
        value: '0/0/0',
        validator: Validator.validateRegex,
        args: [
          /[0-9]+\/[0-9]+\/[0-9]+/,
        ],
      },
    });
  }
}
