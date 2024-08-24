import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220824 = async () => {
  const [TearsOfTheCalamitousGod] = await Material.findOrCreate({
    where: { id: 'TearsOfTheCalamitousGod' },
    defaults: { id: 'TearsOfTheCalamitousGod' },
  });
  const [TheMeaningOfAeons] = await Material.findOrCreate({
    where: { id: 'TheMeaningOfAeons' },
    defaults: { id: 'TheMeaningOfAeons' },
  });
  const [MudraOfTheMaleficGeneral] = await Material.findOrCreate({
    where: { id: 'MudraOfTheMaleficGeneral' },
    defaults: { id: 'MudraOfTheMaleficGeneral' },
  });

  await Character.create({
    name: 'Traveler-Dendro',
    releasedAt: '2022-08-24',
    element: 'dendro',
    owned: true,
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: MudraOfTheMaleficGeneral.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: MudraOfTheMaleficGeneral.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: MudraOfTheMaleficGeneral.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10875,
        atk: 212.4,
        def: 682.52,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Tighnari',
    releasedAt: '2022-08-24',
    element: 'dendro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TheMeaningOfAeons.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: TheMeaningOfAeons.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: TheMeaningOfAeons.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10850,
        atk: 267.88,
        def: 630.21,
        bonusType: 'DendroDmg%',
        bonusValue: 28.8,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Collei',
    releasedAt: '2022-08-24',
    element: 'dendro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TearsOfTheCalamitousGod.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: TearsOfTheCalamitousGod.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: TearsOfTheCalamitousGod.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9787,
        atk: 199.65,
        def: 600.62,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
