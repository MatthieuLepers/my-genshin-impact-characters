import type { IArtefact, IRemoteArtefact } from '@renderer/core/entities/artefact/i';
import { getLocalStorage, setLocalStorage } from '@renderer/core/stores/Storage';

export async function findAll(): Promise<Array<IRemoteArtefact>> {
  const storage = getLocalStorage();
  return storage.artefacts.map((artefact) => ({
    dataValues: artefact,
  }));
}

export async function create(body: string): Promise<IRemoteArtefact> {
  const storage = getLocalStorage();
  const data: Omit<IArtefact, 'id'> = JSON.parse(body);
  const artefact: IArtefact = {
    id: (storage.artefacts[storage.artefacts.length - 1]?.id ?? 0) + 1,
    ...data,
  };
  storage.artefacts.push(artefact);
  setLocalStorage(storage);

  return {
    dataValues: artefact,
  };
}

export async function update(identifier: number, body: string): Promise<IRemoteArtefact | null> {
  const storage = getLocalStorage();
  const objIndex = storage.artefacts.findIndex(({ id }) => id === identifier);
  if (objIndex >= 0) {
    const values: Partial<IArtefact> = JSON.parse(body);
    storage.artefacts[objIndex].setId = values.setId ?? storage.artefacts[objIndex].setId;
    storage.artefacts[objIndex].type = values.type ?? storage.artefacts[objIndex].type;
    storage.artefacts[objIndex].statsJson = values.statsJson ?? storage.artefacts[objIndex].statsJson;
    setLocalStorage(storage);

    return {
      dataValues: storage.artefacts[objIndex],
    };
  }

  return null;
}

export async function destroy(identifier: number): Promise<boolean> {
  const storage = getLocalStorage();
  const objIndex = storage.artefacts.findIndex(({ id }) => id === identifier);
  if (objIndex >= 0) {
    storage.artefacts.splice(objIndex, 1);
    setLocalStorage(storage);
    return true;
  }

  return false;
}
