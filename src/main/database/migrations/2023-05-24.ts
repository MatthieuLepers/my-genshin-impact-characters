import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230524 = async () => {
  const [Everamber] = await Material.findOrCreate({
    where: { id: 'Everamber' },
    defaults: { id: 'Everamber' },
  });

  await Character.create({
    name: 'Kirara',
    releasedAt: '2023-05-24',
    element: 'dendro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: Everamber.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: Everamber.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: Everamber.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12180,
        atk: 223.02,
        def: 546.02,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
