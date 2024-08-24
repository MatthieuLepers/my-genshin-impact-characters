import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210901 = async () => {
  const [MoltenMoment] = await Material.findOrCreate({
    where: { id: 'MoltenMoment' },
    defaults: { id: 'MoltenMoment' },
  });
  const [AshenHeart] = await Material.findOrCreate({
    where: { id: 'AshenHeart' },
    defaults: { id: 'AshenHeart' },
  });

  await Character.create({
    name: 'Shogun Raiden',
    releasedAt: '2021-09-01',
    element: 'electro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: MoltenMoment.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: MoltenMoment.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: MoltenMoment.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12907,
        atk: 337.24,
        def: 789.31,
        bonusType: 'ER%',
        bonusValue: 32,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Kujou Sara',
    releasedAt: '2021-09-01',
    element: 'electro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: AshenHeart.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: AshenHeart.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: AshenHeart.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9570,
        atk: 195.41,
        def: 627.92,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Aloy',
    releasedAt: '2021-09-01',
    element: 'cryo',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: MoltenMoment.id,
      },
      {
        type: 'ElementalSkill',
        materialId: MoltenMoment.id,
      },
      {
        type: 'ElementalBurst',
        materialId: MoltenMoment.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10899,
        atk: 233.92,
        def: 676.33,
        bonusType: 'CryoDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
