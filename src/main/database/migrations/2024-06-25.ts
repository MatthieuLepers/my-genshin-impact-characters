import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240625 = async () => {
  const [LightlessEyeOfTheMaelstrom] = await Material.findOrCreate({
    where: { id: 'LightlessEyeOfTheMaelstrom' },
    defaults: { id: 'LightlessEyeOfTheMaelstrom' },
  });

  await Character.create({
    name: 'Sigewinne',
    releasedAt: '2024-06-25',
    element: 'hydro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: LightlessEyeOfTheMaelstrom.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: LightlessEyeOfTheMaelstrom.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: LightlessEyeOfTheMaelstrom.id,
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
};
