import {
  Character,
  CharacterAptitude,
  CharacterStats,
  CharacterPassiveStat,
  Setting,
} from '@/main/database/models';
import JSONCharacters from '@/main/public/Characters.json';
import { serial } from '@/main/utils/PromiseUtils';

export default async () => {
  const lastPopulateDateSetting = await Setting.get('lastPopulateDateCharacters');
  const done = await serial(JSONCharacters
    .filter((data) => data.releasedAt && new Date(data.releasedAt).getTime() > new Date(lastPopulateDateSetting!).getTime())
    .map((data) => () => Character.create(data, {
      include: [CharacterAptitude, CharacterStats, CharacterPassiveStat],
    }).catch(console.log)))
  ;

  if (done.length) {
    await Setting.set('lastPopulateDateCharacters', new Date().toISOString());
  }
};
