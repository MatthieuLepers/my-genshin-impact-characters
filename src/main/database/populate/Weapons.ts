import { ipcRenderer } from 'electron';

import { Weapon, Setting } from '@/main/database/models';
import JSONWeapons from '@renderer/core/entities/weapon/data.json';
import { serial } from '@/main/utils/PromiseUtils';

interface IJsonWeapon {
  releasedAt?: string;
}

type TJsonWeaponData = Record<string, IJsonWeapon>;

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateWeapons', '1970-01-01');
  const done = await serial(Object
    .entries(JSONWeapons as TJsonWeaponData)
    .filter(([, data]) => {
      const dataTimestamp = new Date(data?.releasedAt ?? '1970-01-01').getTime();
      const settingsTimestamp = new Date(lastPopulateDateSetting!).getTime();

      return dataTimestamp > settingsTimestamp && dataTimestamp <= Date.now();
    })
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
