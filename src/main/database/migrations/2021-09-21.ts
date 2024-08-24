import {
  Character,
  CharacterAptitude,
  CharacterPassiveStat,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210921 = async () => {
  const [HellfireButterfly] = await Material.findOrCreate({
    where: { id: 'HellfireButterfly' },
    defaults: { id: 'HellfireButterfly' },
  });

  await Character.create({
    name: 'Sangonomiya Kokomi',
    releasedAt: '2021-09-21',
    element: 'hydro',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: HellfireButterfly.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 13471,
        atk: 234.39,
        def: 657.11,
        bonusType: 'HydroDmg%',
        bonusValue: 28.8,
      },
    ],
    passiveStats: [
      {
        statType: 'Heal%',
        stateValue: 25,
      },
      {
        statType: 'CritRate%',
        stateValue: -100,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats, CharacterPassiveStat],
  });
};
