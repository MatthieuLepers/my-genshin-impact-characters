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
import { Artefact } from '@/main/database/models';

@Table({
  modelName: 'artefactPresets',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class ArtefactPreset extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @ForeignKey(() => Artefact)
  @Column(DataType.INTEGER)
  declare flowerId: number;

  @BelongsTo(() => Artefact)
  declare flower: Artefact;

  declare getFlower: HasOneGetAssociationMixin<Artefact>;

  @ForeignKey(() => Artefact)
  @Column(DataType.INTEGER)
  declare featherId: number;

  @BelongsTo(() => Artefact)
  declare feather: Artefact;

  declare getFeather: HasOneGetAssociationMixin<Artefact>;

  @ForeignKey(() => Artefact)
  @Column(DataType.INTEGER)
  declare sandsId: number;

  @BelongsTo(() => Artefact)
  declare sands: Artefact;

  declare getSands: HasOneGetAssociationMixin<Artefact>;

  @ForeignKey(() => Artefact)
  @Column(DataType.INTEGER)
  declare gobletId: number;

  @BelongsTo(() => Artefact)
  declare goblet: Artefact;

  declare getGoblet: HasOneGetAssociationMixin<Artefact>;

  @ForeignKey(() => Artefact)
  @Column(DataType.INTEGER)
  declare circletId: number;

  @BelongsTo(() => Artefact)
  declare circlet: Artefact;

  declare getCirclet: HasOneGetAssociationMixin<Artefact>;
}
