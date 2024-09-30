import { Identifier } from 'sequelize';

import { MaterialI18n, Material } from '@/main/database/models';
import type { IMaterial } from '@/renderer/core/entities/material/i';

export async function findAll(): Promise<Array<Material>> {
  return Material.findAll({
    order: [['releasedAt', 'ASC']],
    include: [
      { model: MaterialI18n },
    ],
  });
}

export async function update(identifier: Identifier, body: string): Promise<Material | null> {
  const obj = await Material.findByPk(identifier);
  if (obj) {
    const values: Partial<IMaterial> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}
