import {
  Character,
  CharacterAptitude,
  CharacterStats,
  Material,
} from '@/main/database/models';

export const migration20200928 = async () => {
  const [DvalinsSigh] = await Material.findOrCreate({
    where: { id: 'DvalinsSigh' },
    defaults: { id: 'DvalinsSigh' },
  });
  const [DvalinsPlume] = await Material.findOrCreate({
    where: { id: 'DvalinsPlume' },
    defaults: { id: 'DvalinsPlume' },
  });
  const [DvalinsClaw] = await Material.findOrCreate({
    where: { id: 'DvalinsClaw' },
    defaults: { id: 'DvalinsClaw' },
  });
  const [RingOfBoreas] = await Material.findOrCreate({
    where: { id: 'RingOfBoreas' },
    defaults: { id: 'RingOfBoreas' },
  });
  const [SpiritLocketOfBoreas] = await Material.findOrCreate({
    where: { id: 'SpiritLocketOfBoreas' },
    defaults: { id: 'SpiritLocketOfBoreas' },
  });
  const [TailOfBoreas] = await Material.findOrCreate({
    where: { id: 'TailOfBoreas' },
    defaults: { id: 'TailOfBoreas' },
  });

  await Character.create({
    name: 'Amber',
    releasedAt: '2020-09-28',
    element: 'pyro',
    owned: true,
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsSigh.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9461,
        atk: 223.02,
        def: 600.62,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Beidou',
    releasedAt: '2020-09-28',
    element: 'electro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DvalinsSigh.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 13050,
        atk: 225.14,
        def: 648.4,
        bonusType: 'ElectroDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Chongyun',
    releasedAt: '2020-09-28',
    element: 'cryo',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsSigh.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10984,
        atk: 223.02,
        def: 648.4,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Traveler-Anemo',
    releasedAt: '2020-09-28',
    element: 'anemo',
    owned: true,
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsSigh.id,
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
    name: 'Traveler-Geo',
    releasedAt: '2020-09-28',
    element: 'geo',
    owned: true,
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsSigh.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsSigh.id,
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
    name: 'Bennett',
    releasedAt: '2020-09-28',
    element: 'pyro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsPlume.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DvalinsPlume.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DvalinsPlume.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12397,
        atk: 191.16,
        def: 771.25,
        bonusType: 'ER%',
        bonusValue: 26.67,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Diluc',
    releasedAt: '2020-09-28',
    element: 'pyro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsPlume.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DvalinsPlume.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DvalinsPlume.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12981,
        atk: 334.85,
        def: 783.93,
        bonusType: 'CritRate%',
        bonusValue: 19.2,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Jean',
    releasedAt: '2020-09-28',
    element: 'anemo',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsPlume.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsPlume.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsPlume.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 14695,
        atk: 239.18,
        def: 768.55,
        bonusType: 'Heal%',
        bonusValue: 22.15,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Lisa',
    releasedAt: '2020-09-28',
    element: 'electro',
    owned: true,
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsClaw.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9570,
        atk: 231.51,
        def: 573.32,
        bonusType: 'EM',
        bonusValue: 96,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Noelle',
    releasedAt: '2020-09-28',
    element: 'geo',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: DvalinsClaw.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12071,
        atk: 191.16,
        def: 798.55,
        bonusType: 'Def%',
        bonusValue: 30,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Razor',
    releasedAt: '2020-09-28',
    element: 'electro',
    weaponType: 'claymore',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsClaw.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11962,
        atk: 233.64,
        def: 750.77,
        bonusType: 'PhysicalDmg%',
        bonusValue: 30,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Xiangling',
    releasedAt: '2020-09-28',
    element: 'pyro',
    weaponType: 'polearm',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: DvalinsClaw.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: DvalinsClaw.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10875,
        atk: 225.14,
        def: 668.87,
        bonusType: 'EM',
        bonusValue: 96,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Barbara',
    releasedAt: '2020-09-28',
    element: 'hydro',
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
        hp: 9787,
        atk: 159.3,
        def: 668.87,
        bonusType: 'HP%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Keqing',
    releasedAt: '2020-09-28',
    element: 'electro',
    weaponType: 'sword',
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
        hp: 13103,
        atk: 322.89,
        def: 799.3,
        bonusType: 'CritDmg%',
        bonusValue: 38.4,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Mona',
    releasedAt: '2020-09-28',
    element: 'hydro',
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
        hp: 10409,
        atk: 287.01,
        def: 653.27,
        bonusType: 'ER%',
        bonusValue: 32,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Qiqi',
    releasedAt: '2020-09-28',
    element: 'cryo',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TailOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: TailOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: TailOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 12368,
        atk: 287.01,
        def: 922.27,
        bonusType: 'Heal%',
        bonusValue: 22.15,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Venti',
    releasedAt: '2020-09-28',
    element: 'anemo',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TailOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: TailOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: TailOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10531,
        atk: 263.1,
        def: 668.64,
        bonusType: 'ER%',
        bonusValue: 32,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Xingqiu',
    releasedAt: '2020-09-28',
    element: 'hydro',
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: TailOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: TailOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: TailOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 10222,
        atk: 201.78,
        def: 757.6,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Fischl',
    releasedAt: '2020-09-28',
    element: 'electro',
    weaponType: 'bow',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: SpiritLocketOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9189,
        atk: 244.26,
        def: 593.79,
        bonusType: 'Atk%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Kaeya',
    releasedAt: '2020-09-28',
    element: 'cryo',
    owned: true,
    weaponType: 'sword',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: SpiritLocketOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 11636,
        atk: 223.02,
        def: 791.72,
        bonusType: 'ER%',
        bonusValue: 26.67,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Ningguang',
    releasedAt: '2020-09-28',
    element: 'geo',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 5,
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 3,
        materialId: SpiritLocketOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9787,
        atk: 212.4,
        def: 573.32,
        bonusType: 'GeoDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });

  await Character.create({
    name: 'Sucrose',
    releasedAt: '2020-09-28',
    element: 'anemo',
    weaponType: 'catalyser',
    aptitudes: [
      {
        type: 'NormalAttack',
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalSkill',
        constellationIncrease: 3,
        materialId: SpiritLocketOfBoreas.id,
      },
      {
        type: 'ElementalBurst',
        constellationIncrease: 5,
        materialId: SpiritLocketOfBoreas.id,
      },
    ],
    stats: [
      {
        level: 90,
        hp: 9244,
        atk: 169.92,
        def: 703.0,
        bonusType: 'AnemoDmg%',
        bonusValue: 24,
      },
    ],
  }, {
    include: [CharacterAptitude, CharacterStats],
  });
};
