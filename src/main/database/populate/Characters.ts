import { ipcRenderer } from 'electron';

import { Character, Setting } from '@/main/database/models';
import JSONCharacters from '@renderer/core/entities/character/data.json';
import { serial } from '@/main/utils/PromiseUtils';
import LegacyFile from '@/main/stores/LegacyFile';

interface IJsonCharacter {
  releasedAt?: string;
  element: string;
}

type TJsonCharacterData = Record<string, IJsonCharacter>;

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateCharacters', '1970-01-01');
  const done = await serial(Object
    .entries(JSONCharacters as TJsonCharacterData)
    .filter(([, data]) => {
      const dataTimestamp = new Date(data?.releasedAt ?? '1970-01-01').getTime();
      const settingsTimestamp = new Date(lastPopulateDateSetting!).getTime();

      return dataTimestamp > settingsTimestamp && dataTimestamp <= Date.now();
    })
    .map(([name, data], i, arr) => async () => {
      const result = Character.create({
        name,
        ...LegacyFile.getCharacterData(name, `${data.element.charAt(0).toUpperCase()}${data.element.substring(1).toLowerCase()}`),
      }).catch(console.log);

      ipcRenderer.send('populateProgress', {
        label: 'Importing characters...',
        current: i,
        total: arr.length,
        percent: i / arr.length,
      });

      return result;
    }))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateCharacters', new Date().toISOString());
  }
};
