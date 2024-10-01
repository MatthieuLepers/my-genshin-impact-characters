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
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';
import { WeeklyBossI18n } from '@/main/database/models';

@Table({
  modelName: 'weeklyBosses',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['id'],
    },
  ],
})
export class WeeklyBoss extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare releasedAt: Date;

  @HasMany(() => WeeklyBossI18n, 'weeklyBossId')
  declare i18n: WeeklyBossI18n[];

  declare getI18ns: HasManyGetAssociationsMixin<WeeklyBossI18n>;

  declare addI18n: HasManyAddAssociationMixin<WeeklyBossI18n, number>;

  declare addI18ns: HasManyAddAssociationsMixin<WeeklyBossI18n, number>;

  declare setI18ns: HasManySetAssociationsMixin<WeeklyBossI18n, number>;
}
