import { ArtefactSet } from '@/main/database/models';

export async function findAll(): Promise<Array<ArtefactSet>> {
  return ArtefactSet.findAll();
}
