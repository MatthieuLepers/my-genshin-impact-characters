import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210518 = async () => {
  const [DragonLordsCrown] = await Material.findOrCreate({
    where: { id: 'DragonLordsCrown' },
    defaults: { id: 'DragonLordsCrown' },
  });

  await Character.create({
    name: 'Eula',
    releasedAt: '2021-05-18',
    element: 'cryo',
    weaponType: 'claymore',
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
        hp: 13226,
        atk: 342.03,
        def: 750.88,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
