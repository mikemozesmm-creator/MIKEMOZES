import React from 'react';
import { X, BookOpen, Shield, HeartHandshake } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const { ministryInfo } = useMinistry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121217] border border-zinc-700/80 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#fce999] font-bold">
                Terms of Use & Ministry Guidelines
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Terms of Service
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close Terms Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-300 leading-relaxed font-sans scrollbar-thin">
          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              1. Acceptance of Terms
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              By accessing and using the official platform of {ministryInfo.ministryName}, you acknowledge and agree to abide by these Terms of Service, along with our Privacy Policy and all applicable local, national, and international laws.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#d4af37]" />
              2. Prophetic Music, Chords & Intellectual Property
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              All audio tracks, orchestral scores, chord charts, lyrics, and media published on this platform are spiritual intellectual property of {ministryInfo.ministryName}. Chord charts and lyrics are provided freely for personal devotion and congregational worship use under fair licensing.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white">
              3. Ministration Bookings & Free-will Offerings
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Submission of a booking form is an invitation and does not constitute a binding legal contract until confirmed in writing by the ministry administrative board. Direct bank support and offerings are voluntary contributions toward gospel advancement.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white">
              4. Advertising & External Links
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              This site may display sponsor messages or Google Ads. We do not endorse third-party products advertised through automated ad networks unless explicitly stated by the ministry board.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            Agree & Close
          </button>
        </div>

      </div>
    </div>
  );
};
