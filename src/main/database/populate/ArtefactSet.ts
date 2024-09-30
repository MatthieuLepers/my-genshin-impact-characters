import {
  ArtefactSetI18n,
  ArtefactSet,
  ArtefactSetPassiveStat,
  Setting,
} from '@/main/database/models';
import JSONArtefactSets from '@/main/public/ArtefactSets.json';
import { serial } from '@/main/utils/PromiseUtils';

export default async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateArtefactSets');
  const done = await serial(JSONArtefactSets
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data) => () => ArtefactSet.create(data, {
      include: [ArtefactSetPassiveStat, ArtefactSetI18n],
    }).catch(console.log)))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateArtefactSets', new Date().toISOString());
  }
};
