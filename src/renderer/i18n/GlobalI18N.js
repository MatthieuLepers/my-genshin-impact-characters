import WeaklyBosses from '@/js/datas/WeaklyBosses';

export default {
  WeaklyBosses: (lang) => Object.entries(WeaklyBosses).reduce((acc, [key, val]) => ({ ...acc, [key]: val.i18n[lang] }), {}),
};
