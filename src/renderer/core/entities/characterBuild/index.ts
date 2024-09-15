import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { ICharacterBuild, IRemoteCharacterBuild } from '@renderer/core/entities/characterBuild/i';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import type Character from '@renderer/core/entities/character';
import type ArtefactPreset from '@renderer/core/entities/artefactPreset';
import type Weapon from '@renderer/core/entities/weapon';

// https://genshin-impact.fandom.com/wiki/Artifact/Stats#Sub_Stats
// https://frzyc.github.io/genshin-optimizer/#/artifacts
export default class CharacterBuild extends AbstractEntity<ICharacterBuild> {
  declare readonly id: string;

  declare name: string;

  declare characterId: number;

  declare artefactPresetId: number;

  declare weaponId: number;

  constructor(data: ICharacterBuild) {
    super(data, []);
  }

  get character(): Character | undefined {
    return Object
      .values(charactersStore.state.characters)
      .find((character) => character.id === this.characterId)
    ;
  }

  set character(character: Character) {
    this.characterId = character.id;
  }

  get artefactPreset(): ArtefactPreset {
    return artefactPresetsStore.state.sets[this.artefactPresetId];
  }

  set artefactPreset(artefactPreset: ArtefactPreset) {
    this.artefactPresetId = artefactPreset.id;
  }

  get weapon(): Weapon {
    return weaponsStore.state.weapons[this.weaponId];
  }

  set weapon(weapon: Weapon) {
    this.weaponId = weapon.id;
  }

  get stats(): Record<string, number> {
    const cs = this.character?.stats ?? {};
    const ws = this.weapon.stats;
    const aps = this.artefactPreset.stats;

    const baseHp = (cs.HP ?? 0);
    const baseAtk = (cs.Atk ?? 0) + this.weapon.currentAtk;
    const baseDef = (cs.Def ?? 0);

    return {
      HP: baseHp * (1 + ((cs['HP%'] ?? 0) + (ws['HP%'] ?? 0) + (aps['HP%'] ?? 0)) / 100) + (aps.HP ?? 0),
      Atk: baseAtk * (1 + ((cs['Atk%'] ?? 0) + (ws['Atk%'] ?? 0) + (aps['Atk%'] ?? 0)) / 100) + (aps.Atk ?? 0),
      Def: baseDef * (1 + ((cs['Def%'] ?? 0) + (ws['Def%'] ?? 0) + (aps['Def%'] ?? 0)) / 100) + (aps.Def ?? 0),
      EM: (cs.EM ?? 0) + (ws.EM ?? 0) + (aps.EM ?? 0),
      'CritRate%': 5 + (cs['CritRate%'] ?? 0) + (aps['CritRate%'] ?? 0),
      'CritDmg%': 50 + (cs['CritDmg%'] ?? 0) + (aps['CritDmg%'] ?? 0),
      'Heal%': (cs['Heal%'] ?? 0) + (aps['Heal%'] ?? 0),
      'ER%': 100 + (cs['ER%'] ?? 0) + (ws['ER%'] ?? 0) + (aps['ER%'] ?? 0),
      'PyroDmg%': (cs['PyroDmg%'] ?? 0) + (aps['PyroDmg%'] ?? 0),
      'PyroRes%': (cs['PyroRes%'] ?? 0) + (aps['PyroRes%'] ?? 0),
      'HydroDmg%': (cs['HydroDmg%'] ?? 0) + (aps['HydroDmg%'] ?? 0),
      'HydroRes%': (cs['HydroRes%'] ?? 0) + (aps['HydroRes%'] ?? 0),
      'CryoDmg%': (cs['CryoDmg%'] ?? 0) + (aps['CryoDmg%'] ?? 0),
      'CryoRes%': (cs['CryoRes%'] ?? 0) + (aps['CryoRes%'] ?? 0),
      'ElectroDmg%': (cs['ElectroDmg%'] ?? 0) + (aps['ElectroDmg%'] ?? 0),
      'ElectroRes%': (cs['ElectroRes%'] ?? 0) + (aps['ElectroRes%'] ?? 0),
      'AnemoDmg%': (cs['AnemoDmg%'] ?? 0) + (aps['AnemoDmg%'] ?? 0),
      'AnemoRes%': (cs['AnemoRes%'] ?? 0) + (aps['AnemoRes%'] ?? 0),
      'GeoDmg%': (cs['GeoDmg%'] ?? 0) + (aps['GeoDmg%'] ?? 0),
      'GeoRes%': (cs['GeoRes%'] ?? 0) + (aps['GeoRes%'] ?? 0),
      'DendroDmg%': (cs['DendroDmg%'] ?? 0) + (aps['DendroDmg%'] ?? 0),
      'DendroRes%': (cs['DendroRes%'] ?? 0) + (aps['DendroRes%'] ?? 0),
      'PhysicalDmg%': (cs['PhysicalDmg%'] ?? 0) + (ws['PhysicalDmg%'] ?? 0) + (aps['PhysicalDmg%'] ?? 0),
      'PhysicalRes%': (cs['PhysicalRes%'] ?? 0) + (aps['PhysicalRes%'] ?? 0),
      'ShieldStrength%': (aps['ShieldStrength%'] ?? 0),
    };
  }

  static async findAll(): Promise<Array<CharacterBuild>> {
    const builds = await api.CharacterBuild.findAll();
    return builds.map((build: IRemoteCharacterBuild) => new CharacterBuild(build.dataValues));
  }

  static async create(data:ICharacterBuild): Promise<CharacterBuild> {
    const build = await api.CharacterBuild.create(JSON.stringify(data));
    return new CharacterBuild(build.dataValues);
  }

  async save(): Promise<CharacterBuild> {
    const { name, characterId, artefactPresetId, weaponId } = this.data;
    if (this.id) {
      await api.CharacterBuild.update(this.id, JSON.stringify({ name, characterId, artefactPresetId, weaponId }));
    }
    return this;
  }

  async destroy(): Promise<Boolean> {
    if (this.id) {
      const success = await api.CharacterBuild.destroy(this.id);
      return success;
    }
    return true;
  }
}
