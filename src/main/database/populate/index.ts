import * as CharactersPopulate from '@/main/database/populate/Characters';
import * as MaterialsPopulate from '@/main/database/populate/Materials';
import * as WeaponsPopulate from '@/main/database/populate/Weapons';
import { serial } from '@/main/utils/PromiseUtils';

export const populate = async () => serial([
  MaterialsPopulate.populate,
  CharactersPopulate.populate,
  WeaponsPopulate.populate,
]).catch(console.log);
