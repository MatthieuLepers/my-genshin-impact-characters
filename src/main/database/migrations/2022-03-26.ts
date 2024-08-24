import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20220326 = async () => {
  const [MudraOfTheMaleficGeneral] = await Material.findOrCreate({
    where: { id: 'MudraOfTheMaleficGeneral' },
    defaults: { id: 'MudraOfTheMaleficGeneral' },
  });

  await Character.create({
    name: 'Kamisato Ayato',
    releasedAt: '2022-03-26',
    element: 'hydro',
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
        hp: 13715,
        atk: 298.97,
        def: 768.55,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
