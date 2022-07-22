import GlobalI18N from './GlobalI18N';

export default {
  Data: {
    WeaklyBosses: GlobalI18N.WeaklyBosses('fr-FR'),
  },
  App: {
    inInventory: 'In inventory :',
    BossMaterial: {
      columns: {
        character: 'Character',
        level: 'Level',
        phase: 'Phase',
        constellation: 'Constellation',
        aptitudes: 'Talents levels',
        spentMora: 'Spent Moras',
      },
    },
    Filters: {
      showBeta: 'Show beta characters',
    },
  },
  TitleBarMenu: {
    fileMenu: {
      label: 'File',
      selectProfil: 'Select profil...',
      exit: 'Exit',
      save: 'Save',
    },
    langMenu: {
      label: 'Language',
      french: 'French',
      english: 'English',
    },
  },
  Electron: {
    Dialog: {
      openFile: {
        title: 'Open...',
        buttonLabel: 'Open',
      },
      saveFile: {
        title: 'Save as...',
        buttonLabel: 'Save',
      },
      filters: {
        '*': 'All files',
        txt: 'Text file',
        json: 'JSON file',
      },
    },
  },
};
