import React from 'react';
import { X, ShieldCheck, Lock, Eye, Cookie, Globe, Mail } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const { ministryInfo } = useMinistry();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121217] border border-zinc-700/80 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2a220e] border border-[#d4af37]/40 flex items-center justify-center text-[#e6c364]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#fce999] font-bold">
                Legal & Policy Compliance
              </span>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Privacy Policy & Advertising Disclosures
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close Privacy Policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-300 leading-relaxed font-sans scrollbar-thin">
          <div className="p-4 rounded-xl bg-[#18150f] border border-[#d4af37]/30 text-xs text-[#fce999] flex items-start gap-3">
            <Lock className="w-5 h-5 shrink-0 text-[#d4af37] mt-0.5" />
            <div>
              <strong>Last Updated:</strong> August 2026. This Privacy Policy outlines how {ministryInfo.ministryName} collects, uses, and protects personal data, and complies with Google Ads, Google AdSense, and international privacy standards.
            </div>
          </div>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#d4af37]" />
              1. Information We Collect
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We collect information that you voluntarily provide to us when booking ministrations, submitting prayer requests, subscribing to our prophetic worship bulletin, or contacting our ministry team. This includes your name, email address, phone number, organization name, and event details.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-[#d4af37]" />
              2. Cookies & Google Advertising (Google Ads & AdSense)
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              This website participates in third-party advertising programs, including <strong>Google AdSense</strong> and <strong>Google Ads</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-2">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#fce999] underline">Google Ads Settings</a>.</li>
              <li>Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#fce999] underline">www.aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#d4af37]" />
              3. Analytics & Conversion Tracking
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We may utilize Google Analytics and Google Tag (gtag.js) to measure ministry outreach, track page engagement, and verify successful event registrations or song streams. No sensitive personal prayer requests are ever shared with advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d4af37]" />
              4. Contact the Ministry Data Protection Officer
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If you have any questions about this Privacy Policy or wish to request data erasure, please contact us at:
            </p>
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
              Email: {ministryInfo.email} | Phone: {ministryInfo.phone}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-[#09090b] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
};
