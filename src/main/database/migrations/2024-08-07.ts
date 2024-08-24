import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240807 = async () => {
  const [SilkenFeather] = await Material.findOrCreate({
    where: { id: 'SilkenFeather' },
    defaults: { id: 'SilkenFeather' },
  });

  await Character.create({
    name: 'Emilie',
    releasedAt: '2024-08-07',
    element: 'dendro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: SilkenFeather.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: SilkenFeather.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: SilkenFeather.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 13568,
        atk: 334.85,
        def: 730.13,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
