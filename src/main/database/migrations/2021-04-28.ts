import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210428 = async () => {
  const [BloodjadeBranch] = await Material.findOrCreate({
    where: { id: 'BloodjadeBranch' },
    defaults: { id: 'BloodjadeBranch' },
  });

  await Character.create({
    name: 'Yanfei',
    releasedAt: '2021-04-28',
    element: 'pyro',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: BloodjadeBranch.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: BloodjadeBranch.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: BloodjadeBranch.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9352,
        atk: 240.01,
        def: 586.97,
        bonusType: 'PyroDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
