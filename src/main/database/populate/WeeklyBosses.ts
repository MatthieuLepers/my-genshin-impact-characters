import { ipcRenderer } from 'electron';

import { WeeklyBossI18n, WeeklyBoss, Setting } from '@/main/database/models';
import JSONWeeklyBosses from '@/main/public/WeeklyBosses.json';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateWeeklyBosses', '1970-01-01');
  const done = await serial(JSONWeeklyBosses
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data, i, arr) => async () => {
      const result = await WeeklyBoss.create(data, {
        include: [WeeklyBossI18n],
      }).catch(console.log);

      ipcRenderer.send('populateProgress', {
        label: 'Importing weekly bosses...',
        current: i,
        total: arr.length,
        percent: i / arr.length,
      });

      return result;
    }))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateWeeklyBosses', new Date().toISOString());
  }
};
