import { ipcRenderer } from 'electron';

import { Character, Setting } from '@/main/database/models';
import JSONCharacters from '@renderer/core/entities/character/data.json';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateCharacters', '1970-01-01');
  const done = await serial(Object
    .entries(JSONCharacters)
    .filter(([, data]) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map(([name, data], i, arr) => async () => {
      const result = Character.create({
        name,
        // @ts-ignore
        owned: !!data.owned,
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
