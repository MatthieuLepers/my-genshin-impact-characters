import { ArtefactSetI18n, ArtefactSet, ArtefactSetPassiveStat } from '@/main/database/models';

export async function findAll(): Promise<Array<ArtefactSet>> {
  return ArtefactSet.findAll({
    include: [
      { model: ArtefactSetI18n },
      { model: ArtefactSetPassiveStat },
    ],
  });
}
