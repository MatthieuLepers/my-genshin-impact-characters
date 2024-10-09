import { characterBuildsStore } from '@renderer/core/entities/characterBuild/store';
import CharacterBuild from '@renderer/core/entities/characterBuild';

jest.mock('@renderer/core/entities/characterBuild/store');

const mockBuilds = {
  1: new CharacterBuild({
    id: 1,
    name: 'Raiden Shogun',
    flowerId: 1,
    featherId: 2,
    sandsId: 3,
    gobletId: 4,
    circletId: 5,
    characterId: 1,
    weaponId: 1,
  }),
};

characterBuildsStore.state.builds = mockBuilds;
[characterBuildsStore.state.current] = Object.values(mockBuilds);

export default characterBuildsStore;
