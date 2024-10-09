import artefactSetsStore from '@tests/renderer/mocks/artefactSetsStore.mock';

describe('ArtefactSet entity', () => {
  test('stats getter', () => {
    const expectedStats = {
      'ER%': 20,
    };
    expect(artefactSetsStore.state.sets.EmblemOfSeveredFate.stats).toEqual(expectedStats);
  });
});
