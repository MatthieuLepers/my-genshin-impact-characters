import { Identifier } from 'sequelize';

import { ArtefactPreset } from '@/main/database/models';
import type { IArtefactPreset } from '@renderer/core/entities/artefactPreset/i';

export async function findAll(): Promise<Array<ArtefactPreset>> {
  return ArtefactPreset.findAll();
}

export async function create(body: string): Promise<ArtefactPreset> {
  const data: Partial<IArtefactPreset> = JSON.parse(body);
  return ArtefactPreset.create(data);
}

export async function update(identifier: Identifier, body: string): Promise<ArtefactPreset | null> {
  const obj = await ArtefactPreset.findByPk(identifier);
  if (obj) {
    const values: Partial<IArtefactPreset> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}

export async function destroy(identifier: Identifier): Promise<boolean> {
  const obj = await ArtefactPreset.findByPk(identifier);
  if (obj) {
    return obj.destroy().then(() => true).catch(() => false);
  }
  return false;
}
