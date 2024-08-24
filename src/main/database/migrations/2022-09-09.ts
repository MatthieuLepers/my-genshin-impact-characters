import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220909 = async () => {
  const [BloodjadeBranch] = await Material.findOrCreate({
    where: { id: 'BloodjadeBranch' },
    defaults: { id: 'BloodjadeBranch' },
  });

  await Character.create({
    name: 'Dori',
    releasedAt: '2022-09-09',
    element: 'electro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: BloodjadeBranch.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: BloodjadeBranch.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: BloodjadeBranch.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12397,
        atk: 223.02,
        def: 723.47,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
