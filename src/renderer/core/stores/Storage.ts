import type { IArtefact } from '@renderer/core/entities/artefact/i';
import type { IArtefactPreset } from '@renderer/core/entities/artefactPreset/i';
import type { ICharacter } from '@renderer/core/entities/character/i';
import type { ICharacterBuild } from '@renderer/core/entities/characterBuild/i';
import type { IWeapon } from '@renderer/core/entities/weapon/i';

interface IStorage {
  settings: Record<string, string>;
  materials: Record<string, number>;
  characters: Record<string, ICharacter>;
  artefacts: Array<IArtefact>;
  artefactPresets: Array<IArtefactPreset>;
  weapons: Record<string, IWeapon>;
  builds: Array<ICharacterBuild>;
}

const DEFAULT_STORAGE: IStorage = {
  settings: {},
  materials: {},
  characters: {},
  artefacts: [],
  artefactPresets: [],
  weapons: {},
  builds: [],
};

export function getLocalStorage(): IStorage {
  try {
    return JSON.parse(localStorage.getItem('my-genshin-impact-characters') ?? JSON.stringify(DEFAULT_STORAGE));
  } catch {
    return DEFAULT_STORAGE;
  }
}

export function setLocalStorage(storage: IStorage) {
  localStorage.setItem('my-genshin-impact-characters', JSON.stringify(storage));
}
