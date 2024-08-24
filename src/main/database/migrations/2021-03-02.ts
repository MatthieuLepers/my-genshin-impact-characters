import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210302 = async () => {
  const [ShardOfAFoulLegacy] = await Material.findOrCreate({
    where: { id: 'ShardOfAFoulLegacy' },
    defaults: { id: 'ShardOfAFoulLegacy' },
  });

  await Character.create({
    name: 'Hu Tao',
    releasedAt: '2021-03-02',
    element: 'pyro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: ShardOfAFoulLegacy.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: ShardOfAFoulLegacy.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: ShardOfAFoulLegacy.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 15552,
        atk: 106.43,
        def: 876.15,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
