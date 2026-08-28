import React from 'react';
import { Play, Pause, Calendar, Phone, Sparkles, Disc, Award, Users, ShieldCheck, Flame } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { CrestLogo } from './CrestLogo';

export const Hero: React.FC = () => {
  const { ministryInfo, currentTrack, isPlaying, playTrack, togglePlay } = useMinistry();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#09090b]"
    >
      {/* Background Image with Dark Vignette & Gold Atmospheric Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=85"
          alt="De King's Family Worship Ministry"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-10000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Ministry Crest Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1c1912]/80 border border-[#d4af37]/40 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(212,175,55,0.25)] animate-fade-in">
          <CrestLogo size="sm" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#fce999]">
            Royal Gospel Ministration
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e6c364] animate-ping" />
        </div>

        {/* Main Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6">
          <span className="text-gold-gradient block drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
            BRINGING NATIONS
          </span>
          <span className="text-white font-serif italic font-normal block sm:inline">
            BEFORE GOD
          </span>{' '}
          <span className="text-[#fce999]">IN WORSHIP</span>
        </h1>

        {/* Subtitle / Ministry Motto */}
        <p className="font-sans text-base sm:text-xl text-[#d4d4d8] max-w-2xl font-light mb-8 leading-relaxed">
          {ministryInfo.tagline}. Dedicated to releasing spirit-breathed anthems, prophetic worship encounters, and sound biblical praise to nations.
        </p>

        {/* Interactive Now Playing Card */}
        <div className="w-full max-w-xl bg-gradient-to-r from-[#17140e] via-[#1f1a11] to-[#17140e] border border-[#d4af37]/35 rounded-2xl p-4 sm:p-5 mb-10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#d4af37]/50 shadow-md">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-[#09090b]/40 flex items-center justify-center gap-0.5">
                  <span className="w-1 h-3 bg-[#e6c364] animate-pulse" />
                  <span className="w-1 h-5 bg-[#fce999] animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-[#d4af37] animate-pulse delay-150" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#e6c364] bg-[#362b11] px-2 py-0.5 rounded">
                  Featured Single
                </span>
                <span className="text-xs text-zinc-400 font-mono">Key {currentTrack.key}</span>
              </div>
              <h4 className="text-sm font-semibold text-white truncate max-w-[240px] sm:max-w-[280px]">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-zinc-400 truncate">{currentTrack.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                if (isPlaying) {
                  togglePlay();
                } else {
                  playTrack(currentTrack);
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              id="hero-play-featured-btn"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Worship</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Listen Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#music"
            className="px-6 py-3.5 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-sm tracking-wide uppercase hover:brightness-110 shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all flex items-center gap-2 cursor-pointer"
            id="hero-tracks-cta"
          >
            <Disc className="w-4 h-4" />
            <span>Explore All Tracks</span>
          </a>
          <a
            href="#booking"
            className="px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-semibold text-sm border border-zinc-700/80 hover:border-[#d4af37]/60 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-booking-cta"
          >
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>Book Ministration</span>
          </a>
          <a
            href="#events"
            className="px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 font-semibold text-sm border border-zinc-700/80 hover:border-[#d4af37]/60 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-events-cta"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Upcoming Gatherings</span>
          </a>
        </div>

        {/* Key Impact Stats Ribbon */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl pt-8 border-t border-zinc-800/80 text-left">
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272111] border border-[#d4af37]/30 text-[#e6c364]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-cinzel text-white">14+ Years</div>
              <div className="text-xs text-zinc-400">Of Anointed Grace</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272111] border border-[#d4af37]/30 text-[#e6c364]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-cinzel text-white">75,000+</div>
              <div className="text-xs text-zinc-400">Hearts Ministered To</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272111] border border-[#d4af37]/30 text-[#e6c364]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-cinzel text-white">35+ Releases</div>
              <div className="text-xs text-zinc-400">Anthems & Albums</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 backdrop-blur-sm flex items-center gap-3.5">
            <div className="p-2.5 rounded-lg bg-[#272111] border border-[#d4af37]/30 text-[#e6c364]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-cinzel text-white">100% Biblical</div>
              <div className="text-xs text-zinc-400">Pure Prophetic Sound</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
