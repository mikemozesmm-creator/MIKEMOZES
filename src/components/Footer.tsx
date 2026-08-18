import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Heart, Disc, Sparkles, MessageCircle, Youtube, Instagram, Facebook, Music, Share2, Twitter } from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useMinistry } from '../context/MinistryContext';

export const Footer: React.FC = () => {
  const { ministryInfo, showToast, isAdminMode, isAdminAuthenticated, openCustomizer, logoutAdmin } = useMinistry();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Thank you! ${newsletterEmail} subscribed for prophetic music releases & chord sheets.`);
    setNewsletterEmail('');
  };

  return (
    <footer id="ministry-footer" className="bg-[#070709] border-t border-zinc-800 text-zinc-400 pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand & Crest Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <CrestLogo size="lg" />
              <div>
                <span className="font-cinzel text-xl font-bold tracking-wider text-gold-gradient block">
                  DE KING'S FAMILY
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-medium">
                  Music Ministry
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {ministryInfo.vision}
            </p>
            <div className="text-xs text-[#e6c364] font-serif italic">
              "Lifting Praise, Transforming Generations."
            </div>

            {/* Dedicated Social Media Buttons */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-semibold text-[#fce999] uppercase tracking-wider block">
                Connect With Us On Social Media
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href={`https://wa.me/2348039675034?text=${encodeURIComponent("Hello De King's Family Music Ministry, I would like to connect.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 hover:bg-emerald-900/80 text-emerald-300 flex items-center gap-2 transition-all text-xs font-medium shadow-md group hover:scale-[1.02]"
                  title="WhatsApp: 08039675034"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:animate-bounce shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold font-mono text-[11px] leading-tight text-white">WhatsApp</span>
                    <span className="text-[10px] text-emerald-400 font-mono truncate">08039675034</span>
                  </div>
                </a>

                <a
                  href={ministryInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-red-950/50 border border-red-500/40 hover:bg-red-900/70 text-red-300 flex items-center gap-2 transition-all text-xs font-medium shadow-md hover:scale-[1.02]"
                  title="YouTube Channel"
                >
                  <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[11px] leading-tight text-white">YouTube</span>
                    <span className="text-[10px] text-red-400 truncate">Watch Live</span>
                  </div>
                </a>

                <a
                  href={ministryInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-pink-950/50 border border-pink-500/40 hover:bg-pink-900/70 text-pink-300 flex items-center gap-2 transition-all text-xs font-medium shadow-md hover:scale-[1.02]"
                  title="Instagram Page"
                >
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[11px] leading-tight text-white">Instagram</span>
                    <span className="text-[10px] text-pink-400 truncate">@dekingsfamily</span>
                  </div>
                </a>

                <a
                  href={ministryInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-blue-950/50 border border-blue-500/40 hover:bg-blue-900/70 text-blue-300 flex items-center gap-2 transition-all text-xs font-medium shadow-md hover:scale-[1.02]"
                  title="Facebook Ministry"
                >
                  <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[11px] leading-tight text-white">Facebook</span>
                    <span className="text-[10px] text-blue-400 truncate">Ministry Page</span>
                  </div>
                </a>

                <a
                  href={ministryInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 flex items-center gap-2 transition-all text-xs font-medium shadow-md hover:scale-[1.02]"
                  title="TikTok Handle"
                >
                  <Music className="w-4 h-4 text-zinc-100 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[11px] leading-tight text-white">TikTok</span>
                    <span className="text-[10px] text-zinc-400 truncate">Worship Clips</span>
                  </div>
                </a>

                <a
                  href={ministryInfo.socials.twitter || "https://x.com/dekingsmusic"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#d4af37]/50 text-[#fce999] flex items-center gap-2 transition-all text-xs font-medium shadow-md hover:scale-[1.02]"
                  title="X / Twitter"
                >
                  <Twitter className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[11px] leading-tight text-white">X (Twitter)</span>
                    <span className="text-[10px] text-[#fce999] truncate">Updates</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-[#fce999] transition-colors">About the Ministry</a></li>
              <li><a href="#worship-legacy" className="hover:text-[#fce999] transition-colors">Worship & Legacy</a></li>
              <li><a href="#music" className="hover:text-[#fce999] transition-colors">Music & Discography</a></li>
              <li><a href="#events" className="hover:text-[#fce999] transition-colors">Upcoming Gatherings</a></li>
              <li><a href="#scripture" className="hover:text-[#fce999] transition-colors">Scripture Reflections</a></li>
              <li><a href="#booking" className="hover:text-[#fce999] transition-colors">Book Ministration</a></li>
              <li><a href="#giving" className="hover:text-[#fce999] transition-colors">Ministry Partnership</a></li>
            </ul>
          </div>

          {/* Music Streaming Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Stream Music
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Spotify Music</a></li>
              <li><a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400">Apple Music</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">YouTube Music</a></li>
              <li><a href="https://boomplay.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">Boomplay Music</a></li>
              <li><a href="https://audiomack.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">Audiomack</a></li>
              <li><a href="https://amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Amazon Music</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Worship Bulletin
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe for new single releases, chords, and live convocation alerts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full pl-3 pr-9 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2 rounded-md bg-[#d4af37] text-[#09090b] hover:brightness-110 flex items-center justify-center transition-all cursor-pointer"
                  title="Subscribe"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>

            {(isAdminMode || isAdminAuthenticated) && (
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={openCustomizer}
                  className="text-[11px] text-[#fce999] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>{isAdminAuthenticated ? 'Open Admin Editor' : 'Login to Admin Editor'}</span>
                </button>
                {isAdminAuthenticated && (
                  <button
                    onClick={logoutAdmin}
                    className="text-[10px] text-zinc-500 hover:text-red-400 underline"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {ministryInfo.ministryName}. All rights reserved.</span>
            <a
              href="#admin"
              className="text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors"
              title="Admin Portal Access"
            >
              Admin
            </a>
          </div>
          <div className="flex items-center gap-1 text-[#d4af37] text-xs">
            <span>To God Alone Be All The Glory Forever & Ever</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
