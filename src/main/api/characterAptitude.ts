import { Identifier } from 'sequelize';

import { CharacterAptitude } from '@/main/database/models';
import type { ICharacterAptitude } from '@/renderer/core/entities/characterAptitude/i';

export async function update(identifier: Identifier, body: string): Promise<CharacterAptitude | null> {
  const obj = await CharacterAptitude.findByPk(identifier);
  if (obj) {
    const values: Partial<ICharacterAptitude> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}
