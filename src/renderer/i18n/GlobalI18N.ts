import * as WeaklyBosses from '@renderer/core/datas/WeaklyBosses';
import * as Weapons from '@renderer/core/datas/Weapons';
import * as ArtefactSets from '@renderer/core/datas/ArtefactSets';

export default {
  WeaklyBosses: (lang: string) => Object.entries(WeaklyBosses).reduce((acc, [key, val]) => ({ ...acc, [key]: val.i18n[lang] }), {}),
  Weapons: (lang: string) => Object.entries(Weapons).reduce((acc, [key, val]) => ({ ...acc, [key]: val.i18n[lang] }), {}),
  ArtefactSets: (lang: string) => Object.entries(ArtefactSets).reduce((acc, [key, val]) => ({ ...acc, [key]: val.i18n[lang] }), {}),
};
