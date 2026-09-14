import React, { useState, useRef } from 'react';
import { X, SlidersHorizontal, Download, Upload, RotateCcw, Save, Plus, Trash2, Edit3, CheckCircle2, Music, Calendar, Phone, Landmark, Sparkles, Megaphone, Copy, ExternalLink, ShieldAlert, Check, LogOut } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { EventItem, GoogleAdsSettings, MinistryInfo, Track } from '../types';

export const ContentEditorModal: React.FC = () => {
  const {
    isEditorOpen,
    setIsEditorOpen,
    ministryInfo,
    updateMinistryInfo,
    tracks,
    updateTracks,
    events,
    updateEvents,
    googleAds,
    updateGoogleAds,
    resetToDefaults,
    exportContentJson,
    importContentJson,
    showToast,
    logoutAdmin
  } = useMinistry();

  const [activeTab, setActiveTab] = useState<'info' | 'contacts' | 'banking' | 'tracks' | 'events' | 'ads'>('info');
  const [localInfo, setLocalInfo] = useState<MinistryInfo>(ministryInfo);
  const [localTracks, setLocalTracks] = useState<Track[]>(tracks);
  const [localEvents, setLocalEvents] = useState<EventItem[]>(events);
  const [localGoogleAds, setLocalGoogleAds] = useState<GoogleAdsSettings>(googleAds);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isEditorOpen) return null;

  const handleSaveAll = () => {
    updateMinistryInfo(localInfo);
    updateTracks(localTracks);
    updateEvents(localEvents);
    updateGoogleAds(localGoogleAds);
    showToast("All custom ministry content and Google Ads settings saved!");
    setIsEditorOpen(false);
  };

  const handleCopyAdsTxt = () => {
    navigator.clipboard.writeText(localGoogleAds.adsTxtContent);
    setCopiedAdsTxt(true);
    showToast("ads.txt content copied to clipboard!");
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  const handleDownloadAdsTxt = () => {
    const blob = new Blob([localGoogleAds.adsTxtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ads.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("ads.txt file downloaded!");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importContentJson(content);
        if (success) {
          setIsEditorOpen(false);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleAddTrack = () => {
    const newTrack: Track = {
      id: `track-${Date.now()}`,
      title: 'New Anointed Anthem',
      subtitle: 'feat. Worship Team',
      duration: '5:00',
      durationSeconds: 300,
      album: 'Single Release 2026',
      releaseYear: '2026',
      key: 'G Major',
      bpm: 70,
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      spotifyUrl: 'https://spotify.com',
      appleMusicUrl: 'https://music.apple.com',
      youtubeUrl: 'https://youtube.com',
      boomplayUrl: 'https://boomplay.com',
      audiomackUrl: 'https://audiomack.com',
      category: 'Prophetic Worship',
      scriptureReference: 'Psalm 150:1-6',
      featuredLead: 'Lead Vocalist',
      lyrics: ['[Verse 1]', 'Lord we give You praise and honor forever and ever.'],
      chords: 'G - D - Em - C'
    };
    setLocalTracks([newTrack, ...localTracks]);
  };

  const handleAddEvent = () => {
    const newEvent: EventItem = {
      id: `event-${Date.now()}`,
      title: 'New Worship Encounter',
      tagline: 'A Night in the Holy of Holies',
      date: '2026-10-30',
      time: '6:30 PM EST',
      venue: 'Cathedral Center',
      city: 'Atlanta, GA',
      country: 'USA',
      eventType: 'Worship Night',
      isUpcoming: true,
      registrationOpen: true,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      details: 'Experience a transformative move of the Holy Spirit.'
    };
    setLocalEvents([newEvent, ...localEvents]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121217] border border-[#d4af37]/60 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#17140e] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364] shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white truncate">
                  Admin Dashboard & Content Manager
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#2a220e] border border-[#d4af37]/50 text-[#fce999] text-[10px] font-mono uppercase tracking-wider font-semibold">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate">
                Update ministry profile, tracks, events, Google ads, and bank giving details.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Log Out Button */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to log out of the Admin Dashboard?")) {
                  logoutAdmin();
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-red-950/50 hover:bg-red-900/70 border border-red-800/70 text-red-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group"
              title="Log out of Admin Dashboard"
              id="admin-header-logout-btn"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Log Out</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsEditorOpen(false)}
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center cursor-pointer transition-colors"
              title="Close Dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="px-6 py-2 bg-[#19150f] border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'info', label: 'Ministry Profile', icon: Sparkles },
            { id: 'contacts', label: 'Phone, Email & Socials', icon: Phone },
            { id: 'banking', label: 'Bank Giving Info', icon: Landmark },
            { id: 'tracks', label: `Songs & Tracks (${localTracks.length})`, icon: Music },
            { id: 'events', label: `Events (${localEvents.length})`, icon: Calendar },
            { id: 'ads', label: 'Google Ads & AdSense', icon: Megaphone },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gold-gradient text-[#09090b] font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Ministry Name
                </label>
                <input
                  type="text"
                  value={localInfo.ministryName}
                  onChange={(e) => setLocalInfo({ ...localInfo, ministryName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={localInfo.tagline}
                    onChange={(e) => setLocalInfo({ ...localInfo, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Motto / Biblical Reference
                  </label>
                  <input
                    type="text"
                    value={localInfo.motto}
                    onChange={(e) => setLocalInfo({ ...localInfo, motto: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Vision Statement
                </label>
                <textarea
                  rows={3}
                  value={localInfo.vision}
                  onChange={(e) => setLocalInfo({ ...localInfo, vision: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Mission Statement
                </label>
                <textarea
                  rows={3}
                  value={localInfo.mission}
                  onChange={(e) => setLocalInfo({ ...localInfo, mission: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={localInfo.email}
                    onChange={(e) => setLocalInfo({ ...localInfo, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Primary Phone
                  </label>
                  <input
                    type="text"
                    value={localInfo.phone}
                    onChange={(e) => setLocalInfo({ ...localInfo, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Alt Phone
                  </label>
                  <input
                    type="text"
                    value={localInfo.altPhone}
                    onChange={(e) => setLocalInfo({ ...localInfo, altPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    24/7 Prayer Line
                  </label>
                  <input
                    type="text"
                    value={localInfo.emergencyPrayerLine}
                    onChange={(e) => setLocalInfo({ ...localInfo, emergencyPrayerLine: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    value={localInfo.address}
                    onChange={(e) => setLocalInfo({ ...localInfo, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    City, Country
                  </label>
                  <input
                    type="text"
                    value={localInfo.cityCountry}
                    onChange={(e) => setLocalInfo({ ...localInfo, cityCountry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#fce999] mb-3">
                  Social & Streaming Links
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={localInfo.socials.youtube}
                      onChange={(e) => setLocalInfo({ ...localInfo, socials: { ...localInfo.socials, youtube: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={localInfo.socials.instagram}
                      onChange={(e) => setLocalInfo({ ...localInfo, socials: { ...localInfo.socials, instagram: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={localInfo.socials.facebook}
                      onChange={(e) => setLocalInfo({ ...localInfo, socials: { ...localInfo.socials, facebook: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">WhatsApp Hotline URL</label>
                    <input
                      type="text"
                      value={localInfo.socials.whatsapp}
                      onChange={(e) => setLocalInfo({ ...localInfo, socials: { ...localInfo.socials, whatsapp: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'banking' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={localInfo.banking.bankName}
                    onChange={(e) => setLocalInfo({ ...localInfo, banking: { ...localInfo.banking, bankName: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={localInfo.banking.accountName}
                    onChange={(e) => setLocalInfo({ ...localInfo, banking: { ...localInfo.banking, accountName: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={localInfo.banking.accountNumber}
                    onChange={(e) => setLocalInfo({ ...localInfo, banking: { ...localInfo.banking, accountNumber: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Sort Code / Routing
                  </label>
                  <input
                    type="text"
                    value={localInfo.banking.sortCode || ''}
                    onChange={(e) => setLocalInfo({ ...localInfo, banking: { ...localInfo.banking, sortCode: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Giving Purpose / Reference
                </label>
                <input
                  type="text"
                  value={localInfo.banking.purpose}
                  onChange={(e) => setLocalInfo({ ...localInfo, banking: { ...localInfo.banking, purpose: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}

          {activeTab === 'tracks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Manage track titles, musical key, album, and streaming links.
                </span>
                <button
                  type="button"
                  onClick={handleAddTrack}
                  className="px-3.5 py-1.5 rounded-lg bg-[#272010] border border-[#d4af37]/50 text-[#fce999] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#362b12] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Track</span>
                </button>
              </div>

              <div className="space-y-4">
                {localTracks.map((track, idx) => (
                  <div
                    key={track.id}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#e6c364]">Track #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => setLocalTracks(localTracks.filter(t => t.id !== track.id))}
                        className="text-xs text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                        title="Delete Track"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Title</label>
                        <input
                          type="text"
                          value={track.title}
                          onChange={(e) => {
                            const updated = [...localTracks];
                            updated[idx].title = e.target.value;
                            setLocalTracks(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Subtitle / Features</label>
                        <input
                          type="text"
                          value={track.subtitle}
                          onChange={(e) => {
                            const updated = [...localTracks];
                            updated[idx].subtitle = e.target.value;
                            setLocalTracks(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Key</label>
                        <input
                          type="text"
                          value={track.key}
                          onChange={(e) => {
                            const updated = [...localTracks];
                            updated[idx].key = e.target.value;
                            setLocalTracks(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Duration</label>
                        <input
                          type="text"
                          value={track.duration}
                          onChange={(e) => {
                            const updated = [...localTracks];
                            updated[idx].duration = e.target.value;
                            setLocalTracks(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Album</label>
                        <input
                          type="text"
                          value={track.album}
                          onChange={(e) => {
                            const updated = [...localTracks];
                            updated[idx].album = e.target.value;
                            setLocalTracks(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">
                  Manage tour dates, revival conferences, and holy convocations.
                </span>
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="px-3.5 py-1.5 rounded-lg bg-[#272010] border border-[#d4af37]/50 text-[#fce999] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#362b12] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Gathering</span>
                </button>
              </div>

              <div className="space-y-4">
                {localEvents.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#e6c364]">Gathering #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => setLocalEvents(localEvents.filter(e => e.id !== evt.id))}
                        className="text-xs text-red-400 hover:text-red-300 p-1 flex items-center gap-1"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Event Title</label>
                        <input
                          type="text"
                          value={evt.title}
                          onChange={(e) => {
                            const updated = [...localEvents];
                            updated[idx].title = e.target.value;
                            setLocalEvents(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Tagline / Theme</label>
                        <input
                          type="text"
                          value={evt.tagline}
                          onChange={(e) => {
                            const updated = [...localEvents];
                            updated[idx].tagline = e.target.value;
                            setLocalEvents(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Date (YYYY-MM-DD)</label>
                        <input
                          type="text"
                          value={evt.date}
                          onChange={(e) => {
                            const updated = [...localEvents];
                            updated[idx].date = e.target.value;
                            setLocalEvents(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Time</label>
                        <input
                          type="text"
                          value={evt.time}
                          onChange={(e) => {
                            const updated = [...localEvents];
                            updated[idx].time = e.target.value;
                            setLocalEvents(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase">Venue & City</label>
                        <input
                          type="text"
                          value={evt.venue}
                          onChange={(e) => {
                            const updated = [...localEvents];
                            updated[idx].venue = e.target.value;
                            setLocalEvents(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Notice Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#221c0e] to-zinc-900 border border-[#d4af37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/60 flex items-center justify-center text-[#e6c364] shrink-0 mt-0.5">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-cinzel text-base font-bold text-white">
                      Google Ads & Google AdSense Engine
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-0.5">
                      Monetize your website traffic, run Google Ads outreach campaigns, and manage policy-compliant ad units and <code className="text-[#fce999]">ads.txt</code> verification.
                    </p>
                  </div>
                </div>

                {/* Master Switch */}
                <div className="flex items-center gap-3 self-end sm:self-center bg-zinc-900/90 px-4 py-2 rounded-xl border border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-200">
                    {localGoogleAds.enabled ? 'Ads Active' : 'Ads Disabled'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLocalGoogleAds({ ...localGoogleAds, enabled: !localGoogleAds.enabled })}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      localGoogleAds.enabled ? 'bg-emerald-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        localGoogleAds.enabled ? 'right-1' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Core Credentials Section */}
              <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h5 className="font-cinzel text-sm font-bold text-[#fce999] uppercase tracking-wider flex items-center gap-2">
                  <span>1. Google Account & Verification Credentials</span>
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Google AdSense Publisher ID (Client ID)
                    </label>
                    <input
                      type="text"
                      value={localGoogleAds.publisherId}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, publisherId: e.target.value })}
                      placeholder="ca-pub-1234567890123456"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#d4af37]"
                    />
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Found in your Google AdSense dashboard under <em>Account &gt; Settings &gt; Publisher ID</em>.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Google Ads Conversion / Google Tag ID (gtag.js)
                    </label>
                    <input
                      type="text"
                      value={localGoogleAds.adsConversionId}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, adsConversionId: e.target.value })}
                      placeholder="AW-123456789 or G-XXXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#d4af37]"
                    />
                    <span className="text-[11px] text-zinc-400 mt-1 block">
                      Used for Google Ads campaign conversion tracking, remarketing, and analytics.
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localGoogleAds.autoAds}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, autoAds: e.target.checked })}
                      className="w-4 h-4 rounded text-[#d4af37] focus:ring-0 bg-zinc-900 border-zinc-700"
                    />
                    <span>Enable Google AdSense <strong>Auto Ads</strong> (automated AI placement)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localGoogleAds.testMode}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, testMode: e.target.checked })}
                      className="w-4 h-4 rounded text-[#d4af37] focus:ring-0 bg-zinc-900 border-zinc-700"
                    />
                    <span><strong>Test / Safe Preview Mode</strong> (prevents accidental invalid clicks)</span>
                  </label>
                </div>
              </div>

              {/* Ad Placement Slots Configuration */}
              <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <h5 className="font-cinzel text-sm font-bold text-[#fce999] uppercase tracking-wider">
                  2. Targeted Responsive Ad Placements
                </h5>
                <p className="text-xs text-zinc-400">
                  Toggle and customize individual ad positions throughout the homepage:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Slot 1: Top Leaderboard */}
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Top Banner (Below Hero)</span>
                      <input
                        type="checkbox"
                        checked={localGoogleAds.showTopBanner}
                        onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, showTopBanner: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>
                    <input
                      type="text"
                      value={localGoogleAds.topBannerSlotId}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, topBannerSlotId: e.target.value })}
                      placeholder="Ad Unit Slot ID (e.g. 1234567890)"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-mono text-[11px]"
                    />
                  </div>

                  {/* Slot 2: Mid Section */}
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Mid-Page Banner (Between Sections)</span>
                      <input
                        type="checkbox"
                        checked={localGoogleAds.showMidSectionBanner}
                        onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, showMidSectionBanner: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>
                    <input
                      type="text"
                      value={localGoogleAds.midSectionSlotId}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, midSectionSlotId: e.target.value })}
                      placeholder="Ad Unit Slot ID (e.g. 2345678901)"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-mono text-[11px]"
                    />
                  </div>

                  {/* Slot 3: Music Showcase */}
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Music & Track Showcase Divider</span>
                      <input
                        type="checkbox"
                        checked={localGoogleAds.showMusicSectionBanner}
                        onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, showMusicSectionBanner: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>
                    <input
                      type="text"
                      value={localGoogleAds.musicSectionSlotId}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, musicSectionSlotId: e.target.value })}
                      placeholder="Ad Unit Slot ID (e.g. 3456789012)"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-mono text-[11px]"
                    />
                  </div>

                  {/* Slot 4: Footer */}
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Pre-Footer Leaderboard Banner</span>
                      <input
                        type="checkbox"
                        checked={localGoogleAds.showFooterBanner}
                        onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, showFooterBanner: e.target.checked })}
                        className="w-4 h-4"
                      />
                    </div>
                    <input
                      type="text"
                      value={localGoogleAds.footerBannerSlotId}
                      onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, footerBannerSlotId: e.target.value })}
                      placeholder="Ad Unit Slot ID (e.g. 4567890123)"
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* ads.txt Authorization Editor */}
              <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-cinzel text-sm font-bold text-[#fce999] uppercase tracking-wider">
                      3. Google Crawler <span className="font-mono">ads.txt</span> Verification
                    </h5>
                    <p className="text-xs text-zinc-400">
                      Google crawlers verify ownership via <code className="text-[#fce999]">/ads.txt</code>. Keep this file updated with your publisher ID:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyAdsTxt}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAdsTxt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
                      <span>{copiedAdsTxt ? 'Copied' : 'Copy ads.txt'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadAdsTxt}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Download .txt</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={localGoogleAds.adsTxtContent}
                  onChange={(e) => setLocalGoogleAds({ ...localGoogleAds, adsTxtContent: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-emerald-400 font-mono text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Quick Setup Checklist */}
              <div className="p-4 rounded-xl bg-[#14120c] border border-[#d4af37]/30 text-xs text-zinc-300 space-y-2">
                <div className="font-bold text-[#fce999] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Google Ads & AdSense Policy Checklist Complete</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-1 text-[11px]">
                  <li><strong>Privacy Policy & Cookie Consent:</strong> Fully integrated with DART cookie disclosures and Google Ads opt-out links.</li>
                  <li><strong>Terms of Service:</strong> Compliant with intellectual property and donation policies.</li>
                  <li><strong>Responsive Ad Slots:</strong> Labeled with required "Advertisement / Ministry Partner" disclosures.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-zinc-800 bg-[#0d0d11] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <button
              onClick={exportContentJson}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center gap-1.5 cursor-pointer"
              title="Download Content JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center gap-1.5 cursor-pointer"
              title="Import Saved Content JSON"
            >
              <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Import JSON</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all content to initial template values?")) {
                  resetToDefaults();
                  setIsEditorOpen(false);
                }
              }}
              className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-red-900/40 text-red-400 flex items-center gap-1.5 cursor-pointer"
              title="Reset to Template Default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to log out of the Admin Dashboard?")) {
                  logoutAdmin();
                }
              }}
              className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 hover:text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Log Out of Admin Session"
              id="admin-footer-logout-btn"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
            <button
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 rounded-xl bg-gold-gradient text-[#09090b] font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-2 shadow-md cursor-pointer text-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
