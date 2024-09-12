import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
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

  @AllowNull(false)
  @Column(DataType.STRING)
  declare bossId: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare releasedAt: Date;
}
