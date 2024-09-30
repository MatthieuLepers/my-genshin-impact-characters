import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  modelName: 'materialI18n',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['locale', 'materialId'],
    },
  ],
})
export class MaterialI18n extends Model {
  @Default('en-EN')
  @Column(DataType.STRING)
  declare locale: string;

  @Column(DataType.TEXT)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare materialId: string;
}
