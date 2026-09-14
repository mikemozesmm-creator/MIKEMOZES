import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Album, BookingFormData, EventItem, GoogleAdsSettings, MinistryInfo, PrayerRequestData, ScriptureItem, Testimony, Track } from '../types';
import { initialAlbums, initialEvents, initialGoogleAdsSettings, initialMinistryInfo, initialScriptures, initialTestimonies, initialTracks } from '../data/initialContent';
import { worshipAudio } from '../utils/audioSynth';

interface MinistryContextType {
  ministryInfo: MinistryInfo;
  tracks: Track[];
  albums: Album[];
  events: EventItem[];
  scriptures: ScriptureItem[];
  testimonies: Testimony[];
  googleAds: GoogleAdsSettings;
  
  // Customization & editing methods
  updateMinistryInfo: (info: Partial<MinistryInfo>) => void;
  updateTracks: (tracks: Track[]) => void;
  updateEvents: (events: EventItem[]) => void;
  updateScriptures: (scriptures: ScriptureItem[]) => void;
  updateGoogleAds: (settings: GoogleAdsSettings) => void;
  resetToDefaults: () => void;
  exportContentJson: () => void;
  importContentJson: (jsonData: string) => boolean;

  // Music Player State
  currentTrack: Track;
  isPlaying: boolean;
  playbackProgress: number; // 0 to 100
  currentSeconds: number;
  volume: number;
  isMuted: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekProgress: (percent: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;

  // Modals & UI states
  isLyricsModalOpen: boolean;
  setIsLyricsModalOpen: (open: boolean) => void;
  lyricsTrack: Track | null;
  openLyrics: (track: Track) => void;

  isChordsModalOpen: boolean;
  setIsChordsModalOpen: (open: boolean) => void;
  chordsTrack: Track | null;
  openChords: (track: Track) => void;

  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  openPrivacyModal: () => void;

  isTermsModalOpen: boolean;
  setIsTermsModalOpen: (open: boolean) => void;
  openTermsModal: () => void;

  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;

  // Admin Security
  isAdminMode: boolean;
  isAdminAuthenticated: boolean;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  openCustomizer: () => void;

  isBookingSuccessModalOpen: boolean;
  setIsBookingSuccessModalOpen: (open: boolean) => void;
  lastBookingSubmission: BookingFormData | null;
  submitBooking: (data: BookingFormData) => Promise<boolean>;

  submitPrayerRequest: (data: PrayerRequestData) => Promise<boolean>;
  triggerAdConversion: (eventName: string, params?: Record<string, any>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const MinistryContext = createContext<MinistryContextType | undefined>(undefined);

const STORAGE_KEY = "dekings_ministry_content_v5";

export const MinistryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved content or defaults
  const [ministryInfo, setMinistryInfo] = useState<MinistryInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + "_info");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.phone || parsed.phone.includes("749-KING")) {
          parsed.phone = "08039675034";
        }
        return { ...initialMinistryInfo, ...parsed };
      } catch (e) {
        return initialMinistryInfo;
      }
    }
    return initialMinistryInfo;
  });

  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + "_tracks");
    return saved ? JSON.parse(saved) : initialTracks;
  });

  const [albums] = useState<Album[]>(initialAlbums);

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + "_events");
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [scriptures, setScriptures] = useState<ScriptureItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + "_scriptures");
    return saved ? JSON.parse(saved) : initialScriptures;
  });

  const [testimonies] = useState<Testimony[]>(initialTestimonies);

  const [googleAds, setGoogleAds] = useState<GoogleAdsSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + "_google_ads");
    return saved ? JSON.parse(saved) : initialGoogleAdsSettings;
  });

  // Music Player States
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0] || initialTracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [volume, setAudioVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
  const [lyricsTrack, setLyricsTrack] = useState<Track | null>(null);

  const [isChordsModalOpen, setIsChordsModalOpen] = useState(false);
  const [chordsTrack, setChordsTrack] = useState<Track | null>(null);

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Admin & Security States
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return window.location.hash.toLowerCase().includes('admin');
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("dekings_admin_auth") === "true";
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const hasAdmin = hash.includes('admin');
      setIsAdminMode(hasAdmin);
      if (hasAdmin && !sessionStorage.getItem("dekings_admin_auth")) {
        setIsAdminLoginModalOpen(true);
      }

      if (hash.includes('privacy')) {
        setIsPrivacyModalOpen(true);
      }
      if (hash.includes('terms')) {
        setIsTermsModalOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    const initialHash = window.location.hash.toLowerCase();
    if (initialHash.includes('admin') && !sessionStorage.getItem("dekings_admin_auth")) {
      setIsAdminLoginModalOpen(true);
    }
    if (initialHash.includes('privacy')) {
      setIsPrivacyModalOpen(true);
    }
    if (initialHash.includes('terms')) {
      setIsTermsModalOpen(true);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Google AdSense & Google Tag script injection
  useEffect(() => {
    if (!googleAds.enabled) return;

    // 1. Google AdSense script injection
    const publisherId = googleAds.publisherId?.trim();
    if (publisherId && publisherId.startsWith('ca-pub-') && !publisherId.includes('0000000000000000')) {
      const existingAdSense = document.getElementById('google-adsense-script');
      if (!existingAdSense) {
        const script = document.createElement('script');
        script.id = 'google-adsense-script';
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }

    // 2. Google Ads Conversion & Remarketing (gtag.js) script injection
    const conversionId = googleAds.adsConversionId?.trim();
    if (conversionId) {
      const existingGtag = document.getElementById('google-ads-gtag-script');
      if (!existingGtag) {
        const script = document.createElement('script');
        script.id = 'google-ads-gtag-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`;
        document.head.appendChild(script);

        // Init dataLayer
        const inlineScript = document.createElement('script');
        inlineScript.id = 'google-ads-gtag-init';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `;
        document.head.appendChild(inlineScript);
      }
    }
  }, [googleAds.enabled, googleAds.publisherId, googleAds.adsConversionId]);

  const updateGoogleAds = (settings: GoogleAdsSettings) => {
    setGoogleAds(settings);
    localStorage.setItem(STORAGE_KEY + "_google_ads", JSON.stringify(settings));
    showToast("Google Ads settings updated successfully!");
  };

  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const openTermsModal = () => setIsTermsModalOpen(true);

  const triggerAdConversion = (eventName: string, params: Record<string, any> = {}) => {
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
      }
    } catch (err) {
      console.warn('Ad conversion trigger error:', err);
    }
  };

  const loginAdmin = (username: string, password: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Accept mikemozesmm@gmail or mikemozesmm@gmail.com
    const isValidUser = cleanUser === 'mikemozesmm@gmail' || cleanUser === 'mikemozesmm@gmail.com';
    const isValidPass = cleanPass === 'mikemozes7777';

    if (isValidUser && isValidPass) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("dekings_admin_auth", "true");
      setIsAdminLoginModalOpen(false);
      showToast("Access Granted: Welcome Minister Mike Moses!");
      setIsEditorOpen(true);
      return true;
    } else {
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("dekings_admin_auth");
    setIsEditorOpen(false);
    showToast("Logged out of Admin Portal.");
  };

  const openCustomizer = () => {
    if (isAdminAuthenticated) {
      setIsEditorOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };
  const [isBookingSuccessModalOpen, setIsBookingSuccessModalOpen] = useState(false);
  const [lastBookingSubmission, setLastBookingSubmission] = useState<BookingFormData | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_info", JSON.stringify(ministryInfo));
  }, [ministryInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_tracks", JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_scriptures", JSON.stringify(scriptures));
  }, [scriptures]);

  // Audio timer simulation for realistic progress bar & synth pad playback
  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev >= currentTrack.durationSeconds) {
            // Auto advance or loop
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setCurrentSeconds(0);
    setIsPlaying(true);
    worshipAudio.playTrack(track.id, track.key);
    worshipAudio.setVolume(isMuted ? 0 : volume);
    showToast(`Now Playing: ${track.title}`);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    worshipAudio.pause();
  };

  const resumeTrack = () => {
    setIsPlaying(true);
    worshipAudio.playTrack(currentTrack.id, currentTrack.key);
    worshipAudio.setVolume(isMuted ? 0 : volume);
  };

  const nextTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    const next = tracks[nextIndex];
    playTrack(next);
  };

  const prevTrack = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    const prev = tracks[prevIndex];
    playTrack(prev);
  };

  const seekProgress = (percent: number) => {
    const targetSeconds = Math.floor((percent / 100) * currentTrack.durationSeconds);
    setCurrentSeconds(targetSeconds);
  };

  const setVolume = (vol: number) => {
    setAudioVolume(vol);
    if (isMuted && vol > 0) setIsMuted(false);
    worshipAudio.setVolume(vol);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      worshipAudio.setVolume(volume);
    } else {
      setIsMuted(true);
      worshipAudio.setVolume(0);
    }
  };

  const openLyrics = (track: Track) => {
    setLyricsTrack(track);
    setIsLyricsModalOpen(true);
  };

  const openChords = (track: Track) => {
    setChordsTrack(track);
    setIsChordsModalOpen(true);
  };

  const updateMinistryInfo = (info: Partial<MinistryInfo>) => {
    setMinistryInfo(prev => ({ ...prev, ...info }));
    showToast("Ministry information updated successfully.");
  };

  const updateTracks = (newTracks: Track[]) => {
    setTracks(newTracks);
    showToast("Music tracks database updated.");
  };

  const updateEvents = (newEvents: EventItem[]) => {
    setEvents(newEvents);
    showToast("Ministry events schedule updated.");
  };

  const updateScriptures = (newScriptures: ScriptureItem[]) => {
    setScriptures(newScriptures);
    showToast("Scripture reflections updated.");
  };

  const resetToDefaults = () => {
    setMinistryInfo(initialMinistryInfo);
    setTracks(initialTracks);
    setEvents(initialEvents);
    setScriptures(initialScriptures);
    localStorage.removeItem(STORAGE_KEY + "_info");
    localStorage.removeItem(STORAGE_KEY + "_tracks");
    localStorage.removeItem(STORAGE_KEY + "_events");
    localStorage.removeItem(STORAGE_KEY + "_scriptures");
    showToast("Reset all ministry content to initial template.");
  };

  const exportContentJson = () => {
    const payload = {
      ministryInfo,
      tracks,
      events,
      scriptures,
      exportedAt: new Date().toISOString(),
      app: "De King's Family Music Ministry"
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dekings_ministry_content_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded ministry content JSON package.");
  };

  const importContentJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.ministryInfo) setMinistryInfo(parsed.ministryInfo);
      if (Array.isArray(parsed.tracks)) setTracks(parsed.tracks);
      if (Array.isArray(parsed.events)) setEvents(parsed.events);
      if (Array.isArray(parsed.scriptures)) setScriptures(parsed.scriptures);
      showToast("Custom ministry content imported successfully!");
      return true;
    } catch {
      showToast("Invalid JSON file format.");
      return false;
    }
  };

  const submitBooking = async (data: BookingFormData): Promise<boolean> => {
    setLastBookingSubmission(data);
    setIsBookingSuccessModalOpen(true);
    showToast("Booking inquiry received! We will contact you within 24-48 hours.");
    return true;
  };

  const submitPrayerRequest = async (data: PrayerRequestData): Promise<boolean> => {
    showToast(`Prayer request for "${data.prayerSubject}" received. The ministry intercessors are praying!`);
    return true;
  };

  const playbackProgress = currentTrack.durationSeconds > 0
    ? Math.min(100, (currentSeconds / currentTrack.durationSeconds) * 100)
    : 0;

  return (
    <MinistryContext.Provider
      value={{
        ministryInfo,
        tracks,
        albums,
        events,
        scriptures,
        testimonies,
        googleAds,
        updateMinistryInfo,
        updateTracks,
        updateEvents,
        updateScriptures,
        updateGoogleAds,
        resetToDefaults,
        exportContentJson,
        importContentJson,
        currentTrack,
        isPlaying,
        playbackProgress,
        currentSeconds,
        volume,
        isMuted,
        playTrack,
        togglePlay,
        pauseTrack,
        resumeTrack,
        nextTrack,
        prevTrack,
        seekProgress,
        setVolume,
        toggleMute,
        isLyricsModalOpen,
        setIsLyricsModalOpen,
        lyricsTrack,
        openLyrics,
        isChordsModalOpen,
        setIsChordsModalOpen,
        chordsTrack,
        openChords,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        openPrivacyModal,
        isTermsModalOpen,
        setIsTermsModalOpen,
        openTermsModal,
        isEditorOpen,
        setIsEditorOpen,
        isAdminMode,
        isAdminAuthenticated,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        loginAdmin,
        logoutAdmin,
        openCustomizer,
        isBookingSuccessModalOpen,
        setIsBookingSuccessModalOpen,
        lastBookingSubmission,
        submitBooking,
        submitPrayerRequest,
        triggerAdConversion,
        toastMessage,
        showToast
      }}
    >
      {children}
    </MinistryContext.Provider>
  );
};

export const useMinistry = () => {
  const context = useContext(MinistryContext);
  if (!context) {
    throw new Error("useMinistry must be used within a MinistryProvider");
  }
  return context;
};
