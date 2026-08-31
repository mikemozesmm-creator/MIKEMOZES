import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

export const CookieConsentBanner: React.FC = () => {
  const { openPrivacyModal } = useMinistry();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('dekings_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth entering animation
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dekings_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('dekings_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#141419]/95 backdrop-blur-md border border-[#d4af37]/40 rounded-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-zinc-300 text-xs">
        
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364] shrink-0 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-sm font-bold text-white">
                Cookie & Ad Preferences
              </span>
              <button
                onClick={handleDecline}
                className="text-zinc-500 hover:text-zinc-300 p-1"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-zinc-400 leading-relaxed text-[11px]">
              We use cookies and Google Ads services to enhance worship streaming, track gospel outreach, and display policy-compliant ministry partner messages.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 rounded-lg bg-gold-gradient text-[#09090b] font-bold text-[11px] hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3 h-3" />
                <span>Accept All</span>
              </button>

              <button
                onClick={handleDecline}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition-colors cursor-pointer"
              >
                Essential Only
              </button>

              <button
                onClick={() => {
                  openPrivacyModal();
                }}
                className="text-[11px] text-[#fce999] hover:underline cursor-pointer ml-auto"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
