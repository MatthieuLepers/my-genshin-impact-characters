import { ipcRenderer } from 'electron';

import { Material, Setting } from '@/main/database/models';
import JSONMaterials from '@renderer/core/entities/material/data.json';
import { serial } from '@/main/utils/PromiseUtils';
import LegacyFile from '@/main/stores/LegacyFile';

interface IJsonMaterial {
  releasedAt?: string;
}

type TJsonMaterialData = Record<string, IJsonMaterial>;

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateMaterials', '1970-01-01');

  const done = await serial(Object
    .entries(JSONMaterials as TJsonMaterialData)
    .filter(([, data]) => {
      const dataTimestamp = new Date(data?.releasedAt ?? '1970-01-01').getTime();
      const settingsTimestamp = new Date(lastPopulateDateSetting!).getTime();

      return dataTimestamp > settingsTimestamp && dataTimestamp <= Date.now();
    })
    .map(([id], i, arr) => async () => {
      const result = await Material.create({
        id,
        inInventory: LegacyFile.getMaterialCount(id),
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
