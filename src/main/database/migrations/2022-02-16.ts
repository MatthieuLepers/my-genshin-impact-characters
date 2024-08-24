import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220216 = async () => {
  const [TheMeaningOfAeons] = await Material.findOrCreate({
    where: { id: 'TheMeaningOfAeons' },
    defaults: { id: 'TheMeaningOfAeons' },
  });

  await Character.create({
    name: 'Yae Miko',
    releasedAt: '2022-02-16',
    element: 'electro',
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
        hp: 10372,
        atk: 339.63,
        def: 568.73,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
