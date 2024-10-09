import artefactsStore from '@tests/renderer/mocks/artefactsStore.mock';

describe('Artefact entity', () => {
  test('level getter', () => {
    expect(artefactsStore.state.current.level).toBe(20);
  });

  test('mainStat getter', () => {
    const expected = { name: 'HP', value: 4780, main: true };
    expect(artefactsStore.state.current.mainStat).toEqual(expected);
  });

  test('subStats getter', () => {
    const expected = new Set([
      { name: 'ER%', value: 28.5} ,
      { name: 'CritDmg%', value: 7.8 },
      { name: 'EM', value: 16 },
      { name: 'Atk%', value: 5.3 },
    ]);
    expect(new Set(artefactsStore.state.current.subStats)).toEqual(expected);
  });

  test('stats getter', () => {
    const expectedStats = {
      HP: 4780,
      'Atk%': 5.25,
      'CritDmg%': 7.771,
      EM: 16.32,
      'ER%': 28.500000000000004,
    };
    expect(artefactsStore.state.current.stats).toEqual(expectedStats);
  });
});
