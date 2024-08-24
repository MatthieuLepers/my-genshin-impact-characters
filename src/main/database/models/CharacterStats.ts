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
import { HasOneGetAssociationMixin } from 'sequelize';
import { Character } from '@/main/database/models';

@Table({
  modelName: 'characterStats',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class CharacterStats extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare hp: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare atk: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare def: number;

  @Default(0)
  @Column(DataType.STRING)
  declare bonusType: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare bonusValue: number;

  @ForeignKey(() => Character)
  @Column(DataType.INTEGER)
  declare characterId: number;

  @BelongsTo(() => Character)
  declare character: Character;

  declare getCharacter: HasOneGetAssociationMixin<Character>;
}
