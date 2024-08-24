import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230816 = async () => {
  const [Everamber] = await Material.findOrCreate({
    where: { id: 'Everamber' },
    defaults: { id: 'Everamber' },
  });
  const [PrimordialGreenbloom] = await Material.findOrCreate({
    where: { id: 'PrimordialGreenbloom' },
    defaults: { id: 'PrimordialGreenbloom' },
  });
  const [WorldspanFern] = await Material.findOrCreate({
    where: { id: 'WorldspanFern' },
    defaults: { id: 'WorldspanFern' },
  });

  await Character.create({
    name: 'Traveler-Hydro',
    releasedAt: '2023-08-16',
    element: 'hydro',
    owned: true,
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: WorldspanFern.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: WorldspanFern.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: WorldspanFern.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10875,
        atk: 212.4,
        def: 682.52,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Lyney',
    releasedAt: '2023-08-16',
    element: 'pyro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        constellationIncrease: 3,
        materialId: PrimordialGreenbloom.id,
      },
      {
        type: 'ElementalSkill',
        materialId: PrimordialGreenbloom.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: PrimordialGreenbloom.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11021,
        atk: 318.11,
        def: 537.99,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Lynette',
    releasedAt: '2023-08-16',
    element: 'anemo',
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
        hp: 12397,
        atk: 231.51,
        def: 711.87,
        bonusType: 'AnemoDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
