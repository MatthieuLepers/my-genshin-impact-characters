import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';
import { CharacterAptitude, CharacterStats, CharacterPassiveStat } from '@/main/database/models';

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

  @AllowNull(true)
  @Column(DataType.DATE)
  declare releasedAt: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare element: string;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare phase: number;

  @Default(0)
  @Column(DataType.INTEGER)
  declare constellation: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare weaponType: string;

  @HasMany(() => CharacterAptitude)
  declare aptitudes: CharacterAptitude[];

  declare getAptitudes: HasManyGetAssociationsMixin<CharacterAptitude>;

  declare addAptitude: HasManyAddAssociationMixin<CharacterAptitude, number>;

  declare addAptitudes: HasManyAddAssociationsMixin<CharacterAptitude, number>;

  declare setAptitudes: HasManySetAssociationsMixin<CharacterAptitude, number>;

  declare removeAptitude: HasManyRemoveAssociationMixin<CharacterAptitude, number>;

  declare removeAptitudes: HasManyRemoveAssociationsMixin<CharacterAptitude, number>;

  declare hasAptitude: HasManyHasAssociationMixin<CharacterAptitude, number>;

  declare hasAptitudes: HasManyHasAssociationsMixin<CharacterAptitude, number>;

  declare countAptitudes: HasManyCountAssociationsMixin;

  declare createAptitude: HasManyCreateAssociationMixin<CharacterAptitude, 'characterId'>;

  @HasMany(() => CharacterStats)
  declare stats: CharacterStats[];

  declare getStats: HasManyGetAssociationsMixin<CharacterStats>;

  declare addStat: HasManyAddAssociationMixin<CharacterStats, number>;

  declare addStats: HasManyAddAssociationsMixin<CharacterStats, number>;

  declare setStats: HasManySetAssociationsMixin<CharacterStats, number>;

  declare removeStat: HasManyRemoveAssociationMixin<CharacterStats, number>;

  declare removeStats: HasManyRemoveAssociationsMixin<CharacterStats, number>;

  declare hasStat: HasManyHasAssociationMixin<CharacterStats, number>;

  declare hasStats: HasManyHasAssociationsMixin<CharacterStats, number>;

  declare countStats: HasManyCountAssociationsMixin;

  declare createStat: HasManyCreateAssociationMixin<CharacterStats, 'characterId'>;

  @HasMany(() => CharacterPassiveStat)
  declare passiveStats: CharacterPassiveStat[];

  declare getPassiveStats: HasManyGetAssociationsMixin<CharacterPassiveStat>;

  declare addPassiveStat: HasManyAddAssociationMixin<CharacterPassiveStat, number>;

  declare addPassiveStats: HasManyAddAssociationsMixin<CharacterPassiveStat, number>;

  declare setPassiveStats: HasManySetAssociationsMixin<CharacterPassiveStat, number>;

  declare removePassiveStat: HasManyRemoveAssociationMixin<CharacterPassiveStat, number>;

  declare removePassiveStats: HasManyRemoveAssociationsMixin<CharacterPassiveStat, number>;

  declare hasPassiveStat: HasManyHasAssociationMixin<CharacterPassiveStat, number>;

  declare hasPassiveStats: HasManyHasAssociationsMixin<CharacterPassiveStat, number>;

  declare countPassiveStats: HasManyCountAssociationsMixin;

  declare createPassiveStat: HasManyCreateAssociationMixin<CharacterPassiveStat, 'characterId'>;

  @Default(false)
  @Column(DataType.BOOLEAN)
  declare owned: boolean;
}
