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

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: string;

  @Column(DataType.BOOLEAN)
  declare owned: boolean;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Column(DataType.INTEGER)
  declare rarity: number;

  @Column(DataType.INTEGER)
  declare atk: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare stateName: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare stateValue: number;
}
