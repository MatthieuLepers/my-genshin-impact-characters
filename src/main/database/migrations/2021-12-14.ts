import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20211214 = async () => {
  const [MoltenMoment] = await Material.findOrCreate({
    where: { id: 'MoltenMoment' },
    defaults: { id: 'MoltenMoment' },
  });
  const [AshenHeart] = await Material.findOrCreate({
    where: { id: 'AshenHeart' },
    defaults: { id: 'AshenHeart' },
  });

  await Character.create({
    name: 'Arataki Itto',
    releasedAt: '2021-12-14',
    element: 'geo',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: AshenHeart.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: AshenHeart.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: AshenHeart.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12858,
        atk: 227.22,
        def: 959.16,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Gorou',
    releasedAt: '2021-12-14',
    element: 'geo',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: MoltenMoment.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: MoltenMoment.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: MoltenMoment.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9570,
        atk: 182.66,
        def: 648.4,
        bonusType: 'GeoDmg%',
        bonusValue: 24.0,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
