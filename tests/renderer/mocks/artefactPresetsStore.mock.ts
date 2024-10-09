import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import ArtefactPreset from '@renderer/core/entities/artefactPreset';

jest.mock('@renderer/core/entities/artefactPreset/store');

const mockPresets = {
  1: new ArtefactPreset({
    id: 1,
    name: 'Raiden Shogun',
    flowerId: 1,
    featherId: 2,
    sandsId: 3,
    gobletId: 4,
    circletId: 5,
  }),
};

artefactPresetsStore.state.sets = mockPresets;
[artefactPresetsStore.state.current] = Object.values(mockPresets);

export default artefactPresetsStore;
