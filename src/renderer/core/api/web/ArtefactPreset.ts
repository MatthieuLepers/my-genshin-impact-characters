import type { IArtefactPreset, IRemoteArtefactPreset } from '@renderer/core/entities/artefactPreset/i';
import { getLocalStorage, setLocalStorage } from '@renderer/core/stores/Storage';

export async function findAll(): Promise<Array<IRemoteArtefactPreset>> {
  const storage = getLocalStorage();
  return storage.artefactPresets.map((artefactPreset) => ({
    dataValues: artefactPreset,
  }));
}

export async function create(body: string): Promise<IRemoteArtefactPreset> {
  const storage = getLocalStorage();
  const data: Omit<IArtefactPreset, 'id'> = JSON.parse(body);
  const artefactPreset: IArtefactPreset = {
    id: (storage.artefactPresets[storage.artefactPresets.length - 1]?.id ?? 0) + 1,
    ...data,
  };
  storage.artefactPresets.push(artefactPreset);
  setLocalStorage(storage);

  return {
    dataValues: artefactPreset,
  };
}

export async function update(identifier: number, body: string): Promise<IRemoteArtefactPreset | null> {
  const storage = getLocalStorage();
  const objIndex = storage.artefactPresets.findIndex(({ id }) => id === identifier);
  if (objIndex >= 0) {
    const values: Partial<IArtefactPreset> = JSON.parse(body);
    storage.artefactPresets[objIndex].circletId = values.circletId ?? storage.artefactPresets[objIndex].circletId;
    storage.artefactPresets[objIndex].featherId = values.featherId ?? storage.artefactPresets[objIndex].featherId;
    storage.artefactPresets[objIndex].flowerId = values.flowerId ?? storage.artefactPresets[objIndex].flowerId;
    storage.artefactPresets[objIndex].gobletId = values.gobletId ?? storage.artefactPresets[objIndex].gobletId;
    storage.artefactPresets[objIndex].sandsId = values.sandsId ?? storage.artefactPresets[objIndex].sandsId;
    storage.artefactPresets[objIndex].name = values.name ?? storage.artefactPresets[objIndex].name;
    setLocalStorage(storage);

    return {
      dataValues: storage.artefactPresets[objIndex],
    };
  }
  return null;
}

export async function destroy(identifier: number): Promise<boolean> {
  const storage = getLocalStorage();
  const objIndex = storage.artefactPresets.findIndex(({ id }) => id === identifier);
  if (objIndex) {
    storage.artefactPresets.splice(objIndex, 1);
    setLocalStorage(storage);
    return true;
  }

  return false;
}
