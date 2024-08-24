import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20201020 = async () => {
  const [RingOfBoreas] = await Material.findOrCreate({
    where: { id: 'RingOfBoreas' },
    defaults: { id: 'RingOfBoreas' },
  });

  await Character.create({
    name: 'Klee',
    releasedAt: '2020-10-20',
    element: 'pyro',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: RingOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: RingOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: RingOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10287,
        atk: 310.93,
        def: 614.84,
        bonusType: 'PyroDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
