import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210407 = async () => {
  const [ShadowOfTheWarrior] = await Material.findOrCreate({
    where: { id: 'ShadowOfTheWarrior' },
    defaults: { id: 'ShadowOfTheWarrior' },
  });

  await Character.create({
    name: 'Rosalia',
    releasedAt: '2021-04-07',
    element: 'cryo',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: ShadowOfTheWarrior.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: ShadowOfTheWarrior.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: ShadowOfTheWarrior.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12289,
        atk: 240.01,
        def: 709.82,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
