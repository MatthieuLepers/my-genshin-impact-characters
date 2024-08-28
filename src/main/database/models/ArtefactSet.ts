import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  modelName: 'artefactSet',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArtefactSet extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @Column(DataType.INTEGER)
  declare rarity: number;

  @AllowNull(true)
  @Column(DataType.DATE)
  declare releasedAt: Date;
}
