import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20231114 = async () => {
  const [LightlessSilkString] = await Material.findOrCreate({
    where: { id: 'LightlessSilkString' },
    defaults: { id: 'LightlessSilkString' },
  });
  const [LightlessMass] = await Material.findOrCreate({
    where: { id: 'LightlessMass' },
    defaults: { id: 'LightlessMass' },
  });

  await Character.create({
    name: 'Furina',
    releasedAt: '2023-11-14',
    element: 'hydro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: LightlessMass.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: LightlessMass.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: LightlessMass.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 15307,
        atk: 243.96,
        def: 695.54,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Charlotte',
    releasedAt: '2023-11-14',
    element: 'cryo',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: LightlessSilkString.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: LightlessSilkString.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: LightlessSilkString.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10766,
        atk: 173.1,
        def: 546.02,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
