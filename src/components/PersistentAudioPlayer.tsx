import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, FileText, Music2, ChevronUp, ChevronDown, Sparkles, Radio } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const PersistentAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    prevTrack,
    currentSeconds,
    playbackProgress,
    seekProgress,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    openLyrics,
    openChords
  } = useMinistry();

  const [isMinimized, setIsMinimized] = useState(false);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekProgress(parseFloat(e.target.value));
  };

  return (
    <div
      id="persistent-worship-player"
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
        isMinimized ? 'translate-y-[calc(100%-28px)]' : 'translate-y-0'
      }`}
    >
      {/* Top minimize toggle bar */}
      <div className="max-w-7xl mx-auto px-4 flex justify-end">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="px-3 py-1 bg-[#18181b] border-t border-x border-[#d4af37]/40 rounded-t-lg text-[11px] font-mono text-[#fce999] flex items-center gap-1 hover:bg-[#27272a] shadow-lg cursor-pointer"
          title={isMinimized ? "Expand Player" : "Minimize Player"}
        >
          {isMinimized ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Worship Audio Bar</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Minimize</span>
            </>
          )}
        </button>
      </div>

      {/* Main Bar Container */}
      <div className="bg-[#0e0e12]/95 backdrop-blur-xl border-t border-[#d4af37]/35 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Current Track Info */}
          <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#d4af37]/40 shadow-sm">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-[#09090b]/40 flex items-center justify-center gap-0.5">
                  <span className="w-0.5 h-3 bg-[#e6c364] animate-pulse" />
                  <span className="w-0.5 h-4 bg-[#fce999] animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-[#d4af37] animate-pulse delay-150" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate font-cinzel">
                  {currentTrack.title}
                </h4>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2a220e] text-[#e6c364] border border-[#d4af37]/30 font-mono shrink-0">
                  {currentTrack.key}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 truncate">
                {currentTrack.subtitle} • {currentTrack.album}
              </p>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-1/3">
            <div className="flex items-center gap-4">
              <button
                onClick={prevTrack}
                className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-gold-gradient text-[#09090b] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
                id="player-play-toggle"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Time and Range Bar */}
            <div className="w-full flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="w-9 text-right">{formatTime(currentSeconds)}</span>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={playbackProgress}
                onChange={handleSeek}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <span className="w-9">{currentTrack.duration}</span>
            </div>
          </div>

          {/* Right: Lyrics, Chords & Volume */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/3 text-xs">
            <button
              onClick={() => openLyrics(currentTrack)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-[#fce999] hover:border-[#d4af37]/50 transition-all cursor-pointer"
              title="Lyrics Sheet"
            >
              <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Lyrics</span>
            </button>

            <button
              onClick={() => openChords(currentTrack)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700/80 text-zinc-300 hover:text-[#fce999] hover:border-[#d4af37]/50 transition-all cursor-pointer"
              title="Chords & Key"
            >
              <Music2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Chords</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-800">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white p-1 cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#d4af37]" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
