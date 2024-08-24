import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220621 = async () => {
  const [TearsOfTheCalamitousGod] = await Material.findOrCreate({
    where: { id: 'TearsOfTheCalamitousGod' },
    defaults: { id: 'TearsOfTheCalamitousGod' },
  });

  await Character.create({
    name: 'Kuki Shinobu',
    releasedAt: '2022-06-21',
    element: 'electro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TearsOfTheCalamitousGod.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: TearsOfTheCalamitousGod.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: TearsOfTheCalamitousGod.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12289,
        atk: 212.4,
        def: 750.77,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
