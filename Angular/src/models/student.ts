
export interface Student {
  id?: number;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  major?: string;
  minor?: string;
  year?: number;
  status?: string;
  location?: string;
  daysAbroad?: number;
  minorFullName?: string;
  statusFullName?: string;
  locationFullName?: string;
  headTeacherId?: number;
}

export enum Status {
  INTERN = 'En Stage',
  CLASS = 'En Cours',
  GAPYEAR = 'Année de Césure'
}

export enum Countries {
  France = 'France',
  Monaco = 'Monaco',
  UK = 'Grande Bretagne',
  Ireland = 'Irlande',
  Canada = 'Canada',
  USA = 'Etats Unis',
  China = 'Chine',
  HK = 'Hong Kong',
  Italy = 'Italie',
  Germany = 'Allemagne',
  Spain = 'Espagne',
  Poland = 'Pologne'
}

export enum Minors {
  NONE = '-',
  AL = 'Architecture Logicielle',
  CASPAR = 'Cryptographie, sécurité et vie privée dans les applications et les réseaux',
  IAM = 'Intelligence Ambiante',
  IHM = 'Interactions Homme - Machine',
  WEB = 'Web',
  IMAFA = 'Informatique et Mathématiques Appliquées à la Finance et à l\'Assurance',
  SD = 'Science des Données',
  INUM = 'Ingénierie numérique'
}

export enum MAMMinors {
  NONE = '-',
  IMAFA = 'Informatique et Mathématiques Appliquées à la Finance et à l\'Assurance',
  SD = 'Science des Données',
  INUM = 'Ingénierie numérique'
}

export enum SIMinors {
  NONE = '-',
  AL = 'Architecture Logicielle',
  CASPAR = 'Cryptographie, sécurité et vie privée dans les applications et les réseaux',
  IAM = 'Intelligence Ambiante',
  IHM = 'Interactions Homme - Machine',
  WEB = 'Web',
  IMAFA = 'Informatique et Mathématiques Appliquées à la Finance et à l\'Assurance',
  SD = 'Science des Données',
}

