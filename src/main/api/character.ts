import { Identifier } from 'sequelize';

import {
  Character,
  CharacterAptitude,
  CharacterStats,
  CharacterPassiveStat,
} from '@/main/database/models';
import type { ICharacter } from '@/renderer/core/entities/character/i';

export async function findAll(): Promise<Array<Character>> {
  return Character.findAll({
    include: [
      { model: CharacterAptitude },
      { model: CharacterStats },
      { model: CharacterPassiveStat },
    ],
  });
}

export async function update(identifier: Identifier, body: string): Promise<Character | null> {
  const obj = await Character.findByPk(identifier);
  if (obj) {
    const values: Partial<ICharacter> = JSON.parse(body);
    return obj.update(values);
  }
  return null;
}
