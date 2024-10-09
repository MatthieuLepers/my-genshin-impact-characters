import { Identifier } from 'sequelize';

import { CharacterBuild } from '@/main/database/models';
import type { ICharacterBuild } from '@renderer/core/entities/characterBuild/i';

export async function findAll(): Promise<Array<CharacterBuild>> {
  return CharacterBuild.findAll();
}

export async function create(body: string): Promise<CharacterBuild> {
  const data: Partial<ICharacterBuild> = JSON.parse(body);
  return CharacterBuild.create(data);
}

export async function update(identifier: Identifier, body: string): Promise<CharacterBuild | null> {
  const obj = await CharacterBuild.findByPk(identifier);
  if (obj) {
    const values: Partial<ICharacterBuild> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}

export async function destroy(identifier: Identifier): Promise<boolean> {
  const obj = await CharacterBuild.findByPk(identifier);
  if (obj) {
    return obj.destroy().then(() => true).catch(() => false);
  }
  return false;
}
