import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240109 = async () => {
  const [LightlessEyeOfTheMaelstrom] = await Material.findOrCreate({
    where: { id: 'LightlessEyeOfTheMaelstrom' },
    defaults: { id: 'LightlessEyeOfTheMaelstrom' },
  });

  await Character.create({
    name: 'Chevreuse',
    releasedAt: '2024-01-09',
    element: 'pyro',
    weaponType: 'polearm',
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
        hp: 11962,
        atk: 193.28,
        def: 604.71,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
