import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20221207 = async () => {
  const [DakasBell] = await Material.findOrCreate({
    where: { id: 'DakasBell' },
    defaults: { id: 'DakasBell' },
  });
  const [PuppetStrings] = await Material.findOrCreate({
    where: { id: 'PuppetStrings' },
    defaults: { id: 'PuppetStrings' },
  });

  await Character.create({
    name: 'Wanderer',
    releasedAt: '2022-12-07',
    element: 'anemo',
    weaponType: 'catalyser',
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
        hp: 10164,
        atk: 327.67,
        def: 607.16,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Faruzan',
    releasedAt: '2022-12-07',
    element: 'anemo',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: PuppetStrings.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: PuppetStrings.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: PuppetStrings.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9570,
        atk: 196.47,
        def: 627.92,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
