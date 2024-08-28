import crypto from 'crypto';
import {
  Table,
  Column,
  DataType,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';
import { serial } from '@/main/utils/PromiseUtils';
import WinstonInstance from '@/main/utils/WinstonInstance';

@Table({
  modelName: 'settings',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['key'],
    },
  ],
})
export class Setting extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  declare key: string;

  @Column(DataType.TEXT)
  declare value: string;

  static async get(key: string, defaultValue?: string): Promise<string | null> {
    const setting = await Setting.findByPk(key);
    return setting?.value ?? defaultValue ?? null;
  }

  static async set(key: string, value: string | number | Date): Promise<void> {
    const setting = await Setting.findByPk(key);
    if (setting) {
      setting.value = value.toString();
      await setting.save();
    } else {
      await Setting.create({ key, value: value.toString() });
    }
  }

  static async createDefault(): Promise<void> {
    const DEFAULT_SETTINGS = {
      lastPopulateDateArtefactSets: '1970-01-01',
      lastPopulateDateCharacters: '1970-01-01',
      lastPopulateDateMaterials: '1970-01-01',
      lastPopulateDateWeapons: '1970-01-01',
      locale: 'en-EN',
      cipherKey: crypto.randomBytes(16).toString('hex'),
      cipherIv: crypto.randomBytes(8).toString('hex'),
    };

    try {
      await serial(Object.entries(DEFAULT_SETTINGS).map(([key, value]) => async () => {
        const [setting] = await Setting.findOrCreate({
          where: { key },
          defaults: { key, value },
        });
        return setting;
      }));
    } catch (e) {
      WinstonInstance.error((e as Error).toString());
    }
  }
}
