import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20210629 = async () => {
  const [GildedScale] = await Material.findOrCreate({
    where: { id: 'GildedScale' },
    defaults: { id: 'GildedScale' },
  });

  await Character.create({
    name: 'Kaedehara Kazuha',
    releasedAt: '2021-06-29',
    element: 'anemo',
    weaponType: 'sword',
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
        hp: 13348,
        atk: 296.58,
        def: 806.98,
        bonusType: 'EM',
        bonusValue: 115.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
