import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230927 = async () => {
  const [Everamber] = await Material.findOrCreate({
    where: { id: 'Everamber' },
    defaults: { id: 'Everamber' },
  });

  await Character.create({
    name: 'Neuvillette',
    releasedAt: '2023-09-27',
    element: 'hydro',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        constellationIncrease: 3,
        materialId: Everamber.id,
      },
      {
        type: 'ElementalSkill',
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
        hp: 14695,
        atk: 208.32,
        def: 576.42,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
