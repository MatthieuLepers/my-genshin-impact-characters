import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20201111 = async () => {
  const [ShardOfAFoulLegacy] = await Material.findOrCreate({
    where: { id: 'ShardOfAFoulLegacy' },
    defaults: { id: 'ShardOfAFoulLegacy' },
  });

  await Character.create({
    name: 'Tartaglia',
    releasedAt: '2020-11-11',
    element: 'hydro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        phaseIncrease: 0,
        phaseIncreaseBonus: 1,
        materialId: ShardOfAFoulLegacy.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: ShardOfAFoulLegacy.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: ShardOfAFoulLegacy.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 13103,
        atk: 301.36,
        def: 814.67,
        bonusType: 'HydroDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Diona',
    releasedAt: '2020-11-11',
    element: 'cryo',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: ShardOfAFoulLegacy.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: ShardOfAFoulLegacy.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: ShardOfAFoulLegacy.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9570,
        atk: 212.4,
        def: 600.62,
        bonusType: 'CryoDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
