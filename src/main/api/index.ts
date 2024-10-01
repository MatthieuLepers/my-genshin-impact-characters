import { ipcRenderer, clipboard } from 'electron';

import * as Character from '@/main/api/character';
import * as CharacterAptitude from '@/main/api/characterAptitude';
import * as Material from '@/main/api/material';
import * as ArtefactSet from '@/main/api/artefactSet';
import * as Artefact from '@/main/api/artefact';
import * as ArtefactPreset from '@/main/api/artefactPreset';
import * as Weapon from '@/main/api/weapon';
import * as WeeklyBoss from '@/main/api/weeklyBoss';
import * as CharacterBuild from '@/main/api/characterBuild';
import * as Setting from '@/main/api/setting';
import * as CipherUtils from '@/main/utils/CipherUtils';
import { APP_PLATEFORM, HOME_DIR, IS_DEV } from '@/main/utils/Constants';

export default {
  async invoke(channel: string, ...args: any[]) {
    const result = await ipcRenderer.invoke(channel, ...args);
    return result;
  },
  send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args);
  },
  sendSync(channel: string, ...args: any[]) {
    return ipcRenderer.sendSync(channel, ...args);
  },
  on(channel: string, func: Function) {
    ipcRenderer.on(channel, (_e, ...args) => func(...args));
  },
  Character,
  CharacterAptitude,
  Material,
  ArtefactSet,
  Artefact,
  ArtefactPreset,
  Weapon,
  WeeklyBoss,
  CharacterBuild,
  Setting,
  CipherUtils,
  homedir: HOME_DIR,
  plateform: APP_PLATEFORM,
  clipboard,
  isDev: IS_DEV,
};
