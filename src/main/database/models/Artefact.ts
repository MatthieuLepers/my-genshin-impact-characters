import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { HasOneGetAssociationMixin } from 'sequelize';
import { ArtefactSet } from '@/main/database/models';

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

  @ForeignKey(() => ArtefactSet)
  @Column(DataType.INTEGER)
  declare setId: number;

  @BelongsTo(() => ArtefactSet)
  declare artefactSet: ArtefactSet;

  declare getArtefactSet: HasOneGetAssociationMixin<ArtefactSet>;

  @AllowNull(false)
  @Column(DataType.JSON)
  declare statsJson: JSON;
}
