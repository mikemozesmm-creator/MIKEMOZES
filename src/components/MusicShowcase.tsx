import React, { useState } from 'react';
import { Play, Pause, Disc, FileText, Music2, ExternalLink, Sparkles, Filter, Sliders, Volume2, Share2 } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { Track } from '../types';

export const MusicShowcase: React.FC = () => {
  const { tracks, albums, currentTrack, isPlaying, playTrack, togglePlay, openLyrics, openChords, showToast } = useMinistry();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');

  const categories = ['All', 'Prophetic Worship', 'Praise Celebration', 'Choral Anthem', 'Intimate Prayer'];

  const filteredTracks = selectedCategory === 'All'
    ? tracks
    : tracks.filter(t => t.category === selectedCategory);

  const handleShareTrack = (track: Track) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#music?track=${track.id}`);
      showToast(`Link to "${track.title}" copied to clipboard!`);
    }
  };

  return (
    <section id="music" className="py-24 bg-[#0c0c0f] relative overflow-hidden border-t border-zinc-800/80">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241e12] border border-[#d4af37]/40 text-xs font-semibold text-[#fce999] uppercase tracking-widest mb-4">
              <Disc className="w-3.5 h-3.5 text-[#e6c364]" />
              <span>Anointed Discography</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Music & <span className="text-gold-gradient">Track Showcase</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Immerse in heaven-sent melodies, choral arrangements, and worship anthems designed to lift burdens and invite the Holy Spirit.
            </p>
          </div>

          {/* Toggle Tracks vs Albums */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'tracks'
                  ? 'bg-gold-gradient text-[#09090b] shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="showcase-tab-tracks"
            >
              All Tracks ({tracks.length})
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'albums'
                  ? 'bg-gold-gradient text-[#09090b] shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
              id="showcase-tab-albums"
            >
              Albums ({albums.length})
            </button>
          </div>
        </div>

        {activeTab === 'tracks' ? (
          <>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              <span className="text-xs text-zinc-500 uppercase tracking-wider flex items-center gap-1 mr-2 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#d4af37]/20 border border-[#d4af37] text-[#fef08a] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tracks List / Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredTracks.map((track, index) => {
                const isThisPlaying = currentTrack.id === track.id && isPlaying;
                const isSelected = currentTrack.id === track.id;

                return (
                  <div
                    key={track.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#1c180f] to-[#141418] border-[#d4af37]/60 shadow-[0_4px_25px_rgba(212,175,55,0.15)]'
                        : 'bg-[#121216] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#16161b]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      
                      {/* Album Cover & Play Button Overlay */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-700/60 shadow-md">
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        {/* Play Button Overlay */}
                        <button
                          onClick={() => {
                            if (isThisPlaying) {
                              togglePlay();
                            } else {
                              playTrack(track);
                            }
                          }}
                          className={`absolute inset-0 flex items-center justify-center transition-all cursor-pointer ${
                            isThisPlaying
                              ? 'bg-[#09090b]/60 opacity-100'
                              : 'bg-[#09090b]/40 opacity-0 group-hover:opacity-100'
                          }`}
                          aria-label={`Play ${track.title}`}
                          id={`play-track-${track.id}`}
                        >
                          <div className="w-10 h-10 rounded-full bg-gold-gradient text-[#09090b] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            {isThisPlaying ? (
                              <Pause className="w-5 h-5 fill-current" />
                            ) : (
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            )}
                          </div>
                        </button>

                        {/* Playing Wave Indicator */}
                        {isThisPlaying && (
                          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 flex items-center gap-0.5">
                            <span className="w-1 h-2.5 bg-[#e6c364] animate-pulse" />
                            <span className="w-1 h-3.5 bg-[#fce999] animate-pulse delay-75" />
                            <span className="w-1 h-1.5 bg-[#d4af37] animate-pulse delay-150" />
                          </div>
                        )}
                      </div>

                      {/* Track Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#e6c364] bg-[#272111] border border-[#d4af37]/30 px-2 py-0.5 rounded">
                            {track.category}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono">
                            {track.key} • {track.bpm} BPM
                          </span>
                        </div>

                        <h3 className="font-cinzel text-base sm:text-lg font-bold text-white truncate group-hover:text-[#fce999] transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-xs text-zinc-400 truncate mb-1">
                          {track.subtitle}
                        </p>
                        <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                          <span>{track.album}</span>
                          <span>•</span>
                          <span>{track.duration}</span>
                        </div>
                      </div>

                    </div>

                    {/* Footer Actions: Lyrics, Chords, Stream */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openLyrics(track)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
                          title="View Lyrics & Scripture"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Lyrics</span>
                        </button>
                        <button
                          onClick={() => openChords(track)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
                          title="Chord Chart & Key"
                        >
                          <Music2 className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Chords</span>
                        </button>
                        <button
                          onClick={() => handleShareTrack(track)}
                          className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                          title="Share Track"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Streaming Platform Icons */}
                      <div className="flex items-center gap-2 text-zinc-400">
                        <a
                          href={track.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#1DB954] transition-colors"
                          title="Listen on Spotify"
                        >
                          <span className="text-[10px] font-bold">Spotify</span>
                        </a>
                        <span>•</span>
                        <a
                          href={track.appleMusicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FC3C44] transition-colors"
                          title="Apple Music"
                        >
                          <span className="text-[10px] font-bold">Apple</span>
                        </a>
                        <span>•</span>
                        <a
                          href={track.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#FF0000] transition-colors"
                          title="YouTube"
                        >
                          <span className="text-[10px] font-bold">YouTube</span>
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Albums Tab */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-[#121217] rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col group shadow-lg"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#09090b]/80 border border-[#d4af37]/40 backdrop-blur-md text-xs font-mono text-[#fce999]">
                    {album.year}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-white mb-2 group-hover:text-[#fce999] transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {album.description}
                    </p>
                    <div className="text-xs text-[#e6c364] font-medium mb-6">
                      {album.totalTracks} Anointed Tracks • Live & Studio Ministration
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const firstAlbumTrack = tracks.find(t => t.album.includes(album.title.split(' ')[0])) || tracks[0];
                        playTrack(firstAlbumTrack);
                      }}
                      className="px-4 py-2 rounded-lg bg-gold-gradient text-[#09090b] text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Album</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <a
                        href={album.streamingLinks.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        Spotify
                      </a>
                      <span className="text-zinc-600">•</span>
                      <a
                        href={album.streamingLinks.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        Apple
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
