import { ipcRenderer } from 'electron';

import { MaterialI18n, Material, Setting } from '@/main/database/models';
import JSONMaterials from '@/main/public/Materials.json';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateMaterials', '1970-01-01');

  const done = await serial(JSONMaterials
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data, i, arr) => async () => {
      const result = await Material.create(data, {
        include: [MaterialI18n],
      }).catch(console.log);

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
