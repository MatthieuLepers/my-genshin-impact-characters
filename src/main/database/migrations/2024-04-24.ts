import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240424 = async () => {
  const [FadingCandle] = await Material.findOrCreate({
    where: { id: 'FadingCandle' },
    defaults: { id: 'FadingCandle' },
  });
  await Material.findOrCreate({
    where: { id: 'SilkenFeather' },
    defaults: { id: 'SilkenFeather' },
  });
  await Material.findOrCreate({
    where: { id: 'DenialAndJudgment' },
    defaults: { id: 'DenialAndJudgment' },
  });

  await Character.create({
    name: 'Arlecchino',
    releasedAt: '2024-04-24',
    element: 'pyro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: FadingCandle.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: FadingCandle.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: FadingCandle.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 13103,
        atk: 342.03,
        def: 764.71,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
