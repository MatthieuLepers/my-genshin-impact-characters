import ArtefactSetsPopulate from '@/main/database/populate/ArtefactSet';
import CharactersPopulate from '@/main/database/populate/Characters';
import MaterialsPopulate from '@/main/database/populate/Materials';
import WeaponsPopulate from '@/main/database/populate/Weapons';
import { serial } from '@/main/utils/PromiseUtils';

export default () => serial([
  ArtefactSetsPopulate,
  MaterialsPopulate,
  CharactersPopulate,
  WeaponsPopulate,
]).catch(console.log);
