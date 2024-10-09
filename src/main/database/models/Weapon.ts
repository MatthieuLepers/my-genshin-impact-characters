import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
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
  @Column(DataType.STRING)
  declare id: string;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(1)
  @Column(DataType.INTEGER)
  declare rank: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare owned: boolean;
}
