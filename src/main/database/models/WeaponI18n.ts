import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  modelName: 'weaponI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['locale', 'weaponId'],
    },
  ],
})
export class WeaponI18n extends Model {
  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.TEXT)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare weaponId: number;
}
