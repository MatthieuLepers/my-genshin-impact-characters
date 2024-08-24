import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210203 = async () => {
  const [ShadowOfTheWarrior] = await Material.findOrCreate({
    where: { id: 'ShadowOfTheWarrior' },
    defaults: { id: 'ShadowOfTheWarrior' },
  });

  await Character.create({
    name: 'Xiao',
    releasedAt: '2021-02-03',
    element: 'anemo',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: ShadowOfTheWarrior.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: ShadowOfTheWarrior.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: ShadowOfTheWarrior.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12736,
        atk: 349.2,
        def: 799.3,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
