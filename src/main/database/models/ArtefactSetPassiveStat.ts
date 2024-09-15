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
import { ArtefactSet } from '@/main/database/models';

@Table({
  modelName: 'artefactSetPassiveStats',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArtefactSetPassiveStat extends Model {
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

  @ForeignKey(() => ArtefactSet)
  @Column(DataType.INTEGER)
  declare artefactSetId: number;

  @BelongsTo(() => ArtefactSet)
  declare artefactSet: ArtefactSet;

  declare getArtefactSet: HasOneGetAssociationMixin<ArtefactSet>;
}
