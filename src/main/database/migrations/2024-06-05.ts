import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240605 = async () => {
  const [Everamber] = await Material.findOrCreate({
    where: { id: 'Everamber' },
    defaults: { id: 'Everamber' },
  });
  const [DakasBell] = await Material.findOrCreate({
    where: { id: 'DakasBell' },
    defaults: { id: 'DakasBell' },
  });

  await Character.create({
    name: 'Clorinde',
    releasedAt: '2024-06-05',
    element: 'electro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: Everamber.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: Everamber.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: Everamber.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12956,
        atk: 337.24,
        def: 783.93,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Sethos',
    releasedAt: '2024-06-05',
    element: 'electro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DakasBell.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DakasBell.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DakasBell.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9787,
        atk: 227.26,
        def: 559.67,
        bonusType: 'EM',
        bonusValue: 96,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
