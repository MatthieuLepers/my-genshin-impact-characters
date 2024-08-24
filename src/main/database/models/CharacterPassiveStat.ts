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
  modelName: 'characterPassiveStats',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class CharacterPassiveStat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare statType: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare statValue: number;

  @ForeignKey(() => Character)
  @Column(DataType.INTEGER)
  declare characterId: number;

  @BelongsTo(() => Character)
  declare character: Character;

  declare getCharacter: HasOneGetAssociationMixin<Character>;
}
