import * as ArtefactSetsPopulate from '@/main/database/populate/ArtefactSets';
import * as CharactersPopulate from '@/main/database/populate/Characters';
import * as MaterialsPopulate from '@/main/database/populate/Materials';
import * as WeaponsPopulate from '@/main/database/populate/Weapons';
import * as WeeklyBossesPopulate from '@/main/database/populate/WeeklyBosses';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => serial([
  ArtefactSetsPopulate.populate,
  WeeklyBossesPopulate.populate,
  MaterialsPopulate.populate,
  CharactersPopulate.populate,
  WeaponsPopulate.populate,
]).catch(console.log);
