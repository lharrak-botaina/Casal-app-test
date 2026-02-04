export abstract class Data {
  public static CITIES = [
    'Agadir',
    'Tanger',
    'Béni Mellal',
    'Casablanca',
    'El Jadida',
    'Fés',
    'Kénitra',
    'Khémisset',
    'Khouribga',
    'Marrakech',
    'Meknès',
    'Mohammédia',
    'Nador',
    'Oujda',
    'Rabat',
    'Safi',
    'Salé',
    'Taza',
    'Témara',
    'Tétouan',
  ];
  public static CONNECTED_BY = [
    'Par un ami, famille',
    'De bouche à oreille',
    'Par une association',
    'Par une annonce',
  ];
  public static YES_OR_NO = ['Oui', 'Non'];
  public static GENDER = ['Homme', 'Femme'];
  public static HOUSING = [
    'Locataire',
    'Proprétaire',
    'Chez la famille',
    'Sans domicile fixe',
  ];
  public static CIVIL_STATUS = [
    'Célibataire',
    'Marié(e)',
    'Divorcé(e)',
    'Veuf/Veuve',
  ];
  public static ASSOCIATIVE_ACTIVITY = ['Bénificiaire', 'Membre'];
  public static LEVEL_OF_STUDY = [
    'Technicien Spécialisé',
    'Technicien',
    'Initiation Professionnelle',
    'Apprentissage',
    'Qualification',
    'Primaire',
    'Sans',
  ];

  public static LEVEL_OF_STUDIES = [
    'Université',
    'Bac',
    'Lycée',
    'College',
    'Primaire',
    'Sans',
  ];

  public static LANGUAGES = ['Arabe', 'Français', 'Anglais', 'Espagnole', 'Autre'];
  public static WORK_TYPE = ['STAGE', 'CDI', 'CDD', 'ANAPEC', 'TEMPORAIRE','INFORMEL','AUTRE'];
  public static SOFT_SKILLS = [
    'Présentation orale',
    'Présentation claire des idées',
    'Persuasif',
    'Qualités de négociation',
    'Communication téléphonique',
    'Communication',
    "Attentif, à l'ecoute",
    'Langue francaise',
    'Prise de parole en public',
    "Aptitudes à l'écriture",
    'Coopératif',
    'Persévérant',
    'Accepter les critiques',
    'Sens des responsabilités',
    'Ponctualité',
    'Communication verbale',
    "Intérêt pour l'innovation",
    'les nouvelles technologies',
    'Langue espagnol',
  ];

  public static LIFE_SKILLS = [
    'Adaptabilité',
    'Aptitudes sociales',
    'Engagement social',
    'Empathie naturelle',
    'Perspicacité',
    ' Conscience de soi',
    ' Prise de décisions',
    'Savoir faire face au stress',
    'Adaptation',
    'Assertivité',
    'Sociable',
  ];

  public static HARD_SKILLS = [
    {
      name: 'Informatique',
      items: ['Word', 'Excel', 'Emails', 'PPT'],
    },
    {
      name: "L'industrie",
      items: [
        'sécurité  au travail',
        'EPI: equipements de protection individuels ',
      ],
    },
    {
      name: 'Restauration',
      items: [
        'Service à la table',
        'Stockage et rangement des equipements de cuisine',
        'Accueil des convives',
        'Gestion des flux de clientèle',
        'Exécution de la commande client',
      ],
    },
    {
      name: 'Textile & confection',
      items: [
        "connaissance les techniques de fabrication et couture d'un vêtement (coupe, points de couture, etc.)",
        'connaissances des différents tissus, les matières, les couleurs',
      ],
    },
    {
      name: 'Agent de securité',
      items: [
        'Savoir garder son calme',
        'Etre vigilant, attentif au moindre détail',
        "Connaissances du matériels d'alarme et de surveillance",
        'Bases du secourisme.',
      ],
    },
    {
      name: 'Commercial',
      items: [
        'Force de persuasion',
        'Résistance à la pression et au stress',
        'Aptitudes relationnelles',
        'Persévérance et patience',
      ],
    },
    {
      name: 'Electricien',
      items: [
        'Lire et interpréter les schémas électriques',
        'Elaborer un diagnostic, détecter un dysfonctionnement',
        'Maintenir et dépanner des machines électriques',
        'Respecter les normes et réglementations de sécurité strictes',
        'Installer et raccorder des armoires électriques',
      ],
    },
    {
      name: 'Mecanicien',
      items: [
        'Connaitre les outils de diagnostic',
        'Connaissance de tous équipements, les nouveaux ',
        'Habileté manuelle',
        'Accueil et écoute',
        "Capacité d'adaptation aux nouveaux véhicules",
      ],
    },
    {
      name: 'Controleur de qualité',
      items: [
        'Connaissance des processus de fabrication et des points de contrôle',
        'Connaissance des normes et des techniques de contrôle-qualité',
        'Capacité d’organisation',
        'Connaitre les moyens de mesure et de contrôle',
        'Etalonner et utiliser des outils de mesure',
        "Mise en place de procédures et d'indicateurs de mesure de la satisfaction clients",
      ],
    },
    {
      name: 'Vendeur',
      items: [
        'Techniques de vente.',
        'Capacité de persuasion.',
        "Capacité d'adaptation et d'organisation",
        'Compétences commerciale',
        'Savoir être: Présentation soignée',
        'Aptitude dans la gestion de stock',
        'Contact facile avec le client',
        'Connaissance des langues',
      ],
    },
  ];

  public static WORKSHOPS = [
    'Identifier et mettre en valeur ses compétences',
    'Rédaction et élaboration du CV',
    "Préparation aux entretiens d'embauche",
    'Droit de Travail',
    "Communication au milieu de l'entreprise",
    "Confiance en soi",
    "Simulation d'entretien  d'embauche",
    'Communication Interpersonelle',
    'Gestion de conflit',
    'Santé et sécurité au milieu de travail',
    'Gestion de stresse',
    "Technique de recherche d'emploi"
  ];
  public static STATUS = ['en cours', 'terminé'];
  public static PASSWORK_TYPES = ['Stage', 'Emploi', 'Formation courte durée'];
  public static CONTRACT_TYPES = ['STAGE', 'CDI', 'CDD', 'ANAPEC', 'INFORMEL', 'TEMPORAIRE', 'AUTRE'
  ];
  public static CATEGORIES = ['Formelle', 'Informelle'];
  public static JOB_DURATION = [
    '1 - 3 mois',
    '3 - 6 mois',
    '6 - 12 mois',
    '12 - 24 mois',
    '+24 mois',
  ];
  public static JOB_TYPES = [
    'Employes',
    'Technicien',
    'Ouvriers',
    'Salarié',
    'Commercial',
    'Entrepreneur',
    'Autre'
  ];
  public static SALARIES = [
    'Inférieur au SMIG',
    'SMIG',
    '3000 - 4000',
    '+4001',
  ];
  public static INSERTION_TYPE = ['direct', 'passwork'];
  public static PASSWORK_MODULES = [
    'Service restaurant',
    'Confection industrielle',
    'Enseignant de primaires',
    'Aides ambulalnciers et urgentistes',
    "Employés d'étage",
    'Agent techniques de vente',
    'Auxieliaires de vie sociale',
    'Aides kinéthérapeute',
    'Aducatrices de préscolaires',
    'Maganisiers et agents de stoks',
    'Agents caristes',
    'Agents de jardinage',
    'Aides soignantes',
    'Esthétique et coiffure',
    'Agent Qualité',
  ];

  public static JUSTIFICATIVE_TYPE = [
    'Contrat de travail',
    'Atestation d\'insertion',
    'Bulletin de paie',
    'Declaration CNSS',
  ];

  public static FORMELLE_CONTRACT = ['CDD', 'CDI', 'Anapec', 'Interim'];
  public static INFORMELLE_CONTRACT = ['Fiche d\'insertion', 'Autre'];
  public static NATIONALITIES = ['Marocaine', 'Autre'];
  public static COLABORATION_TYPE = ['Accueil de jeunes pour stages pratiques',
    'Proposition d\'offres d\'emploi décent',
    'Participation à la formation professionnelle',
    'Animation d\'ateliers pour les jeunes',
    'Participation à des rencontres organisées par le réseau',
    'Participation à des activités citoyenne'];
}
