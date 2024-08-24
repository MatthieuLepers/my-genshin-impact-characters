import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220431 = async () => {
  const [GildedScale] = await Material.findOrCreate({
    where: { id: 'GildedScale' },
    defaults: { id: 'GildedScale' },
  });

  await Character.create({
    name: 'Yelan',
    releasedAt: '2022-04-31',
    element: 'hydro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: GildedScale.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: GildedScale.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: GildedScale.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 14450,
        atk: 243.96,
        def: 547.98,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
