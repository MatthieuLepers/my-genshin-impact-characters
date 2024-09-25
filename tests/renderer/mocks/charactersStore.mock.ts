import { charactersStore } from '@renderer/core/entities/character/store';
import Character from '@renderer/core/entities/character';

jest.mock('@renderer/core/entities/character/store');

const mockCharacters = {
  'Raiden Shogun': new Character({
    id: 1,
    name: 'Raiden Shogun',
    element: 'electro',
    releasedAt: new Date('2021-09-01 00:00:00.000 +00:00'),
    level: 90,
    phase: 6,
    constellation: 2,
    owned: true,
    weaponType: 'polearm',
    aptitudes: [
      {
        dataValues: {
          id: 1,
          type: 'NormalAttack',
          phaseIncrease: 0,
          phaseIncreaseBonus: 0,
          constellationIncrease: 0,
          constellationIncreaseBonus: 0,
          materialId: 'MoltenMoment',
          level: 6,
        },
      },
      {
        dataValues: {
          id: 2,
          type: 'ElementalSkill',
          phaseIncrease: 0,
          phaseIncreaseBonus: 0,
          constellationIncrease: 5,
          constellationIncreaseBonus: 3,
          materialId: 'MoltenMoment',
          level: 6,
        },
      },
      {
        dataValues: {
          id: 3,
          type: 'ElementalBurst',
          phaseIncrease: 0,
          phaseIncreaseBonus: 0,
          constellationIncrease: 3,
          constellationIncreaseBonus: 3,
          materialId: 'MoltenMoment',
          level: 10,
        },
      },
    ],
    passiveStats: [],
    stats: [
      {
        dataValues: {
          id: 1,
          level: 90,
          hp: 12907,
          atk: 337.24,
          def: 789.31,
          bonusType: 'ER%',
          bonusValue: 32,
        },
      },
    ],
  }),
  'Sangonomyia Kokomi': new Character({
    id: 2,
    name: 'Sangonomyia Kokomi',
    element: 'hydro',
    releasedAt: new Date('2021-09-21 00:00:00.000 +00:00'),
    level: 90,
    phase: 6,
    constellation: 2,
    owned: true,
    weaponType: 'catalyser',
    aptitudes: [
      {
        dataValues: {
          id: 1,
          type: 'NormalAttack',
          phaseIncrease: 0,
          phaseIncreaseBonus: 0,
          constellationIncrease: 0,
          constellationIncreaseBonus: 0,
          materialId: 'HellfireButterfly',
          level: 6,
        },
      },
      {
        dataValues: {
          id: 2,
          type: 'ElementalSkill',
          phaseIncrease: 0,
          phaseIncreaseBonus: 0,
          constellationIncrease: 3,
          constellationIncreaseBonus: 3,
          materialId: 'HellfireButterfly',
          level: 6,
        },
      },
      {
        dataValues: {
          id: 3,
          type: 'ElementalBurst',
          phaseIncrease: 0,
          phaseIncreaseBonus: 0,
          constellationIncrease: 5,
          constellationIncreaseBonus: 3,
          materialId: 'HellfireButterfly',
          level: 6,
        },
      },
    ],
    passiveStats: [
      {
        dataValues: {
          id: 1,
          statType: 'Heal%',
          statValue: 25,
        },
      },
      {
        dataValues: {
          id: 2,
          statType: 'CritRate%',
          statValue: -100,
        },
      },
    ],
    stats: [
      {
        dataValues: {
          id: 2,
          level: 90,
          hp: 13471,
          atk: 234.39,
          def: 657.11,
          bonusType: 'HydroDmg%',
          bonusValue: 28.8,
        },
      },
    ],
  }),
};

charactersStore.state.characters = mockCharacters;

export default charactersStore;
