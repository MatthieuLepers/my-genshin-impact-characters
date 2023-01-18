import GlobalI18N from './GlobalI18N';

export default {
  Data: {
    WeaklyBosses: GlobalI18N.WeaklyBosses('fr-FR'),
  },
  App: {
    Menu: {
      followup: 'Suivi',
      characterBox: 'Box',
    },
    TitleBarMenu: {
      fileMenu: {
        label: 'Fichier',
        save: 'Sauvegarder',
        exit: 'Quitter',
      },
      langMenu: {
        label: 'Langage',
        french: 'Français',
        english: 'Anglais',
      },
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
      },
    },
  },
  Notification: {
    saveSuccess: 'Sauvegardé !',
    saveError: 'Echec de la sauvegarde',
  },
};
