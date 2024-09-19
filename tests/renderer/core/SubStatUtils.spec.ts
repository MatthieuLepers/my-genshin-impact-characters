import StatRangeEnum from '../../../src/renderer/core/entities/artefact/StatRangeEnum';
import { rolls, rollsData, newRollsData } from '../../../src/renderer/core/datas/SubStatUtils';

const expected = {
  HP: new Set([209, 239, 269, 299, 418, 448, 478, 508, 538, 568, 598, 627, 657, 687, 717, 747, 777, 807, 837, 866, 896, 926, 956, 986, 1016, 1046, 1076, 1105, 1135, 1165, 1195, 1225, 1255, 1285, 1315, 1344, 1374, 1404, 1434, 1464, 1494, 1524, 1554, 1583, 1613, 1643, 1673, 1703, 1733, 1763, 1793]),
  'HP%': new Set([4.1, 4.7, 5.3, 5.8, 8.2, 8.7, 9.3, 9.9, 10.5, 11.1, 11.7, 12.2, 12.8, 13.4, 14, 14.6, 15.2, 15.7, 15.8, 16.3, 16.9, 17.5, 18.1, 18.6, 18.7, 19.2, 19.8, 20.4, 21, 21.6, 22.1, 22.2, 22.7, 23.3, 23.9, 24.5, 25.1, 25.6, 25.7, 26.2, 26.3, 26.8, 27.4, 28, 28.6, 29.1, 29.2, 29.7, 30.3, 30.9, 31.5, 32.1, 32.6, 32.7, 33.2, 33.8, 34.4, 35]),
  'CritDmg%': new Set([5.4, 6.2, 7, 7.8, 10.9, 11.7, 12.4, 13.2, 14, 14.8, 15.5, 16.3, 17.1, 17.9, 18.7, 19.4, 20.2, 21, 21.8, 22.5, 23.3, 24.1, 24.9, 25.6, 25.7, 26.4, 27.2, 28, 28.7, 28.8, 29.5, 30.3, 31.1, 31.9, 32.6, 32.7, 33.4, 34.2, 34.9, 35, 35.7, 35.8, 36.5, 37.3, 38.1, 38.8, 38.9, 39.6, 40.4, 41.2, 41.9, 42, 42.7, 43.5, 44.3, 45.1, 45.8, 46.6]),
};

describe('SubStatUtils module', () => {
  test('HP rolls are valids', () => {
    const actual = rolls(StatRangeEnum.sub.HP.maxRoll).map(Math.round);
    expect(new Set(actual)).toEqual(expected.HP);
  });

  test('HP% rolls are valids', () => {
    const actual = rolls(StatRangeEnum.sub['HP%'].maxRoll).map((roll) => Math.round(roll * 10) / 10);
    expect(new Set(actual)).toEqual(expected['HP%']);
  });

  test('CritDmg% rolls are valids', () => {
    const actual = rolls(StatRangeEnum.sub['CritDmg%'].maxRoll);
    expect(new Set(actual)).toEqual(expected['CritDmg%']);
  });
});
