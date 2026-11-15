export interface DestinationRoom {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  accentColor: string;
  badgeText: string;
  route: string;
  illustrationType: 'memories' | 'garden' | 'library' | 'museum' | 'kitchen' | 'observatory';
  details: string[];
}

export interface MemorySnapshot {
  id: string;
  title: string;
  caption: string;
  dateLabel: string;
  locationLabel?: string;
  roomTag: string;
  photoAspect: 'portrait' | 'landscape' | 'square';
  colorPalette: {
    bg: string;
    border: string;
    accent: string;
  };
}

export interface CompanionCharacter {
  id: 'monkey' | 'dodo' | 'dumbo' | 'piggie';
  name: string;
  title: string;
  personality: string;
  favoriteKeepsake: string;
  colorHex: string;
  signatureQuote: string;
}

export interface DailyNote {
  quote: string;
  authorOrSource: string;
  reflection: string;
  dateDisplay: string;
  parchmentSealDate: string;
}
