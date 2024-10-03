import { ipcRenderer } from 'electron';

import { WeaponI18n, Weapon, Setting } from '@/main/database/models';
import JSONWeapons from '@/main/public/Weapons.json';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateWeapons', '1970-01-01');
  const done = await serial(JSONWeapons
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data, i, arr) => async () => {
      const result = await Weapon.create(data, {
        include: [WeaponI18n],
      }).catch(console.log);

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
