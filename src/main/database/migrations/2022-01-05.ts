import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220105 = async () => {
  const [HellfireButterfly] = await Material.findOrCreate({
    where: { id: 'HellfireButterfly' },
    defaults: { id: 'HellfireButterfly' },
  });

  await Character.create({
    name: 'Shenhe',
    releasedAt: '2022-01-05',
    element: 'cryo',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: HellfireButterfly.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12993,
        atk: 303.76,
        def: 830.04,
        bonusType: 'Atk%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Yun Jin',
    releasedAt: '2022-01-05',
    element: 'geo',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: HellfireButterfly.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10657,
        atk: 191.16,
        def: 734.39,
        bonusType: 'ER%',
        bonusValue: 26.67,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
