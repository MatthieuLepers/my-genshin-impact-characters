import '@tests/renderer/mocks/artefactSetsStore.mock';
import '@tests/renderer/mocks/artefactsStore.mock';
import artefactPresetsStore from '@tests/renderer/mocks/artefactPresetsStore.mock';

describe('ArtefactPreset entity', () => {
  test('stats getter', () => {
    const expectedStats = {
      HP: 5258,
      'HP%': 4.664,
      Atk: 344.07,
      'Atk%': 74.59,
      Def: 83.32999999999998,
      'CritRate%': 54.43,
      'CritDmg%': 76.151,
      EM: 16.32,
      'ER%': 110.66,
    };
    expect(artefactPresetsStore.state.current.stats).toEqual(expectedStats);
  });
});
