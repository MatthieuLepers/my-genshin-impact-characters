import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  Default,
} from 'sequelize-typescript';

@Table({
  modelName: 'weapons',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Weapon extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare releasedAt: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: string;

  @Column(DataType.BOOLEAN)
  declare owned: boolean;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(1)
  @Column(DataType.INTEGER)
  declare rank: number;

  @Column(DataType.INTEGER)
  declare rarity: number;

  @Column(DataType.INTEGER)
  declare atk: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare statName: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare statValue: number;

  @Column(DataType.JSON)
  declare tags: Array<string>;
}
