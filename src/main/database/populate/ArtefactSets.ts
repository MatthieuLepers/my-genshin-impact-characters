import { ipcRenderer } from 'electron';

import {
  ArtefactSetI18n,
  ArtefactSet,
  ArtefactSetPassiveStat,
  Setting,
} from '@/main/database/models';
import JSONArtefactSets from '@/main/public/ArtefactSets.json';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateArtefactSets', '1970-01-01');
  const done = await serial(JSONArtefactSets
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data, i, arr) => async () => {
      const result = await ArtefactSet.create(data, {
        include: [ArtefactSetPassiveStat, ArtefactSetI18n],
      }).catch(console.log);

      ipcRenderer.send('populateProgress', {
        label: 'Importing artefact sets...',
        current: i,
        total: arr.length,
        percent: i / arr.length,
      });

      return result;
    }))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateArtefactSets', new Date().toISOString());
  }
};
