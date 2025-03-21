export default {
  App: {
    Menu: {
      followup: 'Followup',
      characterBox: 'Box',
      characterBuilds: 'Builds',
      artefacts: 'Artefacts',
      weapons: 'Weapons',
    },
    TitleBarMenu: {
      fileMenu: {
        label: 'File',
        save: 'Save',
        exit: 'Exit',
        selectTravelerGender: 'Traveler',
        male: 'Aether',
        female: 'Lumine',
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
      specials: 'Specials',
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
        addNew: 'Create new artefact',
        editBtnLabel: 'Edit',
        deleteBtnLabel: 'Delete',
        exportBtnLabel: 'Export',
        selectBtnLabel: 'Select',
        importSuccess: 'Importation success!',
        importFailed: 'Importation failed',
        filterBtnTitle: 'Filter',
        importBtnTitle: 'Import from file',
        exportBtnTitle: 'Export all artefacts',
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
        saved: 'Saved!',
        modal: {
          title: 'Deletion confirmation',
          acceptLabel: 'Yes',
          refuseLabel: 'No',
          content: 'Are you sure you want to remove this artefact preset? This action is irreversible',
        },
      },
      type: {
        flower: 'Flower of Life',
        feather: 'Plume of Death',
        sands: 'Sands of Eon',
        goblet: 'Goblet of Eonothem',
        circlet: 'Circlet of Logos',
      },
      stats: {
        HP: {
          long: 'HP',
          short: 'HP',
          display: 'HP',
        },
        'HP%': {
          long: 'HP percent',
          short: 'HP%',
          display: 'HP',
        },
        Atk: {
          long: 'Attack',
          short: 'ATK',
          display: 'ATK',
        },
        'Atk%': {
          long: 'Attack percent',
          short: 'ATK%',
          display: 'ATK',
        },
        Def: {
          long: 'Defense',
          short: 'DEF',
          display: 'DEF',
        },
        'Def%': {
          long: 'Defense percent',
          short: 'DEF%',
          display: 'DEF',
        },
        EM: {
          long: 'Elemental Mastery',
          short: 'Elemental Mastery',
          display: 'Elemental Mastery',
        },
        'ER%': {
          long: 'Energy recharge',
          short: 'Energy recharge',
          display: 'Energy recharge',
        },
        'Heal%': {
          long: 'Healing bonus',
          short: 'Healing bonus',
          display: 'Healing bonus',
        },
        'CritRate%': {
          long: 'Crit rate',
          short: 'Crit rate',
          display: 'Crit rate',
        },
        'CritDmg%': {
          long: 'Crit damage',
          short: 'CRIT DMG',
          display: 'CRIT DMG',
        },
        'PyroDmg%': {
          long: 'Pyro damage bonus',
          short: 'Pyro DMG bonus',
          display: 'Pyro DMG bonus',
        },
        'PyroRes%': {
          long: 'Pyro resistance',
          short: 'Pyro res.',
          display: 'Pyro resistance',
        },
        'HydroDmg%': {
          long: 'Hydro damage bonus',
          short: 'Hydro DMG bonus',
          display: 'Hydro DMG bonus',
        },
        'HydroRes%': {
          long: 'Hydro resistance',
          short: 'Hydro res.',
          display: 'Hydro resistance',
        },
        'CryoDmg%': {
          long: 'Cryo damage bonus',
          short: 'Cryo DMG bonus',
          display: 'Cryo DMG bonus',
        },
        'CryoRes%': {
          long: 'Cryo resistance',
          short: 'Cryo res.',
          display: 'Cryo resistance',
        },
        'ElectroDmg%': {
          long: 'Electro damage bonus',
          short: 'Electro DMG bonus',
          display: 'Electro DMG bonus',
        },
        'ElectroRes%': {
          long: 'Electro resistance',
          short: 'Electro res.',
          display: 'Electro resistance',
        },
        'PhysicalDmg%': {
          long: 'Physical damage bonus',
          short: 'Physical DMG bonus',
          display: 'Physical DMG bonus',
        },
        'PhysicalRes%': {
          long: 'Physical resistance',
          short: 'Physical res.',
          display: 'Physical resistance',
        },
        'AnemoDmg%': {
          long: 'Anemo damage bonus',
          short: 'Anemo DMG bonus',
          display: 'Anemo DMG bonus',
        },
        'GeoDmg%': {
          long: 'Geo damage bonus',
          short: 'Geo DMG bonus',
          display: 'Geo DMG bonus',
        },
        'DendroDmg%': {
          long: 'Dendro damage bonus',
          short: 'Dendro DMG bonus',
          display: 'Dendro DMG bonus',
        },
      },
    },
    ArtefactTransmuter: {
      changeAffix: 'Change affix',
      title: 'Select affixes',
      mainAffix: 'Main affix',
      minorAffixes: 'Minor affixes',
      selectAffixBtnLabel: 'Select affix',
      resetBtnLabel: 'Reset',
      resetCloseBtnLabel: 'Close',
      confirmBtnLabel: 'Confirm',
      saveBtnLabel: 'Save',
      closeBtnLabel: 'Cancel',
    },
    ArtefactFilters: {
      title: 'Artefact filters',
      resetBtnLabel: 'Reset',
      resetCloseBtnLabel: 'Close',
      confirmBtnLabel: 'Apply',
      modal: {
        title: 'Artefact set',
        refuseLabel: 'Back',
        acceptLabel: 'Confirm',
      },
    },
    Weapons: {
      weapons: '{0} weapons',
      level: 'Lvl',
      type: {
        bow: 'Bow | Bows',
        catalyser: 'Catalyser | Catalysers',
        polearm: 'Polearm | Polearms',
        claymore: 'Claymore | Claymores',
        sword: 'Sword | Swords',
      },
      tags: {
        wishes: 'Wishes',
        bp: 'Battle Pass',
        f2p: 'Free to play',
        event: 'Event',
        shop: 'Shop',
        fishing: 'Fishing',
      },
      DataTable: {
        name: 'Name',
        owned: 'Owned ?',
        level: 'Level',
        rank: 'Rank',
      },
    },
    CharacterBuild: {
      characterSelect: 'Character lvl 90',
      artefactPresetSelect: 'Artefacts preset',
      weaponSelect: 'Weapon lvl 80 / 90',
      name: 'Build name',
      addBtnLabel: 'New build',
      saveBtnLabel: 'Save',
      cancelBtnLabel: 'Cancel',
      successNotification: 'Saved as « {0} »',
      errorNotification: 'An error occured when saving.',
      deleteModal: {
        title: 'Deletion confirmation',
        acceptLabel: 'Yes',
        refuseLabel: 'No',
        content: 'Are you sure you want to remove this build? This action is irreversible',
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
