import { ipcRenderer } from 'electron';

import { Material, Setting } from '@/main/database/models';
import JSONMaterials from '@renderer/core/entities/material/data.json';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateMaterials', '1970-01-01');

  const done = await serial(Object
    .entries(JSONMaterials)
    .filter(([, data]) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map(([id], i, arr) => async () => {
      const result = await Material.create({ id }).catch(console.log);

      ipcRenderer.send('populateProgress', {
        label: 'Importing materials...',
        current: i,
        total: arr.length,
        percent: i / arr.length,
      });

      return result;
    }))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateMaterials', new Date().toISOString());
  }
};
