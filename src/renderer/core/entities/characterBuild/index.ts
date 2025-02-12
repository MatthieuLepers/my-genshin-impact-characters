import type { ICharacterBuild, IRemoteCharacterBuild } from '@renderer/core/entities/characterBuild/i';
import { charactersStore } from '@renderer/core/entities/character/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import ArtefactPreset from '@renderer/core/entities/artefactPreset';
import type Character from '@renderer/core/entities/character';
import type Weapon from '@renderer/core/entities/weapon';
import { round } from '@renderer/core/entities/artefact/StatUtils';
import { api } from '@renderer/core/api';

export default class CharacterBuild extends ArtefactPreset<ICharacterBuild> {
  declare characterId: number;

  declare weaponId: string;

  get character(): Character {
    return Object
      .values(charactersStore.state.characters)
      .find((character) => character.id === this.characterId)!
    ;
  }

  set character(character: Character) {
    this.characterId = character.id;
  }

  get weapon(): Weapon | null {
    return weaponsStore.state.weapons[this.weaponId] ?? null;
  }

  set weapon(weapon: Weapon) {
    this.weaponId = weapon.id;
  }

  set artefactPreset(preset: ArtefactPreset) {
    this.flowerId = preset.flowerId;
    this.featherId = preset.featherId;
    this.sandsId = preset.sandsId;
    this.gobletId = preset.gobletId;
    this.circletId = preset.circletId;
  }

  get stats(): Record<string, number> {
    const baseHp = (this.character?.getStat('HP') ?? 0);
    const baseAtk = (this.character?.getStat('Atk') ?? 0) + (this.weapon?.getStat('Atk') ?? 0);
    const baseDef = (this.character?.getStat('Def') ?? 0);

    const statList = [
      'CritRate%', 'CritDmg%',
      'ER%', 'EM', 'Heal%',
      'PyroDmg%', 'PyroRes%',
      'HydroDmg%', 'HydroRes%',
      'CryoDmg%', 'CryoRes%',
      'ElectroDmg%', 'ElectroRes%',
      'AnemoDmg%', 'AnemoRes%',
      'GeoDmg%', 'GeoRes%',
      'DendroDmg%', 'DendroRes%',
      'PhysicalDmg%', 'PhysicalRes%',
      'ShieldStrength%',
    ];

    return {
      HP: round('HP', baseHp * (1 + this.getStat('HP%') / 100) + (super.stats.HP ?? 0)),
      Atk: round('HP', baseAtk * (1 + this.getStat('Atk%') / 100) + (super.stats.Atk ?? 0)),
      Def: round('HP', baseDef * (1 + this.getStat('Def%') / 100) + (super.stats.Def ?? 0)),
      ...statList.reduce((acc, statName) => ({
        ...acc,
        [statName]: round(statName, this.getStat(statName)),
      }), {}),
    };
  }

  getStat(statName: string): number {
    return (this.character?.getStat(statName) ?? 0) + (this.weapon?.getStat(statName) ?? 0) + (super.stats[statName] ?? 0);
  }

  static async findAll(): Promise<Array<CharacterBuild>> {
    const builds = await api.CharacterBuild.findAll();
    return builds.map((build: IRemoteCharacterBuild) => new CharacterBuild(build.dataValues));
  }

  static async create(data: ICharacterBuild): Promise<CharacterBuild> {
    const build = await api.CharacterBuild.create(JSON.stringify(data));
    return new CharacterBuild(build.dataValues);
  }

  async save(): Promise<CharacterBuild> {
    const { name, characterId, flowerId, featherId, sandsId, gobletId, circletId, weaponId } = this.data;
    if (this.id) {
      await api.CharacterBuild.update(this.id, JSON.stringify({ name, characterId, flowerId, featherId, sandsId, gobletId, circletId, weaponId }));
    }
    return this;
  }

  async destroy(): Promise<boolean> {
    if (this.id) {
      const success = await api.CharacterBuild.destroy(this.id);
      return success;
    }
    return true;
  }
}
