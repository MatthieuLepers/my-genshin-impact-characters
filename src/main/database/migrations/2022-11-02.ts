import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20221102 = async () => {
  const [PuppetStrings] = await Material.findOrCreate({
    where: { id: 'PuppetStrings' },
    defaults: { id: 'PuppetStrings' },
  });

  await Character.create({
    name: 'Nahida',
    releasedAt: '2022-11-02',
    element: 'dendro',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: PuppetStrings.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: PuppetStrings.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: PuppetStrings.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10360,
        atk: 298.97,
        def: 630.21,
        bonusType: 'EM',
        bonusValue: 115.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
