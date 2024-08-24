import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220713 = async () => {
  const [TheMeaningOfAeons] = await Material.findOrCreate({
    where: { id: 'TheMeaningOfAeons' },
    defaults: { id: 'TheMeaningOfAeons' },
  });

  await Character.create({
    name: 'Shikanoin Heizou',
    releasedAt: '2022-07-13',
    element: 'anemo',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TheMeaningOfAeons.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: TheMeaningOfAeons.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: TheMeaningOfAeons.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10657,
        atk: 225.14,
        def: 683.89,
        bonusType: 'AnemoDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
