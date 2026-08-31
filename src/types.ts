export interface Track {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  album: string;
  releaseYear: string;
  key: string;
  bpm: number;
  coverImage: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  boomplayUrl: string;
  audiomackUrl: string;
  lyrics: string[];
  chords: string;
  featuredLead: string;
  scriptureReference: string;
  category: 'Prophetic Worship' | 'Praise Celebration' | 'Choral Anthem' | 'Intimate Prayer';
}

export interface Album {
  id: string;
  title: string;
  year: string;
  description: string;
  coverImage: string;
  totalTracks: number;
  streamingLinks: {
    spotify: string;
    appleMusic: string;
    youtube: string;
  };
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  date: string; // ISO or readable
  endDate?: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  eventType: 'Worship Night' | 'Revival Conference' | 'Concert' | 'Youth Encounter' | 'Sunday Ministration';
  isUpcoming: boolean;
  registrationOpen: boolean;
  registrationUrl?: string;
  image: string;
  details: string;
}

export interface ScriptureItem {
  id: string;
  reference: string;
  verse: string;
  version: string;
  theme: string;
  reflection: string;
}

export interface Testimony {
  id: string;
  name: string;
  location: string;
  title: string;
  story: string;
  eventOrTrack: string;
  avatar: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface MinistryInfo {
  ministryName: string;
  tagline: string;
  motto: string;
  vision: string;
  mission: string;
  foundingYear: string;
  email: string;
  phone: string;
  altPhone: string;
  address: string;
  cityCountry: string;
  emergencyPrayerLine: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    twitter: string;
    whatsapp: string;
  };
  banking: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    sortCode?: string;
    swiftCode?: string;
    purpose: string;
  };
}

export interface BookingFormData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  cityState: string;
  expectedAttendance: string;
  soundProvided: 'Full Pro Audio' | 'Basic PA System' | 'Require Ministry Support' | 'Unsure';
  ministersRequested: 'Full Choir & Band' | 'Acoustic Worship Team' | 'Lead Vocalist & Director' | 'Custom Ensemble';
  specialNotes: string;
}

export interface PrayerRequestData {
  name: string;
  email: string;
  phone?: string;
  prayerSubject: string;
  details: string;
  isConfidential: boolean;
}

export interface GoogleAdsSettings {
  enabled: boolean;
  publisherId: string; // e.g. ca-pub-1234567890123456
  adsConversionId: string; // e.g. AW-123456789 or G-123456789
  autoAds: boolean;
  testMode: boolean;
  showTopBanner: boolean;
  showMidSectionBanner: boolean;
  showMusicSectionBanner: boolean;
  showFooterBanner: boolean;
  topBannerSlotId: string;
  midSectionSlotId: string;
  musicSectionSlotId: string;
  footerBannerSlotId: string;
  adsTxtContent: string;
}
