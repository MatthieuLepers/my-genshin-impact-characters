import Ajv from 'ajv';

import * as Character from '@renderer/core/api/web/Character';
import * as Material from '@renderer/core/api/web/Material';
import * as Artefact from '@renderer/core/api/web/Artefact';
import * as ArtefactPreset from '@renderer/core/api/web/ArtefactPreset';
import * as Weapon from '@renderer/core/api/web/Weapon';
import * as CharacterBuild from '@renderer/core/api/web/CharacterBuild';
import * as Setting from '@renderer/core/api/web/Setting';
import { getLocalStorage } from '@renderer/core/stores/Storage';
import { download } from '@renderer/core/utils';
import ArtefactSchema from '@/main/public/schemas/artefact.schema.json';

function send(channel: string, ...args: any[]) {
  const event = new CustomEvent(channel, { detail: { ...args } });
  document.body.dispatchEvent(event);
}

const API_FALLBACKS: Record<string, Function> = {
  async localeChange(iso: string) {
    send('localeChange', iso);
    await Setting.updateOrCreate(`{"key": "locale", "value": "${iso}"}`);
  },
  async exportArtefact(identifier: number) {
    const storage = getLocalStorage();
    const obj = storage.artefacts.find(({ id }) => id === identifier);
    if (obj) {
      download('artefact.json', JSON.stringify(obj, null, 2));
    }
  },
  async exportMultipleArtefact(idList: string) {
    const storage = getLocalStorage();
    const parsedIdList: Array<number> = JSON.parse(idList);
    const objList = storage.artefacts.filter(({ id }) => parsedIdList.includes(id));
    if (objList.length) {
      download('artefacts.json', JSON.stringify(objList, null, 2));
    }
  },
  async importArtefact(): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');

      input.addEventListener('change', (e: Event) => {
        if (e.target) {
          const [file] = (e.target as HTMLInputElement).files ?? [];
          if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              try {
                const parsedContent = JSON.parse(`${reader.result}`);
                const artefactList = Array.isArray(parsedContent) ? parsedContent : [parsedContent];
                const valid = artefactList.filter((artefactData) => {
                  const validator = new Ajv();
                  return validator.validate(ArtefactSchema, artefactData);
                });
                if (valid.length) {
                  resolve(JSON.stringify(valid));
                }
                resolve(null);
              } catch {
                resolve(null);
              }
            });
            reader.readAsText(file);
          }
        }
        resolve(null);
      });
    });
  },
};

export const api = {
  async invoke(channel: string, ...args: any[]) {
    return API_FALLBACKS[channel](...args);
  },
  send,
  sendSync(channel: string, ...args: any[]) {
    return API_FALLBACKS[channel](...args);
  },
  on(channel: string, func: Function) {
    document.body.addEventListener(channel, (e) => func(...Object.values((e as CustomEvent).detail)));
  },
  Character,
  Material,
  Artefact,
  ArtefactPreset,
  Weapon,
  CharacterBuild,
  Setting,
  CipherUtils: {
    cipher(_options: never, str: string): string {
      return btoa(str);
    },
    decipher(_options: never, str: string): string {
      return atob(str);
    },
  },
  homedir: '/',
  plateform: navigator.userAgent,
  clipboard: navigator.clipboard,
  isDev: process.env.NODE_ENV !== 'production',
  isWeb: true,
};
