import { Weapon } from '@/main/database/models';

export default async () => {
  await Weapon.findOrCreate({
    where: { name: 'Absolution' },
    defaults: {
      name: 'Absolution',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritDmg%',
      stateValue: 9.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Akuoumaru' },
    defaults: {
      name: 'Akuoumaru',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AlleyHunter' },
    defaults: {
      name: 'AlleyHunter',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AmenomaKageuchi' },
    defaults: {
      name: 'AmenomaKageuchi',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Atk%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AmosBow' },
    defaults: {
      name: 'AmosBow',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'Atk%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ApprenticesNotes' },
    defaults: {
      name: 'ApprenticesNotes',
      type: 'catalyser',
      owned: false,
      rarity: 1,
      atk: 23.25,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AquaSimulacra' },
    defaults: {
      name: 'AquaSimulacra',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AquilaFavonia' },
    defaults: {
      name: 'AquilaFavonia',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'PhysicalDmg%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AshGravenDrinkingHorn' },
    defaults: {
      name: 'AshGravenDrinkingHorn',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'HP%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'AThousandFloatingDreams' },
    defaults: {
      name: 'AThousandFloatingDreams',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'EM',
      stateValue: 57.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BalladOfTheBoundlessBlue' },
    defaults: {
      name: 'BalladOfTheBoundlessBlue',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BalladOfTheFjords' },
    defaults: {
      name: 'BalladOfTheFjords',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritRate%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BeaconOfTheReedSea' },
    defaults: {
      name: 'BeaconOfTheReedSea',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritRate%',
      stateValue: 7.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BeginnersProtector' },
    defaults: {
      name: 'BeginnersProtector',
      type: 'polearm',
      owned: false,
      rarity: 1,
      atk: 23.25,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BlackcliffAgate' },
    defaults: {
      name: 'BlackcliffAgate',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritDmg%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BlackcliffLongsword' },
    defaults: {
      name: 'BlackcliffLongsword',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'CritDmg%',
      stateValue: 8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BlackcliffPole' },
    defaults: {
      name: 'BlackcliffPole',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritDmg%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BlackcliffSlasher' },
    defaults: {
      name: 'BlackcliffSlasher',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritDmg%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BlackcliffWarbow' },
    defaults: {
      name: 'BlackcliffWarbow',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'CritDmg%',
      stateValue: 8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BlackTassel' },
    defaults: {
      name: 'BlackTassel',
      type: 'polearm',
      owned: false,
      rarity: 3,
      atk: 37.61,
      stateName: 'HP%',
      stateValue: 10.21,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'BloodtaintedGreatsword' },
    defaults: {
      name: 'BloodtaintedGreatsword',
      type: 'claymore',
      owned: false,
      rarity: 3,
      atk: 37.6,
      stateName: 'EM',
      stateValue: 40.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CalamityQueller' },
    defaults: {
      name: 'CalamityQueller',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 49.14,
      stateName: 'Ark%',
      stateValue: 3.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CashflowSupervision' },
    defaults: {
      name: 'CashflowSupervision',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritRate%',
      stateValue: 4.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ChainBreaker' },
    defaults: {
      name: 'ChainBreaker',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CinnabarSpindle' },
    defaults: {
      name: 'CinnabarSpindle',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Def%',
      stateValue: 15.01,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Cloudforged' },
    defaults: {
      name: 'Cloudforged',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CompoundBow' },
    defaults: {
      name: 'CompoundBow',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'PhysicalDmg%',
      stateValue: 15.01,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CoolSteel' },
    defaults: {
      name: 'CoolSteel',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'Atk%',
      stateValue: 7.66,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CranesEchoingCall' },
    defaults: {
      name: 'CranesEchoingCall',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 49.14,
      stateName: 'Atk%',
      stateValue: 3.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CrescentPike' },
    defaults: {
      name: 'CrescentPike',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'PhysicalDmg%',
      stateValue: 7.51,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'CrimsonMoonsSemblance' },
    defaults: {
      name: 'CrimsonMoonsSemblance',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritRate%',
      stateValue: 4.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DarkIronSword' },
    defaults: {
      name: 'DarkIronSword',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'EM',
      stateValue: 30.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Deathmatch' },
    defaults: {
      name: 'Deathmatch',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'CritRate%',
      stateValue: 8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DebateClub' },
    defaults: {
      name: 'DebateClub',
      type: 'claymore',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'Atk%',
      stateValue: 7.66,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DialoguesOfTheDesertSages' },
    defaults: {
      name: 'DialoguesOfTheDesertSages',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'HP%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DodocoTales' },
    defaults: {
      name: 'DodocoTales',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Atk%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DragonsBane' },
    defaults: {
      name: 'DragonsBane',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'EM',
      stateValue: 48,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DragonspineSpear' },
    defaults: {
      name: 'DragonspineSpear',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'PhysicalDmg%',
      stateValue: 15.01,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'DullBlade' },
    defaults: {
      name: 'DullBlade',
      type: 'sword',
      owned: false,
      rarity: 1,
      atk: 23.25,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'EarthShaker' },
    defaults: {
      name: 'EarthShaker',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ElegyForTheEnd' },
    defaults: {
      name: 'ElegyForTheEnd',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'ER%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'EmeraldOrb' },
    defaults: {
      name: 'EmeraldOrb',
      type: 'catalyser',
      owned: false,
      rarity: 3,
      atk: 39.88,
      stateName: 'EM',
      stateValue: 20.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'EndOfTheLine' },
    defaults: {
      name: 'EndOfTheLine',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'EngulfingLightning' },
    defaults: {
      name: 'EngulfingLightning',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'ER%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'EverlastingMoonglow' },
    defaults: {
      name: 'EverlastingMoonglow',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'HP%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'EyeOfPerception' },
    defaults: {
      name: 'EyeOfPerception',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Atk%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FadingTwilight' },
    defaults: {
      name: 'FadingTwilight',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FangOfTheMountainKing' },
    defaults: {
      name: 'FangOfTheMountainKing',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 49.14,
      stateName: 'CritRate%',
      stateValue: 2.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FavoniusCodex' },
    defaults: {
      name: 'FavoniusCodex',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FavoniusGreatsword' },
    defaults: {
      name: 'FavoniusGreatsword',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'ER%',
      stateValue: 13.33,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FavoniusLance' },
    defaults: {
      name: 'FavoniusLance',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FavoniusSword' },
    defaults: {
      name: 'FavoniusSword',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'ER%',
      stateValue: 13.33,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FavoniusWarbow' },
    defaults: {
      name: 'FavoniusWarbow',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'ER%',
      stateValue: 13.33,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FerrousShadow' },
    defaults: {
      name: 'FerrousShadow',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'HP%',
      stateValue: 7.66,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FesteringDesire' },
    defaults: {
      name: 'FesteringDesire',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FilletBlade' },
    defaults: {
      name: 'FilletBlade',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'Atk%',
      stateValue: 7.66,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FinaleOfTheDeep' },
    defaults: {
      name: 'FinaleOfTheDeep',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FleuveCendreFerryman' },
    defaults: {
      name: 'FleuveCendreFerryman',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FlowingPurity' },
    defaults: {
      name: 'FlowingPurity',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FluteOfEzpitzal' },
    defaults: {
      name: 'FluteOfEzpitzal',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Def%',
      stateValue: 15.01,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FootprintOfTheRainbow' },
    defaults: {
      name: 'FootprintOfTheRainbow',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Def%',
      stateValue: 11.26,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ForestRegalia' },
    defaults: {
      name: 'ForestRegalia',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FreedomSword' },
    defaults: {
      name: 'FreedomSword',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'EM',
      stateValue: 43.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Frostbearer' },
    defaults: {
      name: 'Frostbearer',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'FruitOfFulfillment' },
    defaults: {
      name: 'FruitOfFulfillment',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'HakushinRing' },
    defaults: {
      name: 'HakushinRing',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Halberd' },
    defaults: {
      name: 'Halberd',
      type: 'polearm',
      owned: false,
      rarity: 3,
      atk: 39.88,
      stateName: 'Atk%',
      stateValue: 5.11,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Hamayumi' },
    defaults: {
      name: 'Hamayumi',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Atk%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'HaranGeppakuFutsu' },
    defaults: {
      name: 'HaranGeppakuFutsu',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritRate%',
      stateValue: 7.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'HarbingerOfDawn' },
    defaults: {
      name: 'HarbingerOfDawn',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'CritDmg%',
      stateValue: 10.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'HuntersBow' },
    defaults: {
      name: 'HuntersBow',
      type: 'bow',
      owned: false,
      rarity: 1,
      atk: 23.25,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'HuntersPath' },
    defaults: {
      name: 'HuntersPath',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritRate%',
      stateValue: 9.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'IbisPiercer' },
    defaults: {
      name: 'IbisPiercer',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'IronPoint' },
    defaults: {
      name: 'IronPoint',
      type: 'polearm',
      owned: false,
      rarity: 2,
      atk: 32.93,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'IronSting' },
    defaults: {
      name: 'IronSting',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'JadefallsSplendor' },
    defaults: {
      name: 'JadefallsSplendor',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'HP%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'KagotsurubeIsshin' },
    defaults: {
      name: 'KagotsurubeIsshin',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'KagurasVerity' },
    defaults: {
      name: 'KagurasVerity',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritDmg%',
      stateValue: 14.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'KatsuragikiriNagamasa' },
    defaults: {
      name: 'KatsuragikiriNagamasa',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'KeyOfKahjNisut' },
    defaults: {
      name: 'KeyOfKahjNisut',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'HP%',
      stateValue: 14.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'KingsSquire' },
    defaults: {
      name: 'KingsSquire',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Atk%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'KitainCrossSpear' },
    defaults: {
      name: 'KitainCrossSpear',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'EM',
      stateValue: 24,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LightOfFoliarIncision' },
    defaults: {
      name: 'LightOfFoliarIncision',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LionsRoar' },
    defaults: {
      name: 'LionsRoar',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LithicBlade' },
    defaults: {
      name: 'LithicBlade',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LithicSpear' },
    defaults: {
      name: 'LithicSpear',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LostPrayerToTheSacredWinds' },
    defaults: {
      name: 'LostPrayerToTheSacredWinds',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritRate%',
      stateValue: 7.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LumidouceElegy' },
    defaults: {
      name: 'LumidouceElegy',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritRate%',
      stateValue: 7.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'LuxuriousSeaLord' },
    defaults: {
      name: 'LuxuriousSeaLord',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'Atk%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MagicGuide' },
    defaults: {
      name: 'MagicGuide',
      type: 'catalyser',
      owned: false,
      rarity: 3,
      atk: 37.61,
      stateName: 'EM',
      stateValue: 40.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MailedFlower' },
    defaults: {
      name: 'MailedFlower',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'EM',
      stateValue: 24,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MakhairaAquamarine' },
    defaults: {
      name: 'MakhairaAquamarine',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MappaMare' },
    defaults: {
      name: 'MappaMare',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'EM',
      stateValue: 24,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MemoryOfDust' },
    defaults: {
      name: 'MemoryOfDust',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'Atk%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Messenger' },
    defaults: {
      name: 'Messenger',
      type: 'bow',
      owned: false,
      rarity: 3,
      atk: 39.88,
      stateName: 'CritDmg%',
      stateValue: 6.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MissiveWindspear' },
    defaults: {
      name: 'MissiveWindspear',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MistsplitterReforged' },
    defaults: {
      name: 'MistsplitterReforged',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritDmg%',
      stateValue: 9.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MitternachtsWaltz' },
    defaults: {
      name: 'MitternachtsWaltz',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'PhysicalDmg%',
      stateValue: 11.26,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Moonpiercer' },
    defaults: {
      name: 'Moonpiercer',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'EM',
      stateValue: 24,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'MouunsMoon' },
    defaults: {
      name: 'MouunsMoon',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'OathswornEye' },
    defaults: {
      name: 'OathswornEye',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'OldMercsPal' },
    defaults: {
      name: 'OldMercsPal',
      type: 'claymore',
      owned: false,
      rarity: 2,
      atk: 32.93,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'OtherworldlyStory' },
    defaults: {
      name: 'OtherworldlyStory',
      type: 'catalyser',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'ER%',
      stateValue: 8.5,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PocketGrimoire' },
    defaults: {
      name: 'PocketGrimoire',
      type: 'catalyser',
      owned: false,
      rarity: 2,
      atk: 32.93,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PolarStar' },
    defaults: {
      name: 'PolarStar',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritRate%',
      stateValue: 7.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PortablePowerSaw' },
    defaults: {
      name: 'PortablePowerSaw',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'HP%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Predator' },
    defaults: {
      name: 'Predator',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrimordialJadeCutter' },
    defaults: {
      name: 'PrimordialJadeCutter',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritRate%',
      stateValue: 9.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrimordialJadeWingedSpear' },
    defaults: {
      name: 'PrimordialJadeWingedSpear',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritRate%',
      stateValue: 4.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ProspectorsDrill' },
    defaults: {
      name: 'ProspectorsDrill',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrototypeAmber' },
    defaults: {
      name: 'PrototypeAmber',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'HP%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrototypeArchaic' },
    defaults: {
      name: 'PrototypeArchaic',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrototypeCrescent' },
    defaults: {
      name: 'PrototypeCrescent',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrototypeRancour' },
    defaults: {
      name: 'PrototypeRancour',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'PhysicalDmg%',
      stateValue: 7.51,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'PrototypeStarglitter' },
    defaults: {
      name: 'PrototypeStarglitter',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Rainslasher' },
    defaults: {
      name: 'Rainslasher',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RangeGauge' },
    defaults: {
      name: 'RangeGauge',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RavenBow' },
    defaults: {
      name: 'RavenBow',
      type: 'bow',
      owned: false,
      rarity: 3,
      atk: 39.88,
      stateName: 'EM',
      stateValue: 20.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RecurveBow' },
    defaults: {
      name: 'RecurveBow',
      type: 'bow',
      owned: false,
      rarity: 3,
      atk: 37.61,
      stateName: 'HP%',
      stateValue: 10.21,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RedhornStonethresher' },
    defaults: {
      name: 'RedhornStonethresher',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RightfulReward' },
    defaults: {
      name: 'RightfulReward',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'HP%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RingOfYaxche' },
    defaults: {
      name: 'RingOfYaxche',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'HP%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RoyalBow' },
    defaults: {
      name: 'RoyalBow',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RoyalGreatsword' },
    defaults: {
      name: 'RoyalGreatsword',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RoyalGrimoire' },
    defaults: {
      name: 'RoyalGrimoire',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RoyalLongsword' },
    defaults: {
      name: 'RoyalLongsword',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'RoyalSpear' },
    defaults: {
      name: 'RoyalSpear',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 43.7,
      stateName: 'Atk%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Rust' },
    defaults: {
      name: 'Rust',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SacrificialBow' },
    defaults: {
      name: 'SacrificialBow',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SacrificialFragments' },
    defaults: {
      name: 'SacrificialFragments',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'EM',
      stateValue: 48,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SacrificialGreatsword' },
    defaults: {
      name: 'SacrificialGreatsword',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SacrificialJade' },
    defaults: {
      name: 'SacrificialJade',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'CritRate%',
      stateValue: 8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SacrificialSword' },
    defaults: {
      name: 'SacrificialSword',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 41.07,
      stateName: 'ER%',
      stateValue: 13.33,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ScionOfTheBlazingSun' },
    defaults: {
      name: 'ScionOfTheBlazingSun',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'CritRate%',
      stateValue: 4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SeasonedHuntersBow' },
    defaults: {
      name: 'SeasonedHuntersBow',
      type: 'bow',
      owned: false,
      rarity: 2,
      atk: 32.93,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SerpentSpine' },
    defaults: {
      name: 'SerpentSpine',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritRate%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SharpshootersOath' },
    defaults: {
      name: 'SharpshootersOath',
      type: 'bow',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'CritDmg%',
      stateValue: 10.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SilverhowerHeartstrings' },
    defaults: {
      name: 'SilverhowerHeartstrings',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'HP%',
      stateValue: 14.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SilverSword' },
    defaults: {
      name: 'SilverSword',
      type: 'sword',
      owned: false,
      rarity: 2,
      atk: 32.93,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkyriderGreatsword' },
    defaults: {
      name: 'SkyriderGreatsword',
      type: 'claymore',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'PhysicalDmg%',
      stateValue: 9.56,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkyriderSword' },
    defaults: {
      name: 'SkyriderSword',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 37.61,
      stateName: 'ER%',
      stateValue: 11.33,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkywardBlade' },
    defaults: {
      name: 'SkywardBlade',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'ER%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkywardAtlas' },
    defaults: {
      name: 'SkywardAtlas',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'Atk%',
      stateValue: 7.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkywardHarp' },
    defaults: {
      name: 'SkywardHarp',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritRate%',
      stateValue: 4.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkywardPride' },
    defaults: {
      name: 'SkywardPride',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'ER%',
      stateValue: 8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SkywardSpine' },
    defaults: {
      name: 'SkywardSpine',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'ER%',
      stateValue: 8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Slingshot' },
    defaults: {
      name: 'Slingshot',
      type: 'bow',
      owned: false,
      rarity: 3,
      atk: 37.61,
      stateName: 'CritRate%',
      stateValue: 6.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SnowTombedStarsilver' },
    defaults: {
      name: 'SnowTombedStarsilver',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'PhysicalDmg%',
      stateValue: 7.51,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SolarPearl' },
    defaults: {
      name: 'SolarPearl',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritRate%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SongOfBrokenPines' },
    defaults: {
      name: 'SongOfBrokenPines',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 49.14,
      stateName: 'PhysicalDmg%',
      stateValue: 4.5,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SongOfStillness' },
    defaults: {
      name: 'SongOfStillness',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SapwoodBlade' },
    defaults: {
      name: 'SapwoodBlade',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SplendorOfTranquilWaters' },
    defaults: {
      name: 'SplendorOfTranquilWaters',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'StaffOfHoma' },
    defaults: {
      name: 'StaffOfHoma',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritDmg%',
      stateValue: 14.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'StaffOfTheScarletSands' },
    defaults: {
      name: 'StaffOfTheScarletSands',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritRate%',
      stateValue: 9.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SummitShaper' },
    defaults: {
      name: 'SummitShaper',
      type: 'sword',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'Atk%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SurfsUp' },
    defaults: {
      name: 'SurfsUp',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SwordOfDescension' },
    defaults: {
      name: 'SwordOfDescension',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 38.74,
      stateName: 'Atk%',
      stateValue: 7.66,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'SwordOfNarzissenkreuz' },
    defaults: {
      name: 'SwordOfNarzissenkreuz',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TalkingStick' },
    defaults: {
      name: 'TalkingStick',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'CritRate%',
      stateValue: 4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheAlleyFlash' },
    defaults: {
      name: 'TheAlleyFlash',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 45.07,
      stateName: 'EM',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheBell' },
    defaults: {
      name: 'TheBell',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'HP%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheBlackSword' },
    defaults: {
      name: 'TheBlackSword',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritRate%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheCatch' },
    defaults: {
      name: 'TheCatch',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'ER%',
      stateValue: 10,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheDockhandsAssistant' },
    defaults: {
      name: 'TheDockhandsAssistant',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'HP%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheFirstGreatMagic' },
    defaults: {
      name: 'TheFirstGreatMagic',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritDmg%',
      stateValue: 14.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheFlute' },
    defaults: {
      name: 'TheFlute',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheStringless' },
    defaults: {
      name: 'TheStringless',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheUnforged' },
    defaults: {
      name: 'TheUnforged',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'Atk%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheViridescentHunt' },
    defaults: {
      name: 'TheViridescentHunt',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritRate%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TheWidsith' },
    defaults: {
      name: 'TheWidsith',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritDmg%',
      stateValue: 12,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ThrillingTalesOfDragonSlayers' },
    defaults: {
      name: 'ThrillingTalesOfDragonSlayers',
      type: 'catalyser',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'HP%',
      stateValue: 7.66,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ThunderingPulse' },
    defaults: {
      name: 'ThunderingPulse',
      type: 'bow',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'CritDmg%',
      stateValue: 14.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TidalShadow' },
    defaults: {
      name: 'TidalShadow',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Atk%',
      stateValue: 9,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TomeOfTheEternalFlow' },
    defaults: {
      name: 'TomeOfTheEternalFlow',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'ToukabouShigure' },
    defaults: {
      name: 'ToukabouShigure',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TravelersHandySword' },
    defaults: {
      name: 'TravelersHandySword',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 39.88,
      stateName: 'Def%',
      stateValue: 6.37,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TulaytullahsRemembrance' },
    defaults: {
      name: 'TulaytullahsRemembrance',
      type: 'catalyser',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritDmg%',
      stateValue: 9.6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'TwinNephrite' },
    defaults: {
      name: 'TwinNephrite',
      type: 'catalyser',
      owned: false,
      rarity: 3,
      atk: 39.88,
      stateName: 'CritRate%',
      stateValue: 3.4,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'UltimateOverlordsMegaMagicSword' },
    defaults: {
      name: 'UltimateOverlordsMegaMagicSword',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'UrakuMisugiri' },
    defaults: {
      name: 'UrakuMisugiri',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 44.34,
      stateName: 'CritDmg%',
      stateValue: 19.2,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Verdict' },
    defaults: {
      name: 'Verdict',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 47.54,
      stateName: 'CritRate%',
      stateValue: 4.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'VortexVanquisher' },
    defaults: {
      name: 'VortexVanquisher',
      type: 'polearm',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'Atk%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WanderingEvenstar' },
    defaults: {
      name: 'WanderingEvenstar',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WasterGreatsword' },
    defaults: {
      name: 'WasterGreatsword',
      type: 'claymore',
      owned: false,
      rarity: 1,
      atk: 23.25,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WavebreakersFin' },
    defaults: {
      name: 'WavebreakersFin',
      type: 'polearm',
      owned: false,
      rarity: 4,
      atk: 45.07,
      stateName: 'Atk%',
      stateValue: 3,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'Whiteblind' },
    defaults: {
      name: 'Whiteblind',
      type: 'claymore',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'Def%',
      stateValue: 11.26,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WhiteIronGreatsword' },
    defaults: {
      name: 'WhiteIronGreatsword',
      type: 'sword',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'Def%',
      stateValue: 9.56,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WhiteTassel' },
    defaults: {
      name: 'WhiteTassel',
      type: 'polearm',
      owned: false,
      rarity: 3,
      atk: 38.74,
      stateName: 'CritRate%',
      stateValue: 5.1,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WindblumeOde' },
    defaults: {
      name: 'WindblumeOde',
      type: 'bow',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WineAndSong' },
    defaults: {
      name: 'WineAndSong',
      type: 'catalyser',
      owned: false,
      rarity: 4,
      atk: 43.73,
      stateName: 'ER%',
      stateValue: 6.67,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WolfFang' },
    defaults: {
      name: 'WolfFang',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'CritRate%',
      stateValue: 6,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'WolfsGravestone' },
    defaults: {
      name: 'WolfsGravestone',
      type: 'claymore',
      owned: false,
      rarity: 5,
      atk: 45.94,
      stateName: 'Atk%',
      stateValue: 10.8,
    },
  });

  await Weapon.findOrCreate({
    where: { name: 'XiphosMoonlight' },
    defaults: {
      name: 'XiphosMoonlight',
      type: 'sword',
      owned: false,
      rarity: 4,
      atk: 42.4,
      stateName: 'EM',
      stateValue: 36,
    },
  });
};
