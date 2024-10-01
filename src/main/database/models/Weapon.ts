import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  Default,
  HasMany,
} from 'sequelize-typescript';
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';
import { WeaponI18n } from '@/main/database/models';

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
  declare type: string;

  @Column(DataType.BOOLEAN)
  declare owned: boolean;

  @Default(1)
  @Column(DataType.INTEGER)
  declare level: number;

  @Default(1)
  @Column(DataType.INTEGER)
  declare rank: number;

  @Column(DataType.INTEGER)
  declare rarity: number;

  @Column(DataType.INTEGER)
  declare atk: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare statName: string;

  @Default(0)
  @Column(DataType.INTEGER)
  declare statValue: number;

  @Column(DataType.JSON)
  declare tags: Array<string>;

  @HasMany(() => WeaponI18n, 'weaponId')
  declare i18n: WeaponI18n[];

  declare getI18ns: HasManyGetAssociationsMixin<WeaponI18n>;

  declare addI18n: HasManyAddAssociationMixin<WeaponI18n, number>;

  declare addI18ns: HasManyAddAssociationsMixin<WeaponI18n, number>;

  declare setI18ns: HasManySetAssociationsMixin<WeaponI18n, number>;
}
