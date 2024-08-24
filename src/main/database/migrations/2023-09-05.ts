import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20230905 = async () => {
  const [WorldspanFern] = await Material.findOrCreate({
    where: { id: 'WorldspanFern' },
    defaults: { id: 'WorldspanFern' },
  });

  await Character.create({
    name: 'Freminet',
    releasedAt: '2023-09-05',
    element: 'cryo',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: WorldspanFern.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: WorldspanFern.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: WorldspanFern.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12071,
        atk: 254.88,
        def: 708.46,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
