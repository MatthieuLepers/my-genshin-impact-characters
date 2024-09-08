import type { Identifier } from 'sequelize';

import { Artefact } from '@/main/database/models';
import type { IArtefact } from '@renderer/core/entities/artefact/i';

export async function findAll(): Promise<Array<Artefact>> {
  return Artefact.findAll();
}

export async function create(body: string): Promise<Artefact> {
  const data: Partial<IArtefact> = JSON.parse(body);
  return Artefact.create(data);
}

export async function update(identifier: Identifier, body: string): Promise<Artefact | null> {
  const obj = await Artefact.findByPk(identifier);
  if (obj) {
    const values: Partial<IArtefact> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}

export async function destroy(identifier: Identifier): Promise<boolean> {
  const obj = await Artefact.findByPk(identifier);
  if (obj) {
    return obj.destroy().then(() => true).catch(() => false);
  }
  return false;
}
