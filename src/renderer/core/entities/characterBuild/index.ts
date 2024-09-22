import type { ICharacterBuild, IRemoteCharacterBuild } from '@renderer/core/entities/characterBuild/i';
import { charactersStore } from '@renderer/core/entities/character/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import ArtefactPreset from '@renderer/core/entities/artefactPreset';
import type Character from '@renderer/core/entities/character';
import type Weapon from '@renderer/core/entities/weapon';

export default class CharacterBuild extends ArtefactPreset {
  declare data: ICharacterBuild;

  declare characterId: number;

  declare weaponId: number;

  get character(): Character | undefined {
    return Object
      .values(charactersStore.state.characters)
      .find((character) => character.id === this.characterId)
    ;
  }

  set character(character: Character) {
    this.characterId = character.id;
  }

  get weapon(): Weapon {
    return weaponsStore.state.weapons[this.weaponId];
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
    const baseAtk = (this.character?.getStat('Atk') ?? 0) + this.weapon.getStat('Atk');
    const baseDef = (this.character?.getStat('Def') ?? 0);

    const statList = [
      'EM', 'Heal%',
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
      HP: baseHp * (1 + this.getStat('HP%') / 100) + (super.stats.HP ?? 0),
      Atk: baseAtk * (1 + this.getStat('Atk%') / 100) + (super.stats.Atk ?? 0),
      Def: baseDef * (1 + this.getStat('Def%') / 100) + (super.stats.Def ?? 0),
      'CritRate%': 5 + this.getStat('CritRate%'),
      'CritDmg%': 50 + this.getStat('CritDmg%'),
      'ER%': 100 + this.getStat('ER%'),
      ...statList.reduce((acc, statName) => ({
        ...acc,
        [statName]: this.getStat(statName),
      }), {}),
    };
  }

  getStat(statName: string): number {
    return (this.character?.getStat(statName) ?? 0) + this.weapon.getStat(statName) + (super.stats[statName] ?? 0);
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
