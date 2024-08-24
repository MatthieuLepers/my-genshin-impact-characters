import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20201201 = async () => {
  const [TushOfMonocerosCaeli] = await Material.findOrCreate({
    where: { id: 'TushOfMonocerosCaeli' },
    defaults: { id: 'TushOfMonocerosCaeli' },
  });

  await Character.create({
    name: 'Zhongli',
    releasedAt: '2020-12-01',
    element: 'geo',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TushOfMonocerosCaeli.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: TushOfMonocerosCaeli.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: TushOfMonocerosCaeli.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 14695,
        atk: 251.14,
        def: 737.81,
        bonusType: 'GeoDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Xinyan',
    releasedAt: '2020-12-01',
    element: 'pyro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TushOfMonocerosCaeli.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: TushOfMonocerosCaeli.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: TushOfMonocerosCaeli.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11201,
        atk: 248.5,
        def: 798.55,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
