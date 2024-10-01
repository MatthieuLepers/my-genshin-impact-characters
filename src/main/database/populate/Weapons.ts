import { WeaponI18n, Weapon, Setting } from '@/main/database/models';
import JSONWeapons from '@/main/public/Weapons.json';
import { serial } from '@/main/utils/PromiseUtils';

export default async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateWeapons');
  const done = await serial(JSONWeapons
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data) => () => Weapon.create(data, {
      include: [WeaponI18n],
    }).catch(console.log)))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateWeapons', new Date().toISOString());
  }
};
