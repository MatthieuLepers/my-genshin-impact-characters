import GlobalI18N from './GlobalI18N';

export default {
  Data: {
    WeaklyBosses: GlobalI18N.WeaklyBosses('en-EN'),
  },
  App: {
    Menu: {
      followup: 'Followup',
      characterBox: 'Box',
    },
    TitleBarMenu: {
      fileMenu: {
        label: 'File',
        save: 'Save',
        exit: 'Exit',
      },
      langMenu: {
        label: 'Language',
        french: 'French',
        english: 'English',
      },
    },
    Main: {
      newlyReleasedCharactersModal: {
        title: 'New character available ! | New characters available !',
        okLabel: 'Go to box',
        cancelLabel: 'Close',
      },
    },
    inInventory: 'In inventory :',
    selectOwnedCharacters: 'Select all characters you own',
    BossMaterial: {
      columns: {
        character: 'Character',
        owned: 'Owned',
        level: 'Level',
        phase: 'Phase',
        constellation: 'Constellation',
        aptitudes: 'Talents levels',
        spentMora: 'Spent Moras',
      },
    },
    Filters: {
      element: {
        label: 'Element :',
      },
      sort: {
        label: 'Sort by :',
        releasedAt: {
          asc: 'Ascending release date',
          desc: 'Descending release date',
        },
        name: {
          asc: 'Name by reverse alphabetical order',
          desc: 'Name by alphabetical order',
        },
        element: {
          asc: 'Element',
        },
      },
      search: {
        label: 'Character name :',
      },
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
  Date: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daySuffix: ['st', 'nd', 'rd'],
    defaultSuffix: 'th',
  },
  Materials: {
    Form: {
      DropArea: {
        areaLabel: 'Drag\'n\'drop files to upload them',
      },
      Select: {
        removeOption: 'Remove option {option}',
      },
    },
  },
  Notification: {
    saveSuccess: 'Saved !',
    saveError: 'Save failed',
  },
};
