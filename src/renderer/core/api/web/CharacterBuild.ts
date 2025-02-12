import type { ICharacterBuild, IRemoteCharacterBuild } from '@renderer/core/entities/characterBuild/i';
import { getLocalStorage, setLocalStorage } from '@renderer/core/stores/Storage';

export async function findAll(): Promise<Array<IRemoteCharacterBuild>> {
  const storage = getLocalStorage();
  return storage.builds.map((build) => ({
    dataValues: build,
  }));
}

export async function create(body: string): Promise<IRemoteCharacterBuild> {
  const storage = getLocalStorage();
  const data: Omit<ICharacterBuild, 'id'> = JSON.parse(body);
  const build: ICharacterBuild = {
    id: (storage.builds[storage.builds.length - 1]?.id ?? 0) + 1,
    ...data,
  };
  storage.builds.push(build);
  setLocalStorage(storage);

  return {
    dataValues: build,
  };
}

export async function update(identifier: number, body: string): Promise<IRemoteCharacterBuild | null> {
  const storage = getLocalStorage();
  const objIndex = storage.builds.findIndex(({ id }) => id === identifier);
  if (objIndex >= 0) {
    const values: Partial<ICharacterBuild> = JSON.parse(body);
    storage.builds[objIndex] = {
      ...(storage.builds[objIndex] ?? {}),
      ...values,
    };
    setLocalStorage(storage);

    return {
      dataValues: storage.builds[objIndex],
    };
  }
  return null;
}

export async function destroy(identifier: number): Promise<boolean> {
  const storage = getLocalStorage();
  const objIndex = storage.builds.findIndex(({ id }) => id === identifier);
  if (objIndex >= 0) {
    storage.builds.splice(objIndex, 1);
    setLocalStorage(storage);
    return true;
  }
  return false;
}
