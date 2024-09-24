import { artefactSetsStore } from '@renderer/core/entities/artefactSet/store';
import ArtefactSet from '@renderer/core/entities/artefactSet';

jest.mock('@renderer/core/entities/artefactSet/store');

const mockSets = {
  EmblemOfSeveredFate: new ArtefactSet({
    id: 'EmblemOfSeveredFate',
    releasedAt: new Date('2021-07-21 00:00:00.000 +00:00'),
    passiveStats: [
      {
        dataValues: {
          id: 1,
          statType: 'ER%',
          statValue: 20,
        },
      }
    ],
  }),
};

artefactSetsStore.state.sets = mockSets;

export default artefactSetsStore;
