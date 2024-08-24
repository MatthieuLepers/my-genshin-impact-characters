import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240131 = async () => {
  const [LightlessMass] = await Material.findOrCreate({
    where: { id: 'LightlessMass' },
    defaults: { id: 'LightlessMass' },
  });
  const [LightlessEyeOfTheMaelstrom] = await Material.findOrCreate({
    where: { id: 'LightlessEyeOfTheMaelstrom' },
    defaults: { id: 'LightlessEyeOfTheMaelstrom' },
  });

  await Character.create({
    name: 'Xianyun',
    releasedAt: '2024-01-31',
    element: 'anemo',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: LightlessEyeOfTheMaelstrom.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: LightlessEyeOfTheMaelstrom.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: LightlessEyeOfTheMaelstrom.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10409,
        atk: 334.85,
        def: 572.57,
        bonusType: 'Atk%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Gaming',
    releasedAt: '2024-01-31',
    element: 'pyro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: LightlessMass.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: LightlessMass.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: LightlessMass.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11419,
        atk: 301.6,
        def: 703.0,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
