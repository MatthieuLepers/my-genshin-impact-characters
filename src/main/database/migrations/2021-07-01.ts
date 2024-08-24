import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210701 = async () => {
  const [BloodjadeBranch] = await Material.findOrCreate({
    where: { id: 'BloodjadeBranch' },
    defaults: { id: 'BloodjadeBranch' },
  });
  const [DragonLordsCrown] = await Material.findOrCreate({
    where: { id: 'DragonLordsCrown' },
    defaults: { id: 'DragonLordsCrown' },
  });

  await Character.create({
    name: 'Traveler-Electro',
    releasedAt: '2021-07-01',
    element: 'electro',
    owned: true,
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DragonLordsCrown.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DragonLordsCrown.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DragonLordsCrown.id,
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
    name: 'Kamisato Ayaka',
    releasedAt: '2021-07-01',
    element: 'cryo',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: BloodjadeBranch.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: BloodjadeBranch.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: BloodjadeBranch.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12858,
        atk: 342.03,
        def: 783.93,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
