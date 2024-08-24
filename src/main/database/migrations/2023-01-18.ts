import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230118 = async () => {
  const [MirrorOfMushin] = await Material.findOrCreate({
    where: { id: 'MirrorOfMushin' },
    defaults: { id: 'MirrorOfMushin' },
  });
  const [DakasBell] = await Material.findOrCreate({
    where: { id: 'DakasBell' },
    defaults: { id: 'DakasBell' },
  });

  await Character.create({
    name: 'Alhaitham',
    releasedAt: '2023-01-18',
    element: 'dendro',
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
        hp: 13348,
        atk: 313.32,
        def: 781.62,
        bonusType: 'DendroDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Yaoyao',
    releasedAt: '2023-01-18',
    element: 'dendro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DakasBell.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DakasBell.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DakasBell.id,
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
