import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  modelName: 'characters',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Character extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare phase: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare constellation: number;

  @Default([1, 1, 1])
  @Column(DataType.JSON)
  declare aptitudeLevels: [number, number, number];

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare owned: boolean;
}
