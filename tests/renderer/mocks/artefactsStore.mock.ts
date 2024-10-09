import { artefactsStore } from '@renderer/core/entities/artefact/store';
import Artefact from '@renderer/core/entities/artefact';

jest.mock('@renderer/core/entities/artefact/store');

const mockArtefacts = {
  1: new Artefact({
    id: 1,
    type: 'flower',
    setId: 'EmblemOfSeveredFate',
    statsJson: [
      { name: 'HP', value: 4780, main: true },
      { name: 'ER%', value: 28.5} ,
      { name: 'CritDmg%', value: 7.8 },
      { name: 'EM', value: 16 },
      { name: 'Atk%', value: 5.3 },
    ],
  }),
  2: new Artefact({
    id: 2,
    type: 'feather',
    setId: 'EmblemOfSeveredFate',
    statsJson: [
      { name: 'Atk', value: 311, main: true },
      { name: 'HP', value: 209 },
      { name: 'ER%', value: 10.4 },
      { name: 'Atk%', value: 8.2 },
      { name: 'CritDmg%', value: 28.7 },
    ],
  }),
  3: new Artefact({
    id: 3,
    type: 'sands',
    setId: 'EmblemOfSeveredFate',
    statsJson: [
      { name: 'ER%', value: 51.8, main: true },
      { name: 'CritDmg%', value: 14.8 },
      { name: 'Atk%', value: 5.3 },
      { name: 'Def', value: 44 },
      { name: 'CritRate%', value: 10.5 },
    ],
  }),
  4: new Artefact({
    id: 4,
    type: 'goblet',
    setId: 'EmblemOfSeveredFate',
    statsJson: [
      { name: 'Atk%', value: 46.6, main: true },
      { name: 'CritDmg%', value: 12.4 },
      { name: 'HP', value: 269 },
      { name: 'CritRate%', value: 12.8 },
      { name: 'HP%', value: 4.7 },
    ],
  }),
  5: new Artefact({
    id: 5,
    type: 'circlet',
    setId: 'EmblemOfSeveredFate',
    statsJson: [
      { name: 'CritRate%', value: 31.1, main: true },
      { name: 'CritDmg%', value: 12.4 },
      { name: 'Def', value: 39 },
      { name: 'Atk', value: 33 },
      { name: 'Atk%', value: 9.3 },
    ],
  }),
};

artefactsStore.state.artefacts = mockArtefacts;
[artefactsStore.state.current] = Object.values(mockArtefacts);

export default artefactsStore;
