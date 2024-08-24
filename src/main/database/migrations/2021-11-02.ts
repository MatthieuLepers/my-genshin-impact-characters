import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20211102 = async () => {
  const [HellfireButterfly] = await Material.findOrCreate({
    where: { id: 'HellfireButterfly' },
    defaults: { id: 'HellfireButterfly' },
  });

  await Character.create({
    name: 'Thomas',
    releasedAt: '2021-11-02',
    element: 'pyro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: HellfireButterfly.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: HellfireButterfly.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10331,
        atk: 201.78,
        def: 750.77,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
