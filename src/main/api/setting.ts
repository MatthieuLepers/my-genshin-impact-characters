import { Setting } from '@/main/database/models';

import { ISetting } from '@renderer/core/entities/setting/i';

export async function findAll(): Promise<Array<Setting>> {
  return Setting.findAll();
}

export async function updateOrCreate(body: string): Promise<Setting> {
  const values: Partial<ISetting> = JSON.parse(body);
  const obj = await Setting.findByPk(values.key);

  return !obj
    ? Setting.create(values)
    : obj.update(values)
  ;
}
