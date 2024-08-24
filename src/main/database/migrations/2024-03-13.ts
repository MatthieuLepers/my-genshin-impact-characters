import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20240313 = async () => {
  const [LightlessSilkString] = await Material.findOrCreate({
    where: { id: 'LightlessSilkString' },
    defaults: { id: 'LightlessSilkString' },
  });

  await Character.create({
    name: 'Chiori',
    releasedAt: '2024-03-13',
    element: 'geo',
    weaponType: 'sword',
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
        hp: 11438,
        atk: 322.89,
        def: 953.01,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
