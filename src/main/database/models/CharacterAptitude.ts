import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Material, Character } from '@/main/database/models';
import { HasOneGetAssociationMixin } from 'sequelize';

@Table({
  modelName: 'characterAptitudes',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class CharacterAptitude extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: string;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare phaseIncrease: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare phaseIncreaseBonus: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare constellationIncrease: number;

  @Default(3)
  @Column(DataType.INTEGER)
  declare constellationIncreaseBonus: number;

  @ForeignKey(() => Material)
  @Column(DataType.INTEGER)
  declare materialId: number;

  @BelongsTo(() => Material)
  declare material: Material;

  declare getMaterial: HasOneGetAssociationMixin<Material>;

  @ForeignKey(() => Character)
  @Column(DataType.INTEGER)
  declare characterId: number;

  @BelongsTo(() => Character)
  declare character: Character;

  declare getCharacter: HasOneGetAssociationMixin<Character>;
}
