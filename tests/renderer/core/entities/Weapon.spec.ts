import weaponsStore from '@tests/renderer/mocks/weaponsStore.mock';

const engulfingLightning = weaponsStore.state.weapons['1'];

describe('Weapon entity', () => {
  test('currentAtk getter', () => {
    expect(engulfingLightning.currentAtk).toBe(608.07);
  });

  test('currentSubStat getter', () => {
    expect(engulfingLightning.currentSubStat).toBe(55.125);
  });

  test('stats getter', () => {
    const expected = {
      Atk: 608.07,
      'ER%': 55.125,
    };
    expect(engulfingLightning.stats).toEqual(expected);
  });
});
