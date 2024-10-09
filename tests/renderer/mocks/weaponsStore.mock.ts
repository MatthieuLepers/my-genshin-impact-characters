import { weaponsStore } from '@renderer/core/entities/weapon/store';
import Weapon from '@renderer/core/entities/weapon';

jest.mock('@renderer/core/entities/weapon/store');

const mockWeapons = {
  1: new Weapon({
    id: 1,
    name: 'EngulfingLightning',
    releasedAt: new Date('2021-09-01 00:00:00.000 +00:00'),
    type: 'polearm',
    owned: true,
    level: 90,
    rank: 1,
    rarity: 5,
    atk: 45.94,
    statName: 'ER%',
    statValue: 12,
    tags: ['wishes', 'Raiden Shogun'],
  }),
};

weaponsStore.state.weapons = mockWeapons;

export default weaponsStore;
