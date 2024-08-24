import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20231220 = async () => {
  const [LightlessSilkString] = await Material.findOrCreate({
    where: { id: 'LightlessSilkString' },
    defaults: { id: 'LightlessSilkString' },
  });

  await Character.create({
    name: 'Navia',
    releasedAt: '2023-12-20',
    element: 'geo',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: LightlessSilkString.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: LightlessSilkString.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: LightlessSilkString.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12650,
        atk: 351.59,
        def: 793.15,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
