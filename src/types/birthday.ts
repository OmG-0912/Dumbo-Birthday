export interface BirthdayPhoto {
  id: string;
  title: string;
  caption: string;
  url: string; // File Data URL (base64) or remote URL or local path
  date?: string;
  isPolaroid?: boolean;
  rotation?: string; // CSS rotation class like "-rotate-2", "rotate-1"
  aspectRatio?: "portrait" | "landscape" | "square";
  isPlaceholder?: boolean;
  category?: "all" | "cozy" | "playful" | "night" | "cherished";
  note?: string;
}

export interface BirthdayExperienceData {
  title: string;
  date: string;
  subtitle: string;
  envelopeTagline: string;
  envelopeRecipient: string;
  letterTitle: string;
  letterDate: string;
  letterSalutation: string;
  letterBody: string[];
  letterClosing: string;
  letterSignature: string;
  giftBoxPrompt: string;
  giftBoxMessage: string;
  giftBoxQuote: string;
  voiceNoteUrl?: string;
  voiceNoteTitle?: string;
  voiceNoteSubtitle?: string;
  voiceNote2Url?: string;
  voiceNote2Title?: string;
  voiceNote2Subtitle?: string;
  photos: BirthdayPhoto[];
  surprisePhotos?: BirthdayPhoto[];
}
