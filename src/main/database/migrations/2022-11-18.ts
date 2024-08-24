import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20221118 = async () => {
  const [MirrorOfMushin] = await Material.findOrCreate({
    where: { id: 'MirrorOfMushin' },
    defaults: { id: 'MirrorOfMushin' },
  });

  await Character.create({
    name: 'Layla',
    releasedAt: '2022-11-18',
    element: 'cryo',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: MirrorOfMushin.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: MirrorOfMushin.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: MirrorOfMushin.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11092,
        atk: 216.65,
        def: 655.22,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
