import React, { useState, useRef } from 'react';
import { X, SlidersHorizontal, Download, Upload, RotateCcw, Save, Plus, Trash2, Edit3, CheckCircle2, Music, Calendar, Phone, Landmark, Sparkles } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { EventItem, MinistryInfo, Track } from '../types';

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
    resetToDefaults,
    exportContentJson,
    importContentJson,
    showToast
  } = useMinistry();

  const [activeTab, setActiveTab] = useState<'info' | 'contacts' | 'banking' | 'tracks' | 'events'>('info');
  const [localInfo, setLocalInfo] = useState<MinistryInfo>(ministryInfo);
  const [localTracks, setLocalTracks] = useState<Track[]>(tracks);
  const [localEvents, setLocalEvents] = useState<EventItem[]>(events);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isEditorOpen) return null;

  const handleSaveAll = () => {
    updateMinistryInfo(localInfo);
    updateTracks(localTracks);
    updateEvents(localEvents);
    showToast("All custom ministry content saved successfully!");
    setIsEditorOpen(false);
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
        <div className="p-6 border-b border-zinc-800 bg-[#17140e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                Live Ministry Content Customizer
              </h3>
              <p className="text-xs text-zinc-400">
                Replace sample contacts, scriptures, songs, events, and bank giving details.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditorOpen(false)}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="px-6 py-2 bg-[#19150f] border-b border-zinc-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'info', label: 'Ministry Profile', icon: Sparkles },
            { id: 'contacts', label: 'Phone, Email & Socials', icon: Phone },
            { id: 'banking', label: 'Bank Giving Info', icon: Landmark },
            { id: 'tracks', label: `Songs & Tracks (${localTracks.length})`, icon: Music },
            { id: 'events', label: `Events (${localEvents.length})`, icon: Calendar },
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    SWIFT / BIC Code
                  </label>
                  <input
                    type="text"
                    value={localInfo.banking.swiftCode || ''}
                    onChange={(e) => setLocalInfo({ ...localInfo, banking: { ...localInfo.banking, swiftCode: e.target.value } })}
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
              onClick={() => setIsEditorOpen(false)}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 rounded-xl bg-gold-gradient text-[#09090b] font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-2 shadow-md cursor-pointer"
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
