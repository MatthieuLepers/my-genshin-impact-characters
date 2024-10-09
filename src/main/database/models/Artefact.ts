import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  modelName: 'artefacts',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class Artefact extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: string;

  @Column(DataType.STRING)
  declare setId: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare statsJson: JSON;
}
