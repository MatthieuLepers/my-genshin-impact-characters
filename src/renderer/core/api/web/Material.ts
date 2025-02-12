import type { IRemoteMaterial, IMaterial } from '@renderer/core/entities/material/i';
import { getLocalStorage, setLocalStorage } from '@renderer/core/stores/Storage';
import MaterialData from '@renderer/core/entities/material/data.json';

export async function findAll(): Promise<Array<IRemoteMaterial>> {
  const storage = getLocalStorage();
  return Object
    .keys(MaterialData)
    .map((name) => ({
      dataValues: {
        id: name,
        inInventory: storage.materials[name] ?? 0,
      },
    }))
  ;
}

export async function update(identifier: string, body: string): Promise<IRemoteMaterial | null> {
  const storage = getLocalStorage();
  const obj = storage.materials[identifier];
  if (obj) {
    const values: Partial<IMaterial> = JSON.parse(body);
    storage.materials[identifier] = values.inInventory ?? obj;
    setLocalStorage(storage);

    return {
      dataValues: {
        id: identifier,
        inInventory: obj,
      },
    };
  }
  return null;
}
