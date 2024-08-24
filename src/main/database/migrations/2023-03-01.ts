import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230301 = async () => {
  const [PuppetStrings] = await Material.findOrCreate({
    where: { id: 'PuppetStrings' },
    defaults: { id: 'PuppetStrings' },
  });
  const [MirrorOfMushin] = await Material.findOrCreate({
    where: { id: 'MirrorOfMushin' },
    defaults: { id: 'MirrorOfMushin' },
  });

  await Character.create({
    name: 'Dehya',
    releasedAt: '2023-03-01',
    element: 'pyro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: PuppetStrings.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: PuppetStrings.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: PuppetStrings.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 15675,
        atk: 265.49,
        def: 627.91,
        bonusType: 'HP%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Mika',
    releasedAt: '2023-03-01',
    element: 'cryo',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: MirrorOfMushin.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: MirrorOfMushin.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: MirrorOfMushin.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12506,
        atk: 223.02,
        def: 713.23,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
