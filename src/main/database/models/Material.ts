import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

@Table({
  modelName: 'materials',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Material extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare inInventory: number;
}
