import '@tests/renderer/mocks/artefactSetsStore.mock';
import '@tests/renderer/mocks/artefactsStore.mock';
import '@tests/renderer/mocks/artefactPresetsStore.mock';
import '@tests/renderer/mocks/charactersStore.mock';
import '@tests/renderer/mocks/weaponsStore.mock';
import characterBuildsStore from '@tests/renderer/mocks/characterBuildsStore.mock';

const raidenShogunBuild = characterBuildsStore.state.current;

describe('CharacterBuild entity', () => {
  test('stats getter', () => {
    const expected = {
      HP: 18767,
      Atk: 1994,
      Def: 873,
      EM: 16,
      'CritRate%': 59.4,
      'CritDmg%': 126.2,
      'Heal%': 0,
      'ER%': 297.8,
      'ShieldStrength%': 0,
      'PyroDmg%': 0,
      'PyroRes%': 0,
      'HydroDmg%': 0,
      'HydroRes%': 0,
      'DendroDmg%': 0,
      'DendroRes%': 0,
      'ElectroDmg%': 0,
      'ElectroRes%': 0,
      'AnemoDmg%': 0,
      'AnemoRes%': 0,
      'CryoDmg%': 0,
      'CryoRes%': 0,
      'GeoDmg%': 0,
      'GeoRes%': 0,
      'PhysicalDmg%': 0,
      'PhysicalRes%': 0,
    };
    expect(raidenShogunBuild.stats).toEqual(expected);
  });
});
