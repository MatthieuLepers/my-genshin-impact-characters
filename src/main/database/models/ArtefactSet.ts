import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import {
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';
import { ArtefactSetPassiveStat } from '@/main/database/models';

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

  @AllowNull(true)
  @Column(DataType.DATE)
  declare releasedAt: Date;

  @HasMany(() => ArtefactSetPassiveStat)
  declare passiveStats: ArtefactSetPassiveStat[];

  declare getPassiveStats: HasManyGetAssociationsMixin<ArtefactSetPassiveStat>;

  declare addPassiveStat: HasManyAddAssociationMixin<ArtefactSetPassiveStat, number>;

  declare addPassiveStats: HasManyAddAssociationsMixin<ArtefactSetPassiveStat, number>;

  declare setPassiveStats: HasManySetAssociationsMixin<ArtefactSetPassiveStat, number>;

  declare removePassiveStat: HasManyRemoveAssociationMixin<ArtefactSetPassiveStat, number>;

  declare removePassiveStats: HasManyRemoveAssociationsMixin<ArtefactSetPassiveStat, number>;

  declare hasPassiveStat: HasManyHasAssociationMixin<ArtefactSetPassiveStat, number>;

  declare hasPassiveStats: HasManyHasAssociationsMixin<ArtefactSetPassiveStat, number>;

  declare countPassiveStats: HasManyCountAssociationsMixin;

  declare createPassiveStat: HasManyCreateAssociationMixin<ArtefactSetPassiveStat, 'artefactSetId'>;
}
