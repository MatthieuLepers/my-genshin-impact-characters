import { Material, Setting } from '@/main/database/models';
import JSONMaterials from '@/main/public/Materials.json';
import { serial } from '@/main/utils/PromiseUtils';

export default async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateMaterials');

  await serial(JSONMaterials
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data) => () => Material.create(data).catch(console.log)));

  await Setting.set('lastPopulateDateMaterials', new Date().toISOString());
};
