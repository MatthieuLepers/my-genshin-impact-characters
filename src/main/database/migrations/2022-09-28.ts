import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220928 = async () => {
  const [MudraOfTheMaleficGeneral] = await Material.findOrCreate({
    where: { id: 'MudraOfTheMaleficGeneral' },
    defaults: { id: 'MudraOfTheMaleficGeneral' },
  });
  const [TearsOfTheCalamitousGod] = await Material.findOrCreate({
    where: { id: 'TearsOfTheCalamitousGod' },
    defaults: { id: 'TearsOfTheCalamitousGod' },
  });

  await Character.create({
    name: 'Cyno',
    releasedAt: '2022-09-28',
    element: 'electro',
    weaponType: 'polearm',
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
        hp: 12491,
        atk: 318.11,
        def: 859.24,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Candace',
    releasedAt: '2022-09-28',
    element: 'hydro',
    weaponType: 'polearm',
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
        hp: 10875,
        atk: 212.4,
        def: 682.52,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
