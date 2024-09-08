import AbstractEntity from '@renderer/core/entities/AbstractEntity';
import { ICharacterBuild, IRemoteCharacterBuild } from '@renderer/core/entities/characterBuild/i';
import { charactersStore } from '@renderer/core/entities/character/store';
import { artefactPresetsStore } from '@renderer/core/entities/artefactPreset/store';
import { weaponsStore } from '@renderer/core/entities/weapon/store';
import type Character from '@renderer/core/entities/character';
import type ArtefactPreset from '@renderer/core/entities/artefactPreset';
import type Weapon from '@renderer/core/entities/weapon';

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

  static async findAll(): Promise<Array<CharacterBuild>> {
    const builds = await api.CharacterBuild.findAll();
    return builds.map((build: IRemoteCharacterBuild) => new CharacterBuild(build.dataValues));
  }

  async save(): Promise<CharacterBuild> {
    const { name, characterId, artefactPresetId, weaponId } = this.data;
    if (this.id) {
      await api.CharacterBuild.update(this.id, JSON.stringify({ name, characterId, artefactPresetId, weaponId }));
    } else {
      await api.CharacterBuild.create(JSON.stringify({ name, characterId, artefactPresetId, weaponId }));
    }
    return this;
  }
}
