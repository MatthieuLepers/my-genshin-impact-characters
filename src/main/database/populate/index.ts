import ArtefactSetsPopulate from '@/main/database/populate/ArtefactSet';
import CharactersPopulate from '@/main/database/populate/Characters';
import MaterialsPopulate from '@/main/database/populate/Materials';
import WeaponsPopulate from '@/main/database/populate/Weapons';
import WeeklyBossesPopulate from '@/main/database/populate/WeeklyBoss';
import { serial } from '@/main/utils/PromiseUtils';

export default () => serial([
  ArtefactSetsPopulate,
  WeeklyBossesPopulate,
  MaterialsPopulate,
  CharactersPopulate,
  WeaponsPopulate,
]).catch(console.log);
