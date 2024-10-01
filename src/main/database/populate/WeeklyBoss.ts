import { WeeklyBossI18n, WeeklyBoss, Setting } from '@/main/database/models';
import JSONWeeklyBosses from '@/main/public/WeeklyBosses.json';
import { serial } from '@/main/utils/PromiseUtils';

export default async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateWeeklyBosses');
  const done = await serial(JSONWeeklyBosses
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data) => () => WeeklyBoss.create(data, {
      include: [WeeklyBossI18n],
    }).catch(console.log)))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateWeeklyBosses', new Date().toISOString());
  }
};
