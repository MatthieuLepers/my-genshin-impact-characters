import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20201223 = async () => {
  const [TushOfMonocerosCaeli] = await Material.findOrCreate({
    where: { id: 'TushOfMonocerosCaeli' },
    defaults: { id: 'TushOfMonocerosCaeli' },
  });

  await Character.create({
    name: 'Albedo',
    releasedAt: '2020-12-23',
    element: 'geo',
    weaponType: 'sword',
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
        hp: 13226,
        atk: 251.14,
        def: 876.15,
        bonusType: 'GeoDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
