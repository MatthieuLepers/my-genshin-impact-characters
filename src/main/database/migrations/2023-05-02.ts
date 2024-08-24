import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230502 = async () => {
  const [WorldspanFern] = await Material.findOrCreate({
    where: { id: 'WorldspanFern' },
    defaults: { id: 'WorldspanFern' },
  });
  const [PrimordialGreenbloom] = await Material.findOrCreate({
    where: { id: 'PrimordialGreenbloom' },
    defaults: { id: 'PrimordialGreenbloom' },
  });

  await Character.create({
    name: 'Baizhu',
    releasedAt: '2023-05-02',
    element: 'dendro',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: WorldspanFern.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: WorldspanFern.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: WorldspanFern.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 13348,
        atk: 192.54,
        def: 499.56,
        bonusType: 'HP%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Kaveh',
    releasedAt: '2023-05-02',
    element: 'dendro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: PrimordialGreenbloom.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: PrimordialGreenbloom.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: PrimordialGreenbloom.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11962,
        atk: 233.64,
        def: 750.77,
        bonusType: 'EM',
        bonusValue: 96,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
