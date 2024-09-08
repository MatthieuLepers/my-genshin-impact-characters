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
      },
      type: {
        flower: 'Fleur de la vie',
        feather: 'Plume de la mort',
        sands: 'Sables du temps',
        goblet: 'Coupe d\'éonothème',
        circlet: 'Diadème de Logos',
      },
      stats: {
        HP: 'PV',
        'HP%': 'Pourcentage PV',
        Atk: 'Attaque',
        'Atk%': 'Pourcentage attaque',
        Def: 'Défense',
        'Def%': 'Pourcentage défense',
        EM: 'Maîtrise élémentaire',
        'ER%': 'Recharge d\'énergie',
        'Heal%': 'Bonus de soin',
        'CritRate%': 'Taux crit.',
        'CritDmg%': 'Dégâts crit.',
        'PyroDmg%': 'Bonus de dégâts pyro',
        'HydroDmg%': 'Bonus de dégâts hydro',
        'CryoDmg%': 'Bonus de dégâts cryo',
        'ElectroDmg%': 'Bonus de dégâts électro',
        'PhysicalDmg%': 'Bonus de dégâts physique',
        'AnemoDmg%': 'Bonus de dégâts anémo',
        'GeoDmg%': 'Bonus de dégâts géo',
        'DendroDmg%': 'Bonus de dégâts dendro',
      },
      display: {
        HP: 'PV',
        'HP%': 'PV',
        Atk: 'ATQ',
        'Atk%': 'ATQ',
        Def: 'DEF',
        'Def%': 'DEF',
        EM: 'Maîtrise élémentaire',
        'ER%': 'Recharge d\'énergie',
        'Heal%': 'Bonus de soin',
        'CritRate%': 'Taux CRIT',
        'CritDmg%': 'DGT CRIT',
        'PyroDmg%': 'Bonus de dégâts pyro',
        'HydroDmg%': 'Bonus de dégâts hydro',
        'CryoDmg%': 'Bonus de dégâts cryo',
        'ElectroDmg%': 'Bonus de dégâts électro',
        'PhysicalDmg%': 'Bonus de dégâts physique',
        'AnemoDmg%': 'Bonus de dégâts anémo',
        'GeoDmg%': 'Bonus de dégâts géo',
        'DendroDmg%': 'Bonus de dégâts dendro',
      },
    },
    ArtefactTransmuter: {
      changeAffix: 'Modifier l\'affixe',
      title: 'Sélection des affixes',
      mainAffix: 'Principale',
      minorAffixes: 'Secondaires',
      selectAffixBtnLabel: 'Choisir l\'affixe',
      resetBtnLabel: 'Réinitialiser',
      confirmBtnLabel: 'Confirmer',
      createBtnLabel: 'Terminer',
      closeBtnLabel: 'Annuler',
    },
    ArtefactFilters: {
      title: 'Filtrer les artéfacts',
      resetBtnLabel: 'Réinitialiser',
      confirmBtnLabel: 'Appliquer',
      modal: {
        title: 'Set d\'artéfact',
        refuseLabel: 'Retour',
        acceptLabel: 'Confirmer',
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
