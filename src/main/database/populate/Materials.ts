import { MaterialI18n, Material, Setting } from '@/main/database/models';
import JSONMaterials from '@/main/public/Materials.json';
import { serial } from '@/main/utils/PromiseUtils';

export default async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateMaterials');

  const done = await serial(JSONMaterials
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data) => () => Material.create(data, {
      include: [MaterialI18n],
    }).catch(console.log)))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateMaterials', new Date().toISOString());
  }
};
