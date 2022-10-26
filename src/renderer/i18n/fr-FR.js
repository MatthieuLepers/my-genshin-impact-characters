import GlobalI18N from './GlobalI18N';

export default {
  Data: {
    WeaklyBosses: GlobalI18N.WeaklyBosses('fr-FR'),
  },
  App: {
    inInventory: 'Dans l\'inventaire :',
    BossMaterial: {
      columns: {
        character: 'Personnage',
        level: 'Niveau',
        phase: 'Phase',
        constellation: 'Constellation',
        aptitudes: 'Niveau des aptitudes',
        spentMora: 'Moras dépensés',
      },
    },
    Filters: {
      showBeta: 'Afficher les personnages de la bêta',
    },
  },
  TitleBarMenu: {
    fileMenu: {
      label: 'Fichier',
      selectProfil: 'Sélection du profil...',
      exit: 'Quitter',
      save: 'Sauvegarder',
    },
    langMenu: {
      label: 'Langage',
      french: 'Français',
      english: 'Anglais',
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
};
