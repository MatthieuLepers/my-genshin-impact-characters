import GlobalI18N from './GlobalI18N';

export default {
  Data: {
    WeaklyBosses: GlobalI18N.WeaklyBosses('en-EN'),
    Weapons: GlobalI18N.Weapons('en-EN'),
    ArtefactSets: GlobalI18N.ArtefactSets('en-EN'),
  },
  App: {
    Menu: {
      followup: 'Followup',
      characterBox: 'Box',
      artefacts: 'Artefacts',
      weapons: 'Weapons',
    },
    TitleBarMenu: {
      fileMenu: {
        label: 'File',
        save: 'Save',
        exit: 'Exit',
      },
      langMenu: {
        label: 'Language',
        'fr-FR': 'French',
        'en-EN': 'English',
      },
    },
    Updater: {
      downloadingUpdate: 'Downloading update...',
      readyToInstall: 'Update ready to install!',
      quitAndInstall: 'Install',
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
    myWeapons: 'My weapons',
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
    Artefact: {
      List: {
        addNew: 'Add new',
        editBtnLabel: 'Edit',
        saveBtnLabel: 'Save',
        deleteBtnLabel: 'Delete',
        exportBtnLabel: 'Export',
        selectBtnLabel: 'Select',
        modal: {
          title: 'Deletion confirmation',
          acceptLabel: 'Yes',
          refuseLabel: 'No',
          content: 'Are you sure you want to remove this artefact? This action is irreversible',
        },
      },
      PresetList: {
        formEditBtnLabel: 'Edit',
        formSaveBtnLabel: 'Save',
        formResetBtnLabel: 'Reset',
        formDeleteBtnLabel: 'Delete',
        formCreateBtnLabel: 'Create and save',
        formChooseBtnLabel: 'Choose',
        closeBtnLabel: 'Close',
        confirmBtnLabel: 'Confirm',
        formPlaceholder: 'New preset',
        placeholder: 'Preset name',
      },
      type: {
        flower: 'Flower of Life',
        feather: 'Plume of Death',
        sands: 'Sands of Eon',
        goblet: 'Goblet of Eonothem',
        circlet: 'Circlet of Logos',
      },
      stats: {
        HP: 'HP',
        'HP%': 'HP percent',
        Atk: 'Attack',
        'Atk%': 'Attack percent',
        Def: 'Defense',
        'Def%': 'Defense percent',
        EM: 'Elemental Mastery',
        'ER%': 'Energy recharge',
        'Heal%': 'Healing bonus',
        'CritRate%': 'Crit rate',
        'CritDmg%': 'Crit damage',
        'PyroDmg%': 'Pyro damage bonus',
        'HydroDmg%': 'Hydro damage bonus',
        'CryoDmg%': 'Cryo damage bonus',
        'ElectroDmg%': 'Electro damage bonus',
        'PhysicalDmg%': 'Physical damage bonus',
        'AnemoDmg%': 'Anemo damage bonus',
        'GeoDmg%': 'Geo damage bonus',
        'DendroDmg%': 'Dendro damage bonus',
      },
      display: {
        HP: 'PV',
        'HP%': 'PV',
        Atk: 'ATK',
        'Atk%': 'ATK',
        Def: 'DEF',
        'Def%': 'DEF',
        EM: 'Elemental Mastery',
        'ER%': 'Energy recharge',
        'Heal%': 'Healing bonus',
        'CritRate%': 'Crit rate',
        'CritDmg%': 'Crit damage',
        'PyroDmg%': 'Pyro damage bonus',
        'HydroDmg%': 'Hydro damage bonus',
        'CryoDmg%': 'Cryo damage bonus',
        'ElectroDmg%': 'Electro damage bonus',
        'PhysicalDmg%': 'Physical damage bonus',
        'AnemoDmg%': 'Anemo damage bonus',
        'GeoDmg%': 'Geo damage bonus',
        'DendroDmg%': 'Dendro damage bonus',
      },
    },
    ArtefactTransmuter: {
      changeAffix: 'Change affix',
      title: 'Select affixes',
      mainAffix: 'Main affix',
      minorAffixes: 'Minor affixes',
      selectAffixBtnLabel: 'Select affix',
      resetBtnLabel: 'Reset',
      confirmBtnLabel: 'Confirm',
      createBtnLabel: 'Done',
      closeBtnLabel: 'Cancel',
    },
    ArtefactFilters: {
      title: 'Artefact filters',
      resetBtnLabel: 'Reset',
      confirmBtnLabel: 'Apply',
      modal: {
        title: 'Artefact set',
        refuseLabel: 'Back',
        acceptLabel: 'Confirm',
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
        emptyResult: 'No result for « {0} »',
      },
    },
  },
  Notification: {
    saveSuccess: 'Saved !',
    saveError: 'Save failed',
  },
};
