import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210112 = async () => {
  const [ShadowOfTheWarrior] = await Material.findOrCreate({
    where: { id: 'ShadowOfTheWarrior' },
    defaults: { id: 'ShadowOfTheWarrior' },
  });

  await Character.create({
    name: 'Ganyu',
    releasedAt: '2021-01-12',
    element: 'cryo',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: ShadowOfTheWarrior.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: ShadowOfTheWarrior.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: ShadowOfTheWarrior.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9797,
        atk: 334.85,
        def: 630.21,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
