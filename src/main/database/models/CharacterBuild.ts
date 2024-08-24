import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { HasOneGetAssociationMixin } from 'sequelize';
import { ArtefactPreset, Character, Weapon } from '@/main/database/models';

@Table({
  modelName: 'characterBuilds',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class CharacterBuild extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => Character)
  @Column(DataType.INTEGER)
  declare characterId: number;

  @BelongsTo(() => Character)
  declare character: Character;

  declare getCharacter: HasOneGetAssociationMixin<Character>;

  @ForeignKey(() => ArtefactPreset)
  @Column(DataType.INTEGER)
  declare artefactPresetId: number;

  @BelongsTo(() => ArtefactPreset)
  declare artefactPreset: ArtefactPreset;

  declare getArtefactPreset: HasOneGetAssociationMixin<ArtefactPreset>;

  @ForeignKey(() => Weapon)
  @Column(DataType.INTEGER)
  declare weaponId: number;

  @BelongsTo(() => Weapon)
  declare weapon: Weapon;

  declare getWeapon: HasOneGetAssociationMixin<Weapon>;
}
