import type { IRemoteCharacter, ICharacter } from '@renderer/core/entities/character/i';
import { getLocalStorage, setLocalStorage } from '@renderer/core/stores/Storage';
import CharacterData from '@renderer/core/entities/character/data.json';

export async function findAll(): Promise<Array<IRemoteCharacter>> {
  const storage = getLocalStorage();
  return Object
    .keys(CharacterData)
    .map((name, id) => ({
      dataValues: {
        id,
        name,
        level: storage.characters?.[name]?.level ?? 1,
        phase: storage.characters?.[name]?.phase ?? 0,
        constellation: storage.characters?.[name]?.constellation ?? 0,
        aptitudeLevels: [
          storage.characters?.[name]?.aptitudes?.[0]?.level ?? 1,
          storage.characters?.[name]?.aptitudes?.[1]?.level ?? 1,
          storage.characters?.[name]?.aptitudes?.[2]?.level ?? 1,
        ],
        owned: !!storage.characters?.[name],
      },
    }))
  ;
}

export async function update(identifier: number, body: string): Promise<IRemoteCharacter | null> {
  const storage = getLocalStorage();
  const obj = Object
    .values(storage.characters)
    .find(({ id }) => id === identifier)
  ;
  if (obj) {
    const values: Partial<ICharacter> = JSON.parse(body);
    storage.characters[obj.name] = {
      ...(storage.characters[obj.name] ?? {}),
      ...values,
    };
    setLocalStorage(storage);

    return {
      dataValues: obj,
    };
  }

  return null;
}
