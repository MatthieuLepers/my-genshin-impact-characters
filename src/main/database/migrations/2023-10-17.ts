import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20231017 = async () => {
  const [PrimordialGreenbloom] = await Material.findOrCreate({
    where: { id: 'PrimordialGreenbloom' },
    defaults: { id: 'PrimordialGreenbloom' },
  });

  await Character.create({
    name: 'Wriothesley',
    releasedAt: '2023-10-17',
    element: 'cryo',
    weaponType: 'catalyser',
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
        hp: 13593,
        atk: 310.93,
        def: 763.17,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
