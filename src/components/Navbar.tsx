import React, { useState, useEffect } from 'react';
import { Menu, X, Music, Calendar, BookOpen, Heart, Sparkles, Phone, SlidersHorizontal, Volume2, Lock, LogOut, ShieldCheck } from 'lucide-react';
import { CrestLogo } from './CrestLogo';
import { useMinistry } from '../context/MinistryContext';

export const Navbar: React.FC = () => {
  const { isPlaying, currentTrack, togglePlay, isAdminMode, isAdminAuthenticated, logoutAdmin, openCustomizer } = useMinistry();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', icon: Sparkles },
    { name: 'Worship & Legacy', href: '#worship-legacy', icon: Sparkles },
    { name: 'Music Tracks', href: '#music', icon: Music },
    { name: 'Events', href: '#events', icon: Calendar },
    { name: 'Scripture & Vision', href: '#scripture', icon: BookOpen },
    { name: 'Booking', href: '#booking', icon: Phone },
    { name: 'Giving', href: '#giving', icon: Heart },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-[#d4af37]/25 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-[#09090b]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Crest */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none" id="brand-logo-link">
          <CrestLogo size="md" />
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-gold-gradient group-hover:brightness-110 transition-all">
              DE KING'S FAMILY
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#a1a1aa] font-medium">
              Music Ministry
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" id="desktop-nav-menu">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#d4d4d8] hover:text-[#fce999] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#d4af37] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Play Status Pill */}
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause Ambient Ministration" : "Play Ambient Ministration"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
              isPlaying
                ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.3)] animate-pulse'
                : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
            id="nav-audio-toggle"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-[#e6c364]' : 'text-zinc-400'}`} />
            <span className="truncate max-w-[110px]">{isPlaying ? currentTrack.title : 'Listen'}</span>
          </button>

          {/* Admin Customizer Button - Only visible in Admin Mode (/#admin) or when authenticated */}
          {(isAdminMode || isAdminAuthenticated) && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={openCustomizer}
                title="Edit Ministry Info, Songs & Events"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4af37]/60 bg-[#1c180e] text-xs text-[#fce999] hover:brightness-125 shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer font-medium"
                id="edit-content-btn"
              >
                {isAdminAuthenticated ? (
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                )}
                <span>{isAdminAuthenticated ? 'Admin Editor' : 'Admin Login'}</span>
              </button>

              {isAdminAuthenticated && (
                <button
                  onClick={logoutAdmin}
                  title="Logout Admin"
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Book Ministration Primary CTA */}
          <a
            href="#booking"
            className="px-4 py-2 rounded-lg bg-gold-gradient text-[#09090b] font-semibold text-xs tracking-wider uppercase hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            id="nav-book-cta"
          >
            Book Ministration
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {(isAdminMode || isAdminAuthenticated) && (
            <button
              onClick={openCustomizer}
              className="p-2 text-zinc-300 hover:text-amber-300"
              title="Admin Content Editor"
              id="mobile-edit-btn"
            >
              <SlidersHorizontal className="w-5 h-5 text-[#d4af37]" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-[#e6c364] focus:outline-none"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e11] border-b border-[#d4af37]/30 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300" id="mobile-menu-drawer">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-300 hover:text-[#fce999] hover:bg-[#1f1d16] text-sm font-medium transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#d4af37]" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <button
              onClick={() => {
                togglePlay();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900 text-sm text-zinc-200"
            >
              <Volume2 className="w-4 h-4 text-[#d4af37]" />
              <span>{isPlaying ? `Playing: ${currentTrack.title}` : 'Play Worship Pad'}</span>
            </button>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-gold-gradient text-[#09090b] font-semibold text-sm tracking-wider uppercase"
            >
              Book Ministration
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
