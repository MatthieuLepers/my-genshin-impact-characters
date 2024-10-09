import charactersStore from '@tests/renderer/mocks/charactersStore.mock';
import CharacterAptitude from '@renderer/core/entities/characterAptitude';

const raidenShogun = charactersStore.state.characters['Raiden Shogun'];
const sangonomyiaKokomi = charactersStore.state.characters['Sangonomyia Kokomi'];

describe('Character entity', () => {
  test('element getter', () => {
    expect(raidenShogun.element).toBe('Electro');
    expect(sangonomyiaKokomi.element).toBe('Hydro');
  });

  test('aptitudes getter', () => {
    const expected = {
      NormalAttack: new CharacterAptitude({
        id: 1,
        type: 'NormalAttack',
        materialId: 'MoltenMoment',
        phaseIncrease: 0,
        phaseIncreaseBonus: 0,
        constellationIncrease: 0,
        constellationIncreaseBonus: 0,
        level: 6,
      }, raidenShogun),
      ElementalSkill: new CharacterAptitude({
        id: 2,
        type: 'ElementalSkill',
        materialId: 'MoltenMoment',
        phaseIncrease: 0,
        phaseIncreaseBonus: 0,
        constellationIncrease: 5,
        constellationIncreaseBonus: 3,
        level: 6,
      }, raidenShogun),
      ElementalBurst: new CharacterAptitude({
        id: 3,
        type: 'ElementalBurst',
        materialId: 'MoltenMoment',
        phaseIncrease: 0,
        phaseIncreaseBonus: 0,
        constellationIncrease: 3,
        constellationIncreaseBonus: 3,
        level: 10,
      }, raidenShogun),
    };
    expect(raidenShogun.aptitudes).toEqual(expected);
  });

  test('stats getter', () => {
    const expectedRaiden = {
      HP: 12907,
      Atk: 337.24,
      Def: 789.31,
      'CritRate%': 5,
      'CritDmg%': 50,
      'ER%': 132,
    };
    const expectedKokomi = {
      HP: 13471,
      Atk: 234.39,
      Def: 657.11,
      'HydroDmg%': 28.8,
      'CritRate%': -95,
      'CritDmg%': 50,
      'ER%': 100,
      'Heal%': 25,
    };
    expect(raidenShogun.stats).toEqual(expectedRaiden);
    expect(sangonomyiaKokomi.stats).toEqual(expectedKokomi);
  });

  test('nameStr getter', () => {
    expect(raidenShogun.nameStr).toBe('Raiden Shogun');
    expect(sangonomyiaKokomi.nameStr).toBe('Sangonomyia Kokomi');
  });

  test('materials getter', () => {
    expect(new Set(raidenShogun.materials)).toEqual(new Set(['MoltenMoment']));
    expect(new Set(sangonomyiaKokomi.materials)).toEqual(new Set(['HellfireButterfly']));
  });

  test('spentMora getter', () => {
    expect(raidenShogun.spentMora).toBe(1422500);
    expect(sangonomyiaKokomi.spentMora).toBe(555000);
  });

  test('imageName getter', () => {
    expect(raidenShogun.imageName).toBe('RaidenShogun');
    expect(sangonomyiaKokomi.imageName).toBe('SangonomyiaKokomi');
  });

  test('getMaxMaterial method', () => {
    expect(raidenShogun.getMaxMaterial('MoltenMoment')).toBe(18);
    expect(sangonomyiaKokomi.getMaxMaterial('HellfireButterfly')).toBe(18);
  });

  test('getInvestedMaterials method', () => {
    expect(raidenShogun.getInvestedMaterials('MoltenMoment')).toBe(6);
    expect(sangonomyiaKokomi.getInvestedMaterials('HellfireButterfly')).toBe(0);
  });

  test('isReleased method', () => {
    expect(raidenShogun.isReleased()).toBeTruthy();
    expect(sangonomyiaKokomi.isReleased()).toBeTruthy();
  });
});
