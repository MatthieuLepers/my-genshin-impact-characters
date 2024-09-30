import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';
import { MaterialI18n } from '@/main/database/models';

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

  @HasMany(() => MaterialI18n, 'materialId')
  declare i18n: MaterialI18n[];

  declare getI18ns: HasManyGetAssociationsMixin<MaterialI18n>;

  declare addI18n: HasManyAddAssociationMixin<MaterialI18n, number>;

  declare addI18ns: HasManyAddAssociationsMixin<MaterialI18n, number>;

  declare setI18ns: HasManySetAssociationsMixin<MaterialI18n, number>;
}
