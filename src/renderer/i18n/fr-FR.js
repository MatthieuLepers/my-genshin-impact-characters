import GlobalI18N from './GlobalI18N';

export default {
  Data: {
    WeaklyBosses: GlobalI18N.WeaklyBosses('fr-FR'),
    Weapons: GlobalI18N.Weapons('fr-FR'),
    ArtefactSets: GlobalI18N.ArtefactSets('fr-FR'),
  },
  App: {
    Menu: {
      followup: 'Suivi',
      characterBox: 'Box',
      characterBuilds: 'Builds',
      artefacts: 'Artéfacts',
      weapons: 'Armes',
    },
    TitleBarMenu: {
      fileMenu: {
        label: 'Fichier',
        save: 'Sauvegarder',
        exit: 'Quitter',
      },
      langMenu: {
        label: 'Langage',
        'fr-FR': 'Français',
        'en-EN': 'Anglais',
      },
    },
    Updater: {
      downloadingUpdate: 'Téléchargement de la mise à jour...',
      readyToInstall: 'Mise à jour prête à être installée !',
      quitAndInstall: 'Mettre à jour',
    },
    Main: {
      newlyReleasedCharactersModal: {
        title: 'Nouveau personnage disponible ! | Nouveaux personnages disponibles !',
        okLabel: 'Voir la box',
        cancelLabel: 'Fermer',
      },
    },
    inInventory: 'Dans l\'inventaire :',
    selectOwnedCharacters: 'Séléctionnez les personnages que vous possédez',
    myWeapons: 'Mes armes',
    BossMaterial: {
      columns: {
        character: 'Personnage',
        owned: 'Possédé',
        level: 'Niveau',
        phase: 'Phase',
        constellation: 'Constellation',
        aptitudes: 'Niveau des aptitudes',
        spentMora: 'Moras dépensés',
      },
    },
    Filters: {
      element: {
        label: 'Élément :',
      },
      sort: {
        label: 'Trier par :',
        releasedAt: {
          asc: 'Date de sortie croissante',
          desc: 'Date de sortie décroissante',
        },
        name: {
          asc: 'Nom par ordre alphabétique',
          desc: 'Nom par ordre alphabétique inversé',
        },
        element: {
          asc: 'Élément',
        },
      },
      search: {
        label: 'Nom du personnage :',
      },
    },
    Artefact: {
      List: {
        addNew: 'Nouveau',
        editBtnLabel: 'Modifier',
        saveBtnLabel: 'Sauvegarder',
        deleteBtnLabel: 'Supprimer',
        exportBtnLabel: 'Exporter',
        selectBtnLabel: 'Séléctionner',
        importSuccess: 'L\'importation à réussie !',
        importFailed: 'L\'importation à échouée',
        filterBtnTitle: 'Filtrer la liste',
        importBtnTitle: 'Importer depuis un fichier',
        exportBtnTitle: 'Exporter tous les artéfacts',
        modal: {
          title: 'Confirmation de suppression',
          acceptLabel: 'Oui',
          refuseLabel: 'Non',
          content: 'Voulez-vous vraiment supprimer cet artéfact ? Cette action est irréversible',
        },
      },
      PresetList: {
        formEditBtnLabel: 'Modifier',
        formSaveBtnLabel: 'Sauvegarder',
        formResetBtnLabel: 'Réinitialiser',
        formDeleteBtnLabel: 'Supprimer',
        formCreateBtnLabel: 'Créer et sauvegarder',
        formChooseBtnLabel: 'Choisir',
        closeBtnLabel: 'Fermer',
        confirmBtnLabel: 'Confirmer',
        formPlaceholder: 'Nouveau preset',
        placeholder: 'Nom du preset',
        saved: 'Sauvegarde réussie !',
        modal: {
          title: 'Confirmation de suppression',
          acceptLabel: 'Oui',
          refuseLabel: 'Non',
          content: 'Voulez-vous vraiment supprimer ce preset d\'artéfact ? Cette action est irréversible',
        },
      },
      type: {
        flower: 'Fleur de la vie',
        feather: 'Plume de la mort',
        sands: 'Sables du temps',
        goblet: 'Coupe d\'éonothème',
        circlet: 'Diadème de Logos',
      },
      stats: {
        HP: {
          long: 'PV',
          short: 'PV',
          display: 'PV',
        },
        'HP%': {
          long: 'Pourcentage PV',
          short: 'PV%',
          display: 'PV',
        },
        Atk: {
          long: 'Attaque',
          short: 'ATQ',
          display: 'ATQ',
        },
        'Atk%': {
          long: 'Pourcentage attaque',
          short: 'ATQ%',
          display: 'ATQ',
        },
        Def: {
          long: 'Défense',
          short: 'DEF',
          display: 'DEF',
        },
        'Def%': {
          long: 'Pourcentage défense',
          short: 'DEF%',
          display: 'DEF',
        },
        EM: {
          long: 'Maîtrise élémentaire',
          short: 'Maîtrise élémentaire',
          display: 'Maîtrise élémentaire',
        },
        'ER%': {
          long: 'Recharge d\'énergie',
          short: 'Recharge d\'énergie',
          display: 'Recharge d\'énergie',
        },
        'Heal%': {
          long: 'Bonus de soin',
          short: 'Bonus de soin',
          display: 'Bonus de soin',
        },
        'CritRate%': {
          long: 'Taux critique',
          short: 'Taux CRIT',
          display: 'Taux CRIT',
        },
        'CritDmg%': {
          long: 'Dégâts critique',
          short: 'DGT CRIT',
          display: 'DGT CRIT',
        },
        'PyroDmg%': {
          long: 'Bonus de dégâts Pyro',
          short: 'Bonus de DGT Pyro',
          display: 'Bonus de DGT Pyro',
        },
        'HydroDmg%': {
          long: 'Bonus de dégâts Hydro',
          short: 'Bonus de DGT Hydro',
          display: 'Bonus de DGT Hydro',
        },
        'CryoDmg%': {
          long: 'Bonus de dégâts Cryo',
          short: 'Bonus de DGT Cryo',
          display: 'Bonus de DGT Cryo',
        },
        'ElectroDmg%': {
          long: 'Bonus de dégâts Électro',
          short: 'Bonus de DGT Électro',
          display: 'Bonus de DGT Électro',
        },
        'PhysicalDmg%': {
          long: 'Bonus de dégâts Physique',
          short: 'Bonus de DGT Physique',
          display: 'Bonus de DGT Physique',
        },
        'AnemoDmg%': {
          long: 'Bonus de dégâts Anémo',
          short: 'Bonus de DGT Anémo',
          display: 'Bonus de DGT Anémo',
        },
        'GeoDmg%': {
          long: 'Bonus de dégâts Géo',
          short: 'Bonus de DGT Géo',
          display: 'Bonus de DGT Géo',
        },
        'DendroDmg%': {
          long: 'Bonus de dégâts Dendro',
          short: 'Bonus de DGT Dendro',
          display: 'Bonus de DGT Dendro',
        },
      },
    },
    ArtefactTransmuter: {
      changeAffix: 'Modifier l\'affixe',
      title: 'Sélection des affixes',
      mainAffix: 'Principale',
      minorAffixes: 'Secondaires',
      selectAffixBtnLabel: 'Choisir l\'affixe',
      resetBtnLabel: 'Réinitialiser',
      resetCloseBtnLabel: 'Fermer',
      confirmBtnLabel: 'Confirmer',
      createBtnLabel: 'Terminer',
      closeBtnLabel: 'Annuler',
    },
    ArtefactFilters: {
      title: 'Filtrer les artéfacts',
      resetBtnLabel: 'Réinitialiser',
      resetCloseBtnLabel: 'Fermer',
      confirmBtnLabel: 'Appliquer',
      modal: {
        title: 'Set d\'artéfact',
        refuseLabel: 'Retour',
        acceptLabel: 'Confirmer',
      },
    },
    Weapons: {
      weapons: 'Armes {0}',
      level: 'Niv',
      type: {
        bow: 'Arc | Arcs',
        catalyser: 'Catalyseur | Catalyseurs',
        polearm: 'Arme d\'hast | Armes d\'hast',
        claymore: 'Claymore | Claymores',
        sword: 'Épée | Épées',
      },
      tags: {
        wishes: 'Voeux',
        bp: 'Battle Pass',
        f2p: 'Free to play',
        event: 'Évènement',
        shop: 'Boutique',
        fishing: 'Pêche',
      },
    },
    CharacterBuild: {
      createBuild: 'Nouveau build',
      myBuilds: 'Mes builds',
      Create: {
        characterSelect: 'Personnage niv. 90',
        artefactPresetSelect: 'Preset d\'artéfacts',
        weaponSelect: 'Arme niv. 80 / 90',
        name: 'Nom du build',
        saveBtnLabel: 'Sauvegarder',
        successNotification: 'Sauvegarder en tant que « {0} »',
        errorNotification: 'Une erreur est survenue lors de la sauvegarde.',
      },
    },
  },
  Electron: {
    Dialog: {
      openFile: {
        title: 'Ouvrir...',
        buttonLabel: 'Ouvrir',
      },
      saveFile: {
        title: 'Enregistrer sous...',
        buttonLabel: 'Enregistrer',
      },
      filters: {
        '*': 'Tous les fichiers',
        txt: 'Fichier texte',
        json: 'Fichier JSON',
      },
    },
  },
  Date: {
    days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    daySuffix: [],
    defaultSuffix: '',
  },
  Materials: {
    Form: {
      DropArea: {
        areaLabel: 'Glisser-déposer des fichiers pour les téléverser',
      },
      Select: {
        removeOption: 'Retirer l\'option {option}',
        emptyResult: 'Aucun résultat pour « {0} »',
      },
    },
  },
  Notification: {
    saveSuccess: 'Sauvegardé !',
    saveError: 'Echec de la sauvegarde',
  },
};
