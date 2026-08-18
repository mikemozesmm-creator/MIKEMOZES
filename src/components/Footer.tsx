import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Heart, Disc, Sparkles } from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useMinistry } from '../context/MinistryContext';

export const Footer: React.FC = () => {
  const { ministryInfo, showToast, setIsEditorOpen } = useMinistry();
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

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={ministryInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#e6c364] hover:border-[#d4af37]/40 transition-colors"
                title="YouTube Channel"
              >
                <span className="font-bold text-xs">YT</span>
              </a>
              <a
                href={ministryInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#e6c364] hover:border-[#d4af37]/40 transition-colors"
                title="Instagram"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href={ministryInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#e6c364] hover:border-[#d4af37]/40 transition-colors"
                title="Facebook"
              >
                <span className="font-bold text-xs">FB</span>
              </a>
              <a
                href={ministryInfo.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#e6c364] hover:border-[#d4af37]/40 transition-colors"
                title="TikTok"
              >
                <span className="font-bold text-xs">TT</span>
              </a>
              <a
                href={ministryInfo.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-[#25D366] hover:border-emerald-500/40 transition-colors"
                title="WhatsApp Hotline"
              >
                <span className="font-bold text-xs">WA</span>
              </a>
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

            <button
              onClick={() => setIsEditorOpen(true)}
              className="mt-3 text-[11px] text-[#e6c364] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" /> Customize Ministry Content
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {ministryInfo.ministryName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#d4af37] text-xs">
            <span>To God Alone Be All The Glory Forever & Ever</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
