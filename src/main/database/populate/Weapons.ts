import { ipcRenderer } from 'electron';

import { Weapon, Setting } from '@/main/database/models';
import JSONWeapons from '@renderer/core/entities/weapon/data.json';
import type { IWeapon } from '@renderer/core/entities/weapon/i';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateWeapons', '1970-01-01');
  const done = await serial(Object
    .entries(JSONWeapons)
    .filter(([, data]: [string, IWeapon]) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map(([id], i, arr) => async () => {
      const result = await Weapon.create({ id }).catch(console.log);

      ipcRenderer.send('populateProgress', {
        label: 'Importing weapons...',
        current: i,
        total: arr.length,
        percent: i / arr.length,
      });

      return result;
    }))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateWeapons', new Date().toISOString());
  }
};
