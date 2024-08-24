import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210810 = async () => {
  const [DragonLordsCrown] = await Material.findOrCreate({
    where: { id: 'DragonLordsCrown' },
    defaults: { id: 'DragonLordsCrown' },
  });
  const [GildedScale] = await Material.findOrCreate({
    where: { id: 'GildedScale' },
    defaults: { id: 'GildedScale' },
  });

  await Character.create({
    name: 'Yoimiya',
    releasedAt: '2021-08-10',
    element: 'pyro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DragonLordsCrown.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DragonLordsCrown.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DragonLordsCrown.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10164,
        atk: 322.89,
        def: 614.84,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Sayu',
    releasedAt: '2021-08-10',
    element: 'anemo',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: GildedScale.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: GildedScale.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: GildedScale.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11854,
        atk: 244.26,
        def: 744.63,
        bonusType: 'EM',
        bonusValue: 96,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
