import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20221014 = async () => {
  const [TearsOfTheCalamitousGod] = await Material.findOrCreate({
    where: { id: 'TearsOfTheCalamitousGod' },
    defaults: { id: 'TearsOfTheCalamitousGod' },
  });

  await Character.create({
    name: 'Nilou',
    releasedAt: '2022-10-14',
    element: 'hydro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TearsOfTheCalamitousGod.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: TearsOfTheCalamitousGod.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: TearsOfTheCalamitousGod.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 15185,
        atk: 229.61,
        def: 728.59,
        bonusType: 'HP%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
